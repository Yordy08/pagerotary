<template>
    <div class="form-container">
      <!-- Alerta de éxito -->
      <div v-if="alertaVisible" class="alerta-exito">
        <p>{{ mensajeAlerta }}</p>
        <button @click="cerrarAlerta">OK</button>
      </div>
  
      <!-- Alerta de error -->
      <div v-if="errorVisible" class="alerta-error">
        <p>{{ mensajeError }}</p>
        <button @click="cerrarError">OK</button>
      </div>
  
      <form @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input v-model="usuario.nombre" type="text" id="nombre" required />
          </div>
    
          <div class="form-group">
            <label for="correo">Correo</label>
            <input v-model="usuario.correo" type="email" id="correo" required />
          </div>
        </div>
    
        <div class="form-row">
          <div class="form-group">
            <label for="contraseña">Contraseña</label>
            <input v-model="usuario.contraseña" type="password" id="contraseña" required />
          </div>
    
          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input v-model="usuario.telefono" type="tel" id="telefono" required />
          </div>
        </div>
    
        <div class="form-row">
          <div class="form-group">
            <label for="fechaCreacion">Fecha de Creación</label>
            <input v-model="usuario.fechaCreacion" type="date" id="fechaCreacion" required />
          </div>
    
          <div class="form-group">
            <label for="estado">Estado</label>
            <select v-model="usuario.estado" id="estado" required>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="retirado">Retirado</option>
            </select>
          </div>
        </div>
    
        <div class="form-group">
          <label for="rol">Rol</label>
          <select v-model="usuario.rol" id="rol" required>
            <option value="admin">Admin</option>
            <option value="usuario">Usuario</option>
            <option value="editor">Editor</option>
          </select>
        </div>
    
        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  </template>
<script setup>
import { ref } from 'vue';

// Definir los campos del usuario
const usuario = ref({
  nombre: '',
  correo: '',
  contraseña: '',
  telefono: '',
  fechaCreacion: '',
  estado: 'activo',
  rol: 'usuario',
});

// Estados para las alertas
const alertaVisible = ref(false);
const mensajeAlerta = ref('');
const errorVisible = ref(false);
const mensajeError = ref('');

// Función para enviar el formulario
const submitForm = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/Usuarios/Create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario.value),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const data = await response.json();
    mensajeAlerta.value = 'Usuario Rorary creado';
    alertaVisible.value = true;
  } catch (error) {
    mensajeError.value = 'Error al crear usuario';
    errorVisible.value = true;
  }
};

// Función para cerrar la alerta de éxito y limpiar el formulario
const cerrarAlerta = () => {
  alertaVisible.value = false;
  
  // Resetear los campos del usuario
  usuario.value = {
    nombre: '',
    correo: '',
    contraseña: '',
    telefono: '',
    fechaCreacion: '',
    estado: 'activo',
    rol: 'usuario',
  };
};

// Función para cerrar la alerta de error
const cerrarError = () => {
  errorVisible.value = false;
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-row .form-group {
  flex: 1;
  margin-right: 10px;
}

.form-row .form-group:last-child {
  margin-right: 0;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}

.alerta-exito,
.alerta-error {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.alerta-error {
  background-color: #f44336;
}

.alerta-exito button,
.alerta-error button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: 20px;
  padding: 0 10px;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .form-group {
    margin-right: 0;
  }

  button {
    width: 100%;
  }
}
</style>
  