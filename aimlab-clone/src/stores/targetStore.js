import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTargetStore = defineStore('target', () => {
  const targets = ref([])
  const targetSize = ref(1)
  const targetsNumber = ref(10)

  function setTargetSize(size) {
    targetSize.value = size
  }

  function addTarget(target) {
    targets.value.push(target)
  }

  function removeTarget(index) {
    targets.value.splice(index, 1)
  }

  function updateTargetSizes() {
    targets.value.forEach(target => {
      target.scaling.setAll(targetSize.value)
    })
  }

  return {
    targets,
    targetSize,
    targetsNumber,
    setTargetSize,
    addTarget,
    removeTarget,
    updateTargetSizes
  }
})