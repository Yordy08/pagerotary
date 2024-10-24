<template>
    <div v-if="isLoggedIn"> <!-- Mostrar solo si el usuario está logueado -->
      <button @click="cerrarSesion" class="cerrar-sesion-btn">
        <span class="icono-salir"></span>
        <span class="texto-salir">Salir</span>
      </button>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '~/store/main'; // Ajusta la ruta según tu estructura
  import { useRouter } from 'vue-router'; // Importa el router
  import { computed } from 'vue';
  
  const userStore = useUserStore();
  const router = useRouter(); // Inicializa el router
  
  // Computed para verificar si hay un usuario logueado
  const isLoggedIn = computed(() => userStore.user !== null);
  
  const cerrarSesion = () => {
    userStore.logout(); // Llama a la función logout
    router.push('/'); // Redirige a la vista index.vue (raíz)
  };
  </script>
  
  <style scoped>
  .cerrar-sesion-btn {
    background-color: transparent; /* Fondo transparente */
    border: none; /* Sin borde */
    cursor: pointer;
    padding: 10px; /* Espaciado alrededor del icono y texto */
    display: flex;
    align-items: center;
    gap: 8px; /* Espacio entre el icono y el texto */
    color: white; /* Color del texto */
    font-size: 16px; /* Tamaño de la fuente */
  }
  
  .icono-salir {
    display: inline-block;
    width: 24px;
    height: 24px;
    position: relative;
  }
  
  .icono-salir::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 12px;
    height: 2px;
    background-color: white;
    transform: translateY(-50%);
  }
  
  .icono-salir::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 12px;
    height: 12px;
    border: 2px solid white;
    border-radius: 2px;
    transform: translateY(-50%);
  }
  
  .icono-salir .arrow {
    position: absolute;
    top: 50%;
    left: 6px;
    width: 8px;
    height: 8px;
    border-top: 2px solid white;
    border-right: 2px solid white;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  
  .texto-salir {
    font-weight: 500;
  }
  
  .cerrar-sesion-btn:hover .icono-salir::before,
  .cerrar-sesion-btn:hover .icono-salir::after,
  .cerrar-sesion-btn:hover .icono-salir .arrow {
    background-color: #f2a922; /* Cambia el color del icono al pasar el mouse */
    border-color: #f2a922;
  }
  
  .cerrar-sesion-btn:hover .texto-salir {
    color: #f2a922; /* Cambia el color del texto al pasar el mouse */
  }
  </style>
  