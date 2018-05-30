<template>
  <div>
    <h3>这是父组件</h3>
    <!--第一次使用：用flex展示数据-->
    <Child>
      <template slot-scope='user'>
        <div class="tpl">
          <span v-for='item in user.list' :key='item'>{{item}}</span>
        </div>
      </template>
    </Child>
    <!--第二次使用：用列表展示数据-->
    <Child>
      <template slot-scope='user'>
        <ul>
          <li v-for='item in user.list' :key='item'>{{item}}</li>
        </ul>
      </template>
    </Child>

    <!--第三次使用：直接显示数据-->
    <child>
      <template slot-scope="user">
        {{user.list}}
      </template>
    </child>

    <!--第四次使用：不使用其提供的数据-->
    <child>
      我就是模板
    </child>

  </div>
</template>

<script>
import Child from './child'
export default {
  data() {
    return {
      msg: 'hello lzx'
    }
  },
  components: {
    Child
  }
}
</script>

<style scoped>
.father {
  width: 100%;
  background-color: #ccc;
  height: 650px;
}
.tpl {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 30%;
  margin: 0 auto;
}
.tpl span {
  border: 1px solid red;
  height: 50px;
  line-height: 50px;
  padding: 10px;
}
</style>
