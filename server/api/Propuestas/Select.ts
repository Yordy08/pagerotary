import { defineEventHandler, createError } from "h3";
import { Propuesta } from "../../models/Propuesta";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'GET') {
            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Propuesta>(db, 'propuestas');

            const propuestas = await collection.find({}).toArray();

            return {
                statusCode: 200,
                body: propuestas,
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