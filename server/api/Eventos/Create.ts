import { defineEventHandler, readBody } from "h3";
import { Evento } from "../../models/Evento";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';
import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'POST') {
            const evento: Evento = await readBody(event);
            /* const { userId} = evento; */
            
            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Evento>(db, 'eventos');
           /*  const collectionUser = await getCollection(db, 'usuarios');
            
            const user = await collectionUser.findOne({ _id: new ObjectId(userId) });

            if (!user) {
                return {
                    statusCode: 404,
                    body: { Message: 'Usuario no encontrado' }
                };
            } */


            const result = await collection.insertOne(evento);

            if (result.insertedId) {
                return {
                    statusCode: 201,
                    Message: 'Evento creado'
                };
            } else {
                throw createError({
                    statusCode: 500,
                    statusMessage: 'Error al crear el evento'
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