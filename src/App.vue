<template>
  <div>
    <MainNavigation />
    <router-view />
  </div>
</template>

<script>
import MainNavigation from './components/MainNavigation.vue';

export default {
  name: 'App',
  components: {
    MainNavigation
  },
};
</script>
