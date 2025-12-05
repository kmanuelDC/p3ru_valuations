import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) { }
  createProjects(ownerId: number, createProjectDto: CreateProjectDto) {

    const project = this.prisma.project.create({
      data: {
        code: createProjectDto.code,
        name: createProjectDto.name,
        description: createProjectDto.description,
        clientName: createProjectDto.clientName,
        location: createProjectDto.location,
        currency: createProjectDto.currency,
        contractAmount: createProjectDto.amount,
        ownerId: ownerId,
      },
    });

    return project;

  }

  findActiveByUser(userId: number) {
    return this.prisma.project.findMany({
      where: {
        ownerId: userId,
        status: 'ACTIVE',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
