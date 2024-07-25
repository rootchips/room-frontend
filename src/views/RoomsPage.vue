<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-2xl font-semibold mb-6">Rooms</h1>
    <div v-for="room in rooms" :key="room.id" class="bg-white p-6 rounded-lg shadow mb-6">
      <h2 class="text-xl font-semibold">{{ room.name }}</h2>
      <p>{{ room.description }}</p>
      <p>Capacity: {{ room.capacity }}</p>
      <button @click="bookRoom(room.id)" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">Book</button>
    </div>
  </div>
</template>

<script>
import axios from '../plugins/axios';

export default {
  name: 'RoomsPage',
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
        const response = await axios.get('/rooms');
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
      } catch (error) {
        console.error('Error booking room', error);
      }
    }
  }
};
</script>
