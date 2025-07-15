<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
const props = defineProps(['coor']);
const url = import.meta.env.VITE_API_BASE_URL
const data = ref('')

async function test() {
  data.value = await axios.get(`${url}/get`, { withCredentials: true }).then((res) => {
    return res.data
  }).catch((err) => console.log("SOMETHING WENT WRONG: " + err))
}
</script>

<template>
  <button @click="test">{{ props.coor.x }},{{ props.coor.y }}</button>
  <p>{{ data }}</p>
</template>

<style scoped>
button {
  color: #000;
  background-color: #FFF;
  width: 5em;
  height: 5em;
}
</style>
