<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/theme.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
defineOptions({
  name: 'WelcomePage',
})
const themeStore = useThemeStore()

const toggleRoute = () => {
  themeStore.toggleTheme()
  router.push('/system/user')
}
</script>

<template>
  <n-button type="primary" @click="toggleRoute"> Primary</n-button>
</template>

<style scoped></style>
