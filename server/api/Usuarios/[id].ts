import { defineEventHandler, createError } from "h3";
import { ObjectId } from "mongodb";
import { connect, getDatabase, getCollection } from "../../utils/mongodb";
import { Usuario } from "../../models/Usuario";

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
        const collection = await getCollection<Usuario>(db, 'usuarios');
        
        // Busca la Usuario por ID
        const Usuario = await collection.findOne({ _id: new ObjectId(id) });

        if (!Usuario) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Usuario no encontrado',
            });
        }

        // Retorna la Usuario encontrada
        return {
            statusCode: 200,
            Usuario
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
