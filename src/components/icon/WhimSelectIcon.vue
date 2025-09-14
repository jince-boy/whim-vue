<script setup lang="ts">
import Icon from '@/components/icon/Icon.vue'
import iconData from '@/assets/iconfont/iconfont.json'
const showPopover = ref(false)
const iconValue = ref('')
const searchIconClass = ref('')
</script>

<template>
  <n-popover
    trigger="click"
    :show="showPopover"
    placement="bottom-start"
    :show-arrow="false"
    width="500"
  >
    <template #trigger>
      <n-input-group>
        <n-input-group-label
          ><Icon :name="iconValue" style="display: block; width: 16px"></Icon
        ></n-input-group-label>
        <n-input
          :value="iconValue"
          readonly
          placeholder="选择一个图标"
          @click="showPopover = !showPopover"
          clearable
        />
      </n-input-group>
    </template>
    <div>
      <n-input v-model:value="searchIconClass" placeholder="搜索图标" />
      <n-scrollbar style="max-height: 300px; margin-top: 12px; padding: 0 12px">
        <n-grid x-gap="12" :cols="8" y-gap="12">
          <n-gi v-for="item in iconData.glyphs" :key="item.icon_id">
            <n-button>
              <Icon :name="item.font_class"></Icon>
            </n-button>
          </n-gi>
        </n-grid>
      </n-scrollbar>
    </div>
  </n-popover>
</template>

<style scoped lang="scss"></style>
