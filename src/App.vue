<template>
   <div>
      <template v-if="!loading">
         <router-view/>
      </template>
      <template v-else>
         <div id="loader" class="center"></div>        
      </template>
   </div>
</template>
 
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const loading = ref<Boolean>(false)
onMounted(() => {
   document.onreadystatechange = function() {
      loading.value = document.readyState !== "complete" ? true : true
   }
})
</script>

<style lang="less" scoped>
#nprogress .bar {
  background: var(--td-brand-color) !important;
}
#loader {
      border: 6px solid #f3f3f3;
      border-radius: 50%;
      border-top: 6px solid #409eff;
      width: 35px;
      height: 35px;
      animation: spin 1s linear infinite;
    }
 
    @keyframes spin {
      100% {
        transform: rotate(360deg);
      }
    }
 
    .center {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    }
</style>