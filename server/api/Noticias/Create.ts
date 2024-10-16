import { defineEventHandler, readBody } from "h3";
import { Noticia } from "../../models/Noticia";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {

    try {
        if (event.method === 'POST') {
            
            const noticia: Noticia = await readBody(event);

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Noticia>(db, 'noticias');

            const result = await collection.insertOne(noticia);

            if (result.insertedId) {
                return {
                  statusCode: 201,
                  Message: 'Noticia creada'
                };
              } else {
                throw createError({
                  statusCode: 500,
                  statusMessage: 'Error al crear la noticia'
                });
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
            body: { Message: 'Error interno del servidor', Error: error },
        
        };
    }
});