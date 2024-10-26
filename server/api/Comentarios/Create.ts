import { defineEventHandler, readBody } from "h3";
import { Comentario } from "../../models/Comentario";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';
import { ObjectId } from "mongodb";
import { Propuesta } from "~/server/models/Propuesta";
import { Usuario } from "~/server/models/Usuario";

export default defineEventHandler(async (event) => {
    try {
        if (event.method !== 'POST') {
            throw createError({
                statusCode: 405,
                statusMessage: 'Method Not Allowed',
            });
        }

        const comentario: Comentario = await readBody(event);
        comentario.UsuarioLike = [];
        comentario.like = 0;
        const { usuarioId, propuestaId, descripcion,  usuarioNombre } = comentario;

        if (!usuarioId || !propuestaId || !descripcion || !usuarioNombre) {
            return {
                statusCode: 400,
                body: { Message: 'Datos incompletos' }
            };
        }

        const client = await connect();
        const db = await getDatabase(client);
        const collection = await getCollection<Comentario>(db, 'comentarios');
        const collectionUser = await getCollection<Usuario>(db, 'usuarios');
        const collectionPropuesta =  await getCollection<Propuesta>(db, 'propuestas');

        const user = await collectionUser.findOne({ _id: new ObjectId(usuarioId) });
        if (!user) {
            return {
                statusCode: 404,
                body: { Message: 'Usuario no encontrada' }
            };
        }

        const propuesta = await collectionPropuesta.findOne({_id:new ObjectId(propuestaId)})
        if (!propuesta) {
            return {
                statusCode: 404,
                body: { Message: 'Propuesta no encontrada' }
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