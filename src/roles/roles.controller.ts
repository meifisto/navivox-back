import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleDto, RoleObject } from './role.dto';
import { Role } from './role.schema';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Roles')
@Injectable()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Récupérer tous les rôles' })
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
    return this.rolesService.list({});
  }

  @ApiOperation({ summary: "Ajout d'un rôle" })
  @ApiResponse({ status: 201, description: 'Rôle créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  @ApiBody({ type: RoleObject }) // Documentation du corps de la requête
  @Post()
  // @UseGuards(JwtAuthGuard)
  create(@Body() body: any): Promise<Role> {
    const { error } = RoleDto.validate(body);
    if (error) throw new BadRequestException(error.details);
    return this.rolesService.create(body);
  }

  @ApiOperation({ summary: 'Récupérer un rôle par son ID' })
  @ApiResponse({ status: 200, description: 'Rôle trouvé' })
  @ApiResponse({ status: 404, description: 'Rôle introuvable' })
  @ApiParam({
    name: 'id',
    example: '6123456789abcdef',
    description: "L'ID de l'utilisateur",
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @ApiOperation({ summary: 'Récupérer un rôle par son code' })
  @ApiResponse({ status: 200, description: 'Rôle trouvé' })
  @ApiResponse({ status: 404, description: 'Rôle introuvable' })
  @ApiParam({
    name: 'id',
    example: '6123456789abcdef',
    description: "L'ID de l'utilisateur",
  })
  @Get(':code')
  @UseGuards(JwtAuthGuard)
  findOneCode(@Param('code') code: string) {
    return this.rolesService.findOne(code);
  }
}
