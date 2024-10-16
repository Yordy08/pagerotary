import { ObjectId } from "mongodb";

export interface Comentario {
    _id: ObjectId;
    usuarioId: string;
    propuestaId: string;
    descripcion: string;
    like: number;
}