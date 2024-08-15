<template>
  <div id="app">
    <!-- 导航栏 -->
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/classic">Classic Aim</router-link> |
      <router-link to="/trace">Trace Task</router-link>
    </nav> -->

    <!-- 路由视图 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

// 如果需要访问路由器实例
const router = useRouter()

// 如果需要访问当前路由
const route = useRoute()

// 监听路由变化
// watch(() => route.path, (newPath) => {
//   console.log('Route changed to:', newPath)
// })
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-active {
  color: #42b983;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>