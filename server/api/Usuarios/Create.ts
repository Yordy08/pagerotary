import { defineEventHandler, readBody, createError } from "h3";
import { Usuario } from "../../models/Usuario";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'POST') {
            const usuario: Usuario = await readBody(event);

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Usuario>(db, 'usuarios');
            //encrypt password falta
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