// Asegúrate de que jQuery esté disponible globalmente
if (typeof window !== 'undefined' && typeof $ !== 'undefined') {
    $(function () {
      // Navbar sticky en el scroll
      $(window).on('scroll', function () {
        if (this.scrollY > 20) {
          $('.navbar').addClass("sticky");
        } else {
          $('.navbar').removeClass("sticky");
        }
  
        // Mostrar/ocultar botón de scroll-up
        if (this.scrollY > 500) {
          $('.scroll-up-btn').addClass("show");
        } else {
          $('.scroll-up-btn').removeClass("show");
        }
      });
  
      // Script para el botón de subir
      $('.scroll-up-btn').on('click', function () {
        $('html').animate({ scrollTop: 0 });
        // Remover smooth scroll al hacer click
        $('html').css("scrollBehavior", "auto");
      });
  
      // Reaplicar smooth scroll cuando se hace click en los elementos del menú
      $('.navbar .menu li a').on('click', function () {
        $('html').css("scrollBehavior", "smooth");
      });
  
      // Script para el botón de menú/navbar
      $('.menu-btn').on('click', function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
      });
  
      // Script de animación de texto con Typed.js
      var typedOptions = {
        strings: ["Noticias", "Informacion", "Periodismo", "Comunicados", "Entretenimiento"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
      };
  
      var typed = new Typed(".typing", typedOptions);
      var typed2 = new Typed(".typing-2", typedOptions);
  
      // Script para el carrusel con OwlCarousel
      $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
            nav: false
          },
          600: {
            items: 2,
            nav: false
          },
          1000: {
            items: 3,
            nav: false
          }
        }
      });
    });
  } else {
    console.error("jQuery no está definido. Asegúrate de que jQuery se haya cargado correctamente.");
  }
  
  