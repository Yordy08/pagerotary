import { defineEventHandler, readBody } from "h3";
import { Producto } from "../../models/Producto";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'POST') {
            const producto: Producto = await readBody(event);

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Producto>(db, 'productos');

            const result = await collection.insertOne(producto);

            if (result.insertedId) {
                return {
                    statusCode: 201,
                    Message: 'Producto creado'
                };
            } else {
                throw createError({
                    statusCode: 500,
                    statusMessage: 'Error al crear el producto'
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