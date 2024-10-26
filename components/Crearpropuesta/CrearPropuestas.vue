<template>
  <div class="create-propuesta">
    <!-- Mensaje de éxito al crear la propuesta -->
    <div v-if="successMessage" class="alert alert-success">
      <p>{{ successMessage }}</p>
      <button @click="closeAlert" class="btn btn-success">OK</button>
    </div>

    <!-- Formulario para crear una propuesta -->
    <form @submit.prevent="submitPropuesta">
      <div class="form-group">
        <label for="usuarioId">Usuario</label>
        <input
          v-model="propuesta.autor"
          type="text"
          id="usuarioId"
          class="form-control"
          placeholder="ID del Usuario"
          required
          disabled
        />
      </div>
      <div class="form-group">
        <label for="titulo">Título de la propuesta</label>
        <input
          v-model="propuesta.titulo"
          type="text"
          id="titulo"
          class="form-control"
          placeholder="Título de la propuesta"
          required
        />
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción</label>
        <textarea
          v-model="propuesta.descripcion"
          id="descripcion"
          class="form-control"
          placeholder="Descripción de la propuesta"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="ubicacion">Ubicación</label>
        <input
          v-model="propuesta.ubicacion"
          type="text"
          id="ubicacion"
          class="form-control"
          placeholder="Ubicación de la propuesta"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Crear Propuesta</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {useUserStore} from '~/store/main'

onMounted(() => {
  const userStore = useUserStore()
  propuesta.value.usuarioId = userStore.getUser()._id
  propuesta.value.autor = userStore.getUser().nombre

})
// Estado para el formulario de creación de propuestas
const propuesta = ref({
  usuarioId: '',
  autor: '',
  votos: 0,
  titulo: '',
  descripcion: '',
  ubicacion: '',
  UsuarioVoto: []
})

// Estado para mostrar el mensaje de éxito
const successMessage = ref('')

// Función para enviar el formulario directamente a la base de datos
const submitPropuesta = async () => {
  try {
    // Datos de la propuesta
    const propuestaData = {
      usuarioId: propuesta.value.usuarioId,
      autor: propuesta.value.autor,
      votos: propuesta.value.votos,
      titulo: propuesta.value.titulo,
      descripcion: propuesta.value.descripcion,
      ubicacion: propuesta.value.ubicacion,
      UsuarioVoto: propuesta.value.UsuarioVoto
    }

    // Enviar los datos de la propuesta a la base de datos
    const response = await fetch('/api/Propuestas/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(propuestaData)
    })

    const data = await response.json()
    console.log('Propuesta creada:', data)

    // Limpiar los campos del formulario después del envío
    propuesta.value.titulo = '';
    propuesta.value.descripcion = '';
    propuesta.value.ubicacion = '';
    propuesta.value.votos = 0;

    // Mostrar el mensaje de éxito
    successMessage.value = 'La propuesta fue creada correctamente.'
  } catch (error) {
    console.error('Error creando la propuesta:', error)
  }
}

// Función para cerrar el mensaje de alerta
const closeAlert = () => {
  successMessage.value = ''
}
</script>

<style scoped>
.create-propuesta {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

/* Estilos para la alerta de éxito */
.alert {
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-success .btn {
  background-color: #28a745;
}

.alert-success .btn:hover {
  background-color: #218838;
}
</style>