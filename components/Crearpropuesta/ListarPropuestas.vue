<template>
    <div class="container mt-5">
        <h1 class="mb-4">Lista de Propuestas</h1>
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <tbody>
                    <tr v-for="propuesta in propuestas" :key="propuesta._id" :style="{ backgroundColor: '#F2A922' }">
                        <td><strong>Título:</strong> {{ propuesta.titulo }}</td>
                        <td><strong>Descripción:</strong> {{ propuesta.descripcion }}</td>
                        <td><strong>Ubicación:</strong> {{ propuesta.ubicacion }}</td>
                        <td><strong>Autor:</strong> {{ propuesta.autor }}</td>
                        <td class="text-center">
                            <button class="btn btn-info btn-sm mr-2" @click="openModal(propuesta)">
                                <i class="fas fa-edit"></i> Actualizar
                            </button>
                            <button class="btn btn-danger btn-sm" @click="deletePropuesta(propuesta._id)">
                                <i class="fas fa-trash-alt"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal para Actualizar Propuesta -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Actualizar Propuesta</h5>
                    <button type="button" class="close" @click="closeModal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updatePropuesta">
                        <div class="form-group">
                            <label for="titulo">Título</label>
                            <input v-model="propuestaForm.titulo" type="text" class="form-control" placeholder="Título" required />
                        </div>
                        <div class="form-group">
                            <label for="descripcion">Descripción</label>
                            <textarea v-model="propuestaForm.descripcion" class="form-control" placeholder="Descripción" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="ubicacion">Ubicación</label>
                            <input v-model="propuestaForm.ubicacion" type="text" class="form-control" placeholder="Ubicación" required />
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
import { useUserStore } from '~/store/main';

const propuestas = ref([]);
const showModal = ref(false);
const propuestaForm = ref({
    _id: null,
    titulo: '',
    descripcion: '',
    ubicacion: '',
    usuarioId: '',
    autor: ''
});

const userStore = useUserStore();
const user = userStore.getUser();

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
            if (user.rol === 'admin') {
                propuestas.value = data.body;
            } else {
                propuestas.value = data.body.filter(e => e.usuarioId === user._id);
            }
         
          
             }
    } catch (error) {
        console.error('Error al obtener propuestas:', error);
    }
};

const openModal = (propuesta) => {
    propuestaForm.value = { ...propuesta };
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    resetForm();
};

const resetForm = () => {
    propuestaForm.value = {
        _id: null,
        titulo: '',
        descripcion: '',
        ubicacion: '',
        usuarioId: '',
        autor: ''
    };
};

const deletePropuesta = async (id) => {
    if (!id) {
        console.log("ID de la propuesta es undefined. No se puede eliminar.");
        return;
    }
    try {
        const response = await fetch(`/api/Propuestas/Delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: id }),
        });
    
        if (response.ok) {
            await fetchPropuestas();
        }
    } catch (error) {
        console.error('Error al intentar eliminar la propuesta:', error);
    }
};

const updatePropuesta = async () => {
    try {
        await fetch('/api/Propuestas/Update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(propuestaForm.value),
        });
        closeModal();
        await fetchPropuestas();
    } catch (error) {
        console.error('Error al actualizar propuesta:', error);
    }
};

onMounted(async () => {
    propuestaForm.value.usuarioId = userStore.getUser()._id;
    propuestaForm.value.autor = userStore.getUser().nombre;
    await fetchPropuestas();
});
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