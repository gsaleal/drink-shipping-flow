import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';

export const RequestHeader = createParamDecorator(
  async (value: ClassConstructor<unknown>, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;

    const dto = plainToInstance(value, headers, {
      excludeExtraneousValues: true,
    });
    const errors = await validate(dto as object);

    if (errors.length) {
      const { value, property } = errors[0];

      throw new HttpException(
        `Unable to accept value ${value} for header property ${property}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return dto;
  },
);
