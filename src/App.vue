<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme.ts'
import themeOverrides from '@/config/NaiveTheme.ts'

const themeStore = useThemeStore()
</script>

<template>
  <n-config-provider :theme="themeStore.getTheme" :theme-overrides="themeOverrides">

    <!--加载条-->
    <n-loading-bar-provider>
      <!--信息-->
      <n-message-provider>
        <!--通知-->
        <n-notification-provider>
          <!--对话框-->
          <n-dialog-provider>
            <router-view />
          </n-dialog-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
    <!--全局样式-->
    <n-global-style />
  </n-config-provider>
</template>

<style scoped></style>
