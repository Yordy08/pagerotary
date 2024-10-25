<template>
 <div class="html">
  <Navbar />
  <nav class="nuevonav">
    <div class="segundonav">
      <NuxtLink to="/crear-usuario" class="navbar-brand">Registrar</NuxtLink>
      <NuxtLink to="/login" class="navbar-link">Iniciar</NuxtLink>
     
    </div>
  </nav>


  
  <!-- home section start -->
  <section class="home" id="home">
    <div class="max-width">
      <div class="home-content">
        <div class="text-1">Hola, somos Rostary Montería Ronda del Sinú</div>
        <div class="text-2">Bienvenidos</div>
        <div class="text-3">Estamos cargados <br>de <span class="typing"></span></div>
        <a href="#about">Acerca de</a>
      </div>
    </div>
  </section>

  <section class="home" id="home">
      <!-- ... tu contenido ... -->
    </section>

    <NewsSlider /> <!-- Incluir el slider aquí -->

  <!-- about section start -->
  <section class="about" id="about">
    <div class="max-width">
      <h2 class="title">Nosotros</h2>
      <div class="about-content">
        <div class="column left">
          <img
            src="https://fundaciondelclubrotariomonteriarondadelsinu.org/gallery/ROTARY%20-%20MIEMBROS.JPG?ts=1721317559"
            alt="">
        </div>
        <div class="column right">
          <div class="text">Nosotros<br> <span class="typing-2"></span></div>
          <p>La Fundación Rotaria convierte cada aporte en una oportunidad para impactar positivamente en la vida de las personas, tanto en nuestras comunidades locales como a nivel global. A lo largo de más de un siglo de existencia, ha logrado canalizar más de USD 4000 millones hacia proyectos humanitarios que no solo brindan ayuda inmediata, sino que también generan cambios profundos y duraderos. Con el compromiso de quienes creen en un mundo mejor, juntos podemos seguir creando un legado de esperanza y transformación, mejorando las condiciones de vida de aquellos que más lo necesitan, sin importar dónde se encuentren.</p>
          <a href="#services"   onclick="alert('Hola! Yordy esta programando esta funcion ¿lo esperas🤷‍♂️?');">Ver mas</a>
        </div>
      </div>
    </div>
  </section>
 
  <section class="grid">
    <div class="donaciones">
        <h2>Realiza una Donación</h2>
        <p>Tu apoyo es crucial para continuar con nuestra labor. Contribuye a nuestra causa y ayúdanos a hacer la diferencia.</p>
        <button class="donar-btn">Donar</button>
    </div>
    <div class="programas-activos">

        <h2>Programas Activos</h2>
        <ul>
            <li>Programa de Educación para Niños</li>
            <li>Asistencia Alimentaria</li>
            <li>Talleres de Capacitación</li>
        </ul>
        <a href="">
          <button class="donar-btn">Ver  más</button>

        </a>
        
    </div>
</section>
<center>
  <NewssliderEvento /> <!-- Incluir el slider aquí -->
</center>


<section class="ubicacion-section">
  <div class="ubicacion-mapa">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50276.706221738!2d-75.92316984209992!3d8.760546270245136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a2fe5a57031ad%3A0x92e1cbad2ed7c0a0!2zTW9udGVyw61hLCBDw7NyZG9iYQ!5e1!3m2!1ses-419!2sco!4v1729721465454!5m2!1ses-419!2sco" width="100%" height="300"   style="border:0;"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </div>
  
  <div class="ubicacion-descripcion">
    <h2>Ubicación de la Fundación</h2>
    <p>Nos encontramos en Montería, ayudamos a las personas con diversas necesidades a través de programas de apoyo comunitario. Nuestra fundación trabaja en conjunto con la comunidad para impulsar el bienestar y el desarrollo de la región.</p>
    <p>Ven a visitarnos y conoce más sobre nuestros proyectos y cómo puedes involucrarte.</p>
  </div>
</section>

<center>
  <NewsSliderPropuestas /> <!-- Incluir el slider aquí -->
