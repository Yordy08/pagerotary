<template>
  <section class="eventos-slider">
    <div class="max-width">
      <h2 class="title">Próximos Eventos</h2>
      <div class="slider">
        <button class="prev" @click="prevSlide">&#10094;</button>
        <div class="cards" :style="{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }"
             @touchstart="handleTouchStart" 
             @touchmove="handleTouchMove" 
             @touchend="handleTouchEnd">
          <div v-if="loading" class="loading">Cargando...</div>
          <div v-else-if="eventos.length === 0" class="no-eventos">No hay eventos disponibles.</div>
          <div v-else class="card" v-for="evento in eventos" :key="evento._id" @click="irADetalle(evento._id)">
            <img :src="evento.imagen" alt="Imagen del evento" />
            <div class="card-content">
              <h3>{{ evento.nombre }}</h3>
              <p>{{ recortarContenido(evento.descripcion) }}</p>
              <span>Fecha: {{ new Date(evento.fecha).toLocaleDateString() }}</span>
              <span v-if="evento.ubicacion">Ubicación: {{ evento.ubicacion }}</span>
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
const slidesToShow = ref(4);
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
    }
  } catch (error) {
    console.error('Error al obtener eventos:', error);
  } finally {
    loading.value = false;
  }
};

const nextSlide = () => {
  if (currentIndex.value < eventos.value.length - slidesToShow.value) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = eventos.value.length - slidesToShow.value;
  }
};

const irADetalle = (id) => {
  console.log('Navegando al evento con ID:', id); // Verifica que el ID es correcto
  if (id) {
    router.push(`/Evento/${id}`); // Ajusta la ruta si es necesario
  }
};

const recortarContenido = (contenido) => {
  const palabras = contenido.split(' ');
  return palabras.slice(0, 28).join(' ') + (palabras.length > 28 ? '...' : '');
};

const ajustarSlidesToShow = () => {
  slidesToShow.value = window.innerWidth <= 768 ? 1 : 4;
};

// Manejo de swipe
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
    nextSlide();
  } else if (touchStartX < touchEndX - 50) {
    prevSlide();
  }
};

onMounted(() => {
  fetchEventos();
  ajustarSlidesToShow();
  window.addEventListener('resize', ajustarSlidesToShow);
});
</script>

<style scoped>
.eventos-slider {
  padding: 20px;
  position: relative;
}

.slider {
  display: flex;
  align-items: center;
  overflow: hidden;
}

.cards {
  display: flex;
  transition: transform 0.5s ease;
  min-width: 100%;
}

.card {
  width: 100%;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.prev,
.next {
  background: transparent;
  border: none;
  font-size: 2em;
  cursor: pointer;
  color: #F21651;
  padding: 10px;
  z-index: 1;
}

.prev:hover,
.next:hover {
  color: #C51041;
}

.loading,
.no-eventos {
  text-align: center;
  width: 100%;
}

@media (min-width: 1024px) {
  .cards {
    gap: 20px;
  }

  .card {
    min-width: calc(25% - 20px);
  }

  .slider {
    width: 100%;
    overflow: hidden;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .cards {
    gap: 20px;
  }

  .card {
    min-width: calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  .cards {
    flex-direction: row;
    gap: 15px;
  }

  .card {
    max-width: 100%;
    flex: 0 0 auto;
  }
}
</style>
