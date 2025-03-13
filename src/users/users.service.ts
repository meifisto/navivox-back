import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { RolesService } from '../roles/roles.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    // @InjectModel(Role.name) private roleModel: Model<Role>,
    private readonly rolesService: RolesService,
  ) {}

  // populateFields = 'role';
  populateFields = [{ path: 'role', select: 'code description' }];

  async findOne(id: string): Promise<User | null> {
    return this.userModel
      .findOne({ _id: id })
      .populate(this.populateFields) // Utilisation du tableau global
      .exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({ email })
      .populate(this.populateFields) // Utilisation du tableau global
      .select('-__v') // Supprimer certains atrributs
      .lean()
      .exec();
  }

  async register(createUserDto: any) {
    console.log('createUserDto::: ', createUserDto);
    const password = createUserDto.password;
    const hashedPassword = await this.hashPassword(password);
    const roles = ['admin', 'root'];
    // console.log('🧨::: ', roles.includes(createUserDto.role));
    if (!roles.includes(createUserDto.role)) {
      return {
        code: 400,
        data: { message: 'Rôle invalide' },
      };
    }
    const findRoleResult = await this.rolesService.findByCode(
      createUserDto.role,
    );
    // console.log('🧨findRoleResult::: ', findRoleResult);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      role: findRoleResult._id,
    });
    // const responseRegister = await user.save();
    // console.log('responseRegister::: ', responseRegister);
    return {
      code: 200,
      data: await user.save(),
    };
  }

  async list(params: any): Promise<User[]> {
    const { query, page = 0, size = 10, sort = {} } = params;

    const skip = page * size; // Calcul de la pagination

    return this.userModel
      .find(query) // Recherche des utilisateurs avec les critères donnés
      .populate(this.populateFields) // Si des champs doivent être peuplés
      .skip(skip) // Pagination : sauter un nombre d'éléments en fonction de la page
      .limit(size) // Limiter le nombre d'éléments à 'size'
      .sort(sort) // Trier les résultats
      .select('-password -__v') // Supprimer certains atrributs
      .lean(); // Retourner des objets "simples" sans les méthodes Mongoose
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Le facteur de complexité
    return await bcrypt.hash(password, salt);
  }
}
