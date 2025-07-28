<script setup lang="ts">
import systemSetting from '@/config/SystemSetting.ts'
import { RouterLink } from 'vue-router'
import { usePermissionStore } from '@/stores/modules/permission.ts'

defineOptions({
  name: 'LayoutSidebar',
})

const permissionStore = usePermissionStore()
</script>

<template>
  <router-link to="/">
    <n-flex class="logo" justify="center" align="center">
      <img src="../../../assets/images/logo.png" alt="logo" />
      <span>{{ systemSetting.title }}</span>
    </n-flex>
  </router-link>
  <n-menu
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="permissionStore.generateMenus()"
  />
</template>

<style scoped lang="scss">
.logo {
  height: 50px;
  border-bottom: 1px solid var(--divider-color);
  transition:
    color 0.3s var(--n-bezier),
    background-color 0.3s var(--n-bezier),
    box-shadow 0.3s var(--n-bezier),
    border-color 0.3s var(--n-bezier);

  .n-flex {
    height: 100%;
  }

  img {
    width: 30px;
    height: 30px;
  }

  span {
    font-size: 18px;
  }
}

.n-menu {
  user-select: none;
}
</style>
