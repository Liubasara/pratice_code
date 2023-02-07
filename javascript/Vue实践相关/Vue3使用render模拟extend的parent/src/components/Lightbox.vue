<script>
import { getCurrentInstance } from 'vue'
export default {
  props: ["src"],
  emits: ["close"],
  setup() {
    const instance = getCurrentInstance()
    console.log(instance)
    return {}
  }
};
</script>

<template>
  <div class="lightbox">
    <button @click="$emit('close')">close</button>
    <img :src="src" />
  </div>
</template>

<style lang="scss" scoped>
.lightbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);

  img {
    max-width: 70%;
    max-height: 70%;
  }
}
</style>
