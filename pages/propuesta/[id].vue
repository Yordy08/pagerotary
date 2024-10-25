<template>
    <div class="propuesta">
        <h1>{{ propuesta.titulo }}</h1>
        <p>{{ propuesta.descripcion }}</p>
        <p><strong>Ubicación:</strong> {{ propuesta.ubicacion }}</p>
        <p><strong>Votos:</strong> {{ propuesta.votos }}</p>

        <div class="comentarios">
            <h2>Comentarios</h2>
            <div v-for="comentario in comentarios" :key="comentario._id" class="comentario">
                <p>{{ comentario.descripcion }}</p>
                <p><strong>Likes:</strong> {{ comentario.like }}</p>
                <p><strong>Usuario:</strong> {{ comentario.usuarioNombre }}</p>
                <label>
                    <input type="checkbox" v-model="comentario.likeSwitch" @change="updateComentario(comentario)" :disabled="!isAuthenticated">
                    Like
                </label>
            </div>
            <form @submit.prevent="submitComentario">
                <textarea v-model="nuevoComentario.descripcion" placeholder="Escribe un comentario" :disabled="!isAuthenticated"></textarea>
                <button type="submit" :disabled="!isAuthenticated">Enviar</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '~/store/main';

export default {
    setup() {
        const propuesta = ref({});
        const comentarios = ref([]);
        const nuevoComentario = ref({ descripcion: '', like: 0 });
        const route = useRoute();
        const userStore = useUserStore();
        const isAuthenticated = ref(false);

        onMounted(async () => {
            const id = route.params.id;
            isAuthenticated.value = !!userStore.getUser();

            try {
                const responsePropuesta = await fetch('/api/Propuestas/' + id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const dataPropuesta = await responsePropuesta.json();
                propuesta.value = dataPropuesta.propuesta;

                const responseComentarios = await fetch('/api/Comentarios/Select', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ propuestaId: id })
                });
                const dataComentarios = await responseComentarios.json();
                
                // Fetch user names for each comment
                for (let comentario of dataComentarios.body) {
                    const usuario = await fetchUsercomentarios(comentario.usuarioId);
                    comentario.usuarioNombre = usuario.nombre;
                    comentario.likeSwitch = comentario.like > 0; // Initialize likeSwitch
                }
                
                comentarios.value = dataComentarios.body;
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        });

        const submitComentario = async () => {
            if (!isAuthenticated.value) {
                alert('Debes estar autenticado para comentar.');
                return;
            }

            const user = userStore.getUser();
            const id = route.params.id;

            const comentario = {
                usuarioId: user._id,
                propuestaId: id,
                descripcion: nuevoComentario.value.descripcion,
                like: nuevoComentario.value.like,
                usuarioNombre: user.nombre // Assuming the user object has a nombre property
            };
            console.log('comentario:', comentario);
            try {
                await fetch('/api/Comentarios/Create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(comentario)
                });
                comentarios.value.push(comentario);
                nuevoComentario.value.descripcion = '';
            } catch (error) {
                console.error('Error creating comentario:', error);
            }
        };

        const updateComentario = async (comentario) => {
            if (!isAuthenticated.value) {
                alert('Debes estar autenticado para dar like.');
                return;
            }

            const updatedComentario = {
                ...comentario,
                like: comentario.likeSwitch ? comentario.like + 1 : comentario.like - 1
            };

            try {
                await fetch('/api/Comentarios/Update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedComentario)
                });
                comentario.like = updatedComentario.like; // Update the like count in the local state
            } catch (error) {
                console.error('Error updating comentario:', error);
            }
        };

        const fetchUsercomentarios = async (id) => {
            try {
                const response = await fetch('/api/Usuarios/' + id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                return data.Usuario;
            } catch (error) {
                console.error('Error al obtener comentarios:', error);
            }
        };

        return {
            propuesta,
            comentarios,
            nuevoComentario,
            submitComentario,
            updateComentario,
            fetchUsercomentarios,
            isAuthenticated
        };
    }
};
</script>

<style scoped>
.propuesta {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 600px;
    margin: 20px auto;
    background-color: #f9f9f9;
}

.propuesta h1 {
    font-size: 24px;
    margin-bottom: 10px;
}

.propuesta p {
    font-size: 16px;
    margin: 5px 0;
}

.comentarios {
    margin-top: 20px;
}

.comentarios h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.comentario {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #fff;
}

.comentario p {
    margin: 5px 0;
}

form {
    margin-top: 20px;
}

textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
