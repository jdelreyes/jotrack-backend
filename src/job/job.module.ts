import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { OpenAIModule } from 'src/openai/openai.module';

@Module({
  imports: [OpenAIModule],
  providers: [JobService],
  controllers: [JobController],
})
export class JobModule {}
