import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const paramNumber  = createParamDecorator( (_data: unknown, context: ExecutionContext) => {
    return Number(context.switchToHttp().getRequest().prams.id)
} )