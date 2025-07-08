<script setup>
import { ref } from 'vue'

const count = ref(0)
const foo = "text"
const bar = "text2"

</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
  <div :id="bar">HELLO WORLD</div>


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
