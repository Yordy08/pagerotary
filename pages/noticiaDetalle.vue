<template>
    <div class="noticia-detalle">
      <h1>{{ noticia.titulo }}</h1>
      <img :src="noticia.imagen" alt="Imagen de la noticia" />
      <p>{{ noticia.contenido }}</p>
      <span>Fecha de Publicación: {{ noticia.fechaPublicacion }}</span>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute(); // Obtener la información de la ruta
  const noticia = ref({}); // Inicializar el objeto noticia
  const loading = ref(true);
  
  const fetchNoticia = async (id) => {
    try {
      const response = await fetch(`/api/Noticias/Select/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      if (data && data.body) {
        noticia.value = data.body; // Asignar los datos de la noticia
      } else {
        console.warn('No se encontró la noticia o la estructura de datos no es válida.');
      }
    } catch (error) {
      console.error('Error al obtener la noticia:', error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    const id = route.params.id; // Obtener el ID de la ruta
    if (id) {
      fetchNoticia(id); // Llamar a la función para obtener la noticia
    } else {
      console.error('ID de noticia no disponible');
    }
  });
  </script>
  
  <style scoped>
  .noticia-detalle {
    padding: 20px;
  }
  
  .noticia-detalle img {
    max-width: 100%; /* Ajustar la imagen */
    height: auto;
  }
  
  .noticia-detalle h1 {
    margin: 0;
    font-size: 2em;
  }
  </style>
  