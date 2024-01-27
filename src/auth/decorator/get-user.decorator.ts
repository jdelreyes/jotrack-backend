import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, executionContext: ExecutionContext) => {
    const request: Express.Request = executionContext
      .switchToHttp()
      .getRequest();
    if (data) {
      return request['user'][data];
    }
    return request['user'];
  },
);
