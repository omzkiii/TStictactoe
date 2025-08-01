<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Square from './components/Square.vue';
const url = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios';
const moves_no = ref(0);
const game_data = ref<GameMoves>();
type GameMoves = {
  player0: [number, number][]
  player1: [number, number][]
}


function set_game_data(player_game_data: [number, number][], symbol: string) {
  const player_move = player_game_data ?? []
  player_move.forEach((move) => {
    const el = document.querySelector(`[xvalue="${move[0]}"][yvalue="${move[1]}"]`);
    if (el) {
      el.textContent = symbol;
      el.setAttribute("disabled", "true")
    }
  })
}

async function get_game_data() {
  game_data.value = await axios.get(url + "/game", {
    withCredentials: true
  }).then((res) => {
    console.log(res.data.player1)
    return {
      player0: res.data.player0,
      player1: res.data.player1,
    }
  }).catch((err) => { return err })

  const player0move = game_data.value?.player0 ?? []
  const player1move = game_data.value?.player1 ?? []

  moves_no.value = player0move.length + player1move.length

  set_game_data(player0move, 'X')
  set_game_data(player1move, 'O')
}

onMounted(async () => {
  get_game_data()
})

</script>

<template>
  <p>{{ game_data }}</p>
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
