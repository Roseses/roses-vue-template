<template>
   <div>
      <el-button @click="change">按钮</el-button>
      {{state}}
      {{
        obj.foo
      }}
   </div>
</template>
 
<script setup lang="ts">
import { reactive, toRef } from 'vue'
 
const obj = {
   foo: 1,
   bar: process.env.d
}
 
 
const state = toRef(obj, 'foo')
// bar 转化为响应式对象
 
const change = () => {
   state.value++
   console.log(obj, state) 
}
</script>