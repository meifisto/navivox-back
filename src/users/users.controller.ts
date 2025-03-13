import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserDto, UserObject } from './user.dto';
// import { User } from './user.schema';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Users')
@Injectable()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
  @ApiParam({
    name: 'params',
    description: 'Exemple de paramètres de requête',
    example: {
      filter: { type: ['createdAt'], text: ['2022-06-13,2022-06-13'] },
      options: { reference: 'aVuka7N' },
      sort: { createdAt: -1 },
      page: 0,
      size: 10,
    },
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.list({});
  }

  @ApiOperation({ summary: 'Inscription' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiBody({ type: UserObject }) // Documentation du corps de la requête
  @Post()
  async register(@Body() body: any, @Res() res: Response) {
    const { error } = UserDto.validate(body);
    if (error) throw new BadRequestException(error.details);
    const response = await this.usersService.register(body);
    return res.status(response['code']).json(response['data']);
  }

  @ApiOperation({ summary: 'Récupérer un utilisateur par son ID' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé' })
  @ApiResponse({ status: 404, description: 'Utilisateur introuvable' })
  @ApiParam({
    name: 'id',
    example: '6123456789abcdef',
    description: "L'ID de l'utilisateur",
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
