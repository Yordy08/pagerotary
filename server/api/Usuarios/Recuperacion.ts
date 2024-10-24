import { defineEventHandler, readBody, createError } from "h3";
import { connect, getDatabase, getCollection } from "../../utils/mongodb";
import transporter from "../../utils/NodeMailer";
import { Usuario } from "../../models/Usuario";

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    try {
        if (event.method !== 'POST') {
            throw createError({
                statusCode: 405,
                statusMessage: 'Method Not Allowed',
            });
        }

        const { correo } = await readBody(event);
        if (!correo) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Correo es requerido',
            });
        }

        const client = await connect();
        const db = await getDatabase(client);
        const collection = await getCollection<Usuario>(db, 'usuarios');

        const usuario = await collection.findOne({ correo });

        if (!usuario) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Usuario no encontrado',
            });
        }

        // Create a reset password link
        const resetLink = `${config.public.PUBLIC_URL}/api/reset-password/${usuario._id}`;

        // Send email with reset link using nodemailer
        await transporter.sendMail({
            from: config.CORREO,
            to: usuario.correo,
            subject: "Recuperación de contraseña",
            html: `
              <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <div style="background-color: #4CAF50; padding: 20px; text-align: center;">
                        <h1 style="color: #ffffff; font-size: 24px;">Recuperación de Contraseña</h1>
                    </div>
                    <div style="padding: 20px; text-align: center;">
                        <h2 style="color: #333333; font-size: 20px;">Hola, ${usuario.nombre}</h2>
                        <p style="color: #555555; font-size: 16px;">
                            Parece que solicitaste un cambio de contraseña. Haz clic en el siguiente botón para cambiar tu contraseña:
                        </p>
                        <a href="${resetLink}" style="display: inline-block; background-color: #4CAF50; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 16px; margin-top: 20px;">
                            Cambiar contraseña
                        </a>
                        <p style="color: #999999; font-size: 14px; margin-top: 30px;">
                            Si no solicitaste este cambio, por favor ignora este correo.
                        </p>
                    </div>
                    <div style="background-color: #f4f4f4; padding: 10px; text-align: center; color: #888888; font-size: 12px;">
                        
                    </div>
                </div>
            </div>

            `,
        });

        return {
            statusCode: 200,
            message: 'Correo de recuperación enviado exitosamente',
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: 'Error en el servidor',
            error: error,
        };
    }
});
