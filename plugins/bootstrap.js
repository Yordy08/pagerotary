// plugins/bootstrap.js
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  // Solo carga Bootstrap en el cliente
  if (process.client) {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then(() => {
        console.log('Bootstrap cargado correctamente en el cliente.');
      })
      .catch((error) => {
        console.error('Error al cargar Bootstrap:', error);
      });
  }
});
