<script setup>
import { ref } from 'vue'

const count = ref(0)
const foo = "text"
const bar = "text2"
const dosomething = () => {
  count.value = 10
  console.log(count)
}

</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
  <div v-on:click="dosomething">{{ count }}</div>
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
