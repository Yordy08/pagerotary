import { defineEventHandler, readBody } from "h3";
import { Noticia } from "../../models/Noticia";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'PUT') {
            const body = await readBody(event);
            const noticia: Noticia = JSON.parse(body);

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Noticia>(db, 'noticias');

            const result = await collection.updateOne(
                { _id: noticia._id },
                { $set: noticia }
            );

            if (result.modifiedCount > 0) {
                return {
                    statusCode: 200,
                    body: { Message: 'Noticia actualizada' }
                };
            } else {
                return {
                    statusCode: 404,
                    body:{ Message: 'Noticia no encontrada' }
                };
            }
        }else{
            throw createError({
                statusCode: 405,
                statusMessage: 'Method Not Allowed',
            });
        }

    } catch (error) {
        return {
            statusCode: 500,
            body:{ Message: 'Error interno del servidor', Error: error }
        };
    }
});