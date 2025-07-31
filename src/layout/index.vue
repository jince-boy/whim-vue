<script setup lang="ts">
import LayoutSidebar from '@/layout/components/sidebar/index.vue'
import TabBar from '@/layout/components/tabbar/tabBar.vue'
import AppMain from '@/layout/components/appMain/appMain.vue'

defineOptions({
  name: 'LayoutIndex',
})

// 折叠状态
const collapsed = ref(false)
// 监听折叠状态
const handleCollapsed = (val: boolean) => {
  collapsed.value = val
}
</script>

<template>
  <n-el>
    <n-layout has-sider position="absolute">
      <n-layout-sider
        :width="240"
        bordered
        :native-scrollbar="false"
        show-trigger="arrow-circle"
        :collapsed-width="64"
        collapse-mode="width"
        @update:collapsed="handleCollapsed"
        trigger-style=""
      >
        <LayoutSidebar :collapsed="collapsed"></LayoutSidebar>
      </n-layout-sider>
      <n-layout>
        <n-layout-header bordered style="height: 50px" position="absolute"></n-layout-header>

        <n-layout-content
          position="absolute"
          style="top: 50px; bottom: 50px"
          :native-scrollbar="false"
          embedded
        >
          <tab-bar></tab-bar>
          <app-main></app-main>
        </n-layout-content>
        <n-layout-footer bordered position="absolute" style="height: 50px"> 123</n-layout-footer>
      </n-layout>
    </n-layout>
  </n-el>
</template>

<style scoped lang="scss">
</style>
