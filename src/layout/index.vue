<script setup lang="ts">
import LayoutSidebar from '@/layout/components/sidebar/index.vue'
import tarBar from '@/layout/components/tabbar/index.vue'
import appMain from '@/layout/components/appMain/index.vue'
import LayoutHeader from '@/layout/components/header/index.vue'
import screenfull from 'screenfull'

defineOptions({
  name: 'LayoutIndex',
})

// tab-bar 调用内容全屏的方法
const appMainRef = ref()
const toggleFullScreen = () => {
  const el = appMainRef.value?.appMainRef
  if (el && screenfull.isEnabled) {
    screenfull.toggle(el)
  }
}

// 刷新组件
const refreshAppMain = () => {
  appMainRef.value?.refresh()
}
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
        <n-layout-header bordered style="height: 50px" position="absolute">
          <LayoutHeader></LayoutHeader>
        </n-layout-header>
        <n-layout-content
          position="absolute"
          style="top: 50px; bottom: 50px"
          :native-scrollbar="false"
          embedded
        >
          <tarBar :onFullScreen="toggleFullScreen" :onRefresh="refreshAppMain"></tarBar>
          <appMain ref="appMainRef"></appMain>
        </n-layout-content>
        <n-layout-footer bordered position="absolute" style="height: 50px"> 123</n-layout-footer>
      </n-layout>
    </n-layout>
  </n-el>
</template>

<style scoped lang="scss"></style>
