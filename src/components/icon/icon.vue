<script setup lang="ts">
import { computed } from 'vue'

defineOptions({
  name: 'IconComponent',
})

interface Props {
  name: string // 唯一必需的图标名称属性
  size?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  color: undefined,
})

// 动态生成 iconfont 类名和样式
const iconClass = computed(() => `iconfont icon-${props.name}`)
const iconStyle = computed(() => ({
  fontSize: `${props.size}px`,
  color: props.color
}))
</script>

<template>
  <i :class="iconClass" :style="iconStyle" />
</template>

<style scoped></style>
