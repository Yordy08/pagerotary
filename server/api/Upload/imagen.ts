import { fileURLToPath } from 'url';
import { defineEventHandler } from 'h3';
import fs from 'fs/promises';
import path, { dirname } from 'path';
import { readFiles } from 'h3-formidable';
import cloudinary from '../../utils/Cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    return { error: 'Método no permitido' };
  }

  try {
    const { files } = await readFiles(event);

    // Verifica si se envió un archivo
    const photo = files.photo[0];
    if (!photo) {
      return { error: 'No se envió ningún archivo' };
    }

    // Valida que el archivo sea una imagen
    if (!photo.mimetype.startsWith('image/')) {
      return { error: 'El archivo no es una imagen' };
    }

    const imageName = `${Date.now()}-${photo.originalFilename}`;
    const uploadsDir = path.join(__dirname, 'uploads');
    const newPath = path.join(uploadsDir, imageName);

    // Crea la carpeta 'uploads' si no existe
    await fs.mkdir(uploadsDir, { recursive: true });

    // Mueve el archivo a la carpeta 'uploads'
    const fileData = await fs.readFile(photo.filepath);
    await fs.writeFile(newPath, fileData);

    // Sube el archivo a Cloudinary
    const upload = await cloudinary.uploader.upload(newPath);

    // Elimina el archivo de la carpeta 'uploads'
    await fs.unlink(newPath);

    if (!upload) {
      return { error: 'No se pudo subir la imagen' };
    }

    return upload;
  } catch (error) {
    console.error(error);
    return { error: 'Ocurrió un error durante el procesamiento del archivo' };
  }
});