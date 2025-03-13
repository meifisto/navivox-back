import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { HttpModule } from '@nestjs/axios';

import { ItineraryService } from '../itinerary/itinerary.service';
import { TranslationService } from '../translation/translation.service';
import { PointsInterestsService } from '../points_interests/points_interests.service';
@Module({
  imports: [HttpModule],
  controllers: [MainController],
  providers: [
    MainService,
    ItineraryService,
    PointsInterestsService,
    TranslationService,
  ],
})
export class MainModule {}
