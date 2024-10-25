<template>
    <section class="propuestas-slider">
        <div class="max-width">
            <h2 class="title">Últimas Propuestas</h2>
            <div class="slider">
                <button class="prev" @click="prevSlide">&#10094;</button>
                <div class="cards" :style="{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }" 
                         @touchstart="handleTouchStart" 
                         @touchmove="handleTouchMove" 
                         @touchend="handleTouchEnd">
                    <div v-if="loading" class="loading">Cargando...</div>
                    <div v-else-if="propuestas.length === 0" class="no-propuestas">No hay propuestas disponibles.</div>
                    <div v-else class="card" v-for="propuesta in propuestas" :key="propuesta._id" @click="irADetalle(propuesta._id)">
                        <div class="card-content">
                            <h3>{{ propuesta.titulo }}</h3>
                            <p>{{ recortarContenido(propuesta.descripcion) }}</p>
                            <span>Ubicación: {{ propuesta.ubicacion }}</span>
                            <span>Votos: {{ propuesta.votos }}</span>
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

const propuestas = ref([]);
const loading = ref(true);
const currentIndex = ref(0);
const slidesToShow = ref(4); // Se cambia dinámicamente con el ancho de la pantalla
const router = useRouter();

const fetchPropuestas = async () => {
    try {
        const response = await fetch('/api/Propuestas/Select', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (data && Array.isArray(data.body)) {
            propuestas.value = data.body;
            console.log(propuestas.value); // Verifica los datos aquí
        }
    } catch (error) {
        console.error('Error al obtener propuestas:', error);
    } finally {
        loading.value = false;
    }
};

const nextSlide = () => {
    if (currentIndex.value < propuestas.value.length - slidesToShow.value) {
        currentIndex.value++;
    } else {
        currentIndex.value = 0; // Reinicia al primer slide si llegas al final
    }
};

const prevSlide = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    } else {
        currentIndex.value = propuestas.value.length - slidesToShow.value; // Regresa al último slide si estás en el primero
    }
};

const irADetalle = (id) => {
    if (id) {
        router.push(`/propuesta/${id}`);
    }
};

const recortarContenido = (contenido) => {
    const palabras = contenido.split(' ');
    return palabras.slice(0, 28).join(' ') + (palabras.length > 28 ? '...' : '');
};

// Cambiar la cantidad de slides a mostrar dependiendo del tamaño de la pantalla
const ajustarSlidesToShow = () => {
    slidesToShow.value = window.innerWidth <= 768 ? 1 : 4;
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
    fetchPropuestas();
    ajustarSlidesToShow();
    window.addEventListener('resize', ajustarSlidesToShow);
});
</script>

<style scoped>
.propuestas-slider {
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
.no-propuestas {
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
