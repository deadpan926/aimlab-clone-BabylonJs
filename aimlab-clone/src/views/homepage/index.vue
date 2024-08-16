<template>
    <h2>hello aimlab clone</h2>
     <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/classic">Classic Aim</router-link> |
      <router-link to="/trace">Trace Task</router-link>
    </nav>
    <canvas ref="babylonCanvas"></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { createScene } from './scenes/MyfirstScene';


const babylonCanvas = ref();


onMounted(() => {
  createScene(babylonCanvas.value);
});
</script>


<style scoped>
canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
  }
</style>

