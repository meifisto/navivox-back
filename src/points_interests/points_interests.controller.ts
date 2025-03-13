import { Body, Controller, Post, Res } from '@nestjs/common';
import { PointsInterestsService } from './points_interests.service';
import { Response } from 'express';
// import { HttpService } from '@nestjs/axios';

@Controller('points-interests')
export class PointsInterestsController {
  constructor(
    private readonly pointsInterestsService: PointsInterestsService,
    // private readonly httpService: HttpService,
  ) {}

  @Post()
  async getPoints(@Body() body: any, @Res() res: Response) {
    const { lng, lat, range } = body;
    const response = await this.pointsInterestsService.getPoinOfInterests(
      lng,
      lat,
      range,
    );
    // return res.status(response['code']).json(response['data']);
    return res.status(200).json(response);
  }
}
