<template>
  <div class="container">
    <Nav />
    <br><br><br><br><br><br>

    <!-- Verificación si el evento está cargado -->
    <div v-if="loading" class="loading">Cargando evento...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Mostramos el evento -->
    <div v-if="evento" class="evento">
      <h1>{{ evento.nombre }}</h1>
      <div class="evento-contenido">
        <p>{{ evento.descripcion }}</p>
        <p><strong>Fecha del Evento:</strong> {{ evento.fecha }}</p>
        <p><strong>Ubicación:</strong> {{ evento.ubicacion }}</p>
        <!-- Mostrar imagen solo si existe -->
        <div v-if="evento.imagen" class="evento-imagen">
          <img :src="evento.imagen" alt="Imagen del evento" />
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const evento = ref(null);  // Almacena el evento
    const loading = ref(true); // Indica si los datos están cargando
    const error = ref(null);   // Almacena cualquier error
    const route = useRoute();  // Obtiene el parámetro de la ruta
    const eventoId = route.params.id; // ID del evento desde la URL

    // Función para obtener el evento por su ID
    const getEvento = async (id) => {
      try {
        const response = await fetch(`/api/Eventos/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el evento');
        }
        const data = await response.json();
        evento.value = data.evento;  // Guardamos los datos del evento
      } catch (err) {
        error.value = 'Error al cargar el evento. Inténtalo más tarde.';
      } finally {
        loading.value = false;  // Indicamos que la carga ha finalizado
      }
    };

    // Al montar el componente, obtenemos el evento
    onMounted(() => {
      if (eventoId) {
        getEvento(eventoId);
      } else {
        error.value = "ID de evento no proporcionado.";
        loading.value = false;
      }
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
}

.evento-contenido {
  margin-bottom: 20px;
}

.evento-imagen {
  text-align: center;
  margin: 20px 0;
}

.evento-imagen img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.loading {
  color: #007bff;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
