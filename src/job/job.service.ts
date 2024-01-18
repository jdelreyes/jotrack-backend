import { Injectable } from '@nestjs/common';

@Injectable()
export class JobService {
  getJobs() {
    return null;
  }

  // todo need dto as parameter
  createJob() {
    return 'some';
  }
}
