<template>
  <section class="eventos-slider">
    <div class="max-width">
      <h2 class="title">Últimos Eventos</h2>
      <div class="slider">
        <button class="prev" @click="prevSlide">&#10094;</button>
        <div
          class="cards"
          :style="{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div v-if="loading" class="loading">Cargando...</div>
          <div v-else-if="eventos.length === 0" class="no-eventos">No hay eventos disponibles.</div>
          <div v-else class="card" v-for="evento in eventos" :key="evento.id" @click="irADetalle(evento.id)">
            <img v-if="evento.imagen" :src="evento.imagen" alt="Imagen del evento" />
            <div class="card-content">
              <h3>{{ evento.nombre }}</h3>
              <p>{{ recortarDescripcion(evento.descripcion) }}</p>
              <span>Fecha: {{ new Date(evento.fecha).toLocaleDateString() }}</span>
              <span>Ubicación: {{ evento.ubicacion }}</span>
            </div>
          </div>
        </div>
        <button class="next" @click="nextSlide">&#10095;</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const eventos = ref([]);
const loading = ref(true);
const currentIndex = ref(0);
const slidesToShow = ref(4); // Por defecto, se muestra 4 tarjetas en escritorio
const router = useRouter();

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
    } else {
      console.warn('No se encontraron eventos o la estructura de datos no es válida.');
    }
  } catch (error) {
    console.error('Error al obtener eventos:', error);
  } finally {
    loading.value = false;
  }
};

// Funciones para navegar en el slider
const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = eventos.value.length - 1; // Regresar al último slide si estás en el primero
  }
};

const nextSlide = () => {
  if (currentIndex.value < Math.ceil(eventos.value.length / slidesToShow.value) - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // Reinicia al primer slide si llegas al final
  }
};

// Función para navegar a la vista de detalle del evento
const irADetalle = (id) => {
  if (id) {
    router.push(`/evento/${id}`); // Navega a la vista de detalle con el ID
  }
};

const recortarDescripcion = (descripcion) => {
  const palabras = descripcion.split(' ');
  return palabras.slice(0, 28).join(' ') + (palabras.length > 28 ? '...' : ''); // Muestra solo 28 palabras
};

// Variables para el swipe
let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (event) => {
  touchStartX = event.changedTouches[0].clientX;
};

const handleTouchMove = (event) => {
  touchEndX = event.changedTouches[0].clientX;
};

const handleTouchEnd = () => {
  if (touchStartX > touchEndX + 50) {
    // Swipe a la izquierda
    nextSlide();
  } else if (touchStartX < touchEndX - 50) {
    // Swipe a la derecha
    prevSlide();
  }
};

onMounted(() => {
  fetchEventos();
  ajustarSlidesToShow();
  window.addEventListener('resize', ajustarSlidesToShow);
});

const ajustarSlidesToShow = () => {
  if (window.innerWidth < 768) {
    slidesToShow.value = 1; // 1 tarjeta en móviles
  } else if (window.innerWidth < 1024) {
    slidesToShow.value = 2; // 2 tarjetas en tabletas
  } else {
    slidesToShow.value = 4; // 4 tarjetas en escritorio
  }
};
</script>

<style scoped>
.eventos-slider {
  padding: 20px;
  position: relative; /* Necesario para posicionar las flechas */
}

.slider {
  display: flex;
  align-items: center; /* Centrar verticalmente el contenido */
  overflow: hidden; /* Asegura que no se desborde el contenido */
}

.cards {
  display: flex;
  transition: transform 0.5s ease; /* Animación para el cambio de slides */
  min-width: 100%; /* Asegura que solo una tarjeta ocupe el 100% del slider */
}

.card {
  width: 100%; /* Cada tarjeta ocupa todo el ancho del contenedor */
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer; /* Cambia el cursor al pasar sobre la tarjeta */
  transition: transform 0.3s; /* Transición suave al hacer hover */
}

.card:hover {
  transform: scale(1.05); /* Efecto de aumento al pasar el mouse */
}

.card img {
  width: 100%;
  height: 200px; /* Fijar altura de la imagen para que todas tengan el mismo tamaño */
  object-fit: cover; /* Mantener la relación de aspecto */
}

.prev,
.next {
  background: transparent;
  border: none;
  font-size: 2em;
  cursor: pointer;
  color: #F21651; /* Color de las flechas */
  padding: 10px;
  z-index: 1; /* Para que las flechas estén encima del contenido */
}

.prev:hover,
.next:hover {
  color: #C51041; /* Color de las flechas al pasar el mouse */
}

.loading,
.no-eventos {
  text-align: center;
  width: 100%;
}

/* Estilos para mostrar 4 cards en desktop */
@media (min-width: 1024px) {
  .cards {
    gap: 20px; /* Espacio entre las cards */
  }

  .card {
    min-width: calc(25% - 20px); /* Ajustar para 4 cards en desktop */
  }

  .slider {
    width: 100%; /* Asegúrate de que el slider ocupe el ancho completo */
    overflow: hidden; /* Oculta el contenido que no está en vista */
  }
}

/* Estilo para tabletas */
@media (min-width: 768px) and (max-width: 1024px) {
  .cards {
    gap: 20px; /* Espacio entre las cards */
  }

  .card {
    min-width: calc(50% - 20px); /* Ajustar para 2 cards en tabletas */
  }
}

/* Estilo para móvil */
@media (max-width: 768px) {
  .cards {
    flex-direction: row; /* Mantener la dirección en fila */
    gap: 15px; /* Reduce el espacio entre las cards */
  }

  .card {
    max-width: 100%; /* Las cards ocupan todo el ancho */
    flex: 0 0 auto; /* Evitar que las cards se compriman */
  }
}
</style>
