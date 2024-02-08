import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser, Roles } from '../auth/decorator';
import { AuthGuard, JwtGuard, RolesGuard } from '../auth/guard';
import { Role } from '../auth/enum';
import { ApiResponse } from '@nestjs/swagger';

@Controller('api/resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @ApiResponse({ description: 'retrieves own resume' })
  @Get()
  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
  @Roles(Role.USER)
  @HttpCode(HttpStatus.OK)
  public retrieveOwnResume(@GetUser('id') userId: number) {
    return this.resumeService.retrieveOwnResume(userId);
  }

  @ApiResponse({ description: 'uploads a resume file' })
  @Post()
  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
  @Roles(Role.USER)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('resume'))
  public uploadResume(
    @GetUser('id') userId: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'pdf',
        })
        .addMaxSizeValidator({
          maxSize: 99999,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    resumeFile: Express.Multer.File,
  ) {
    return this.resumeService.uploadResume(userId, resumeFile);
  }

  @ApiResponse({ description: 'uploads a resume file' })
  @Put()
  @UseGuards(AuthGuard, RolesGuard, JwtGuard)
  @Roles(Role.USER)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('resume'))
  public reUploadResume(
    @GetUser('id') userId: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'pdf',
        })
        .addMaxSizeValidator({
          maxSize: 99999,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    resumeFile: Express.Multer.File,
  ) {
    return this.resumeService.reUploadResume(userId, resumeFile);
  }
}
