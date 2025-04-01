import { Injectable } from '@nestjs/common';
import { translate } from '@vitalets/google-translate-api';

@Injectable()
export class TranslationService {
  async translateText(input: string): Promise<string> {
    try {
      const result = await translate(input, {
        from: 'en',
        to: 'fr',
      });
      return result.text;
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Translation failed');
    }
  }
}
