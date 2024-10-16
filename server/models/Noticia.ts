import { ObjectId } from "mongodb";

export interface Noticia {
    _id: ObjectId;
    titulo: string;
    contenido: string;
    imagen?: string;
    estado: 'activo' | 'inactivo';
    fechaPublicacion: Date;
}
