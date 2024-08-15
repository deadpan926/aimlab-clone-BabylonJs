import { ref, computed } from 'vue'

export function useTraining() {
  const isTracking = ref(false)
  const remainingTime = ref(5000)
  const hitTime = ref(0)
  const missTime = ref(0)
  let intervalId = null

  const totalTime = computed(() => hitTime.value + missTime.value)
  const remainingTimeString = computed(() => (remainingTime.value / 1000).toFixed(2))

  function startTraining() {
    isTracking.value = true
    remainingTime.value = 5000
    hitTime.value = 0
    missTime.value = 0
    intervalId = setInterval(() => {
        console.log("减少了时间")
      remainingTime.value -= 10
      if (remainingTime.value <= 0) {
        endTraining()
      }
    }, 10)
  }

  function endTraining() {
    isTracking.value = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function addHitTime(time) {
    hitTime.value += time
  }

  function addMissTime(time) {
    missTime.value += time
  }

  return {
    isTracking,
    remainingTime,
    hitTime,
    missTime,
    totalTime,
    remainingTimeString,
    startTraining,
    endTraining,
    addHitTime,
    addMissTime
  }
}