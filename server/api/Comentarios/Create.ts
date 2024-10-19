import { defineEventHandler, readBody } from "h3";
import { Comentario } from "../../models/Comentario";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';
import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    try {
        if (event.method !== 'POST') {
            throw createError({
                statusCode: 405,
                statusMessage: 'Method Not Allowed',
            });
        }

        const comentario: Comentario = await readBody(event);
        const { usuarioId, propuestaId, descripcion, like } = comentario;

        if (!usuarioId || !propuestaId || !descripcion || like === undefined) {
            return {
                statusCode: 400,
                body: { Message: 'Datos incompletos' }
            };
        }

        const client = await connect();
        const db = await getDatabase(client);
        const collection = await getCollection<Comentario>(db, 'comentarios');
        const collectionUser = await getCollection(db, 'usuarios');
        const collectionPropuesta = await getCollection(db, 'propuestas');

        const user = await collectionUser.findOne({ _id: new ObjectId(usuarioId) });

        if (!user) {
            return {
                statusCode: 404,
                body: { Message: 'Usuario no encontrado' }
            };
        }

        const result = await collection.insertOne(comentario);

        if (result.insertedId) {
            return {
                statusCode: 201,
                Message: 'Comentario creado'
            };
        } else {
            throw createError({
                statusCode: 500,
                statusMessage: 'Error al crear el comentario'
            });
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: { Message: 'Error interno del servidor', Error: error },
        };
    }
});