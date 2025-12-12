import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { BudgetItemService } from 'src/budget-item/budget-item.service';
import { CreateBudgetItemDto } from 'src/budget-item/dto/create-budget-item.dto';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly budgetItemService: BudgetItemService,
  ) { }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProjects(1, createProjectDto);
  }

  @Get(':idUser')
  findAllByUser(
    @Param('idUser') idUser: string,
  ) {
    return this.projectsService.findActiveByUser(+idUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  @Post(':projectId/budget-item/batch')
  createBudgetItemsBatch(
    @Param('projectId') projectId: string,
    @Body() createBudgetItemsDto: CreateBudgetItemDto[],
  ) {
    return this.budgetItemService.createManyHierarchy(Number(projectId), createBudgetItemsDto);
  }
}
