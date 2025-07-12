<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
// import axios from 'axios'
// const get = ()=> {axios.get("http://localhost:3000", {withCredentials: true}).then((res)=> console.log(res.data))}
</script>

<template>
  <div>
    <HelloWorld msg="Hello world" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
