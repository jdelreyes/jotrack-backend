import { Module } from '@nestjs/common';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationService } from './job-application.service';
import { ResumeBuilderModule } from 'src/resume-builder/resume-builder.module';

@Module({
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
  imports: [ResumeBuilderModule],
})
export class JobApplicationModule {}
