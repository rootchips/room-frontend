<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-white text-xl font-semibold">Room Booking</div>
      <div>

        <router-link to="/" class="text-gray-300 hover:text-white mx-2" v-if="isLoggedIn">Home</router-link>
        <router-link to="/rooms" class="text-gray-300 hover:text-white mx-2" v-if="isLoggedIn">Rooms</router-link>
        <router-link to="/bookings" class="text-gray-300 hover:text-white mx-2" v-if="isLoggedIn">Bookings</router-link>
        <router-link to="/admin" class="text-gray-300 hover:text-white mx-2" v-if="isAdmin">Admin</router-link>
        <button @click="logout" class="text-gray-300 hover:text-white mx-2" v-if="isLoggedIn">Logout</button>
        <template v-else>
          <router-link to="/login" class="text-gray-300 hover:text-white mx-2">Login</router-link>
          <router-link to="/register" class="text-gray-300 hover:text-white mx-2">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'MainNavigation',
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      this.isLoggedIn = !!token;
      this.isAdmin = role === 'admin';
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.$router.push('/login');
    }
  },
  watch: {
    '$route'() {
      this.checkAuth();
    }
  }
};
</script>