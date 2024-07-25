<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-semibold mb-6">Rooms</h1>
    <div v-for="room in rooms" :key="room.id" class="bg-white p-6 rounded-lg shadow mb-6">
      <h2 class="text-xl font-semibold">{{ room.name }}</h2>
      <p>{{ room.description }}</p>
      <p>Capacity: {{ room.capacity }}</p>
      <p>Status: <span :class="{'text-green-500': room.available, 'text-red-500': !room.available}">
        {{ room.available ? 'Available' : 'Booked' }}
      </span></p>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios';

export default {
  name: 'HomePage',
  data() {
    return {
      rooms: []
    };
  },
  created() {
    this.fetchRooms();
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await axios.get('/available');
        this.rooms = response.data;
      } catch (error) {
        console.error('Error fetching rooms', error);
      }
    },
    async bookRoom(roomId) {
      try {
        await axios.post('/book', {
          room_id: roomId,
          booking_date: new Date().toISOString().split('T')[0]
        });
        alert('Room booked successfully');
        this.fetchRooms(); // Refresh room availability
      } catch (error) {
        console.error('Error booking room', error);
      }
    }
  }
};
</script>