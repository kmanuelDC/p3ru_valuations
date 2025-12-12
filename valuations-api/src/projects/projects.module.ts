import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { BudgetItemModule } from 'src/budget-item/budget-item.module';

@Module({
  imports: [BudgetItemModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
