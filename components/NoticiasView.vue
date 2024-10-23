<template>
  <div class="noticias-view">
     <h2>Noticias</h2>
     <!-- Sección para las vistas dinámicas -->
     <section class="dynamic-view" v-if="currentView">
      <component :is="currentView" />
    </section>
    <!-- Sección de acciones solo visible si no hay vista activa -->
    <section class="actions" v-if="!currentView">
      <div class="action" @click="handleAction('crear')">
        <h2>Crear</h2>
        <p>Agregar nueva noticia</p>
      </div>
      <div class="action" @click="handleAction('listar')">
        <h2>Listar</h2>
        <p>Ver noticias existentes</p>
      </div>
    </section>
  </div>
</template>

<script>
import CrearNoticias from '~/components/Createnoticias/Crearnoticias.vue';
import ListarNoticias from '~/components/Createnoticias/Listarnoticias.vue'; 

export default {
  name: 'NoticiasView',
  components: {
    CrearNoticias, 
    ListarNoticias, 
  },
  data() {
    return {
      currentView: null, 
    };
  },
  methods: {
    handleAction(action) {
      if (action === 'crear') {
        this.currentView = 'CrearNoticias'; 
      } else if (action === 'listar') {
        this.currentView = 'ListarNoticias'; 
      }
    },
  },
};
</script>

<style scoped>
.noticias-view {
  background-color: #fafafa;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.noticias-view h2 {
  font-size: 2em;
  margin-bottom: 20px;
  text-align: center;
}

.actions {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px; 
}

.action {
  background-color: #ffffff00;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(242, 169, 34, 0.769);
  padding: 30px;
  width: 40%;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 10px;
}

.action:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(24, 74, 140, 0.769);
}

.action h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.action p {
  font-size: 1em;
  color: #666;
}

.dynamic-view {
  margin-top: 30px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
}

/* Modo móvil: Un elemento debajo del otro */
@media (max-width: 768px) {
  .actions {
    flex-direction: column;
    align-items: center;
  }

  .action {
    width: 80%; 
  }
}
</style>
