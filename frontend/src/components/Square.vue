<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
const props = defineProps(['coor']);
const url = import.meta.env.VITE_API_BASE_URL

const move = () => {
  axios.get(`${url}/get`)
}


</script>

<template>
  <button @click="move">CLICK</button>

</template>

<style scoped>
button {
  background-color: #FFF;
  width: 5em;
  height: 5em;
  /* padding: 0; */
  /* border: none; */
}
</style>
