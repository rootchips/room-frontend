<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-semibold mb-6 text-center">Login</h1>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block mb-1 font-medium" for="username">Username</label>
          <input v-model="username" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" id="username" type="text" required>
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium" for="password">Password</label>
          <input v-model="password" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" id="password" type="password" required>
        </div>
        <button class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
      </form>
      <p class="mt-4 text-center">
        Don't have an account? <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/login', {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('token', response.data.token);
        
        // Decode the JWT to get the user role
        const base64Url = response.data.token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const payload = JSON.parse(jsonPayload);
        localStorage.setItem('role', payload.role);

        this.$router.push('/');
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  }
};
</script>