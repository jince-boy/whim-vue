import { fetchMenuList } from '@/api/system/menu'
import { type DataTableColumn, NButton, NSpace, NTag, useMessage } from 'naive-ui'
import type { Menu, MenuItem } from '@/views/system/menu/hooks/types.ts'
import { useIcon } from '@/components/icon/useIcon.ts'
import { useDict } from '@/components/dict/useDict.ts'
import { useFormDialog } from '@/components/dialog/useFormDialog.ts'
import editForm from '@/views/system/menu/form.vue'

const { dictData, getDictData } = await useDict('sys_menu_type')
const { dictData: sysShowStatusDict, getDictData: getSysShowStatusDict } =
  await useDict('sys_show_status')
const { dictData: sysRunStatusDict } = await useDict('sys_run_status')
const { dictData: sysMenuKeepAliveStatus } = await useDict('sys_menu_keepAlive_status')

export function useMenu() {
  const { createIcon } = useIcon()
  const { openFormDialog } = useFormDialog()

  const form = reactive({
    title: '',
  })
  const tableData = ref<MenuItem[]>([])
  const tableColumns: DataTableColumn[] = [
    {
      title: '菜单名称',
      key: 'title',
      align: 'center',
    },
    {
      title: '菜单类型',
      key: 'type',
      align: 'center',
      render(row: object) {
        const menu = row as MenuItem
        const dictData = getDictData(String(menu.type))
        return h(
          NTag,
          {
            bordered: false,
            type: dictData!.listClass,
          },
          { default: () => dictData!.label },
        )
      },
    },
    {
      title: '图标',
      key: 'icon',
      align: 'center',
      render(row: object) {
        const menu = row as MenuItem
        if (!menu.icon) {
          return '-'
        }
        return createIcon(menu.icon)()
      },
    },
    {
      title: '路由名称',
      key: 'name',
      align: 'center',
      render(row: object) {
        const menu = row as MenuItem
        return menu.name || '-'
      },
    },
    {
      title: '权限标识',
      key: 'code',
      align: 'center',
      render(row: object) {
        const menu = row as MenuItem
        return menu.code || '-'
      },
    },
    {
      title: '显示状态',
      key: 'visible',
      align: 'center',
      render(row: object) {
        const menu = row as MenuItem
        const dictData = getSysShowStatusDict(String(menu.visible))
        return h(
          NTag,
          {
            bordered: false,
            type: dictData!.listClass,
          },
          { default: () => dictData!.label },
        )
      },
    },
    {
      title: '排序',
      key: 'sort',
      align: 'center',
    },
    {
      title: '创建时间',
      key: 'createTime',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render(row: object) {
        const menu = row as MenuItem
        return h(NSpace, { justify: 'center' }, () => [
          menu.type == 3 || menu.type == 4
            ? null
            : h(
                NButton,
                {
                  text: true,
                  type: 'primary',
                  onClick: async () => {
                    await openAddDialog(menu.id, menu.type)
                  },
                },
                { default: () => '新增' },
              ),
          h(
            NButton,
            {
              text: true,
              type: 'info',
              onClick: async () => {
                // await openEditDialog(dictType.id)
              },
            },
            { default: () => '修改' },
          ),
          h(
            NButton,
            {
              text: true,
              type: 'error',
              onClick: () => {
                // removeDictType(dictType)
              },
            },
            { default: () => '删除' },
          ),
        ])
      },
    },
  ]
  const loading = ref(false)
  const expandedRowKeys = ref<Array<number | string>>([])

  const openAddDialog = (rowId: string, rowType: number) => {
    openFormDialog<Menu>({
      title: '新建菜单',
      width: 800,
      formComponent: editForm,
      extendedData: {
        rowId: rowId ?? '0',
        rowType: rowType ?? 1,
        menuTypeDict: dictData,
        sysShowStatusDict: sysShowStatusDict,
        sysRunStatusDict: sysRunStatusDict,
        sysMenuKeepAliveStatus: sysMenuKeepAliveStatus,
        menuData: tableData.value,
      },
      onSubmit: async (formModel, dialog) => {
        console.log(formModel)
      },
    })
  }
  /**
   * 获取菜单列表
   */
  const getMenuList = () => {
    loading.value = true
    fetchMenuList(form).then((res) => {
      tableData.value = res.data
      loading.value = false
      expandedRowKeys.value = res.data.map((item) => item.id)
    })
  }

  onMounted(() => {
    getMenuList()
  })
  return {
    form,
    tableData,
    loading,
    tableColumns,
    getMenuList,
    expandedRowKeys,
    openAddDialog,
  }
}
