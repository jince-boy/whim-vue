<script setup lang="ts">
import type {
  ButtonType,
  WhimDataTableEmits,
  WhimDataTableProps,
} from '@/components/table/useWhimTable2.ts'
import { useWhimTable } from '@/components/table/useWhimTable2.ts'
import { useIcon } from '@/components/icon/useIcon.ts'

defineOptions({
  name: 'WhimTable',
})

const props = withDefaults(defineProps<WhimDataTableProps>(), {
  remote: true,
  bordered: false,
  striped: false,
  visibleButtons: () => ['add', 'edit', 'delete', 'export'] as ButtonType[],
  visibleBorderSwitch: true,
  visibleStripedSwitch: true,
})

const emit = defineEmits<WhimDataTableEmits>()

const { tableRef, tableProps, bordered, striped, checkedRowKeys, handleCheck } = useWhimTable(
  props,
  emit,
)
const { createIcon } = useIcon()
</script>

<template>
  <n-card :bordered="false">
    <n-space vertical>
      <n-flex justify="space-between" align="center">
        <n-space>
          <!-- 左侧按钮插槽 -->
          <slot name="action-buttons-left"></slot>
          <n-button
            v-permission="props.buttonPermission?.add"
            v-role="props.buttonRole?.add"
            v-if="props.visibleButtons.includes('add')"
            type="primary"
            :render-icon="createIcon('zengjia')"
            @click="emit('add')"
          >
            新增
          </n-button>
          <n-button
            v-permission="props.buttonPermission?.edit"
            v-role="props.buttonRole?.edit"
            v-if="props.visibleButtons.includes('edit')"
            type="info"
            :render-icon="createIcon('xiugai')"
          >
            修改
          </n-button>
          <n-button
            v-permission="props.buttonPermission?.delete"
            v-role="props.buttonRole?.delete"
            v-if="props.visibleButtons.includes('delete')"
            type="error"
            :render-icon="createIcon('shanchu')"
          >
            删除
          </n-button>
          <n-button
            v-permission="props.buttonPermission?.export"
            v-role="props.buttonRole?.export"
            v-if="props.visibleButtons.includes('export')"
            type="warning"
            :render-icon="createIcon('daochu')"
          >
            导出
          </n-button>
          <!-- 右侧按钮插槽 -->
          <slot name="action-buttons-right"></slot>
        </n-space>
        <n-space align="center">
          <n-flex align="center" v-if="props.visibleBorderSwitch"
            ><n-text>边框</n-text><n-switch size="small" v-model:value="bordered"
          /></n-flex>
          <n-divider vertical v-if="props.visibleBorderSwitch" />
          <n-flex align="center" v-if="props.visibleStripedSwitch"
            ><n-text>斑马线</n-text><n-switch size="small" v-model:value="striped"
          /></n-flex>
          <n-divider vertical v-if="props.visibleStripedSwitch" />
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button quaternary circle :focusable="false" @click="emit('refresh')">
                <template #icon>
                  <n-icon :component="createIcon('refresh-2')" />
                </template>
              </n-button>
            </template>
            刷新
          </n-tooltip>
          <n-popover trigger="click" placement="bottom-end">
            <template #trigger>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button quaternary circle :focusable="false">
                    <template #icon>
                      <n-icon :component="createIcon('setting')" />
                    </template>
                  </n-button>
                </template>
                列设置
              </n-tooltip>
            </template>
            <template #header>
              <n-text strong depth="1"> 显示/隐藏列 </n-text>
            </template>
            <!--            <n-checkbox-group v-model:value="checkedColumnKeys" size="small">-->
            <!--              <n-space vertical>-->
            <!--                <n-checkbox-->
            <!--                  v-for="col in selectableColumns"-->
            <!--                  :key="col.key"-->
            <!--                  :value="col.key"-->
            <!--                  :label="col.title"-->
            <!--                />-->
            <!--              </n-space>-->
            <!--            </n-checkbox-group>-->
          </n-popover>
        </n-space>
      </n-flex>
      <n-data-table
        size="small"
        ref="tableRef"
        v-bind="tableProps"
        :remote="tableProps.remote"
        :bordered="bordered"
        :single-line="!bordered"
        :striped="striped"
        :checked-row-keys="checkedRowKeys"
        @update:checked-row-keys="handleCheck"
      />
    </n-space>
  </n-card>
</template>

<style scoped lang="scss"></style>
