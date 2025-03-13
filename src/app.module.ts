import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

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
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
        'mongodb+srv://t:mongo@cluster1.9j48g.mongodb.net/navivox',
    ),
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
  providers: [AppService],
})
export class AppModule {}
