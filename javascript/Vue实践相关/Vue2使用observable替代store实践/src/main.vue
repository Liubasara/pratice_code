<template>
  <div class="js-template-wrap">
    <p>
      参考资料：
      <a
        href="https://segmentfault.com/a/1190000019292569"
        target="blank"
      >https://segmentfault.com/a/1190000019292569</a>
    </p>
    <button @click="changeStackList">test</button>
    <button @click="changeStackList2">test2</button>
    <button @click="changeStackList3">test3</button>
    <div v-for="(item, idx) in stack.list" :key="idx">
      <div>{{ item.title }}</div>
      <div style="display: flex;">
        <div style="width: 10px"></div>
        <div v-for="(label, idx) in item.labels" :key="idx + 'label'">{{ label.labelTitle }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Stack, getMutations } from './stack'
import get from 'lodash/get'

export default {
  data() {
    const stack = Vue.observable(new Stack({
      objUpdateHelper: (obj, name, property) => {
        this.$set(obj, name, Vue.observable(property))
        this.$forceUpdate()
      }
    }))
    stack.mutations = getMutations(stack)
    return {
      stack
    }
  },
  methods: {
    changeStackList() {
      this.stack.mutations.updateList()
    },
    changeStackList2() {
      this.stack.mutations.updateListInfo()
    },
    changeStackList3() {
      this.stack.list[0].labels[1].labelTitle = 'new Test'
    }
  },
  computed: {
    stackList() {
      return get(this.stack, 'list', [])
    },
  }
}
</script>

<style lang="less" scoped>
.js-template-wrap {
  background: lightcyan;
  color: red;
}
</style>