import { Module } from '@nestjs/common';
// import { RolesService } from '../roles/roles.service';
import { UploadController } from './upload.controller';
// import { Role, RoleSchema } from '../roles/role.schema';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  // providers: [RolesService],
  controllers: [UploadController],
  // exports: [RolesService],
})
export class UploadModule {}
