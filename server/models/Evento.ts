import { ObjectId } from "mongodb";

export interface Evento {
    _id: ObjectId;
    nombre: string;
    imagen?: string;
    descripcion: string;
    fecha: Date;
    ubicacion: string;
    /* userId: string; */
}