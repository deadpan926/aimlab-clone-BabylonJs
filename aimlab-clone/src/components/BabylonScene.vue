<template>
    <div class="targetSize">
        <label for="targetSize">目标大小：</label>
        <input
          type="range"
          id="targetSize"
          v-model="targetStore.targetSize"
          min="0.5"
          max="2"
          step="0.1"
          @input="onTargetSizeChange"
        >
        <span>{{ targetStore.targetSize }}</span>
      </div>
    <canvas ref="babylonCanvas"></canvas>
    <Crosshair />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
// import { createScene } from '../scenes/AimlabScene';
import { createScene } from '../views/trace-task/scenes/AimlabTraceTaskSceen';

import { useTargetStore } from '../stores/targetStore';
import Crosshair from './Crosshair.vue';

const babylonCanvas = ref();
const targetStore = useTargetStore();

onMounted(() => {
  createScene(babylonCanvas.value, targetStore);
});

function onTargetSizeChange() {
  targetStore.updateTargetSizes();
}
</script>

<style scoped>
canvas {
width: 100%;
height: 100%;
touch-action: none;
}

.targetSize {
    position: absolute;
}

</style>