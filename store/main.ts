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
        // for initially empty lists
        userList: [] as Usuario[],
        // for data that is not yet loaded
        user: null as Usuario | null,
      }
    },
    actions: {
        saveUser(newUser: Usuario) {
            this.userList.push(newUser);
            
        },
        removeUser(userId: string) {
            this.userList = this.userList.filter(user => user._id !== userId);
           
        },
        setUser(user: Usuario) {
            this.user = user;
        },
        clearUser() {
            this.user = null;
        }
    }
  })





