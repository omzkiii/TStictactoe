<script setup lang="ts">
import Square from './components/Square.vue';
</script>

<template>
  <div v-for="x in 3">
    <div v-for="y in 3">
      <Square :coor="{ x: x, y: y }" />
    </div>
  </div>
  <!-- <Square /> -->
</template>

<style scoped></style>
