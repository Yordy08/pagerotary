import { defineEventHandler, createError } from "h3";
import { ObjectId } from "mongodb";
import { connect, getDatabase, getCollection } from "../../utils/mongodb";
import { Noticia } from "../../models/Noticia";

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
        const collection = await getCollection<Noticia>(db, 'noticias');
        
        // Busca la noticia por ID
        const noticia = await collection.findOne({ _id: new ObjectId(id) });

        if (!noticia) {
            throw createError({
                statusCode: 404,
                statusMessage: 'noticia no encontrada',
            });
        }

        // Retorna la noticia encontrada
        return {
            statusCode: 200,
            noticia
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
