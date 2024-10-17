import { defineEventHandler, readBody, createError } from "h3";
import { Comentario } from "../../models/Comentario";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'PUT') {
            const comentario: Comentario = await readBody(event);

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Comentario>(db, 'comentarios');

            const result = await collection.updateOne(
                { _id: comentario._id },
                { $set: comentario }
            );

            if (result.modifiedCount > 0) {
                return {
                    statusCode: 200,
                    body: { Message: 'Comentario actualizado' }
                };
            } else {
                return {
                    statusCode: 404,
                    body: { Message: 'Comentario no encontrado' }
                };
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
            body: { Message: 'Error interno del servidor', Error: error }
        };
    }
});