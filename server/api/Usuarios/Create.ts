import { defineEventHandler, readBody, createError } from "h3";
import bcrypt from "bcrypt";
import { Usuario } from "../../models/Usuario";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'POST') {
            const usuario: Usuario = await readBody(event);

            // Encrypt the password
            const saltRounds = 10;
            usuario.contraseña = await bcrypt.hash(usuario.contraseña, saltRounds);

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Usuario>(db, 'usuarios');
            
            const result = await collection.insertOne(usuario);

            if (result.insertedId) {
                return {
                    statusCode: 201,
                    Message: 'Usuario creado'
                };
            } else {
                throw createError({
                    statusCode: 500,
                    statusMessage: 'Error al crear el usuario'
                });
            }
        } else {
            throw createError({
                statusCode: 405,
                statusMessage: 'Method Not Allowed',
            });
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: { Message: 'Error interno del servidor', Error: error },
        };
    }
});