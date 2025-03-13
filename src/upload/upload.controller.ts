import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express'; // ✅ Utiliser Express pour avoir accès à sendFile
import { existsSync } from 'fs';

const allowedMimeTypes = [
  'image/webp',
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
];

@Controller('upload')
export class UploadController {
  @Post('save')
  @UseInterceptors(
    // FileInterceptor('file', {
    //   storage: diskStorage({
    //     destination: './files/store', // Dossier d'enregistrement
    //     filename: (req, file, cb) => {
    //       // Générer un nom de fichier unique
    //       const uniqueSuffix =
    //         Date.now() + '-' + Math.random().toString(36).substring(2, 15);
    //       cb(null, `${uniqueSuffix}${extname(file.originalname)}`); // Conserve l'extension d'origine
    //     },
    //   }),
    // }),
    FileFieldsInterceptor(
      Array.from({ length: 10 }, (_, i) => ({
        name: `file_${i}`,
        maxCount: 1,
      })),
      {
        storage: diskStorage({
          destination: './files/store',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.random().toString(36).substring(2, 15);
            cb(null, `${uniqueSuffix}${extname(file.originalname)}`); // Conserve l'extension
          },
        }),
        limits: {
          fileSize: 1 * 1024 * 1024, // ✅ Limite à 2 Mo (1 Mo = 1 * 1024 * 1024 octets)
        },
        fileFilter: (req, file, cb) => {
          if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(
              new BadRequestException(
                `Format non autorisé: ${file.originalname} (${file.mimetype})`,
              ),
              false,
            );
          }
          cb(null, true);
        },
      },
    ),
  )
  uploadFile(
    // @UploadedFile() file: Express.Multer.File,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
    @Res() res: Response,
  ) {
    // console.log(files); // Afficher le fichier dans la console pour vérification
    return res.status(201).json({
      message: 'Fichier(s) téléchargé(s) avec succès',
      files,
    });
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '../../files/store', filename);

    if (!existsSync(filePath)) {
      throw new NotFoundException(`Fichier '${filename}' non trouvé.`);
    }

    return res.sendFile(filePath);
  }
}