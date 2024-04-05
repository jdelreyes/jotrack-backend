import { Module } from '@nestjs/common';
import { GeneratedResumeService } from './generated-resume.service';
import { GeneratedResumeController } from './generated-resume.controller';

@Module({
  providers: [GeneratedResumeService],
  controllers: [GeneratedResumeController],
})
export class GeneratedResumeModule {}
