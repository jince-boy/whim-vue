<script setup lang="ts">
import createIcon from '@/components/icon/icon.ts'
import type {
  DataTableColumn,
  DataTableRowKey,
  DataTableColumnGroup,
  DataTableBaseColumn,
  FormInst,
} from 'naive-ui'

/**
 * 分页配置接口
 */
interface Pagination {
  /** 当前页码 */
  page: number
  /** 每页显示条数 */
  pageSize: number
  /** 总页数（可选） */
  pageCount?: number
  /** 总条目数（可选） */
  itemCount?: number
}

/**
 * 基础表格组件 Props 类型定义
 * @template T - 数据项类型，默认 Record<string, unknown>
 */
interface BaseTableProps {
  /** 表格列配置 */
  columns: DataTableColumn[]
  /** 表格数据 */
  data: object[]
  /** 分页配置 */
  pagination: Pagination
  /** 行唯一标识字段名或获取行key的函数 */
  rowKey?: string | ((row: object) => string | number)
  /** 是否显示新增按钮，默认显示 */
  addButton?: boolean
  /** 是否显示编辑按钮，默认显示 */
  editButton?: boolean
  /** 是否显示删除按钮，默认显示 */
  deleteButton?: boolean
  /** 是否显示导出按钮，默认显示 */
  exportButton?: boolean
}
/**
 * 使用 withDefaults 结合 defineProps 定义带默认值的 Props
 */
const props = withDefaults(defineProps<BaseTableProps>(), {
  addButton: true,
  editButton: true,
  deleteButton: true,
  exportButton: true,
})

/** 表格实例引用 */
const tableRef = ref<FormInst | null>()
/** 是否显示斑马纹 */
const showStriped = ref(false)
/** 是否显示边框 */
const showBorder = ref(false)
/** 当前选中的行 key 数组 */
const selectedRowKeys = ref<DataTableRowKey[]>([])

/**
 * 监听选中行变化，更新 selectedRowKeys 并触发事件
 * @param keys - 选中的行 key 数组
 */
const onUpdateCheckedRowKeys = (keys: DataTableRowKey[]) => {
  selectedRowKeys.value = keys
  emit('update:checked-row-keys', keys)
}

/** 是否允许编辑，只有选中一条时允许 */
const isEditEnabled = computed(() => selectedRowKeys.value.length === 1)
/** 是否允许删除，至少选中一条时允许 */
const isDeleteEnabled = computed(() => selectedRowKeys.value.length > 0)

/**
 * 获取行的唯一key值
 * @param row - 行数据对象
 * @returns 行key字符串或数字，默认使用'id'字段
 */
const getRowKey = (row: object): string | number | undefined => {
  const r = row as Record<string, unknown>
  const key = (props.rowKey as string | undefined) || 'id'
  return r[key] as string | number | undefined
}

/**
 * 事件触发定义
 */
const emit = defineEmits<{
  /** 页码更新 */
  (e: 'update:pageNum', page: number): void
  /** 每页条数更新 */
  (e: 'update:pageSize', pageSize: number): void
  /** 点击新增 */
  (e: 'add'): void
  /** 点击编辑 */
  (e: 'edit'): void
  /** 点击删除 */
  (e: 'delete'): void
  /** 点击导出 */
  (e: 'export'): void
  /** 选中行key变化 */
  (e: 'update:checked-row-keys', rowKeys: DataTableRowKey[]): void
  /** 刷新 */
  (e: 'refresh'): void
}>()

/**
 * 计算分页配置，默认支持页码大小选择
 */
const paginationConfig = computed(() => {
  if (!props.pagination) return false
  return {
    ...props.pagination,
    showSizePicker: true,
    pageSizes: [10, 20, 30, 40, 50],
  }
})

/**
 * 边框显示开关处理函数
 * @param value - 是否显示边框
 */
const handleShowBorder = (value: boolean) => {
  showBorder.value = value
}

/**
 * 斑马线显示开关处理函数
 * @param value - 是否显示斑马线
 */
