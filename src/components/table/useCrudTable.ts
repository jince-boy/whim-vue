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
export interface Pagination {
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
export interface BaseTableProps {
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
  /** 是否显示加载中 */
  loading?: boolean
}

export interface BaseTableEmits {
  (e: 'update:pageNum', page: number): void
  (e: 'update:pageSize', pageSize: number): void
  (e: 'add'): void
  (e: 'edit', rowKey: DataTableRowKey): void
  (e: 'delete', rowKeys: DataTableRowKey[]): void
  (e: 'export'): void
  (e: 'update:checked-row-keys', rowKeys: DataTableRowKey[]): void
  (e: 'refresh'): void
}

export function useCrudTable(props: BaseTableProps, emit: BaseTableEmits) {
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
   * 与父组件 pagination 保持引用同步
   */
  const pagination = toRef(props, 'pagination')
  /**
   * 计算分页配置，默认支持页码大小选择
   */
  const paginationConfig = computed(() => {
    if (!pagination) return false
    return {
      ...pagination,
      showSizePicker: true,
      pageSizes: [10, 20, 30, 40, 50],
    }
  })
  /**
   * 页码更新处理函数
   * @param page
   */
  const handlePageChange = (page: number) => {
    pagination.value.page = page
    emit('update:pageNum', page)
  }

  /**
   * 每页条数更新处理函数
   * @param pageSize
   */
  const handlePageSizeChange = (pageSize: number) => {
    pagination.value.pageSize = pageSize
    emit('update:pageSize', pageSize)
  }
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

  watch(
    () => props.data,
    (newData) => {
      const currentKeys = selectedRowKeys.value
      const validKeys = newData.map(getRowKey)
      const filteredKeys = currentKeys.filter((key) => validKeys.includes(key))
      if (filteredKeys.length !== currentKeys.length) {
        selectedRowKeys.value = filteredKeys
        emit('update:checked-row-keys', filteredKeys)
      }
    },
    { immediate: true }, // 初始化时也同步一次
  )

  return {
    tableRef,
    showStriped,
    showBorder,
    selectedRowKeys,
    isEditEnabled,
    isDeleteEnabled,
    paginationConfig,
    getRowKey,
    onUpdateCheckedRowKeys,
    handlePageChange,
    handlePageSizeChange,
    handleShowBorder,
    handleShowStriped,
    selectableColumns,
    checkedColumnKeys,
    visibleColumns,
  }
}
