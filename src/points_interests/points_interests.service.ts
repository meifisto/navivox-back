import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PointsInterestsService {
  constructor(private readonly httpService: HttpService) {} // private readonly translationService: TranslationService, // private readonly httpService: HttpService,

  async getPoinOfInterests(
    lng: number,
    lat: number,
    range: number,
  ): Promise<object> {
    const url = `http://overpass-api.de/api/interpreter`;
    const query = `
      [out:json];
      node(around:${range}, ${lat}, ${lng})["amenity"]["name"];
      out;
    `;
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, query, {
          headers: { 'Content-Type': 'text/plain' }, // Overpass API attend du "text/plain"
        }),
      );
      const data = response.data;
      return data['elements'];
    } catch (error) {
      console.error('Erreur Overpass API:', error.message);
      throw error;
    }
  }
}
