import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './role.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  populateFields = '';

  async findOne(id: string): Promise<Role | null> {
    return this.roleModel.findOne({ _id: id }).exec();
  }

  async findByCode(code: string): Promise<Role | null> {
    return this.roleModel.findOne({ code }).exec();
  }

  async create(createRoleDto: any): Promise<Role> {
    const role = new this.roleModel({
      ...createRoleDto,
    });
    return role.save();
  }

  async list(params: any): Promise<Role[]> {
    const { query, page = 0, size = 10, sort = {} } = params;
    const skip = page * size; // Calcul de la pagination
    return this.roleModel
      .find(query) // Recherche des utilisateurs avec les critères donnés
      .populate(this.populateFields) // Si des champs doivent être peuplés
      .skip(skip) // Pagination : sauter un nombre d'éléments en fonction de la page
      .limit(size) // Limiter le nombre d'éléments à 'size'
      .sort(sort) // Trier les résultats
      .select('-password -__v') // Supprimer certains atrributs
      .lean(); // Retourner des objets "simples" sans les méthodes Mongoose
  }
}
