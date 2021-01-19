import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// export const User = createParamDecorator((data, req) => {
//   return data ? req[data] : req.user;
// });

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
