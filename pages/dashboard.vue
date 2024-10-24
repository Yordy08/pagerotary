<template>
 
  <div class="dashboard">
    <nav class="sidebar">
      <ul>
        <li><NuxtLink to="/">Inicio</NuxtLink></li>
        <CerrarSesion />
        <li><a href="#" @click="changeView('perfil')">Perfil</a></li>
        <li><a href="#" @click="changeView('noticias')">Noticias</a></li>
        <li><a href="#" @click="changeView('eventos')">Eventos</a></li>
        <li><a href="#" @click="changeView('propuestas')">Propuestas</a></li>
      </ul>
      
    </nav>

    <div class="main-content">
      <header>
        <h1>Bienvenido al Dashboard</h1>
      </header>

      <!-- Ocultar widgets si currentView no es null -->
      <section class="widgets" v-if="!currentView">
        <div class="widget" @click="changeView('ventas')">
          <h2>Noticias</h2>
          <p>$5,000</p>
        </div>
        <div class="widget" @click="changeView('usuarios')">
          <h2>Propuestas</h2>
          <p>1,200</p>
        </div>
        <div class="widget" @click="changeView('pedidos')">
          <h2>Usuarios</h2>
          <p>320</p>
        </div>
      </section>

      <!-- Sección para las vistas dinámicas -->
      <section class="dynamic-view" v-if="currentView">
        <component :is="currentView" />
      </section>

      <!-- Botón flotante y menú desplegable (Solo visible en móvil) -->
      <div class="floating-menu" v-if="isMobile">
        <button @click="toggleMenu" class="menu-btn">☰</button>
        <ul v-if="menuVisible" class="floating-items">
          <li @click="changeView('perfil')">Usuarios</li>
          <li @click="changeView('noticias')">Noticias</li>
          <li @click="changeView('eventos')">Eventos</li>
          <li @click="changeView('propuestas')">Propuestas</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import CerrarSesion from '~/components/CerrarSesion.vue';
import PerfilView from '~/components/PerfilView.vue';
import EventosView from '~/components/EventosView.vue';
import NoticiasView from '~/components/NoticiasView.vue';
import PropuestaView from '~/components/PropuestaView.vue';

export default {
  data() {
    return {
      currentView: null,  // Maneja la vista actual
      menuVisible: false, // Controla la visibilidad del menú flotante
      isMobile: false,    // Variable para detectar si es móvil
    };
  },
  components: {
    PerfilView,
    EventosView,
    NoticiasView,
    PropuestaView
  },
  mounted() {
    // Detecta el tamaño de la pantalla al cargar la página
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile);
  },
  beforeDestroy() {
    // Elimina el listener de eventos cuando el componente se destruye
    window.removeEventListener('resize', this.checkIfMobile);
  },
  methods: {
    checkIfMobile() {
      // Si el ancho de la ventana es menor o igual a 768px, considera que es móvil
      this.isMobile = window.innerWidth <= 768;
    },
    changeView(view) {
      // Cambia la vista actual según la opción seleccionada
      if (view === 'perfil') {
        this.currentView = 'PerfilView';
      } else if (view === 'eventos') {
        this.currentView = 'EventosView';
      } else if (view === 'noticias') {
        this.currentView = 'NoticiasView';
      } else if (view === 'propuestas') {
        this.currentView = 'PropuestaView'; // Nombre del componente corregido
      }
      this.menuVisible = false; // Oculta el menú después de seleccionar una vista
    },
    toggleMenu() {
      // Alterna la visibilidad del menú flotante
      this.menuVisible = !this.menuVisible;
    }
  }
}
</script>


<style scoped>
/* Estilos base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f4f9;
  color: #F2A922;
}

.dashboard {
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: column; /* Cambia el flujo a columna para móviles */
}

/* Barra lateral flotante */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: #184A8C;
  color: #F2A922;
  padding: 20px;
  box-shadow:#F2A922;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 20px;
}

.sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.sidebar a:hover {
  background-color: #F2A922;
}

.sidebar a.active {
  background-color: #4CAF50;
}

/* Contenido principal */
.main-content {
  margin-left: 200px;
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

header h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
}

.widgets {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.widget {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 30%;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.widget:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.widget h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.widget p {
  font-size: 1.2em;
  color: #666;
}

/* Vista dinámica */
.dynamic-view {
  background-color: #fafafa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: 300px;
  margin-top: 20px;
}

/* Botón flotante y menú desplegable (solo visible en móvil) */


/* Menú flotante y botón en la esquina inferior derecha */
.floating-menu {
  position: fixed;
  bottom: 20px; /* Botón fijo en la parte inferior */
  right: 20px;
  z-index: 1000;
}

.menu-btn {
  background-color: #F2A922;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 2em;
  cursor: pointer;
  box-shadow: 0 8px 10px rgba(46, 30, 223, 0.7);
  transition: background-color 0.3s ease;
}

.menu-btn:hover {
  background-color: #F2A922;
}

.floating-items {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: white;
  box-shadow: 0 4px 10px rgba(27, 17, 212, 0.1);
  border-radius: 10px;
  position: absolute;
  bottom: 70px; /* Ajusta para que el menú aparezca hacia arriba */
  right: 0;
  width: 150px;
  transition: all 0.3s ease-in-out;
  animation: slide-up 0.3s ease forwards; /* Animación para desplegar hacia arriba */
}

.floating-items li {
  padding: 10px;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s ease;
}

.floating-items li:last-child {
  border-bottom: none;
}

.floating-items li:hover {
  background-color: #f0f0f0;
}

/* Animación para desplegar hacia arriba */
@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }
  
  .sidebar {
    display: none;
  }
}
/* Media Queries para dispositivos móviles */
@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .sidebar {
    display: none; /* Oculta la barra lateral en móviles */
  }

  .main-content {
    margin-left: 0;
    padding: 10px;
  }

  .widgets {
    flex-direction: column;
    align-items: center;
  }

  .widget {
    width: 80%; /* Ajusta el ancho de los widgets en móviles */
    margin-bottom: 20px;
  }

  header h1 {
    font-size: 2em;
  }

  .floating-menu {
    display: block;
  }
}

/* Mostrar la barra lateral en pantallas grandes */
@media (min-width: 769px) {
  .floating-menu {
    display: none;
  }

  .sidebar {
    display: block;
  }
}

</style>