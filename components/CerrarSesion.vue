<template>
    <button @click="cerrarSesion" class="cerrar-sesion-btn">Cerrar Sesión</button>
  </template>
  
  <script setup>
  import { useUserStore } from '~/store/main'; // Ajusta la ruta según tu estructura
  import { useRouter } from 'vue-router'; // Importa el router
  
  const userStore = useUserStore();
  const router = useRouter(); // Inicializa el router
  
  const cerrarSesion = () => {
    userStore.logout(); // Llama a la función logout
    router.push('/'); // Redirige a la vista index.vue (raíz)
  };
  </script>
  
  <style scoped>
  .cerrar-sesion-btn {
    background-color: #f44336; /* Color rojo */
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .cerrar-sesion-btn:hover {
    background-color: #c62828; /* Color rojo oscuro al pasar el mouse */
  }
  </style>
  