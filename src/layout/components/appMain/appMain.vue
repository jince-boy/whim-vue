<script setup lang="ts">
import { useKeepAliveStore } from '@/stores/modules/keepAlive.ts'
import { useRoute } from 'vue-router'

const keepAliveStore = useKeepAliveStore()
const route = useRoute()
</script>

<template>
  <div class="appMain">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <KeepAlive :include="keepAliveStore.keepAliveComponents">
          <component :is="Component" :key="route.fullPath" />
        </KeepAlive>
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.appMain {
  padding: 12px;
}
</style>
