<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-semibold mb-6">My Bookings</h1>
    <div v-for="booking in bookings" :key="booking.id" class="bg-white p-6 rounded-lg shadow mb-6">
      <h2 class="text-xl font-semibold">Room: {{ booking.room_name }}</h2>
      <p>Booking Date: {{ booking.booking_date }}</p>
      <p>Status: {{ booking.status }}</p>
      <button @click="cancelBooking(booking.id)" class="bg-red-500 text-white px-4 py-2 rounded mt-4" v-if="booking.status === 'booked'">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios';

export default {
  name: 'BookingsPage',
  data() {
    return {
      bookings: []
    };
  },
  created() {
    this.fetchBookings();
  },
  methods: {
    async fetchBookings() {
      try {
        const response = await axios.get('/bookings');
        this.bookings = response.data;
      } catch (error) {
        console.error('Error fetching bookings', error);
      }
    },
    async cancelBooking(bookingId) {
      try {
        await axios.post(`/cancel/${bookingId}`);
        alert('Booking cancelled successfully');
        this.fetchBookings(); // Refresh booking list
      } catch (error) {
        console.error('Error cancelling booking', error);
      }
    }
  }
};
</script>