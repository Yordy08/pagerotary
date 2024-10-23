<template>
  <div class="create-noticia">
    <!-- Mensaje de éxito al crear la noticia -->
    <div v-if="successMessage" class="alert alert-success">
      <p>{{ successMessage }}</p>
      <button @click="closeAlert" class="btn btn-success">OK</button>
    </div>

    <!-- Formulario para crear una noticia -->
    <form @submit.prevent="submitNoticia">
      <div class="form-group">
        <label for="titulo">Título de la noticia</label>
        <input
          v-model="noticia.titulo"
          type="text"
          id="titulo"
          class="form-control"
          placeholder="Título de la noticia"
          required
        />
      </div>
      <div class="form-group">
        <label for="contenido">Contenido</label>
        <textarea
          v-model="noticia.contenido"
          id="contenido"
          class="form-control"
          placeholder="Contenido de la noticia"
          required
        ></textarea>
      </div>
      <div class="form-group">
        <label for="fechaPublicacion">Fecha de Publicación</label>
        <input
          v-model="noticia.fechaPublicacion"
          type="date"
          id="fechaPublicacion"
          class="form-control"
          required
        />
      </div>
      <div class="form-group">
        <label for="imagen">Imagen de la noticia (opcional)</label>
        <input type="file" @change="selectFile" id="imagen" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Crear Noticia</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Estado para el formulario de creación de noticias
const noticia = ref({
  titulo: '',
  contenido: '',
  fechaPublicacion: '',
  estado: '', // Se envía vacío por defecto
  imagenUrl: '' // Aquí se almacenará el URL de la imagen
})

// Estado para la imagen seleccionada
const selectedFile = ref(null)

// Estado para mostrar el mensaje de éxito
const successMessage = ref('')

// Función para manejar la selección de archivo
const selectFile = (event) => {
  selectedFile.value = event.target.files[0]
}

// Función para enviar el formulario directamente a la base de datos
const submitNoticia = async () => {
  try {
    // Subir la imagen primero si hay una seleccionada
    if (selectedFile.value) {
      const formData = new FormData()
      formData.append('photo', selectedFile.value)

      // Enviar la imagen al endpoint '/api/Upload/imagen'
      const imageResponse = await fetch('/api/Upload/imagen', {
        method: 'POST',
        body: formData
      })

      const imageData = await imageResponse.json()
      console.log('Imagen subida con éxito:', imageData)

      // Guardar la URL segura de la imagen en noticia.imagenUrl
      noticia.value.imagenUrl = imageData.secure_url
    }

    // Ahora enviar los datos de la noticia junto con la URL de la imagen
    const noticiaData = {
      titulo: noticia.value.titulo,
      contenido: noticia.value.contenido,
      fechaPublicacion: noticia.value.fechaPublicacion,
      estado: noticia.value.estado, // El estado se envía vacío
      imagen: noticia.value.imagenUrl // La URL de la imagen
    }

    // Enviar los datos de la noticia a la base de datos
    const response = await fetch('/api/Noticias/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noticiaData)
    })

    const data = await response.json()
    console.log('Noticia creada:', data)

    // Limpiar los campos del formulario después del envío
    noticia.value = {
      titulo: '',
      contenido: '',
      fechaPublicacion: '',
      estado: '',
      imagenUrl: ''
    }
    selectedFile.value = null

    // Mostrar el mensaje de éxito
    successMessage.value = 'La noticia fue creada correctamente.'
  } catch (error) {
    console.error('Error creando la noticia:', error)
  }
}

// Función para cerrar el mensaje de alerta
const closeAlert = () => {
  successMessage.value = ''
}
</script>

  <style scoped>
  .create-noticia {
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
  