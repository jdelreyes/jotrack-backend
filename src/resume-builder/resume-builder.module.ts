import { Module } from '@nestjs/common';
import { ResumeBuilderService } from './resume-builder.service';
import { OpenAIModule } from 'src/openai/openai.module';

@Module({
  providers: [ResumeBuilderService],
  imports: [OpenAIModule],
  exports: [ResumeBuilderService],
})
export class ResumeBuilderModule {}
