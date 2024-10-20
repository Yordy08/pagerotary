import { defineEventHandler, createError } from "h3";
import { ObjectId } from "mongodb";
import { connect, getDatabase, getCollection } from "../../utils/mongodb";
import { Propuesta } from "../../models/Propuesta";

export default defineEventHandler(async (event) => {
    //@ts-ignoretsignore
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
        const collection = await getCollection<Propuesta>(db, 'propuestas');
        
        // Busca la propuesta por ID
        const propuesta = await collection.findOne({ _id: new ObjectId(id) });

        if (!propuesta) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Propuesta no encontrada',
            });
        }

        // Retorna la propuesta encontrada
        return {
            statusCode: 200,
            propuesta
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
