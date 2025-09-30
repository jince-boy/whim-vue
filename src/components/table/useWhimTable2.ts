import { dataTableProps, type DataTableRowKey } from 'naive-ui'
import { type ExtractPropTypes, useAttrs } from 'vue'

/**
 * naive-ui的data-table属性
 */
type BaseProps = Partial<ExtractPropTypes<typeof dataTableProps>>

/**
 * 按钮类型
 */
export type ButtonType = 'add' | 'edit' | 'delete' | 'export'
/**
 * 按钮权限控制
 */
interface ButtonPermission {
  add?: string[]
  edit?: string[]
  delete?: string[]
  export?: string[]
}
/**
 * 自定义属性
 */
export interface WhimDataTableProps extends /* @vue-ignore */ BaseProps {
  // 允许显示的按钮
  visibleButtons?: ButtonType[]
  // 按钮权限控制
  buttonPermission?: ButtonPermission
  buttonRole?: ButtonPermission
  // 允许显示的边框和斑马纹功能开关
  visibleBorderSwitch?: boolean
  visibleStripedSwitch?: boolean
}

export interface WhimDataTableEmits {
  (e: 'add'): void
  (e: 'edit', rowKey: DataTableRowKey): void
  (e: 'delete'): void
  (e: 'export'): void
  (e: 'refresh'): void
  (e: 'update:checked-row-key', rowKeys: DataTableRowKey[]): void
}

export function useWhimTable(props: WhimDataTableProps, emit: WhimDataTableEmits) {
  // 获取到props不包含的一些attribute
  const attrs = useAttrs()
  // 将props和attrs进行合并
  const tableProps = computed(() => ({
    ...attrs,
    ...props,
    rowKey: (row: object): string | number => {
      const r = row as Record<string, unknown>
      return r['id'] as string | number
    },
  }))
  // 表格的实例引用
  const tableRef = useTemplateRef('tableRef')
  // 表格边框和斑马纹开关
  const bordered = ref(tableProps.value.bordered)
  const striped = ref(tableProps.value.striped)
  // 表格选中行数组
  const checkedRowKeys = ref<DataTableRowKey[]>([])

  const handleCheck = (rowKeys: DataTableRowKey[]) => {
    checkedRowKeys.value = rowKeys
    emit('update:checked-row-key', rowKeys)
  }
  return {
    tableProps,
    tableRef,
    bordered,
    striped,
    checkedRowKeys,
    handleCheck,
  }
}
