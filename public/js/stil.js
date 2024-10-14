let lastScrollTop = 0; // Guardar la posición de desplazamiento anterior

window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    const st = window.pageYOffset || document.documentElement.scrollTop; // Obtener la posición actual del desplazamiento

    if (st > lastScrollTop) {
        // Desplazándose hacia abajo
        navbar.classList.add("sticky"); // Agregar clase para cambiar el color
    } else {
        // Desplazándose hacia arriba
        navbar.classList.remove("sticky"); // Remover clase para regresar al color original
    }
    lastScrollTop = st <= 0 ? 0 : st; // Para evitar un valor negativo
});
