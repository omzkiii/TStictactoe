<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

const get = ()=> {axios.get("http://localhost:3000", {withCredentials: true}).then((res)=> console.log(res.data))}
// const get = () => {
//   console.log("HELLO")
// }
  

</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>

    <div class="card">
      <button type="button" @click="get()">count is {{ count }}</button>
    </div>
  </div>
  <HelloWorld msg="Hello world" />
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
