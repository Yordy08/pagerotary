<template>
    <div class="create-tienda">
      <!-- Mensaje de éxito al crear el producto -->
      <div v-if="successMessage" class="alert alert-success">
        <p>{{ successMessage }}</p>
        <button @click="closeAlert" class="btn btn-success">OK</button>
      </div>
  
      <!-- Formulario para crear un producto -->
      <form @submit.prevent="submitProducto">
        <div class="form-group">
          <label for="nombre">Nombre del producto</label>
          <input
            v-model="producto.nombre"
            type="text"
            id="nombre"
            class="form-control"
            placeholder="Nombre del producto"
            required
          />
        </div>
        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <textarea
            v-model="producto.descripcion"
            id="descripcion"
            class="form-control"
            placeholder="Descripción del producto"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="precio">Precio</label>
          <input
            v-model="producto.precio"
            type="number"
            id="precio"
            class="form-control"
            placeholder="Precio del producto"
            required
          />
        </div>
        <div class="form-group">
          <label for="stock">Stock</label>
          <input
            v-model="producto.stock"
            type="number"
            id="stock"
            class="form-control"
            placeholder="Cantidad en stock"
            required
          />
        </div>
        <div class="form-group">
          <label for="telefono">Teléfono de contacto</label>
          <input
            v-model="producto.telefono"
            type="tel"
            id="telefono"
            class="form-control"
            placeholder="Teléfono de contacto"
            required
          />
        </div>
        <div class="form-group">
          <label for="imagen">Imagen del producto (opcional)</label>
          <input type="file" @change="selectFile" id="imagen" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Crear Producto</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Estado para el formulario de creación de productos
  const producto = ref({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagenUrl: '',
    telefono: ''
  })
  
  // Estado para la imagen seleccionada
  const selectedFile = ref(null)
  
  // Estado para mostrar el mensaje de éxito
  const successMessage = ref('')
  
  // Función para manejar la selección de archivo
  const selectFile = (event) => {
    selectedFile.value = event.target.files[0]
  }
  
  // Función para enviar el formulario directamente a la base de datos
  const submitProducto = async () => {
    try {
      // Subir la imagen primero si hay una seleccionada
      if (selectedFile.value) {
        const formData = new FormData()
        formData.append('photo', selectedFile.value)
  
        // Enviar la imagen al endpoint '/api/Upload/imagen'
        const imageResponse = await fetch('/api/Upload/imagen', {
          method: 'POST',
          body: formData
        })
  
        const imageData = await imageResponse.json()
        console.log('Imagen subida con éxito:', imageData)
  
        // Guardar la URL segura de la imagen en producto.imagenUrl
        producto.value.imagenUrl = imageData.secure_url
      }
  
      // Ahora enviar los datos del producto junto con la URL de la imagen
      const productoData = {
        nombre: producto.value.nombre,
        descripcion: producto.value.descripcion,
        precio: producto.value.precio,
        stock: producto.value.stock,
        telefono: producto.value.telefono,
        imagen: producto.value.imagenUrl || '' // La URL de la imagen si existe, si no se envía vacío
      }
  
      // Enviar los datos del producto a la base de datos
      const response = await fetch('/api/Productos/Create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productoData)
      })
  
      const data = await response.json()
      console.log('Producto creado:', data)
  
      // Limpiar los campos del formulario después del envío
      producto.value = {
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        imagenUrl: '',
        telefono: ''
      }
      selectedFile.value = null
  
      // Mostrar el mensaje de éxito
      successMessage.value = 'El producto fue creado correctamente.'
    } catch (error) {
      console.error('Error creando el producto:', error)
    }
  }
  
  // Función para cerrar el mensaje de alerta
  const closeAlert = () => {
    successMessage.value = ''
  }
  </script>
  
  <style scoped>
  .create-tienda {
    background-color: #fafafa;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  
  .alert {
    margin-bottom: 20px;
  }
  
  .alert-success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    font-weight: bold;
  }
  
  .form-control {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  