</center>

 
<!-- redes sociales -->
  <section class="contact">
    <div class="max-width">

      <center>
        <div class="text">
          <h1>Redes Sociales</h1>
        </div>
        <hr>
        <br>

        <a href="https://twitter.com/BuenaEsaco?t=2HBamnevpust4f3VUbKFJQ&s=08">
          <img alt="twiter" height="50px" width="50px"
            src="https://cdn-icons-png.flaticon.com/512/1216/1216739.png?w=740&t=st=1669167752~exp=1669168352~hmac=04bcd8a552bd515e169ae9796364a8de872e99286effe51f132bb25013c02602">
        </a>

        <a href="https://www.facebook.com/BuenaEsa.co/">
          <img alt="facebook" height="50px" width="50px"
            src="https://cdn-icons-png.flaticon.com/512/1216/1216706.png?w=740&t=st=1669167978~exp=1669168578~hmac=385422a7a3868c6a6632711a2a5b4d3b090751041917f1fca59d69964260d097">
        </a>

        <a href="https://www.youtube.com/@buenaesa5892">
          <img alt="youtube" height="50px" width="50px"
            src="https://cdn-icons-png.flaticon.com/512/1057/1057160.png?w=740&t=st=1669167863~exp=1669168463~hmac=0d732e68b761ce8ed2d7b24107ad4e18f131a45a39b1a0a574cc8c0de1d12f3d">
        </a>
        <a href="https://www.instagram.com/buenaesa.co/">
          <img alt="instagram" height="50px" width="50px"
            src="https://cdn-icons-png.flaticon.com/512/1177/1177585.png?w=740&t=st=1669167639~exp=1669168239~hmac=3186dae4d5a65bfdf437cf6bbf48e36062880c78f79d33af717bef54de51e40a">
        </a>

      </center>

    </div>
  </section>
  <Footer/>
 </div>

</template>


<script setup>

import Navbar from '~/components/Navbar.vue';
import NewsSlider from '~/components/NewsSlider.vue';
import NewssliderEvento from '~/components/NewssliderEvento.vue';
import NewsSliderPropuestas from '~/components/NewsSliderPropuestas.vue';

import Footer from '~/components/Footer.vue';
import { onMounted, onBeforeUnmount } from 'vue';
import Typed from 'typed.js';

// Función para manejar el scroll y la barra de navegación
const handleScroll = () => {
  const navbar = document.querySelector('.navbar');
  const scrollUpBtn = document.querySelector('.scroll-up-btn');

  if (window.scrollY > 20) {
    if (navbar) navbar.classList.add('sticky');
  } else {
    if (navbar) navbar.classList.remove('sticky');
  }

  if (window.scrollY > 500) {
    if (scrollUpBtn) scrollUpBtn.classList.add('show');
  } else {
    if (scrollUpBtn) scrollUpBtn.classList.remove('show');
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  const scrollUpBtn = document.querySelector('.scroll-up-btn');
  const menuBtn = document.querySelector('.menu-btn');

  // Click event for scroll up button
  if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Click event for menu button
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const menu = document.querySelector('.navbar .menu');
      const menuIcon = menuBtn.querySelector('i');
      if (menu) menu.classList.toggle('active');
      menuIcon.classList.toggle('active');
    });
  }

  // Typing animation initialization
  new Typed(".typing", {
    strings: ["Noticias", "Informacion", "Periodismo", "Comunicados", "Entretenimiento"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });

  new Typed(".typing-2", {
    strings: ["Noticias", "Informacion", "Periodismo", "Comunicados", "Entretenimiento"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
  });
});

onBeforeUnmount(() => {
  // Remove event listeners to prevent memory leaks
  window.removeEventListener('scroll', handleScroll);
});
</script>



<style scoped>
@import '~/public/css/index.css';
.nuevonav {
  padding: 1px 0;
  background: linear-gradient(70deg, #ffffff, #2BA0D9); /* Degradado horizontal */
  border-bottom: 3px solid #F2A922; /* Borde inferior */
  position: relative; /* Asegura que z-index funcione */
  z-index: 1000; /* Lleva este elemento al frente */
}

.segundonav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0px; /* Espacio entre los elementos */
  z-index: 1001; /* Lleva este contenedor aún más adelante */
}

.navbar-brand, .navbar-link {
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 20px; /* Aumenta la zona clicable */
  text-decoration: none; /* Sin subrayado */
  transition: color 0.3s ease;
  position: relative;
  z-index: 1002; /* Asegura que el botón sea clicable */
}

</style>