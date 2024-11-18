<template>
    <div>
        <Nav />
    
    <section class="eventos-list">
        
        <div class="max-width"> 
        <br>
          <br>
          <br>
          <br>
          <br> 
            <h2 class="title">Eventos</h2>
            <div class="eventos-container">
                <div v-if="loading" class="loading">Cargando...</div>
                <div v-else-if="eventos.length === 0" class="no-eventos">No hay eventos disponibles.</div>
                <div v-else class="evento" v-for="evento in eventos" :key="evento._id" @click="irADetalle(evento._id)">
                    <div class="evento-content">
                        <h3>{{ evento.nombre }}</h3>
                        <p>{{ recortarDescripcion(evento.descripcion) }}</p>
                        <div class="evento-footer">
                            <span>Fecha: {{ evento.fecha }}</span>
                            <span>Ubicación: {{ evento.ubicacion }}</span>
                            <!-- Si el evento tiene una imagen, la mostramos -->
                            <div v-if="evento.imagen" class="evento-imagen">
                                <img :src="evento.imagen" alt="Imagen del evento" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        
    </section>
    <Footer />
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const eventos = ref([]);
const loading = ref(true);
const currentIndex = ref(0);
const slidesToShow = ref(4); // Se ajusta en función del ancho de la pantalla
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
            console.log(eventos.value); // Verifica los datos aquí
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
        currentIndex.value = 0; // Reinicia al primer slide si llegas al final
    }
};

const prevSlide = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    } else {
        currentIndex.value = eventos.value.length - slidesToShow.value; // Regresa al último slide si estás en el primero
    }
};

const irADetalle = (id) => {
    if (id) {
        router.push(`/evento/${id}`);
    }
};

const recortarDescripcion = (descripcion) => {
    const palabras = descripcion.split(' ');
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
    fetchEventos();
    ajustarSlidesToShow();
    window.addEventListener('resize', ajustarSlidesToShow);
});
</script>

<style scoped>
@import '~/public/css/index.css';
.eventos-list {
    padding: 20px;
    border-radius: 8px;
    max-width: 70%;
    margin: 20px auto;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.eventos-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.evento {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
}

.evento:hover {
    transform: translateY(-5px);
    transform: scale(1.02); /* Aumenta un poco el tamaño al pasar el ratón */
}

.evento-content h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
}

.evento-content p {
    color: #666;
    margin-bottom: 10px;
}

.evento-footer {
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
    color: #999;
}

.evento-imagen img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 10px;
}

.loading,
.no-eventos {
    text-align: center;
    color: #999;
    font-size: 1.1em;
}
</style>
