<template>
    <canvas ref="babylonCanvas"></canvas>
    <div class="crosshair"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { createScene } from '../scenes/AimlabScene'
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

  .crosshair {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;  /* 减小尺寸 */
    height: 6px; /* 减小尺寸 */
    background-color: #00FF00;  /* 使用绿色 */
    border-radius: 50%;  /* 保持圆形 */
    transform: translate(-50%, -50%);
    pointer-events: none;
    box-shadow: 0 0 4px #00FF00;  /* 添加发光效果 */
}
  </style>