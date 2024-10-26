import { ObjectId } from "mongodb";

export interface Propuesta {
    _id: ObjectId;
    usuarioId: string;
    autor: string;
    votos: number;
    titulo: string;
    descripcion: string;
    ubicacion: string;
    UsuarioVoto?: string[];
}