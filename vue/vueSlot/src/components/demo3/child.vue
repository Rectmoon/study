<template>
  <div class='child'>
    <h3>这里是子组件</h3>
    <slot :list='list'></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'I like lzx',
      list: ['zhangsan', 'lisi', 'wanwu', 'zhaoliu', 'tianqi', 'xiaoba']
    }
  }
}
</script>

<style scoped>
.child {
  background-color: orange;
  width: 100%;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
