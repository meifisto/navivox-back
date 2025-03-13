import { Module } from '@nestjs/common';
import { ItineraryController } from './itinerary.controller';
import { ItineraryService } from './itinerary.service';
import { HttpModule } from '@nestjs/axios';
import { TranslationService } from '../translation/translation.service';
import { PointsInterestsService } from '../points_interests/points_interests.service';

@Module({
  imports: [HttpModule],
  controllers: [ItineraryController],
  providers: [ItineraryService, TranslationService, PointsInterestsService],
})
export class ItineraryModule {}
