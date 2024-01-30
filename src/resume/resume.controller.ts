import { Controller } from '@nestjs/common';
import { ResumeService } from './resume.service';

@Controller('api/resumes')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}
}
