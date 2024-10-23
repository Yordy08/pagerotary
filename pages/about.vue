<template>
  <form @submit.prevent="submit">
    <input type="file" @change="selectFile" />
    <button type="submit">Subir Imagen</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const selectedFile = ref(null)

const selectFile = (event) => {
  selectedFile.value = event.target.files[0]
}

const submit = async () => {
  const formData = new FormData()
  formData.append('photo', selectedFile.value)

  const response = await fetch('/api/Upload/imagen', {
    method: 'POST',
    body: formData
  })

  const data = await response.json()
  console.log('->:', data)
} </script>