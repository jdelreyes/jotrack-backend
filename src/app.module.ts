import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { JobApplicationController } from './job-application/job-application.controller';
import { JobApplicationService } from './job-application/job-application.service';
import { JobApplicationModule } from './job-application/job-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    JobModule,
    PrismaModule,
    JobApplicationModule,
  ],
  providers: [PrismaService, JobApplicationService],
  controllers: [JobApplicationController],
})
export class AppModule {}
