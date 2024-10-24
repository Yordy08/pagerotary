import { defineEventHandler } from "h3";
import { Producto } from "../../models/Producto";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'GET') {
            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Producto>(db, 'productos');

            const productos = await collection.find().toArray();

            return {
                statusCode: 200,
                body: productos,
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
            body: { Message: 'Error interno del servidor', Error: error }
        };
    }
});