import { defineStore } from 'pinia'

export const useTargetStore = defineStore('target', {
  state: () => ({
    targets: [],
    targetSize: 1,
  }),
  actions: {
    setTargetSize(size) {
      this.targetSize = size;
    },
    addTarget(target) {
      this.targets.push(target);
    },
    removeTarget(index) {
      this.targets.splice(index, 1);
    },
    updateTargetSizes() {
      this.targets.forEach(target => {
        target.scaling.setAll(this.targetSize);
      });
    },
  },
})