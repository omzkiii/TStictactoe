<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';
import Square from './components/Square.vue';
const url = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios';
const moves_no = ref(0);
const game_data = ref<GameMoves>();
type GameMoves = {
  player0: [number, number][]
  player1: [number, number][]
}

async function set_game_data() {
  for (const [x, y] of game_data.value?.player0!) {
    const el = document.querySelector(`[xvalue="${x}"][yvalue="${y}"]`);
    if (el) {
      el.textContent = 'X';
    }
  }
  for (const [x, y] of game_data.value?.player1!) {
    const el = document.querySelector(`[xvalue="${x}"][yvalue="${y}"]`);
    if (el) {
      el.textContent = 'O';
    }
  }
}

onMounted(async () => {
  get_game_data()


})

async function get_game_data() {
  game_data.value = await axios.get(url + "/game", {
    withCredentials: true
  }).then((res) => {
    return {
      player0: JSON.parse(res.data.player0) as [number, number][],
      player1: JSON.parse(res.data.player1) as [number, number][],
    }
  }).catch((err) => { return err })

  game_data.value?.player0.forEach((move) => {
    const el = document.querySelector(`[xvalue="${move[0]}"][yvalue="${move[1]}"]`);
    if (el) {
      el.textContent = 'X';
    }
  })

  game_data.value?.player1.forEach((move) => {
    const el = document.querySelector(`[xvalue="${move[0]}"][yvalue="${move[1]}"]`);
    if (el) {
      el.textContent = 'O';
    }
  })

}


</script>

<template>
  <p>{{ game_data?.player0 }}</p>
  <button @click="get_game_data">GET DATA</button>
  <div id="x" v-for="x in 3">
    <div id="y" v-for="y in 3">
      <Square :xvalue=x :yvalue=y :coor="[x, y]" :moves_no="moves_no" @make_move="moves_no++" />
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
