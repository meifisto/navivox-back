import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TranslationService } from '../translation/translation.service';
import { PointsInterestsService } from '../points_interests/points_interests.service';

@Injectable()
export class ItineraryService {
  constructor(
    private readonly httpService: HttpService,
    private readonly translationService: TranslationService,
    private readonly pointsInterestsService: PointsInterestsService,
  ) {}

  async getPath(
    start_lon: number,
    start_lat: number,
    end_lon: number,
    end_lat: number,
  ): Promise<object> {
    const url =
      `https://router.project-osrm.org/route/v1/foot/` +
      start_lon +
      `,` +
      start_lat +
      `;` +
      end_lon +
      `,` +
      end_lat;
    const params = {
      overview: 'full',
      geometries: 'geojson',
      steps: 'true',
      // language: 'fr', // Demander les instructions en français
    };
    const response = await firstValueFrom(
      this.httpService.get(url, { params }),
    );
    // console.log('response::: 🧨 ', response.data);

    if (response.status === 200) {
      const instructionsArray = [
        'start',
        'depart',
        'right',
        'left',
        'driving',
        'merge',
        'slight right',
        'exit rotary',
        'arrive',
        'turn',
        'end of road'
      ];
      // const instructionsString = instructionsArray.join('; ');
      // const translateInstructions =
      //   await this.translationService.translateText(instructionsString);
      // const traductionsArray = translateInstructions.split(';');

      const traductionsArray = [
        'démarrer',
        'départ',
        'droite',
        'gauche',
        'conduire',
        'rejoindre',
        'droit léger',
        'sortir du rond-point',
        'arrivée',
        'tourner',
        'fin de la route',
      ];

      const data = response.data;
      const route = data.routes[0];
      const distance_total = route.distance;
      const duration_total = route.duration;
      // console.log(
      //   '-------------------------------------------------------------',
      // );

      const steps = [];
      for (const leg of route.legs) {
        for (let index = 0; index < leg.steps.length; index++) {
          const step = leg.steps[index];
          if (step['maneuver']['modifier']) {
            const index = instructionsArray.indexOf(
              step['maneuver']['modifier'],
            );
            if (index !== -1)
              step['maneuver']['modifier'] = traductionsArray[index];
          }
          if (step['maneuver']['type']) {
            // console.log('⭕️ step type ::: ', step['maneuver']['type']);
            const index = instructionsArray.indexOf(step['maneuver']['type']);
            if (index !== -1)
              step['maneuver']['type'] = traductionsArray[index];
          }
          if (step['mode']) {
            // console.log('⭕️ step mode ::: ', step['mode']);
            const index = instructionsArray.indexOf(step['mode']);
            if (index !== -1) step['mode'] = traductionsArray[index];
          }
          if (step['driving_side']) {
            // console.log('⭕️ step driving_side ::: ', step['driving_side']);
            const index = instructionsArray.indexOf(step['driving_side']);
            if (index !== -1) step['driving_side'] = traductionsArray[index];
          }
          // console.log(
          //   index,
          //   '::: ---------------------------------------------------',
          // );

          let object_data = {
            ...step,
            street_name: step.name || 'Rue inconnue',
          };
          // get point fo interests
          if (index < 2) {
            // console.log('index::: 🔵', index);
            let points = null;
            if (step['maneuver']['location']) {
              const [lng, lat] = step['maneuver']['location'];
              points = await this.pointsInterestsService.getPoinOfInterests(
                lng,
                lat,
                80,
              );
              object_data['point_of_interests'] = points;
            }
          }
          steps.push(object_data);
        }
      }

      return {
        code: 200,
        data: {
          distance_total,
          duration_total,
          steps,
          steps_length: steps.length,
          route,
        },
      };
    } else {
      return {
        code: response.status,
        data: response.data,
      };
    }
  }
}
