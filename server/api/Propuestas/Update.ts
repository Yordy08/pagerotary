import { defineEventHandler, readBody, createError } from "h3";
import { Propuesta } from "../../models/Propuesta";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';
import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'PUT') {
            const Propuesta: Propuesta = await readBody(event);
            const { _id, usuarioId, ...UpdataData } = Propuesta;

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Propuesta>(db, 'propuestas');

            const result = await collection.updateOne( { _id: new ObjectId(_id) }, { $set: UpdataData });

            if (result.modifiedCount > 0) {
                return {
                    statusCode: 200,
                    body: { Message: 'Propuesta actualizada' }
                };
            } else {
                return {
                    statusCode: 404,
                    body: { Message: 'Propuesta no encontrada' }
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