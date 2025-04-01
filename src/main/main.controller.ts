import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MainService } from './main.service';
import { ItineraryService } from '../itinerary/itinerary.service';
import { Response } from 'express';

@Controller('main')
export class MainController {
  constructor(
    private readonly mainService: MainService,
    private readonly itineraryService: ItineraryService,
  ) {}

  @Post('path')
  async getPath(@Body() body: any, @Res() res: Response) {
    const { start_lon, start_lat, end_lon, end_lat } = body;
    console.log(
      `Get path for \n Start longitude: ${start_lon}, Start latitude: ${start_lat}, End longitude: ${end_lon}, End latitude: ${end_lat}`,
    );
    const response = await this.itineraryService.getPath(
      start_lon,
      start_lat,
      end_lon,
      end_lat,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return res.status(response['code']).json({ data: response['data'] });
  }

  @Get('test')
  test() {
    return { message: 'GET fonctionne bien' };
  }
}
