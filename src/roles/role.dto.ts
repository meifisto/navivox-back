import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export const RoleDto = Joi.object({
  code: Joi.string().required(),
  description: Joi.string().optional(),
});

export class RoleObject {
  @ApiProperty({
    example: 'manager',
  })
  @IsString()
  code: string;

  @ApiProperty({
    example: 'Manager',
  })
  @IsString()
  description: string;
}
