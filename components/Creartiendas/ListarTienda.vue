<template>
  <div class="container mt-5">
    <h1 class="mb-4">Lista de Productos</h1>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <tbody>
          <tr v-for="producto in productos" :key="producto.id" :style="{ backgroundColor: '#F2A922' }">
            <td><strong>Nombre:</strong> {{ producto.nombre }}</td>
            <td><strong>Descripción:</strong> {{ producto.descripcion }}</td>
            <td><strong>Precio:</strong> {{ producto.precio }}</td>
            <td><strong>Stock:</strong> {{ producto.stock }}</td>
            <td><strong>Teléfono:</strong> {{ producto.telefono }}</td>
            <td v-if="producto.imagen"><img :src="producto.imagen" alt="Imagen del producto" width="50" /></td>
            <td class="text-center">
              <button class="btn btn-info btn-sm mr-2" @click="openModal(producto)">
                <i class="fas fa-edit"></i> Actualizar
              </button>
              <button class="btn btn-danger btn-sm" @click="confirmDeleteProducto(producto.id)">
                <i class="fas fa-trash-alt"></i> Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para Actualizar Producto -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Actualizar Producto</h5>
          <button type="button" class="close" @click="closeModal">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateProducto">
            <div class="form-group">
              <label for="nombre">Nombre</label>
              <input v-model="productoForm.nombre" type="text" class="form-control" placeholder="Nombre" required />
            </div>
            <div class="form-group">
              <label for="descripcion">Descripción</label>
              <textarea v-model="productoForm.descripcion" class="form-control" placeholder="Descripción" required></textarea>
            </div>
            <div class="form-group">
              <label for="precio">Precio</label>
              <input v-model="productoForm.precio" type="number" class="form-control" placeholder="Precio" required />
            </div>
            <div class="form-group">
              <label for="stock">Stock</label>
              <input v-model="productoForm.stock" type="number" class="form-control" placeholder="Stock" required />
            </div>
            <div class="form-group">
              <label for="telefono">Teléfono</label>
              <input v-model="productoForm.telefono" type="text" class="form-control" placeholder="Teléfono" required />
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Actualizar</button>
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [],
      showModal: false,
      productoForm: {
        id: null,
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        telefono: '',
        imagen: ''
      }
    };
  },
  async mounted() {
    await this.fetchProductos();
  },
  methods: {
    async fetchProductos() {
      try {
        const response = await fetch('/api/Productos/Select', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data && Array.isArray(data.body)) {
          this.productos = data.body;
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    },
    openModal(producto) {
      this.productoForm = { ...producto };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.productoForm = {
        id: null,
        nombre: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        telefono: '',
        imagen: ''
      };
    },
    confirmDeleteProducto(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        this.deleteProducto(id);
      }
    },
    async deleteProducto(id) {
      if (!id) {
        console.error("ID del producto es undefined. No se puede eliminar.");
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/api/Productos/Delete/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          this.productos = this.productos.filter(producto => producto.id !== id); // Actualiza la lista sin recargar
        } else {
          console.error('Error en la respuesta de eliminación:', response.statusText);
        }
      } catch (error) {
        console.error('Error al intentar eliminar el producto:', error);
      }
    },
    async updateProducto() {
      try {
        await fetch('http://localhost:3000/api/Productos/Update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.productoForm)
        });
        this.closeModal();
        await this.fetchProductos();
      } catch (error) {
        console.error('Error al actualizar producto:', error);
      }
    }
  }
}
</script>
<style scoped>
.table {
    width: 100%;
    margin-top: 20px;
}

.table td {
    padding: 15px;
    text-align: left; 
}

.table td button {
    margin-right: 10px;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;
    width: 100%;
}

.modal-header {
    background-color: #ff9800;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.close {
    font-size: 1.5rem;
    cursor: pointer;
}

.modal-body {
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button.btn-primary {
    background-color: #4CAF50;
    color: white;
}

button.btn-secondary {
    background-color: #f44336;
    color: white;
}

@media (max-width: 768px) {
    .table {
        font-size: 0.9em;
    }

    .table td {
        display: block;
        border: none;
    }

    .table td button {
        width: 100%;
        margin: 5px 0;
    }
}
</style>