<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
const emit = defineEmits(['make_move'])
const props = defineProps(['coor', 'moves_no']);
const url = import.meta.env.VITE_API_BASE_URL;
const sign = ref('');

function get_sign() {
  if (props.moves_no % 2 == 0) {
    sign.value = 'X'
  }
  else {
    sign.value = 'O'
  }
};

function result_handler(ret_val: number) {
  const PLAYER1_WIN = 1
  const PLAYER2_WIN = 2
  const DRAW = -1

  switch (ret_val) {
    case PLAYER1_WIN:
      alert("PLAYER 1 WIN")
      window.location.reload()
      break;

    case PLAYER2_WIN:
      alert("PLAYER 2 WIN")
      window.location.reload()
      break;

    case DRAW:
      alert("DRAW")
      window.location.reload()
      break;

    default:
      break;
  }
}

async function send_request() {
  const ret_val = await axios.post(url + "/move", {
    coor: props.coor,
  }, {
    withCredentials: true
  })
  result_handler(ret_val.data)
};

function make_move() {
  get_sign()
  emit('make_move')
  send_request()
};
</script>

<template>
  <button @click.once="make_move">{{ sign }}</button>
</template>

<style scoped>
button {
  color: #000;
  background-color: #FFF;
  border: 3px solid #000;
  width: 5em;
  height: 5em;
}
</style>
