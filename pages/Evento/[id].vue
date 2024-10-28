<template>
  <div class="container">
    <Nav />
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <div class="evento">
      <div class="container">
        <h1>{{ evento.titulo }}</h1>
        <div class="evento-contenido">
          <p>{{ evento.contenido }}</p>
          <p><strong>Fecha de Inicio:</strong> {{ evento.fechaInicio }}</p>
          <p><strong>Fecha de Fin:</strong> {{ evento.fechaFin }}</p>
          <div v-if="evento.imagen" class="evento-imagen">
            <img :src="evento.imagen" alt="Imagen del evento" />
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
    const evento = ref({});
    const loading = ref(true);
    const error = ref(null);
    const route = useRoute();
    const eventoId = route.params.id;

    const getEvento = async (id) => {
      try {
        const response = await fetch(`/api/Eventos/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error al obtener evento: ' + response.statusText);
        }
        const data = await response.json();
        if (data.evento) {
          evento.value = {
            titulo: data.evento.titulo,
            contenido: data.evento.contenido,
            fechaInicio: data.evento.fechaInicio,
            fechaFin: data.evento.fechaFin,
            imagen: data.evento.imagen,
          };
        } else {
          error.value = 'Evento no encontrado.';
        }
      } catch (error) {
        console.error('Error al obtener evento:', error);
        error.value = 'Error al cargar el evento. Inténtalo más tarde.';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      getEvento(eventoId);
    });

    return {
      evento,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.evento {
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

.evento-contenido {
  margin-bottom: 20px;
}

.evento-imagen {
  text-align: center;
  margin: 20px 0;
}

.evento-imagen img {
  max-width: 100%; /* Asegura que la imagen no sea más grande que su contenedor */
  height: auto; /* Mantiene la proporción de la imagen */
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.evento-imagen img:hover {
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
