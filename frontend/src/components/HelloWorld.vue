<script setup lang="ts">
import { ref } from 'vue';
// import useCounter from '../composables/App.ts';
// const { count, increment } = useCounter()
// import axios from 'axios';

const bLabel = ref(' ')


function greet() {
  bLabel.value = 'X'
}

</script>

<template>
  <button @click="greet">
    {{ bLabel }}
  </button>
</template>

<style scoped></style>
