import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobService {
  constructor(private prismaService: PrismaService) {}

  getJobs() {
    return null;
  }

  createJob() {
    return 'some';
  }

  updateJob() {
    return 'some';
  }

  deleteJob() {

  }
}
