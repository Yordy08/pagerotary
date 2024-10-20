import { defineEventHandler, readBody, createError } from "h3";
import { ObjectId } from "mongodb";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';
import { Usuario } from "../../models/Usuario";
import { Evento } from "../../models/Evento";
import { Propuesta } from "../../models/Propuesta";
import { Comentario } from "../../models/Comentario";

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

            const collection = await getCollection<Usuario>(db, 'usuarios');
            const colectionEvent = await getCollection<Evento>(db, 'eventos');
            const colectionPropuesta = await getCollection<Propuesta>(db, 'propuestas');
            const colectionComentario = await getCollection<Comentario>(db, 'comentarios');

            // Delete related documents from other collections
            await Promise.all([
                colectionEvent.deleteMany({ userId: _id }),
                colectionPropuesta.deleteMany({ usuarioId: _id }),
                colectionComentario.deleteMany({ usuarioId: _id })
            ]);

            // Delete the user
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