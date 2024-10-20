import { defineEventHandler, createError } from "h3";
import { ObjectId } from "mongodb";
import { connect, getDatabase, getCollection } from "../../utils/mongodb";
import { Evento } from "../../models/Evento";

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
        const collection = await getCollection<Evento>(db, 'eventos');
        
        // Busca la Eevento por ID
        const Eevento = await collection.findOne({ _id: new ObjectId(id) });

        if (!Eevento) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Eevento no encontrado',
            });
        }

        // Retorna la Eevento encontrada
        return {
            statusCode: 200,
            Eevento
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
