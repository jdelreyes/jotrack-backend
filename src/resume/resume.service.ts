import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResumeService {
  public constructor(private prismaService: PrismaService) {}
}
