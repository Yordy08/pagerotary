import { defineEventHandler } from "h3";
import { Noticia } from "../../models/Noticia";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'GET') {
            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Noticia>(db, 'noticias');

            const noticias = await collection.find().toArray();

            return {
                statusCode: 200,
                body: JSON.stringify(noticias),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }
        
        throw createError({
            statusCode: 405,
            statusMessage: 'Method Not Allowed',
        });

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ Message: 'Error interno del servidor', Error: error }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
});