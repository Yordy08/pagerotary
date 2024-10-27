<template>
   <div class="container">
     <Nav />
     <br>
     <br>
     <br>
     <br>
     <br>
     <br>
   
  
  <div class="noticia">
  
    <div class="container">
      <h1>{{ noticia.titulo }}</h1>
      <div class="noticia-contenido">
        <p>{{ noticia.contenido }}</p>
        <p><strong>Fecha de Publicación:</strong> {{ noticia.fechaPublicacion }}</p>
        <div v-if="noticia.imagen" class="noticia-imagen">
          <img :src="noticia.imagen" alt="Imagen de la noticia" />
        </div>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="loading" class="loading">Cargando...</div>
    </div>
   
  </div>
  <b></b><b></b><b></b><b></b><b></b><b></b>
  <Footer />
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const noticia = ref({});
    const loading = ref(true);
    const error = ref(null);
    const route = useRoute();
    const noticiaId = route.params.id;

    const getNoticia = async (id) => {
      try {
        const response = await fetch(`/api/Noticias/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener noticia: ' + response.statusText);
        }
        const data = await response.json();
        if (data.noticia) {
          noticia.value = {
            titulo: data.noticia.titulo,
            contenido: data.noticia.contenido,
            fechaPublicacion: data.noticia.fechaPublicacion,
            imagen: data.noticia.imagen,
          };
        } else {
          error.value = 'Noticia no encontrada.';
        }
      } catch (error) {
        console.error('Error al obtener noticia:', error);
        error.value = 'Error al cargar la noticia. Inténtalo más tarde.';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      getNoticia(noticiaId);
    });

    return {
      noticia,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.noticia {
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  padding: 20px;
  margin: 0 auto;
  border-radius: 10px;
  max-width: 800px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in-out;
}

.container {
  animation: slideIn 0.5s ease-in-out;
}

h1 {
  color: #343a40;
  font-size: 2em;
  margin-bottom: 15px;
}

.noticia-contenido {
  margin-bottom: 20px;
}

.noticia-imagen {
  text-align: center;
  margin: 20px 0;
}

.noticia-imagen img {
  max-width: 100%; /* Asegura que la imagen no sea más grande que su contenedor */
  height: auto; /* Mantiene la proporción de la imagen */
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.noticia-imagen img:hover {
  transform: scale(1.05); /* Efecto de zoom en la imagen al pasar el ratón */
}

.error {
  color: red;
  font-weight: bold;
}

.loading {
  color: #007bff;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
