<template>
  <el-icon class="home-icon" @click="goToHome">
    <HomeFilled />
  </el-icon>
  <div class="game-container">
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
    <div class="canvas-container">
      <canvas ref="babylonCanvas"></canvas>
  <Crosshair />
  <el-dialog
  v-model="showResult"
  title="Training Result"
  width="30%"
  :show-close="false"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  >
  <p>Hit Time: {{ trainingTimer.hitTime }}ms</p>
  <p>Miss Time: {{ trainingTimer.missTime }}ms</p>
  <p>Total Time: {{ trainingTimer.totalTime }}ms</p>
  <template #footer>
      <span class="dialog-footer">
      <el-button @click="closeDialog">Close</el-button>
      </span>
  </template>
</el-dialog>

<!-- <el-dialog v-model="showInputbox">
  <ElInput>点击小球</ElInput>
</el-dialog> -->
    </div>
  </div>
    
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { createScene } from './scenes/AimlabScene';

import { useTargetStore } from '../../stores/targetStore';
import Crosshair from '../../components/Crosshair.vue';

import { HomeFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElInput } from 'element-plus';

const babylonCanvas = ref();
const targetStore = useTargetStore();
const showResult = ref(false);
const showInputbox = ref(true);
const router = useRouter()

onMounted(() => {
  createScene(babylonCanvas.value, targetStore);
});

function onTargetSizeChange() {
  targetStore.updateTargetSizes();
}

const goToHome = () => {
  router.push('/') 
};
</script>

<style scoped>
.game-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.canvas-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.timeCounter-container {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 24px;
}

canvas {
width: 100%;
height: 100%;
touch-action: none;
}

.targetSize {
  position: absolute;
}

.home-icon {
position: absolute;
top: 20px;
left: 20px;
font-size: 24px;
color: white;
cursor: pointer;
z-index: 1000;
}
</style>