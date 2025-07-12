<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
// import useCounter from '../composables/App.ts';
// const { count, increment } = useCounter()
// import axios from 'axios';

const bLabel = ref(1)

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

function greet() {
  bLabel.value = bLabel.value * -1
}

</script>

<template>
  <button @click="greet">
    {{ move }}
  </button>
</template>

<style scoped></style>
