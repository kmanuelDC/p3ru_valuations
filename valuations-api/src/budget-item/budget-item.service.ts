import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateBudgetItemDto } from './dto/create-budget-item.dto';
import { UpdateBudgetItemDto } from './dto/update-budget-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BudgetItemService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(projectId: number, createBudgetItemDto: CreateBudgetItemDto) {
    const dto = createBudgetItemDto;

    const contractAmount = Number(dto.contractQty) * Number(dto.unitPrice);

    let parentConnect: Prisma.BudgetItemCreateNestedOneWithoutChildrenInput | undefined = undefined;
    if (dto.parentId) {
      parentConnect = { connect: { id: dto.parentId } };
    } else if (dto.parentCode) {
      const parent = await this.prisma.budgetItem.findFirst({
        where: { projectId, code: dto.parentCode },
        select: { id: true }
      });
      if (!parent) {
        throw new BadRequestException(`parentCode '${dto.parentCode}' not found for project ${projectId}`);
      }
      parentConnect = { connect: { id: parent.id } };
    }

    const data: Prisma.BudgetItemCreateInput = {
      project: { connect: { id: projectId } },
      code: dto.code,
      description: dto.description,
      unit: dto.unit,
      contractQty: dto.contractQty,
      unitPrice: dto.unitPrice,
      contractAmount,
      level: dto.level,
      isHeader: dto.isHeader,
      sortOrder: dto.sortOrder,
    };

    if (parentConnect) {
      // attach relation by id
      // @ts-ignore assign typed relation
      (data as any).parent = parentConnect;
    }

    const budgetItem = await this.prisma.budgetItem.create({
      data,
    });

    return budgetItem;
  }

  async createManyHierarchy(projectId: number, dtos: CreateBudgetItemDto[]) {
    if (!dtos || dtos.length === 0) {
      throw new BadRequestException('No items provided');
    }

    // Sort by depth (number of segments in code) so parents are created before children
    const items = [...dtos].sort((a, b) => a.code.split('.').length - b.code.split('.').length);

    const createdMap = new Map<string, number>(); // code -> id

    await this.prisma.$transaction(async (tx) => {
      for (const dto of items) {
        // resolve parentId: prefer explicit parentId, then parentCode (from createdMap or DB), then infer
        let parentId: number | undefined = undefined;

        if (dto.parentId) {
          parentId = dto.parentId;
        } else if (dto.parentCode) {
          const fromMap = createdMap.get(dto.parentCode);
          if (fromMap) {
            parentId = fromMap;
          } else {
            const parentRow = await tx.budgetItem.findFirst({ where: { projectId, code: dto.parentCode }, select: { id: true } });
            if (parentRow) parentId = parentRow.id;
            else throw new BadRequestException(`parentCode '${dto.parentCode}' not found for project ${projectId}`);
          }
        } else {
          // infer parent by trimming last segment, e.g. '02.01.01' -> '02.01'
          const parts = dto.code.split('.');
          if (parts.length > 1) {
            const inferred = parts.slice(0, -1).join('.');
            const fromMap = createdMap.get(inferred);
            if (fromMap) parentId = fromMap;
            else {
              const parentRow = await tx.budgetItem.findFirst({ where: { projectId, code: inferred }, select: { id: true } });
              if (parentRow) parentId = parentRow.id;
            }
          }
        }

        const contractAmount = Number(dto.contractQty) * Number(dto.unitPrice);

        const createData: Prisma.BudgetItemUncheckedCreateInput = {
          projectId,
          code: dto.code,
          description: dto.description,
          unit: dto.unit,
          contractQty: dto.contractQty,
          unitPrice: dto.unitPrice,
          contractAmount,
          level: dto.level,
          isHeader: dto.isHeader,
          sortOrder: dto.sortOrder,
          parentId: parentId ?? undefined,
        };

        const created = await tx.budgetItem.create({ data: createData as any });
        createdMap.set(dto.code, created.id);
      }
    });

    return Array.from(createdMap.entries()).map(([code, id]) => ({ code, id }));
  }

  findAll() {
    return `This action returns all budgetItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} budgetItem`;
  }

  update(id: number, updateBudgetItemDto: UpdateBudgetItemDto) {
    return `This action updates a #${id} budgetItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} budgetItem`;
  }
}
