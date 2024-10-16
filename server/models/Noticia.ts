import { ObjectId } from "mongodb";

export interface Noticia {
    _id: ObjectId;
    titulo: string;
    contenido: string;
    autor: string;
    fechaPublicacion: Date;
    imagenUrl?: string;
}