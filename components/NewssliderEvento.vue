<template>
    <section class="eventos-slider">
      <div class="max-width">
        <h2 class="title">Últimos Eventos</h2>
        <div class="slider">
          <button class="prev" @click="prevSlide">&#10094;</button>
          <div class="cards" :style="{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }">
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
  const slidesToShow = ref(4); // Número de tarjetas a mostrar en desktop
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
      console.log(data); // Para ver la estructura de datos
  
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
    }
  };
  
  const nextSlide = () => {
    if (currentIndex.value < Math.ceil(eventos.value.length / slidesToShow.value) - 1) {
      currentIndex.value++;
    }
  };
  
  // Función para navegar a la vista de detalle del evento
  const irADetalle = (id) => {
    console.log('ID del evento al hacer clic:', id); // Verificar que el ID esté disponible
    if (id) {
      router.push(`/evento/${id}`); // Navega a la vista de detalle con el ID
    } else {
      console.error('ID de evento no disponible');
    }
  };
  
  const recortarDescripcion = (descripcion) => {
    const palabras = descripcion.split(' ');
    return palabras.slice(0, 28).join(' ') + (palabras.length > 28 ? '...' : ''); // Muestra solo 28 palabras
  };
  
  onMounted(() => {
    fetchEventos();
  });
  </script>
  
  <style scoped>
  .eventos-slider {
    padding: 20px;
    position: relative; /* Necesario para posicionar las flechas */
  }
  
  .slider {
    display: flex;
    align-items: center; /* Centrar verticalmente el contenido */
  }
  
  .cards {
    display: flex;
    transition: transform 0.3s ease; /* Animación para el cambio de slides */
  }
  
  .card {
    min-width: 200px; /* Ajusta el tamaño mínimo según sea necesario */
    max-width: 300px; /* Limitar el ancho máximo de la tarjeta */
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    cursor: pointer; /* Cambia el cursor al pasar sobre la tarjeta */
    transition: transform 0.3s; /* Transición suave al hacer hover */
    flex: 0 0 auto; /* Para evitar que las cards se compriman */
  }
  
  .card:hover {
    transform: scale(1.05); /* Efecto de aumento al pasar el mouse */
  }
  
  .card img {
    width: 100%;
    height: 200px; /* Fijar altura de la imagen para que todas tengan el mismo tamaño */
    object-fit: cover; /* Mantener la relación de aspecto */
  }
  
  .prev, .next {
    background: transparent;
    border: none;
    font-size: 2em;
    cursor: pointer;
    color: #F21651; /* Color de las flechas */
    padding: 10px;
    z-index: 1; /* Para que las flechas estén encima del contenido */
  }
  
  .prev:hover, .next:hover {
    color: #C51041; /* Color de las flechas al pasar el mouse */
  }
  
  .loading,
  .no-eventos {
    text-align: center;
    width: 100%;
  }
  
  /* Estilos para mostrar 4 cards en desktop */
  @media (min-width: 768px) {
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
  
  /* Estilo para móvil */
  @media (max-width: 768px) {
    .cards {
      flex-direction: column; /* Cambia a columna en pantallas pequeñas */
      gap: 15px; /* Reduce el espacio entre las cards */
    }
  
    .card {
      max-width: 100%; /* Las cards ocupan todo el ancho */
      flex: 1; /* Permite que las cards se expandan */
    }
  }
  </style>
  