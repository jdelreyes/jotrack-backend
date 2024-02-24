import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService extends OpenAI {
  constructor(readonly configService: ConfigService) {
    super({ apiKey: configService.get('OPEN_AI_API_KEY') });
  }
}
