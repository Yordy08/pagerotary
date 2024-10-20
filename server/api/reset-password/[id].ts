// /server/api/Usuarios/reset-password/[id].ts

import { defineEventHandler, readBody, createError } from "h3";
import { connect, getDatabase, getCollection } from "~/server/utils/mongodb";
import { Usuario } from "~/server/models/Usuario";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    //@ts-expect-error
    const { id } = event.context.params;
    try {
        if (event.method === 'GET') {
            return `
            <!DOCTYPE html>
                    <html lang="es">

                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Cambiar Contraseña</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
                        <div style="background-color: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); width: 100%; max-width: 400px;">
                            <h2 style="text-align: center; color: #333333;">Cambiar Contraseña</h2>
                            <form method="POST" action="/api/reset-password/${id}" style="display: flex; flex-direction: column; gap: 20px;">
                                <label for="password" style="color: #555555;">Nueva contraseña:</label>
                                <input type="password" name="contraseña" id="password" required 
                                    style="padding: 12px; border-radius: 5px; border: 1px solid #dddddd; font-size: 16px;" />

                                <button type="submit" 
                                    style="padding: 12px; background-color: #4CAF50; color: #ffffff; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
                                    Cambiar contraseña
                                </button>
                            </form>
                        </div>
                    </body>
                </html>

            `;
        } else if (event.method === 'POST') {
            const { contraseña } = await readBody(event);

            if (!contraseña) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'Contraseña es requerida',
                });
            }

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Usuario>(db, 'usuarios');

            const hashedPassword = await bcrypt.hash(contraseña, 10);

            const result = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { contraseña: hashedPassword } }
            );

            
            if (result.modifiedCount === 1) {
                return `
                    <!DOCTYPE html>
                        <html lang="es">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Cambiar Contraseña</title>
                        </head>
                        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
                            <div style="background-color: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); width: 100%; max-width: 400px;">
                                <h2 style="text-align: center; color: #333333;">Contraseña cambiada exitosamente</h2>
                                <p style="text-align: center; color: #555555;">Tu contraseña ha sido actualizada correctamente.</p>
                                <a href="/" style="display: block; text-align: center; background-color: #4CAF50; color: white; padding: 12px; border-radius: 5px; text-decoration: none; margin-top: 20px;">Ir al Inicio</a>
                            </div>
                        </body>
                    </html>
                `;
            } else {
                throw createError({
                    statusCode: 500,
                    statusMessage: 'Error al actualizar la contraseña',
                });
            }
        } else {
            throw createError({
                statusCode: 405,
                statusMessage: 'Method Not Allowed',
            });
        }
    } catch (error) {
        return `
            <!DOCTYPE html>
            <html lang="es">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cambiar Contraseña</title>
            </head>

            <body
                style="font-family: Arial, sans-serif; background-color: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
                <div
                    style="background-color: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); width: 100%; max-width: 400px;">
                    <h2 style="text-align: center; color: #333333;">Error en el servidor</h2>
                    <p style="text-align: center; color: #555555;">Lo sentimos, hubo un problema al actualizar la contraseña.</p>
                    <a href="/"
                        style="display: block; text-align: center; background-color: #FF4B4B; color: white; padding: 12px; border-radius: 5px; text-decoration: none; margin-top: 20px;">Ir
                        al Inicio</a>
                </div>
            </body>

            </html>
        `;
    }
});
