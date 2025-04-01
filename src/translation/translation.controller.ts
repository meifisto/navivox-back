import { Controller, Get, Query, Res } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { Response } from 'express';

@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Get('translate')
  async translate(
    @Query('input') input: string,
    @Res() res: Response,
  ): Promise<object> {
    try {
      const translatedText = await this.translationService.translateText(input);
      return res.status(200).json({ text: translatedText });
    } catch (error) {
      console.error('Translation error:', error);
      return res.status(500).json({ error: 'Translation failed' });
    }
  }
}
