import { defineEventHandler, readBody, createError } from "h3";
import { ObjectId } from "mongodb";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'DELETE') {
            const { _id } = await readBody(event);

            if (!ObjectId.isValid(_id)) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'Invalid ID format',
                });
            }

            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection(db, 'usuarios');

            const result = await collection.deleteOne({ _id: new ObjectId(_id) });

            if (result.deletedCount === 1) {
                return {
                    statusCode: 200,
                    Message: 'Usuario eliminado'
                };
            } else {
                throw createError({
                    statusCode: 404,
                    statusMessage: 'Usuario no encontrado'
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