<template>
    <div class="form-container">
      <h2>Crear Usuario</h2>
      <form @submit.prevent="crearUsuario">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            v-model="usuario.nombre"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            v-model="usuario.correo"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            v-model="usuario.contraseña"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            v-model="usuario.telefono"
            required
          />
        </div>
  
        <button type="submit" class="submit-button">
          Guardar Usuario
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        usuario: {
          nombre: '',
          correo: '',
          contraseña: '',
          telefono: '',
          fechaCreacion: new Date().toISOString(), // Fecha por defecto
          estado: 'activo', // Estado por defecto
          rol: 'usuario', // Rol por defecto
        },
      };
    },
    methods: {
      async crearUsuario() {
        try {
          const response = await fetch('/Usuarios/Create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.usuario),
          });
  
          if (response.ok) {
            alert('Usuario creado exitosamente');
          } else {
            alert('Error al crear el usuario');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error de conexión');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 1.5em;
  }
  
  input {
    width: 100%;
    padding: 0.75em;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  label {
    margin-bottom: 0.5em;
    font-weight: bold;
  }
  
  .submit-button {
    padding: 0.75em 1.5em;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.1em;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  </style>
  