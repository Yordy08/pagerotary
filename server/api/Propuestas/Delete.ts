import { defineEventHandler, readBody } from "h3";
import { Propuesta } from "../../models/Propuesta";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';
import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'DELETE') {

            const { _id } = await readBody(event);

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Propuesta>(db, 'propuestas');

            const result = await collection.deleteOne({ _id: new ObjectId(_id) });

            if (result.deletedCount === 1) {
                return {
                    statusCode: 200,
                    body: { Message: 'Propuesta eliminada' }
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