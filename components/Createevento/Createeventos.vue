<template>
    <div class="create-evento">
      <!-- Mensaje de éxito al crear el evento -->
      <div v-if="successMessage" class="alert alert-success">
        <p>{{ successMessage }}</p>
        <button @click="closeAlert" class="btn btn-success">OK</button>
      </div>
  
      <!-- Formulario para crear un evento -->
      <form @submit.prevent="submitEvento" v-if="!successMessage">
        <div class="form-group">
          <label for="nombre">Nombre del evento</label>
          <input v-model="evento.nombre" type="text" id="nombre" class="form-control" placeholder="Nombre del evento" required />
        </div>
        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea v-model="evento.descripcion" id="descripcion" class="form-control" placeholder="Descripción del evento" required></textarea>
        </div>
        <div class="form-group">
          <label for="fecha">Fecha</label>
          <input v-model="evento.fecha" type="date" id="fecha" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="ubicacion">Ubicación</label>
          <input v-model="evento.ubicacion" type="text" id="ubicacion" class="form-control" placeholder="Ubicación del evento" required />
        </div>
        <div class="form-group">
          <label for="imagen">Imagen del evento</label>
          <input type="file" @change="selectFile" id="imagen" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Crear Evento</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Estado para el formulario de creación de eventos
  const evento = ref({
    nombre: '',
    descripcion: '',
    fecha: '',
    ubicacion: ''
  })
  
  // Estado para la imagen seleccionada
  const selectedFile = ref(null)
  
  // Estado para mostrar el mensaje de éxito
  const successMessage = ref('')
  
  // Función para manejar la selección de archivo
  const selectFile = (event) => {
    selectedFile.value = event.target.files[0]
  }
  
  // Función para enviar el formulario
  const submitEvento = async () => {
    try {
      // Subir la imagen si se ha seleccionado
      let imagenUrl = ''
      if (selectedFile.value) {
        const formData = new FormData()
        formData.append('photo', selectedFile.value)
  
        const imagenResponse = await fetch('/api/Upload/imagen', {
          method: 'POST',
          body: formData
        })
  
        const imagenData = await imagenResponse.json()
        imagenUrl = imagenData.url
      }
  
      // Enviar los datos del evento
      const eventoData = {
        nombre: evento.value.nombre,
        descripcion: evento.value.descripcion,
        fecha: evento.value.fecha,
        ubicacion: evento.value.ubicacion,
        imagen: imagenUrl
      }
  
      const response = await fetch('http://localhost:3000/api/Eventos/Create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventoData)
      })
  
      const data = await response.json()
      console.log('Evento creado:', data)
  
      // Limpiar los campos del formulario
      evento.value = {
        nombre: '',
        descripcion: '',
        fecha: '',
        ubicacion: ''
      }
      selectedFile.value = null
  
      // Mostrar el mensaje de éxito
      successMessage.value = 'Su evento fue creado correctamente.'
    } catch (error) {
      console.error('Error creando el evento:', error)
    }
  }
  
  // Función para cerrar el mensaje de alerta
  const closeAlert = () => {
    successMessage.value = ''
  }
  </script>
  
  <style scoped>
  .create-evento {
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
  