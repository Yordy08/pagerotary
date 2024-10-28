<template>
    <div>
        <Nav/>
        <br>
        <br>
        <br>
        <br>
    
    <div class="propuesta">
       
        <h1>{{ propuesta.titulo }}</h1>
        <p>{{ propuesta.descripcion }}</p>
        <p><strong>Ubicación:</strong> {{ propuesta.ubicacion }}</p>
        <p>
    <strong>Reacciones:</strong> {{ propuesta.votos }} 
    <button @click="updatePropuesta(propuesta)" :disabled="!isAuthenticated">
        <i class="fas fa-heart"></i> <!-- Ícono de corazón para votar -->
    </button>
</p>


        <p><strong>Autor:</strong> {{ propuesta.autor }}</p>

        <div class="comentarios">

            <h2>Comentarios</h2>
            <div v-for="comentario in comentarios" :key="comentario._id" class="comentario">
                <b>{{ comentario.usuarioNombre }}</b>
                <p>{{ comentario.descripcion }}</p>
                <p><strong>Likes:</strong> {{ comentario.like }}</p>
                

                <div>
    <button @click="updateComentario(comentario, 'Like')" :disabled="!isAuthenticated">
        <i class="fas fa-thumbs-up"></i> <!-- Ícono de pulgar hacia arriba -->
    </button>
    <button @click="updateComentario(comentario, 'disLike')" :disabled="!isAuthenticated">
        <i class="fas fa-thumbs-down"></i> <!-- Ícono de pulgar hacia abajo -->
    </button>
</div>


            </div>
            <form @submit.prevent="submitComentario">
                <textarea v-model="nuevoComentario.descripcion" placeholder="Escribe un comentario"
                    :disabled="!isAuthenticated"></textarea>
                <button type="submit" :disabled="!isAuthenticated">Enviar</button>
            </form>
        </div>
   <br>
   <br>
   <br>
   <br>
   


    </div>
    <Footer/>
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

        onMounted(async () => {
            isAuthenticated.value = !!currentUser;
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
        const updatePropuesta = async (propuesta) => {
            if (!isAuthenticated.value) {
                alert('Debes estar autenticado para reaccionar.');
                return;
            }

            if(Array.isArray(propuesta.UsuarioVoto)){
                if (propuesta.UsuarioVoto.includes(currentUser._id)) {
                    alert('Reaccionaste a esta propuesta.');
                    return;
                }
                propuesta.UsuarioVoto.push(currentUser._id);
                propuesta.votos += 1;
            }

            try {
                let response = await fetch('/api/Propuestas/Update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(propuesta)
                });
                const data = await response.json();
                if (data.error) {
                    alert(data.error);
                    return;
                }
                await getPropuesta(PropuestaId);
            } catch (error) {
                console.error('Error updating propuesta:', error);
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

        const updateComentario = async (comentario, event) => {

            if (!isAuthenticated.value) {
                alert('Debes estar autenticado para dar like.');
                return;
            }

            if (Array.isArray(comentario.UsuarioLike)) {
                if (comentario.UsuarioLike.includes(currentUser._id) && event === 'disLike') {
                    comentario.UsuarioLike = comentario.UsuarioLike.filter((id) => id !== currentUser._id);
                    comentario.like -= 1;
                } else if (!comentario.UsuarioLike.includes(currentUser._id) && event === 'Like') {
                    comentario.UsuarioLike.push(currentUser._id);
                    comentario.like += 1;
                }else{
                    return;
                }
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
            updatePropuesta,
            isAuthenticated
        };
    }
};
</script>
<style scoped>
.propuesta {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-width: 70%;
    margin: 20px auto;
    background-color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.propuesta:hover {
    transform: scale(1.02); /* Aumenta un poco el tamaño al pasar el ratón */
}

.propuesta h1 {
    font-size: 28px;
    margin-bottom: 10px;
    color: #2c3e50; /* Color oscuro */
}

.propuesta p {
    font-size: 16px;
    margin: 5px 0;
    color: #34495e; /* Color gris oscuro */
}

.comentarios {
    margin-top: 20px;
}

.comentarios h2 {
    font-size: 22px;
    margin-bottom: 10px;
    color: #2980b9; /* Color azul para los títulos */
}

.comentario {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #f5f5f5;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.comentario:hover {
    background-color: #e8f6f3; /* Color de fondo claro en hover */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.comentario p {
    margin: 5px 0;
}

form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    transition: border-color 0.3s ease;
}

textarea:focus {
    border-color: #2980b9; /* Color de borde en foco */
    outline: none; /* Sin borde de foco por defecto */
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
    background-color: #0056b3; /* Color más oscuro en hover */
    transform: translateY(-2px); /* Mueve el botón hacia arriba al pasar el ratón */
}

button:disabled {
    background-color: #ccc; /* Color gris para botones deshabilitados */
    cursor: not-allowed; /* Cambia el cursor al pasar sobre el botón deshabilitado */
}
</style>
