<template>
  <div>
    <Nav />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script>
import Nav from '~/components/Nav.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Nav,
    Footer
  }
}
</script>

<style>
/* Estilos globales, si los hay */
</style>
