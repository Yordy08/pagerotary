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
        
                    <input type="button" name="likeButton" value="Like" @click="updateComentario(comentario)" :disabled="!isAuthenticated">
            </div>
            <form @submit.prevent="submitComentario">
                <textarea v-model="nuevoComentario.descripcion" placeholder="Escribe un comentario"
                    :disabled="!isAuthenticated"></textarea>
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
        const PropuestaId = route.params.id;
        const currentUser = userStore.getUser();
        isAuthenticated.value = !!currentUser;

        onMounted(async () => {
            await getPropuesta(PropuestaId);
            await getComentarios(PropuestaId);
        });
       
        const getPropuesta = async (id) => {
            try {
                const responsePropuesta = await fetch('/api/Propuestas/' + id, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const dataPropuesta = await responsePropuesta.json();
                propuesta.value = dataPropuesta.propuesta;

            } catch (error) {
                console.error('Error al obtener propuesta:', error);
            }
        };
        const getComentarios = async (id) => {
            try {
                const responseComentarios = await fetch('/api/Comentarios/Select', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ propuestaId: id })
                });
                const dataComentarios = await responseComentarios.json();

                comentarios.value = dataComentarios.body;

            } catch (error) {
                console.error('Error al obtener comentarios:', error);
            }
        };
        const submitComentario = async () => {
            if (!isAuthenticated.value) {
                alert('Debes estar autenticado para comentar.');
                return;
            }

            const comentario = {
                usuarioId: currentUser._id,
                usuarioNombre: currentUser.nombre,
                propuestaId: PropuestaId,
                descripcion: nuevoComentario.value.descripcion,
                like: nuevoComentario.value.like,
            };
            
            try {
                let response = await fetch('/api/Comentarios/Create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(comentario)
                });
                const data = await response.json();
                if (data.error) {
                    alert(data.error);
                    return;
                }
            await getComentarios(PropuestaId);
                
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

            if (Array.isArray(comentario.UsuarioLike)) {
                if (comentario.UsuarioLike.includes(currentUser._id)) {
                    
                    return;
                } else {
                    comentario.UsuarioLike.push(currentUser._id);
                    comentario.like += 1;
                }
            } else {
                comentario.UsuarioLike = [currentUser._id];
                comentario.like += 1;
            }
        

            try {
                let response = await fetch('/api/Comentarios/Update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(comentario)
                });
                const data = await response.json();
                console.log('data:', data);
                if (data.error) {
                    alert(data.error);
                    return;
                }
                await getComentarios(PropuestaId);
            } catch (error) {
                console.error('Error updating comentario:', error);
            }
        };

       

        return {
            propuesta,
            comentarios,
            nuevoComentario,
            submitComentario,
            updateComentario,
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
