<template>
  <div class="eventos-view">
    <h2>Eventos</h2>
    <!-- Sección para las vistas dinámicas -->
    <section class="dynamic-view" v-if="currentView">
      <component :is="currentView" />
    </section>
    <!-- Sección de acciones solo visible si no hay vista activa -->
    <section class="actions" v-if="!currentView">
      <div class="action" @click="handleAction('crear')">
        <h2>Crear</h2>
        <p>Agregar nuevo evento</p>
      </div>
      <div class="action" @click="handleAction('listar')">
        <h2>Listar</h2>
        <p>Ver eventos existentes</p>
      </div>
    </section>
  </div>
</template>

<script>
import CrearEventos from '~/components/Createevento/Createeventos.vue'
import ListarEventos from '~/components/Createevento/Listareventos.vue'

export default {
  name: 'EventosView',
  components: {
    CrearEventos,  // Importa el componente para crear eventos
    ListarEventos  // Importa el componente para listar eventos
  },
  data() {
    return {
      currentView: null  // Estado para cambiar la vista
    }
  },
  methods: {
    handleAction(action) {
      if (action === 'crear') {
        this.currentView = 'CrearEventos';  // Carga la vista para crear eventos
      } else if (action === 'listar') {
        this.currentView = 'ListarEventos';  // Carga la vista para listar eventos
      }
    }
  }
}
</script>

<style scoped>
.eventos-view {
  background-color: #fafafa;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.eventos-view h2 {
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
