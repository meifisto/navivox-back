import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PointsInterestsController } from './points_interests.controller';
import { PointsInterestsService } from './points_interests.service';

@Module({
  imports: [HttpModule],
  controllers: [PointsInterestsController],
  providers: [PointsInterestsService],
  exports: [PointsInterestsService],
})
export class PointsInterestsModule {}
