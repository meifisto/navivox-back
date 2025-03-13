import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export const UserDto = Joi.object({
  lastname: Joi.string().required(),
  firstname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

export class UserObject {
  @ApiProperty({ example: 'DOE' })
  @IsString()
  lastname: string;

  @ApiProperty({
    example: 'John Luc',
  })
  @IsString()
  fistname: string;

  @ApiProperty({
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'manager',
  })
  @IsString()
  role: string;
}
