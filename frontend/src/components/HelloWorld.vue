<script setup lang="ts">
import { computed } from 'vue';
import useCounter from '../composables/App.ts';
const { count, increment } = useCounter()

const countLeft = computed(()=>{
  return 200 - count.value
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
  <div>{{ count }}</div>
  <p>COUNT LEFT: {{ countLeft }}</p>
</template>

<style scoped>
button {
}
#text {
  font-weight: bold;
}
#text2 {
  color: #00FF00;
}
</style>
