<script setup lang="ts">
import { ref } from 'vue';
// import axios from 'axios';
// import { moves_no } from '../App.vue';
const emit = defineEmits(['make_move'])
const props = defineProps(['coor', 'moves_no']);
// const url = import.meta.env.VITE_API_BASE_URL
const data = ref('')
const sign = ref('')


function get_sign() {
  if (props.moves_no % 2 == 0) {
    sign.value = 'X'
  }
  else {
    sign.value = 'O'
  }
}

function make_move() {
  get_sign()
  emit('make_move')

}
</script>

<template>
  <button @click.once="make_move">{{ sign }}</button>
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
