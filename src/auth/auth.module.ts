import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // S'assurer que UsersModule est bien là
    PassportModule.register({ defaultStrategy: 'jwt' }), // Enregistrement de la stratégie
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jkgdj54fndg54gfhjdg', // Clé secrète pour JWT
      signOptions: { expiresIn: '7 days' }, // Durée de validité du token "1h"
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
