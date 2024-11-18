<template>
    <div>
        <Nav />
    
    <section class="noticias-list">
        
        <div class="max-width"> 
        <br>
          <br>
          <br>
          <br>
          <br> 
            <h2 class="title">Noticias</h2>
            <div class="noticias-container">
                <div v-if="loading" class="loading">Cargando...</div>
                <div v-else-if="noticias.length === 0" class="no-noticias">No hay noticias disponibles.</div>
                <div v-else class="noticia" v-for="noticia in noticias" :key="noticia._id" @click="irADetalle(noticia._id)">
                    <div class="noticia-content">
                        <h3>{{ noticia.titulo }}</h3>
                        <p>{{ recortarDescripcion(noticia.contenido) }}</p>
                        <div class="noticia-footer">
                            <span>Fecha: {{ noticia.fechaPublicacion }}</span>
                            <!-- Si la noticia tiene una imagen, la mostramos -->
                            <div v-if="noticia.imagen" class="noticia-imagen">
                                <img :src="noticia.imagen" alt="Imagen de la noticia" />
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

const noticias = ref([]);
const loading = ref(true);
const router = useRouter();

const fetchNoticias = async () => {
    try {
        const response = await fetch('/api/Noticias/Select', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (data && Array.isArray(data.body)) {
            noticias.value = data.body;
            console.log(noticias.value); // Verifica los datos aquí
        }
    } catch (error) {
        console.error('Error al obtener noticias:', error);
    } finally {
        loading.value = false;
    }
};

const irADetalle = (id) => {
    // Redirige a la página Notis/[id].vue con el id de la noticia
    if (id) {
        router.push(`/Notis/${id}`);
    }
};

const recortarDescripcion = (descripcion) => {
    const palabras = descripcion.split(' ');
    return palabras.slice(0, 28).join(' ') + (palabras.length > 28 ? '...' : '');
};

onMounted(() => {
    fetchNoticias();
});
</script>

<style scoped>
@import '~/public/css/index.css';
.noticias-list {
    padding: 20px;
    border-radius: 8px;
    max-width: 70%;
    margin: 20px auto;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.noticias-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.noticia {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
}

.noticia:hover {
    transform: translateY(-5px);
    transform: scale(1.02); /* Aumenta un poco el tamaño al pasar el ratón */
}

.noticia-content h3 {
    font-size: 1.2em;
    margin-bottom: 10px;
}

.noticia-content p {
    color: #666;
    margin-bottom: 10px;
}

.noticia-footer {
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
    color: #999;
}

.noticia-imagen img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 10px;
}

.loading,
.no-noticias {
    text-align: center;
    color: #999;
    font-size: 1.1em;
}
</style>
