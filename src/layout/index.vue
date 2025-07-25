<script setup lang="ts">
import LayoutSidebar from '@/layout/components/sidebar/index.vue'

defineOptions({
  name: 'LayoutIndex',
})
</script>

<template>
  <n-el>
    <n-layout has-sider position="absolute">
      <n-layout-sider
        :width="240"
        bordered
        :native-scrollbar="false"
        show-trigger="arrow-circle"
        :collapsed-width="50"
        collapse-mode="width"
      >
        <LayoutSidebar></LayoutSidebar>
      </n-layout-sider>
      <n-layout>
        <n-layout-header bordered style="height: 50px" position="absolute"> </n-layout-header>
        <n-layout-content
          position="absolute"
          style="top: 50px; bottom: 50px"
          content-style="padding:24px;"
          :native-scrollbar="false"
          embedded
        >
          <router-view />
        </n-layout-content>
        <n-layout-footer bordered position="absolute" style="height: 50px"> 123 </n-layout-footer>
      </n-layout>
    </n-layout>
  </n-el>
</template>

<style scoped></style>
