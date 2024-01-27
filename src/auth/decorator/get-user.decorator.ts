import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (
    data: string | undefined,
    executionContext: ExecutionContext,
  ): any | User => {
    const request: Express.Request = executionContext
      .switchToHttp()
      .getRequest();
    if (data) {
      return request['user'][data];
    }
    return request['user'];
  },
);
