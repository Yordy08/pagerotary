import { ObjectId } from "mongodb";

export interface Usuario {
    _id: ObjectId;
    nombre: string;
    correo: string;
    contraseña: string;
    fechaCreacion: Date;
}