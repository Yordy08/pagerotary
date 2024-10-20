import { defineEventHandler, readBody, createError } from "h3";
import bcrypt from "bcrypt";
import { Usuario } from "../../models/Usuario";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {

    try {
        if (event.method !== 'POST') {
            throw createError({
                statusCode: 405,
                statusMessage: 'Method Not Allowed',
            });
        }

        const { correo, contraseña } = await readBody(event);

        if (!correo || !contraseña) {
            return {
                statusCode: 400,
                message: 'Correo y contraseña son requeridos',
            };
        }

        const client = await connect();
        const db = await getDatabase(client);
        const collection = await getCollection<Usuario>(db, 'usuarios');

        const usuario = await collection.findOne({ correo });
        if (!usuario) {
            return {
                statusCode: 401,
                message: 'Usuario no encontrado o credenciales incorrectas',
            };
        }

        const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!isPasswordValid) {
            return {
                statusCode: 401,
                message: 'Contraseña incorrecta',
            };
        }

        return {
            statusCode: 200,
            message: 'Login exitoso',
            usuario,
        };

    } catch (error) {

        return {
            statusCode: 500,
            message: 'Error interno del servidor',
            error: error,
        };
    }
});
