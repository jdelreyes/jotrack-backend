import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
  providers: [ResumeService],
  controllers: [ResumeController],
})
export class ResumeModule {}
