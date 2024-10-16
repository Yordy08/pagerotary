import { ObjectId } from "mongodb";

export interface Usuario {
    _id: ObjectId;
    nombre: string;
    correo: string;
    contraseña: string;
    telefono: string;
    fechaCreacion: Date;
    estado: 'activo' | 'inactivo' | 'retirado';
    rol: 'admin' | 'usuario' | 'editor';
}