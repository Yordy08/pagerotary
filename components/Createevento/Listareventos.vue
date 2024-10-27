<template>
  <div class="container mt-5">
      <h1 class="mb-4">Lista de Eventos</h1>
      <div class="table-responsive">
          <table class="table table-striped table-bordered">
              <tbody>
                  <tr v-for="evento in eventos" :key="evento._id" :style="{ backgroundColor: '#F2A922' }">
                      <td><strong>Título:</strong> {{ evento.titulo }}</td>
                      <td><strong>Descripción:</strong> {{ evento.descripcion }}</td>
                      <td><strong>Fecha:</strong> {{ evento.fecha }}</td>
                      <td><strong>Ubicación:</strong> {{ evento.ubicacion }}</td>
                      <td class="text-center">
                          <button class="btn btn-info btn-sm mr-2" @click="openModal(evento)">
                              <i class="fas fa-edit"></i> Actualizar
                          </button>
                          <button class="btn btn-danger btn-sm" @click="deleteEvento(evento._id)">
                              <i class="fas fa-trash-alt"></i> Eliminar
                          </button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>

      <!-- Modal para Actualizar Evento -->
      <div v-if="showModal" class="modal-overlay">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Actualizar Evento</h5>
                  <button type="button" class="close" @click="closeModal">
                      <span>&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  <form @submit.prevent="updateEvento">
                      <div class="form-group">
                          <label for="titulo">Título</label>
                          <input v-model="eventoForm.titulo" type="text" class="form-control" placeholder="Título" required />
                      </div>
                      <div class="form-group">
                          <label for="descripcion">Descripción</label>
                          <textarea v-model="eventoForm.descripcion" class="form-control" placeholder="Descripción" required></textarea>
                      </div>
                      <div class="form-group">
                          <label for="fecha">Fecha</label>
                          <input v-model="eventoForm.fecha" type="date" class="form-control" required />
                      </div>
                      <div class="form-group">
                          <label for="ubicacion">Ubicación</label>
                          <input v-model="eventoForm.ubicacion" type="text" class="form-control" placeholder="Ubicación" required />
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

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '~/store/main';

const eventos = ref([]);
const showModal = ref(false);
const eventoForm = ref({
  _id: null,
  titulo: '',
  descripcion: '',
  fecha: '',
  ubicacion: '',
  usuarioId: '',
  autor: ''
});

const userStore = useUserStore();

const fetchEventos = async () => {
  try {
      const response = await fetch('/api/Eventos/Select', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const data = await response.json();
      if (data && Array.isArray(data.body)) {
          eventos.value = data.body;
      }
  } catch (error) {
      console.error('Error al obtener eventos:', error);
  }
};

const openModal = (evento) => {
  eventoForm.value = { ...evento };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  resetForm();
};

const resetForm = () => {
  eventoForm.value = {
      _id: null,
      titulo: '',
      descripcion: '',
      fecha: '',
      ubicacion: '',
      usuarioId: '',
      autor: ''
  };
};

const deleteEvento = async (id) => {
  if (!id) {
      console.log("ID del evento es undefined. No se puede eliminar.");
      return;
  }
  try {
      const response = await fetch(`/api/Eventos/Delete`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _id: id }),
      });

      if (response.ok) {
          await fetchEventos();
      }
  } catch (error) {
      console.error('Error al intentar eliminar el evento:', error);
  }
};

const updateEvento = async () => {
  try {
      await fetch('/api/Eventos/Update', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventoForm.value),
      });
      closeModal();
      await fetchEventos();
  } catch (error) {
      console.error('Error al actualizar evento:', error);
  }
};

onMounted(async () => {
  eventoForm.value.usuarioId = userStore.getUser()._id;
  eventoForm.value.autor = userStore.getUser().nombre;
  await fetchEventos();
});
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
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    width: 100%;
  }
  
  .modal-header {
    background-color: #ff9800;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  
  .close {
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button.btn-primary {
    background-color: #4CAF50;
    color: white;
  }
  
  button.btn-secondary {
    background-color: #f44336;
    color: white;
  }
  
  @media (max-width: 768px) {
    .table {
      font-size: 0.9em;
    }
  
    .table td {
      display: block;
      border: none;
    }
  
    .table td button {
      width: 100%;
      margin: 5px 0;
    }
  }
  </style>
  