const handleShowStriped = (value: boolean) => {
  showStriped.value = value
}

/**
 * 计算实际显示的列是否包含key属性（类型保护）
 * @param col - 表格列对象
 * @returns 是否包含key属性
 */
const isColumnWithKey = (
  col: DataTableColumn,
): col is DataTableColumnGroup | DataTableBaseColumn => {
  return 'key' in col && typeof col.key === 'string'
}

/**
 * 可选择的列集合（排除 selection 和 action 列）
 */
const selectableColumns = computed(() =>
  props.columns.filter((col): col is DataTableColumnGroup | DataTableBaseColumn => {
    if (col.type === 'selection') return false
    if (!isColumnWithKey(col)) return false
    return col.key !== 'action'
  }),
)

/**
 * 默认选中所有可选择的列 key，用于控制列的显示隐藏
 */
const checkedColumnKeys = ref(selectableColumns.value.map((col) => col.key))

/**
 * 根据选中的列 key 计算实际显示的列集合
 */
const visibleColumns = computed(() => {
  return props.columns.filter((col) => {
    if (!isColumnWithKey(col)) return true // 非普通列，直接显示
    // selection 类型的列也直接显示
    if (col.type === 'selection') return true
    // action 列也默认显示
    if (col.key === 'action') return true
    // 其他列根据 checkedColumnKeys 决定
    return checkedColumnKeys.value.includes(col.key)
  })
})
</script>

<template>
  <n-card :bordered="false">
    <n-space vertical>
      <!-- 头部 -->
      <n-flex justify="space-between" align="center">
        <!-- 左侧按钮 -->
        <n-space>
          <n-button
            v-if="addButton"
            type="primary"
            :render-icon="createIcon('zengjia')"
            @click="emit('add')"
          >
            新增
          </n-button>
          <n-button
            v-if="editButton"
            type="info"
            :render-icon="createIcon('xiugai')"
            @click="emit('edit')"
            :disabled="!isEditEnabled"
          >
            修改
          </n-button>
          <n-button
            v-if="deleteButton"
            type="error"
            :render-icon="createIcon('shanchu')"
            @click="emit('delete')"
            :disabled="!isDeleteEnabled"
          >
            删除
          </n-button>
          <n-button
            v-if="exportButton"
            type="warning"
            :render-icon="createIcon('daochu')"
            @click="emit('export')"
          >
            导出
          </n-button>
          <!-- 右侧插槽（比如刷新按钮等） -->
          <slot name="action-buttons"></slot>
        </n-space>
        <n-space align="center">
          <n-flex align="center"
            ><n-text>边框</n-text><n-switch size="small" @update:value="handleShowBorder"
          /></n-flex>
          <n-divider vertical />
          <n-flex align="center"
            ><n-text>斑马线</n-text><n-switch size="small" @update:value="handleShowStriped"
          /></n-flex>
          <n-divider vertical />
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
            <n-checkbox-group v-model:value="checkedColumnKeys" size="small">
              <n-space vertical>
                <n-checkbox
                  v-for="col in selectableColumns"
                  :key="col.key"
                  :value="col.key"
                  :label="col.title"
                />
              </n-space>
            </n-checkbox-group>
          </n-popover>
        </n-space>
      </n-flex>
      <!-- 表格 -->
      <n-data-table
        ref="tableRef"
        :columns="visibleColumns"
        :data="props.data"
        :pagination="paginationConfig"
        :row-key="getRowKey"
        :bordered="showBorder"
        :single-line="!showBorder"
        :striped="showStriped"
        @update:checked-row-keys="onUpdateCheckedRowKeys"
        @update:page="(page: number) => emit('update:pageNum', page)"
        @update:page-size="(pageSize: number) => emit('update:pageSize', pageSize)"
      />
    </n-space>
  </n-card>
</template>

<style scoped lang="scss">
:deep(.n-data-table-td) {
  transition: none;
}
</style>
