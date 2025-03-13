import { Controller, Get, Query, Res } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { Response } from 'express';

@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Get('run')
  async runPython(
    @Query('input') input: string,
    @Res() res: Response,
  ): Promise<object> {
    const response = await this.translationService.runPythonScript(input);
    console.log('response::: ', response);
    return res.status(200).json({ text: response });
  }
}
