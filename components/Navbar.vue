<template>
  <nav class="navbar">
    <div class="max-width">
      <div class="logo">
        <a href="">
          <img height="50px" width="100%" alt="logo"
            src="https://www.rotary.org/sites/all/themes/rotary_rotaryorg/images/rotary-logo-color-2019-simplified.svg">
        </a>
      </div>
      <div class="menu-btn" @click="toggleMenu">
        <i class="fas fa-bars" :class="{ active: isActive }"></i>
      </div>
      <ul class="menu" :class="{ active: isActive }">
        <NuxtLink v-if="isLoggedIn" class="a" to="/dashboard">Admin</NuxtLink> <!-- Solo visible si el usuario está logueado -->
        
        <li><a href="index.html" class="menu-btn">Inicio</a></li>
        <li><a href="data.html" class="menu-btn">Programas</a></li>
        <li>
        <NuxtLink to="/NotiViews" class="menu-btn">Noticias</NuxtLink>
        </li>
        <li>
        <NuxtLink to="/EventViews" class="menu-btn">Eventos</NuxtLink>
        </li>
        <li>
        <NuxtLink to="/PropuestasView" class="menu-btn">Propuestas</NuxtLink>
        </li>

        <li><a href="#contact" class="menu-btn">Contactos</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '~/store/main'; // Asegúrate de ajustar la ruta según tu estructura

const isActive = ref(false);
const toggleMenu = () => {
  isActive.value = !isActive.value;
};

// Accedemos a la store para verificar si hay un usuario logueado
const userStore = useUserStore();
const isLoggedIn = computed(() => userStore.user !== null); // Computed que indica si hay usuario logueado
</script>


<style scoped>
/* navbar styling */



.navbar {
  position: fixed;
  width: 100%;
  z-index: 999;
  padding: 60px 0;
  font-family: 'Ubuntu', sans-serif;
  transition: all 0.3s ease;
  border-color: #000000;
 
}

.navbar.sticky {
  padding: 7px 0;
  background: linear-gradient(70deg, #ffffff,#2BA0D9); /* Degradado horizontal */
  border-bottom: 3px solid #F2A922; /* Borde inferior */
}


.navbar .max-width {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar .logo a {
  color: #fff;
  font-size: 35px;
  font-weight: 600;
}

.navbar .logo a span {
  color: #F21651;
  transition: all 0.3s ease;
}

.navbar.sticky .logo a span {
  color: #fff;
}
.navbar li a{
  text-decoration: none;
  color: #ffffff;
}
.a {
  text-decoration: none;
  color:#ffffff;
}
.navbar .menu {
  display: flex; /* Mostrar menú como flexbox en desktop */
  list-style: none; /* Quitar marcadores de lista */
  margin: 0; /* Quitar margen */
  padding: 0; /* Quitar padding */
}

.navbar .menu li {
  list-style: none;
  display: inline-block;
}

.navbar .menu li a {
  display: block;
  color: #ffffff;
  
  font-size: 18px;
  font-weight: 500;
  margin-left: 25px;
  transition: color 0.3s ease;
}

.navbar .menu li a:hover {
  color: #F21651;
}

.navbar.sticky .menu li a:hover {
  color: #fff;
}
.menu-btn {
  color: #000000;
  font-size: 40px;
  cursor: pointer;
  display: none; /* Se mostrará solo en móvil */
  
}

/* Scroll up button styling */
.scroll-up-btn {
  position: fixed;
  height: 45px;
  width: 42px;
  background: #F21651;
  right: 30px;
  bottom: 10px;
  text-align: center;
  line-height: 20px;
  color: #fff;
  z-index: 9999;
  font-size: 30px;
  border-radius: 6px;
  border-bottom-width: 2px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}

.scroll-up-btn.show {
  bottom: 30px;
  opacity: 1;
  pointer-events: auto;
}

.scroll-up-btn:hover {
  filter: brightness(90%);
}

/* Responsive styling */
.max-width {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem; /* Espaciado */
}

.logo img {
  max-height: 50px; /* Asegurar que el logo no exceda los 50px */
}

/* Responsive media query */
@media (max-width: 947px) {
  .menu-btn {
    display: block; /* Mostrar botón del menú en móviles */
    
    top: 20px; /* Ajusta según tu diseño */
    right: 20px; /* Ajusta según tu diseño */
    z-index: 9999; /* Asegúrate de que esté encima del contenido */
    cursor: pointer;
  }
  
  .navbar .menu {
    position: fixed;
    height: 100vh;
    width: 100%;
    left: -100%;
    top: 0;
    background: #F2921D;
    text-align: center;
    padding-top: 80px;
    transition: all 0.3s ease;
    display: block; /* Asegurar que el menú sea bloque en móvil */
  }

  .navbar .menu.active {
    left: 0; /* Mostrar menú al activar */
  }

  .navbar .menu li {
    display: block; /* Mostrar elementos del menú en bloque */
    margin: 15px 0; /* Espaciado entre los elementos del menú */
    text-align: center; /* Centrar el texto en el menú */
    width: 100%; /* Ocupar todo el ancho del menú */
  }

  .navbar .menu li a {
    display: block; /* Asegurar que los enlaces ocupen todo el espacio */
    font-size: 25px; /* Ajustar tamaño de fuente en móviles */
    color: #fff; /* Mantener color blanco */
    text-decoration: none; /* Eliminar subrayado */
    padding: 10px 0; /* Agregar padding */
  }

  .navbar .menu li a:hover {
    background-color: #e07c1d; /* Efecto hover */
  }
  .menu-btn {
      display: block; /* Show menu button on small screens */
      margin-right: 20px; /* Ajuste para mejor separación del logo */
      margin-top: 10px;
    }
  
    /* Ajuste para el logo en móviles */
    .logo img {
      height: 50px; /* Reducir tamaño del logo en móvil */
      margin-top: 15px;
      margin-left: 10px;
    }
}

</style>
