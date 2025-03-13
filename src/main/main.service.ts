import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {
  getInstruction(step: any): string {
    console.log('step::: ', step);
    return 'Good';
  }
}
