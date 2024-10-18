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
        <div class="modal-header" :style="{ backgroundColor: '#F2A922' }">
          <h5 class="modal-title">Actualizar Usuario</h5>
          <button type="button" class="close" @click="closeModal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body" :style="{ backgroundColor: '#F2A922' }">
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
            <button type="submit" class="btn btn-primary">Actualizar</button>
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      try {
        await fetch(`http://localhost:3000/api/Usuarios/Delete/${id}`, {
          method: 'DELETE',
        });
        await this.fetchUsuarios();
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
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
  text-align: left; /* Cambiado para alinear el texto a la izquierda */
}

.table td button {
  margin-right: 10px;
}

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
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px; /* Limita el ancho del modal */
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
</style>
