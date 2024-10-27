<template>
    <div class="container mt-5">
        <h1 class="mb-4">Lista de Noticias</h1>
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <tbody>
                    <tr v-for="noticia in noticias" :key="noticia._id" :style="{ backgroundColor: '#F2A922' }">
                        <td><strong>Título:</strong> {{ noticia.titulo }}</td>
                        <td><strong>Contenido:</strong> {{ noticia.contenido }}</td>
                        <td><strong>Fecha de Publicación:</strong> {{ noticia.fechaPublicacion }}</td>
                        <td v-if="noticia.imagen"><strong>Imagen:</strong> <img :src="noticia.imagen" alt="Imagen de Noticia" width="100" /></td>
                        <td class="text-center">
                            <button class="btn btn-info btn-sm mr-2" @click="openModal(noticia)">
                                <i class="fas fa-edit"></i> Actualizar
                            </button>
                            <button class="btn btn-danger btn-sm" @click="deleteNoticia(noticia._id)">
                                <i class="fas fa-trash-alt"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal para Actualizar Noticia -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Actualizar Noticia</h5>
                    <button type="button" class="close" @click="closeModal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updateNoticia">
                        <div class="form-group">
                            <label for="titulo">Título</label>
                            <input v-model="noticiaForm.titulo" type="text" class="form-control" placeholder="Título" required />
                        </div>
                        <div class="form-group">
                            <label for="contenido">Contenido</label>
                            <textarea v-model="noticiaForm.contenido" class="form-control" placeholder="Contenido" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="fechaPublicacion">Fecha de Publicación</label>
                            <input v-model="noticiaForm.fechaPublicacion" type="date" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="imagen">Imagen (opcional)</label>
                            <input v-model="noticiaForm.imagen" type="text" class="form-control" placeholder="URL de la imagen" />
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Actualizar</button>
                            <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const noticias = ref([]);
const showModal = ref(false);
const noticiaForm = ref({
    _id: null,
    titulo: '',
    contenido: '',
    fechaPublicacion: '',
    imagen: ''
});

// Función para obtener noticias
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
        }
    } catch (error) {
        console.error('Error al obtener noticias:', error);
    }
};

// Función para abrir el modal y cargar los datos de la noticia en el formulario
const openModal = (noticia) => {
    noticiaForm.value = { ...noticia };
    showModal.value = true;
};

// Función para cerrar el modal y resetear el formulario
const closeModal = () => {
    showModal.value = false;
    resetForm();
};

// Resetear el formulario
const resetForm = () => {
    noticiaForm.value = {
        _id: null,
        titulo: '',
        contenido: '',
        fechaPublicacion: '',
        imagen: ''
    };
};

// Función para eliminar una noticia
const deleteNoticia = async (id) => {
    if (!id) {
        console.log("ID de la noticia es undefined. No se puede eliminar.");
        return;
    }
    try {
        const response = await fetch(`/api/Noticias/Delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: id }),
        });

        if (response.ok) {
            await fetchNoticias();
        }
    } catch (error) {
        console.error('Error al intentar eliminar la noticia:', error);
    }
};

// Función para actualizar una noticia
const updateNoticia = async () => {
    try {
        await fetch('/api/Noticias/Update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noticiaForm.value),
        });
        closeModal();
        await fetchNoticias();
    } catch (error) {
        console.error('Error al actualizar noticia:', error);
    }
};

onMounted(fetchNoticias);
</script>

<style scoped>
.table {
    width: 100%;
    margin-top: 20px;
}

.table td {
    padding: 15px;
    text-align: left; 
}

.table td button {
    margin-right: 10px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    width: 100%;
}

.modal-header {
    background-color: #ff9800;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.close {
    font-size: 1.5rem;
    cursor: pointer;
}

.modal-body {
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button.btn-primary {
    background-color: #4CAF50;
    color: white;
}

button.btn-secondary {
    background-color: #f44336;
    color: white;
}

@media (max-width: 768px) {
    .table {
        font-size: 0.9em;
    }

    .table td {
        display: block;
        border: none;
    }

    .table td button {
        width: 100%;
        margin: 5px 0;
    }
}
</style>