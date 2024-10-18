import { defineEventHandler, readBody, createError } from "h3";
import { Noticia } from "../../models/Noticia";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';
import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'PUT') {
            const noticia: Noticia = await readBody(event);
            const { _id, ...updateData } = noticia;

            if (!_id) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'ID de la noticia es requerido',
                });
            }

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Noticia>(db, 'noticias');

            const result = await collection.updateOne(
                { _id: new ObjectId(noticia._id) },
                { $set: updateData }
            );

            if (result.modifiedCount > 0) {
                return {
                    statusCode: 200,
                    Message: 'Noticia actualizada'
                };
            } else {
                throw createError({
                    statusCode: 404,
                    statusMessage: 'Noticia no encontrada'
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