import { defineEventHandler, createError } from "h3";
import { Comentario } from "../../models/Comentario";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'GET') {
            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Comentario>(db, 'comentarios');

            const comentarios = await collection.find({}).toArray();

            return {
                statusCode: 200,
                body: comentarios,
            };
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