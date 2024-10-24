import { defineEventHandler, createError } from "h3";
import { ObjectId } from "mongodb";
import { connect, getDatabase, getCollection } from "../../utils/mongodb";
import { Producto } from "../../models/Producto";

export default defineEventHandler(async (event) => {
    //@ts-ignore
    const { id } = event.context.params; 

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID es requerido',
        });
    }

    try {
        const client = await connect();
        const db = await getDatabase(client);
        const collection = await getCollection<Producto>(db, 'productos');
        
        // Busca el producto por ID
        const producto = await collection.findOne({ _id: new ObjectId(id) });

        if (!producto) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Producto no encontrado',
            });
        }

        // Retorna el producto encontrado
        return {
            statusCode: 200,
            producto
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: {
                Message: 'Error interno del servidor',
                Error: error,
            },
        };
    }
});