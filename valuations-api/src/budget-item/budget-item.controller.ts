import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BudgetItemService } from './budget-item.service';
import { CreateBudgetItemDto } from './dto/create-budget-item.dto';
import { UpdateBudgetItemDto } from './dto/update-budget-item.dto';

@Controller('budget-item')
export class BudgetItemController {
  constructor(private readonly budgetItemService: BudgetItemService) {}

  @Post()
  create(@Body() createBudgetItemDto: CreateBudgetItemDto) {
    return this.budgetItemService.create(createBudgetItemDto.projectId, createBudgetItemDto);
  }

  @Post('batch')
  createMany(@Body() createBudgetItemsDto: CreateBudgetItemDto[]) {
    // kept for backward compatibility: expect projectId inside DTOs
    const projectId = createBudgetItemsDto.length ? createBudgetItemsDto[0].projectId : undefined;
    if (!projectId) {
      throw new Error('projectId required in DTOs or use /projects/:projectId/budget-item/batch');
    }
    return this.budgetItemService.createManyHierarchy(Number(projectId), createBudgetItemsDto);
  }

  @Get()
  findAll() {
    return this.budgetItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBudgetItemDto: UpdateBudgetItemDto) {
    return this.budgetItemService.update(+id, updateBudgetItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetItemService.remove(+id);
  }
}
