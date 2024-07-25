<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-semibold mb-6 text-center">Register</h1>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block mb-1 font-medium" for="username">Username</label>
          <input v-model="username" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" id="username" type="text" required>
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium" for="email">Email</label>
          <input v-model="email" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" id="email" type="email" required>
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium" for="password">Password</label>
          <input v-model="password" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" id="password" type="password" required>
        </div>
        <button class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
      </form>
      <p class="mt-4 text-center">
        Already have an account? <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios';

export default {
  name: 'RegisterPage',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.$router.push('/login');
      } catch (error) {
        console.error('Registration failed', error);
      }
    }
  }
};
</script>
