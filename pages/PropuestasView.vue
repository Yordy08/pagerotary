<template>
    
    <section class="propuestas-list">
        <Nav/>
        <div class="max-width"> 
        <br>
          <br>
          <br>
          <br>
          <br> 
            <h2 class="title">Propuestas</h2>
            <div class="propuestas-container">
                <div v-if="loading" class="loading">Cargando...</div>
                <div v-else-if="propuestas.length === 0" class="no-propuestas">No hay propuestas disponibles.</div>
                <div v-else class="propuesta" v-for="propuesta in propuestas" :key="propuesta._id" @click="irADetalle(propuesta._id)">
                    <div class="propuesta-content">
                        <h3>{{ propuesta.titulo }}</h3>
                        <p>{{ recortarContenido(propuesta.descripcion) }}</p>
                        <div class="propuesta-footer">
                            <span>Ubicación: {{ propuesta.ubicacion }}</span>
                            <span>Votos: {{ propuesta.votos }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <Footer/>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const propuestas = ref([]);
const loading = ref(true);
const currentIndex = ref(0);
const slidesToShow = ref(4); // Se ajusta en función del ancho de la pantalla
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
@import '~/public/css/index.css';
.propuestas-list {
    padding: 20px;
}

.propuestas-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.propuesta {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
}

.propuesta:hover {
    transform: translateY(-5px);
}

.propuesta-content h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
}

.propuesta-content p {
    color: #666;
    margin-bottom: 10px;
}

.propuesta-footer {
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
    color: #999;
}

.loading,
.no-propuestas {
    text-align: center;
    color: #999;
    font-size: 1.1em;
}
</style>