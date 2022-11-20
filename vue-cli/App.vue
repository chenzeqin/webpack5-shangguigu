<template>
  <div class="app">Hello Vue</div>
</template>

<script >
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup () {
    return {}
  }
})
</script>

<style lang="scss">
.app {
  color: aqua;
  font-size: 20px;
}
</style>