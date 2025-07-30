<script setup lang="ts">
import createIcon from '@/components/icon/icon.ts'

defineOptions({
  name: 'LayoutTabBar',
})
</script>

<template>
  <n-el class="tab">
    <n-flex align="center" justify="space-between" :wrap="false" class="tab-wrapper">
      <n-button
        quaternary
        :focusable="false"
        :render-icon="createIcon('left')"
        class="tab-scroll tab-scroll-left"
      />
      <n-flex align="center" class="tab-box">
        <n-button
          type="primary"
          :strong="true"
          :focusable="false"
          size="small"
          icon-placement="left"
          :render-icon="createIcon('user')"
          >用户管理<i class="iconfont icon-closure tab-close"></i
        ></n-button>
        <n-button
          :secondary="true"
          :focusable="false"
          size="small"
          icon-placement="left"
          :render-icon="createIcon('user')"
          >用户管理<i class="iconfont icon-closure tab-close"></i
        ></n-button>
      </n-flex>
      <n-button
        quaternary
        :focusable="false"
        :render-icon="createIcon('right')"
        class="tab-scroll tab-scroll-right"
      />
    </n-flex>
  </n-el>
</template>

<style scoped lang="scss">
.tab {
  height: 36px;
  background-color: var(--card-color);
  border-bottom: 1px solid var(--divider-color);

  .tab-wrapper {
    height: 100%;
  }

  .tab-scroll {
    border-radius: 0;
    height: 100%;
  }

  .tab-scroll-left {
    border-right: 1px solid var(--divider-color);
  }

  .tab-scroll-right {
    border-left: 1px solid var(--divider-color);
  }

  .tab-box {
    width: 100%;
    height: 100%;
  }

  .tab-close {
    margin-left: var(--n-icon-margin);
  }
}
</style>
