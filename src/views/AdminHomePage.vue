<template>
      <div class="min-h-screen bg-gray-100 p-8">
        <h1 class="text-2xl font-semibold mb-6">Admin Dashboard</h1>
        <button @click="showAddRoomForm = true" class="bg-blue-500 text-white px-4 py-2 rounded mb-6">Add New Room</button>
        <div v-if="showAddRoomForm" class="bg-white p-6 rounded-lg shadow mb-6">
          <h2 class="text-xl font-semibold mb-4">Add New Room</h2>
          <form @submit.prevent="addRoom">
            <div class="mb-4">
              <label class="block mb-1 font-medium" for="name">Name</label>
              <input v-model="newRoom.name" class="w-full px-4 py-2 border rounded" id="name" type="text" required>
            </div>
            <div class="mb-4">
              <label class="block mb-1 font-medium" for="description">Description</label>
              <textarea v-model="newRoom.description" class="w-full px-4 py-2 border rounded" id="description" required></textarea>
            </div>
            <div class="mb-4">
              <label class="block mb-1 font-medium" for="capacity">Capacity</label>
              <input v-model="newRoom.capacity" class="w-full px-4 py-2 border rounded" id="capacity" type="number" required>
            </div>
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Add Room</button>
            <button @click="showAddRoomForm = false" class="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
          </form>
        </div>
        <div v-for="room in rooms" :key="room.id" class="bg-white p-6 rounded-lg shadow mb-6">
          <h2 class="text-xl font-semibold">{{ room.name }}</h2>
          <p>{{ room.description }}</p>
          <p>Capacity: {{ room.capacity }}</p>
          <button @click="editRoom(room)" class="bg-yellow-500 text-white px-4 py-2 rounded mt-4">Edit</button>
          <button @click="deleteRoom(room.id)" class="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2">Delete</button>
        </div>
        <div v-if="showEditRoomForm" class="bg-white p-6 rounded-lg shadow mb-6">
          <h2 class="text-xl font-semibold mb-4">Edit Room</h2>
          <form @submit.prevent="updateRoom">
            <div class="mb-4">
              <label class="block mb-1 font-medium" for="edit-name">Name</label>
              <input v-model="editRoomData.name" class="w-full px-4 py-2 border rounded" id="edit-name" type="text" required>
            </div>
            <div class="mb-4">
              <label class="block mb-1 font-medium" for="edit-description">Description</label>
              <textarea v-model="editRoomData.description" class="w-full px-4 py-2 border rounded" id="edit-description" required></textarea>
            </div>
            <div class="mb-4">
              <label class="block mb-1 font-medium" for="edit-capacity">Capacity</label>
              <input v-model="editRoomData.capacity" class="w-full px-4 py-2 border rounded" id="edit-capacity" type="number" required>
            </div>
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Update Room</button>
            <button @click="showEditRoomForm = false" class="bg-red-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
          </form>
        </div>
      </div>
    </template>
    
    <script>
    import axios from '../plugins/axios';
    
    export default {
      name: 'AdminHomePage',
      data() {
        return {
          rooms: [],
          showAddRoomForm: false,
          showEditRoomForm: false,
          newRoom: {
            name: '',
            description: '',
            capacity: ''
          },
          editRoomData: {
            id: '',
            name: '',
            description: '',
            capacity: ''
          }
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
        async addRoom() {
          try {
            await axios.post('/admin/rooms', this.newRoom);
            this.newRoom = { name: '', description: '', capacity: '' };
            this.showAddRoomForm = false;
            this.fetchRooms();
          } catch (error) {
            console.error('Error adding room', error);
          }
        },
        editRoom(room) {
          this.editRoomData = { ...room };
          this.showEditRoomForm = true;
        },
        async updateRoom() {
          try {
            await axios.put(`/admin/rooms/${this.editRoomData.id}`, this.editRoomData);
            this.showEditRoomForm = false;
            this.fetchRooms();
          } catch (error) {
            console.error('Error updating room', error);
          }
        },
        async deleteRoom(id) {
          try {
            await axios.delete(`/admin/rooms/${id}`);
            this.fetchRooms();
          } catch (error) {
            console.error('Error deleting room', error);
          }
        }
      }
    };
    </script>