import { defineEventHandler, readBody } from "h3";
import { Propuesta } from "../../models/Propuesta";
import { connect, getDatabase, getCollection } from '../../utils/mongodb';
import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
    try {
        if (event.method === 'POST') {
            const propuesta: Propuesta = await readBody(event);
            const { usuarioId } = propuesta;
            propuesta.UsuarioVoto = [];
            propuesta.votos = 0;
            const client = await connect();
            const db = await getDatabase(client);
            const collection = await getCollection<Propuesta>(db, 'propuestas');
            const collectionUser = await getCollection(db, 'usuarios');
            
            const user = await collectionUser.findOne({ _id: new ObjectId(usuarioId) });

            if (!user) {
                return {
                    statusCode: 404,
                    body: { Message: 'Usuario no encontrado' }
                };
            }


            const result = await collection.insertOne(propuesta);

            if (result.insertedId) {
                return {
                    statusCode: 201,
                    Message: 'propuesta creado'
                };
            } else {
                throw createError({
                    statusCode: 500,
                    statusMessage: 'Error al crear el propuesta'
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