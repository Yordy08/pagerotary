<template>
  <footer class="footer">
    <div class="max-width">
      <div class="footer-content">
        <div class="footer-section about">
          <h2>Sobre Nosotros</h2>
          <p>
            Somos una fundación dedicada a brindar apoyo y soluciones a las personas más necesitadas. Nuestra misión es
            cambiar vidas y hacer un impacto positivo en la comunidad.
          </p>
        </div>
        <div class="footer-section links">
          <h2>Enlaces Rápidos</h2>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Proyectos</a></li>
            <li><a href="#">Voluntarios</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
        <div class="footer-section contact">
          <h2>Contacto</h2>
          <p><i class="fas fa-phone"></i> +1 234 567 890</p>
          <p><i class="fas fa-envelope"></i> info@fundacion.org</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Fundación | Todos los derechos reservados</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 50px 0;
}

.max-width {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  margin: 20px;
}

.footer-section h2 {
  font-size: 18px;
  margin-bottom: 20px;
}

.footer-section p {
  line-height: 1.6;
  color: #ccc;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin: 10px 0;
}

.footer-section ul li a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #f21651;
}

.footer-bottom {
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid #555;
  margin-top: 20px;
}

.footer-bottom p {
  color: #ccc;
  margin: 0;
}

.footer-section i {
  margin-right: 10px;
  color: #f21651;
}

/* Responsive footer */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-section {
    margin-bottom: 30px;
  }
}
</style>
