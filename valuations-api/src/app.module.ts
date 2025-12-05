import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [PrismaModule, UserModule, ProjectsModule],
})
export class AppModule {}
