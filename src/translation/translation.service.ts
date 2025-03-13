import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class TranslationService {
  runPythonScript(input: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python3', ['translation.py', input]);

      let output = '';

      pythonProcess.stdout.on('data', (data) => {
        output = data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Erreur Python: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        try {
          output = output.replace(/\n/g, '');
          resolve(output);
        } catch (error) {
          console.log('error::: ', error);
        }
      });
    });
  }
}
