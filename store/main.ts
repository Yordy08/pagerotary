// store/main.ts
import { defineStore } from "pinia";

export interface Usuario {
    _id: string;
    nombre: string;
    correo: string;
    contraseña: string;
    telefono: string;
    fechaCreacion: Date;
    estado: 'activo' | 'inactivo' | 'retirado';
    rol: 'admin' | 'usuario' | 'editor';
}

export const useUserStore = defineStore('user', {
    state: () => {
      return {
        user: null as Usuario | null,
      }
    },
    actions: {
      
        setUser(user: Usuario) {
            this.user = user;
            if (import.meta.client) {
                localStorage.setItem('user', JSON.stringify(user));
            }
        },
        clearUser() {
            this.user = null;
            if (import.meta.client) {
                localStorage.removeItem('user');
            }
        },
        getUser() {
            if (import.meta.client) {
            const user = localStorage.getItem('user');
            if (user) {
                this.user = JSON.parse(user);
                return this.user;
            }
        }
        }
    }
  })

 





