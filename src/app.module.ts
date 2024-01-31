import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserActivityModule } from './user-activity/user-activity.module';
import { ResumeModule } from './resume/resume.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    AuthModule,
    UserModule,
    JobModule,
    PrismaModule,
    JobApplicationModule,
    UserActivityModule,
    ResumeModule,
  ],
  providers: [PrismaService],
  controllers: [],
})
export class AppModule {}
