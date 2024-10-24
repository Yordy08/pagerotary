import { ObjectId } from "mongodb";

export interface Producto {
    _id: ObjectId;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagen: string;
    telefono: string;
}