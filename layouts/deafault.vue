<template>
  <div>
    <Nav/>
    <Navbar />

    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup>
import Nav from '~/components/Nav.vue';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
</script>
