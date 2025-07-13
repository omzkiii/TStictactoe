<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
// import useCounter from '../composables/App.ts';
// const { count, increment } = useCounter()
// import axios from 'axios';

const bLabel = ref(1)
const text = ref(" ")

const move = computed(() => {
  switch (bLabel.value) {
    case 1:
      return 'X'
      break;
    case -1:
      return 'O'
      break;
    default:
      break;
  }
}
)

function change_player() {
  bLabel.value = bLabel.value * -1
}
function greet() {
  alert(text.value)
}

</script>

<template>
  <input :value="text" @input="event => { text = (event.target as HTMLInputElement).value }">
  <button @click="greet">
    SUMBIT
  </button>
</template>

<style scoped></style>
