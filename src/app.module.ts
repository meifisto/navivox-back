import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WebSocketGatewayService } from './ websocket.gateway';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UploadModule } from './upload/upload.module';
import { MainModule } from './main/main.module';
import { ItineraryModule } from './itinerary/itinerary.module';
import { TranslationModule } from './translation/translation.module';
import { PointsInterestsModule } from './points_interests/points_interests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    RolesModule,
    UploadModule,
    MainModule,
    ItineraryModule,
    TranslationModule,
    PointsInterestsModule,
  ],
  controllers: [AppController],
  providers: [AppService, WebSocketGatewayService],
})
export class AppModule {}
