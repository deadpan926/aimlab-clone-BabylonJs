<template>
    <div>
        <label for="targetSize">目标大小：</label>
        <input
          type="range"
          id="targetSize"
          v-model="targetStore.targetSize"
          min="0.1"
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
import { createScene, updateTargetSize } from '../scenes/AimlabScene';
import { useTargetStore } from '../stores/targetStore';
import Crosshair from './Crosshair.vue';

const babylonCanvas = ref();
const targetSize = ref(1);
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

</style>