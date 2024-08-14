<template>
    <div class="crosshair"></div>
</template>

<script setup>

</script>
  
<style scoped>
.crosshair {
position: absolute;
top: 50%;
left: 50%;
width: 20px;
height: 20px;
transform: translate(-50%, -50%);
pointer-events: none;
}

.crosshair::before,
.crosshair::after {
content: "";
position: absolute;
background-color: #00FF00; /* 亮绿色 */
box-shadow: 0 0 2px #00FF00; /* 轻微的发光效果 */
}

.crosshair::before {
top: 0;
left: 50%;
width: 2px;
height: 100%;
transform: translateX(-50%);
}

.crosshair::after {
top: 50%;
left: 0;
width: 100%;
height: 2px;
transform: translateY(-50%);
}
</style>