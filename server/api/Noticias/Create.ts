import { defineEventHandler, readBody } from "h3";
import { Noticia } from "../../models/Noticia";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {

    try {
        if (event.method === 'POST') {
            const body = await readBody(event);
            const noticia: Noticia = JSON.parse(body);

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Noticia>(db, 'noticias');

            const result = await collection.insertOne(noticia);

            if (result) {
                return {
                    statusCode: 201,
                    body: JSON.stringify({ Message: 'Noticia creada' }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            } else {
                return {
                    statusCode: 500,
                    body: JSON.stringify({ Message: 'Error al crear la noticia' }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            }
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