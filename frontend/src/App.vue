<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Square from './components/Square.vue';
const url = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios';
const moves_no = ref(0);
const game_data = ref();

onMounted(async () => {
  get_game_data()
})

async function get_game_data() {
  game_data.value = await axios.get(url + "/game", {
    withCredentials: true
  }).then((res) => { return res.data })
}

</script>

<template>
  <p>{{ game_data }}</p>
  <button @click="get_game_data">GET DATA</button>
  <div id="x" v-for="x in 3">
    <div id="y" v-for="y in 3">
      <Square :coor="[x, y]" :moves_no="moves_no" @make_move="moves_no++" />
    </div>
  </div>
</template>

<style scoped>
#x {
  display: flex;
  flex-direction: row;
}

#y {
  display: flex;
  flex-direction: column;
}
</style>
