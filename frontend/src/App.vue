<script setup lang="ts">
import { ref } from 'vue';
import Square from './components/Square.vue';
const moves_no = ref(0)
</script>

<template>
  <div id="x" v-for="x in 3">
    <div id="y" v-for="y in 3">
      <Square :coor="{ x: x, y: y }" :moves_no="moves_no" @make_move="moves_no++" />
    </div>
  </div>
  <!-- <Square /> -->
</template>

<style scoped>
#x {
  display: flex;
  flex-direction: row;
}

#y {
  display: flex;
  flex-direction: column;
}
</style>
