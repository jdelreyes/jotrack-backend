import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { MulterModule } from '@nestjs/platform-express';
import { OpenaiModule } from 'src/openai/openai.module';

@Module({
  imports: [MulterModule.register({}), OpenaiModule],
  providers: [ResumeService],
  controllers: [ResumeController],
})
export class ResumeModule {}
