import { Body, Controller, Post, Res } from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { Response } from 'express';

@Controller('itinerary')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Post()
  async getPath(@Body() body: any, @Res() res: Response) {
    const { start_lon, start_lat, end_lon, end_lat } = body;
    const response = await this.itineraryService.getPath(
      start_lon,
      start_lat,
      end_lon,
      end_lat,
    );
    // console.log('response ::: ', response['data']['steps']);
    return res.status(response['code']).json(response['data']);
  }
}
