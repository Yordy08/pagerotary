<template>
  <div class="container mt-5">
    <h1 class="mb-4">Lista de Usuarios</h1>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id" :style="{ backgroundColor: '#F2A922' }">
            <td>
              <strong>Nombre:</strong> {{ usuario.nombre }}
            </td>
            <td>
              <strong>Correo:</strong> {{ usuario.correo }}
            </td>
            <td>
              <strong>Teléfono:</strong> {{ usuario.telefono }}
            </td>
            <td>
              <strong>Estado:</strong> {{ usuario.estado }}
            </td>
            <td class="text-center">
              <button class="btn btn-info btn-sm mr-2" @click="openModal(usuario)">
                <i class="fas fa-edit"></i> Actualizar
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteUsuario(usuario.id)">
                <i class="fas fa-trash-alt"></i> Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para Actualizar Usuario -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Actualizar Usuario</h5>
          <button type="button" class="close" @click="closeModal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateUsuario">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input v-model="usuarioForm.nombre" type="text" class="form-control" placeholder="Nombre" required />
            </div>
            <div class="form-group">
              <label for="correo">Correo</label>
              <input v-model="usuarioForm.correo" type="email" class="form-control" placeholder="Correo" required />
            </div>
            <div class="form-group">
              <label for="contraseña">Contraseña</label>
              <input v-model="usuarioForm.contraseña" type="password" class="form-control" placeholder="Contraseña" required />
            </div>
            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input v-model="usuarioForm.telefono" type="tel" class="form-control" placeholder="Teléfono" required />
            </div>
            <div class="form-group">
              <label for="estado">Estado</label>
              <input v-model="usuarioForm.estado" type="text" class="form-control" placeholder="Estado" required />
            </div>
            <div class="form-group">
              <label for="rol">Rol</label>
              <input v-model="usuarioForm.rol" type="text" class="form-control" placeholder="Rol" required />
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Actualizar</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Listar",
  data() {
    return {
      usuarios: [],
      showModal: false,
      usuarioForm: {
        id: null,
        nombre: '',
        correo: '',
        contraseña: '',
        telefono: '',
        fechaCreacion: '',
        estado: '',
        rol: ''
      }
    }
  },
  async mounted() {
    await this.fetchUsuarios();
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await fetch('http://localhost:3000/api/Usuarios/Select', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        if (data && Array.isArray(data.body)) {
          this.usuarios = data.body;
        }
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    },

    openModal(usuario) {
      this.usuarioForm = { ...usuario };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.usuarioForm = {
        id: null,
        nombre: '',
        correo: '',
        contraseña: '',
        telefono: '',
        fechaCreacion: '',
        estado: '',
        rol: ''
      };
    },

    async deleteUsuario(id) {
      console.log("Intentando eliminar el usuario con ID:", id);
      
      if (!id) {
        console.error("ID del usuario es undefined. No se puede eliminar.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/Usuarios/Delete/${id}`, {
          method: 'DELETE',
        });

        console.log(`Respuesta del servidor: ${response.status} ${response.statusText}`);
        
        if (response.ok) {
          console.log(`Usuario con ID: ${id} eliminado correctamente.`);
          await this.fetchUsuarios(); // Actualiza la lista de usuarios
        } else {
          const errorMessage = await response.text();
          console.error(`Error al eliminar el usuario. Código de estado: ${response.status}, Mensaje: ${response.statusText}, Detalle: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error al intentar eliminar el usuario:', error);
      }
    },

    async updateUsuario() {
      try {
        await fetch('http://localhost:3000/api/Usuarios/Update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.usuarioForm),
        });
        this.closeModal();
        await this.fetchUsuarios();
      } catch (error) {
        console.error('Error al actualizar usuario:', error);
      }
    }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  margin-top: 20px;
}

.table td {
  padding: 15px;
  text-align: left; 
}

.table td button {
  margin-right: 10px;
}


/* modal actualizar  */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Asegura que el modal esté por encima de la tabla */
}

.modal-content {
  background: white;
  padding: 10px;
  border-radius: 1px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* Limita el ancho del modal */
  height: auto;
}

.modal-header,
.modal-body {
  color: #000; /* Cambia el color del texto a negro para mayor contraste */
}

@media (max-width: 768px) {
  .table {
    font-size: 0.9em; /* Reduce el tamaño de la fuente en dispositivos móviles */
  }

  .table td {
    display: block; /* Cada celda ocupa toda la línea */
    border: none; /* Eliminar borde en modo móvil */
  }

  .table td strong {
    display: inline; /* Muestra la etiqueta en línea */
  }

  .table td button {
    width: 100%; /* Botones ocupan todo el ancho */
    margin: 5px 0; /* Espacio entre botones */
  }
}


.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
 
}

.form-control {
  width: 93%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
  font-size: 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  color: #333;
}

.form-control:hover {
  background-color: #fafafa;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

.form-control:focus {
  border-color: #ff9800;
  background-color: #fff;
  outline: none;
  box-shadow: 0 0 10px rgba(255, 152, 0, 0.4);
}

button {
  padding: 8px 15px; /* Hacemos los botones más compactos */
  border: none;
  border-radius: 6px;
  font-size: 0.9rem; /* Ajustamos el tamaño de los botones */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button.btn-primary {
  background-color: #4CAF50;
  color: white;
}

button.btn-primary:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

button.btn-secondary {
  background-color: #f44336;
  color: white;
}

button.btn-secondary:hover {
  background-color: #e53935;
  transform: scale(1.05);
}

/* Modal header */
.modal-header {
  background-color: #ff9800;
  color: white;
  padding: -10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.5rem;
}

.close {
  font-size: 1.5rem;
  cursor: pointer;
}

.close:hover {
  color: #fdd835;
}

/* Modal body */
.modal-body {
  background-color: #ffe0b2;
  padding: 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* Animation on focus */
@keyframes glowingBorder {
  0% {
    border-color: #ff9800;
  }
  50% {
    border-color: #ffa726;
  }
  100% {
    border-color: #ff9800;
  }
}

.form-control:focus {
  animation: glowingBorder 1.5s infinite;
}

/* Ajuste para pantallas pequeñas */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
}

</style>
