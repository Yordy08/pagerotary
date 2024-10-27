<template>
    <nav class="navbar">
      <div class="max-width">
        <div class="logo">
          <a href="/">
            <img
              height="50px"
              width="100%"
              alt="logo"
              src="https://www.rotary.org/sites/all/themes/rotary_rotaryorg/images/rotary-logo-color-2019-simplified.svg"
            />
          </a>
        </div>
        <div class="menu-btn" @click="toggleMenu">
          <i class="fas fa-bars" :class="{ active: isActive }"></i>
        </div>
        <ul class="menu" :class="{ active: isActive }">
          <!-- Mostrar todos los elementos del menú -->
          <li v-if="isLoggedIn"><NuxtLink class="a" to="/dashboard">Admin</NuxtLink></li>
          <li v-if="isLoggedIn"><NuxtLink class="a" to="/">Inicio</NuxtLink></li>
          <li v-if="isLoggedIn"><NuxtLink class="a" to="/dashboard">Programas</NuxtLink></li>
          <li v-if="isLoggedIn"><NuxtLink class="a" to="/dashboard">Noticias</NuxtLink></li>
          <li v-if="isLoggedIn"><NuxtLink class="a" to="/dashboard">Eventos</NuxtLink></li>
          <li v-if="isLoggedIn"><NuxtLink class="a" to="/dashboard">Propuestas</NuxtLink></li>
          <li v-if="isLoggedIn"><NuxtLink class="a" to="/dashboard">Contactos</NuxtLink></li>
        
        </ul>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isActive = ref(false);
  const isLoggedIn = ref(true); // Cambiar según la lógica de tu aplicación
  
  const toggleMenu = () => {
    isActive.value = !isActive.value;
  };
  </script>
  
  <style scoped>
  /* General Navbar Styling */
  .navbar {
    background: linear-gradient(70deg, #ffffff, #2BA0D9); /* Degradado horizontal */
    padding: 1px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: fixed;
    width: 95%;
    z-index: 10;
    height: 70px;
    transition: background-color 0.3s ease;
    border-bottom: 3px solid #F2A922; /* Borde inferior */
  }
  
  .max-width {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: auto;
  }
  
  /* Logo Styling */
  .logo img {
    height: 50px;
    transition: transform 0.3s ease;
  }
  
  .logo img:hover {
    transform: scale(1.1); /* Zoom on hover */
  }
  
  /* Menu Styling */
  .menu {
    display: flex;
    align-items: center;
    gap: 30px;
    list-style: none;
  }
  
  .menu li {
    position: relative;
  }
  
  .menu li a,
  .menu li .menu-btn {
    color: #333;
    font-size: 1em;
    font-weight: 600;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 8px;
    transition: background 0.3s, color 0.3s;
  }
  
  .menu li a:hover,
  .menu li .menu-btn:hover {
    color: #fff;
    background: #ff6700; /* Soft Orange for highlight */
    box-shadow: 0 4px 10px rgba(255, 103, 0, 0.3);
  }
  
  /* Mostrar el botón de menú en dispositivos móviles */
  .menu-btn {
    display: none; /* Ocultar por defecto */
    font-size: 1.8em;
    color: #333;
    cursor: pointer;
    transition: color 0.3s ease;
    margin-left: 20px; /* Ajusta este valor para mover el ícono más a la izquierda o derecha */
  }
  
  .menu-btn:hover {
    color: #ff6700; /* Highlight color for the icon */
  }
  
  /* Show menu in mobile */
  .menu.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #f9f9f9;
    padding: 10px;
    border-radius: 0 0 8px 8px;
  }
  
  .menu.active li {
    text-align: center;
    margin: 5px 0; /* Ajustar el margen */
  }
  
  /* Hover Effect for Subtle Underline Animation */
  .menu li a::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #ff6700;
    transition: width 0.3s;
    margin-top: 5px;
  }
  
  .menu li a:hover::after {
    width: 100%; /* Grows underline on hover */
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .menu {
      display: none; /* Hide menu initially */
      flex-direction: column; /* Stack items vertically */
    }
  
    .menu.active {
      display: flex; /* Show menu when active */
    }
  
    .menu-btn {
      display: block; /* Show menu button on small screens */
    }
  }
  </style>
  