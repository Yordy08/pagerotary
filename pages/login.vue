<template>
    <div class="container">
        <div class="form-container">
            <div>
                <h2 class="title">Sign in to your account</h2>
            </div>
            <form class="form" @submit.prevent="login">
                <div class="input-group">
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" autocomplete="email" required
                            class="input" placeholder="Email address" v-model="email">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required
                            class="input" placeholder="Password" v-model="password">
                    </div>
                </div>
                <div>
                    <button type="submit" class="submit-button">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import {loginUser} from '~/store/Action'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
    try {
        const response = await loginUser({ correo: email.value, contraseña: password.value });
        if (response.usuario) {
        
           await router.push('/dashboard');
        } else {
            alert('Login failed: ' + response.message);
        }
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
};
</script>

<style scoped>
.container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
}

.form-container {
    max-width: 400px;
    width: 100%;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.title {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 1.875rem;
    font-weight: 800;
    color: #1f2937;
}

.form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.input, .submit-button {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #1f2937;
    box-sizing: border-box;
}

.input {
    border: 1px solid #d1d5db;
}

.submit-button {
    border: none;
    font-weight: 500;
    color: #ffffff;
    background-color: #4f46e5;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #4338ca;
}
</style>
