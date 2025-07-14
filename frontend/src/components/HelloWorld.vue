<script setup lang="ts">
import { computed, watch } from '@vue/reactivity';
import { ref } from 'vue';
// import useCounter from '../composables/App.ts';
// const { count, increment } = useCounter()
// import axios from 'axios';

const bLabel = ref(1)
const text = ref("sample")
const string = ref(" ")

// const move = computed(() => {
//   switch (bLabel.value) {
//     case 1:
//       return 'X'
//     case -1:
//       return 'O'
//     default:
//   }
// }
// )

watch(text, (text, text2, text3) => {
  string.value = `${text} | ${text2}`
},
  { immediate: true }
);

function change_player() {
  bLabel.value = bLabel.value * -1
}
function greet() {
  alert(text.value)
}
</script>

<template>
  <p>{{ text }}</p>
  <!-- <input :value="text" @input="(event) => { text = (event.target as HTMLInputElement).value }"> -->
  <input v-model="text">
  <button @click="greet">
    SUMBIT
  </button>
  <p>{{ string }}</p>
</template>

<style scoped></style>
