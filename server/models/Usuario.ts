import { ObjectId } from "mongodb";

export interface Usuario {
    id: ObjectId;
    nombre: string;
    correo: string;
    contraseña: string;
    fechaCreacion: Date;
}