import { defineEventHandler, readBody, createError } from "h3";
import { Producto } from "../../models/Producto";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';
import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'PUT') {
            const producto: Producto = await readBody(event);
            const { _id, ...updateData } = producto;

            if (!_id) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'ID del producto es requerido',
                });
            }

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Producto>(db, 'productos');

            const result = await collection.updateOne(
                { _id: new ObjectId(_id) },
                { $set: updateData }
            );

            if (result.modifiedCount > 0) {
                return {
                    statusCode: 200,
                    Message: 'Producto actualizado'
                };
            } else {
                throw createError({
                    statusCode: 404,
                    statusMessage: 'Producto no encontrado'
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