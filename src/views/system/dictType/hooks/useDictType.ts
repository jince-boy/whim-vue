import { type DataTableColumn, NButton, NSpace } from 'naive-ui'
import { fetchDictTypePage } from '@/api/system/dict'

export function useDictType() {
  const form = reactive({
    name: '',
    type: '',
  })
  const pagination = reactive({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    pageCount: 0,
  })
  const tableColumns: DataTableColumn[] = [
    {
      type: 'selection',
    },
    {
      title: '字典名称',
      key: 'name',
      align: 'center'
    },
    {
      title: '字典类型',
      key: 'type',
      align: 'center',
      render(row) {
        return h(
          NButton,
          {
            text: true,
            type: 'primary',
            onClick: () => {
              console.log('修改', row)
            },
          },
          { default: () => row.type },
        )
      },
    },
    {
      title: '备注',
      key: 'remark',
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
      render(row) {
        return h(NSpace, { justify: 'center' }, () => [
          h(
            NButton,
            {
              text: true,
              type: 'primary',
              onClick: () => {
                console.log('修改', row)
              },
            },
            { default: () => '修改' },
          ),
          h(
            NButton,
            {
              text: true,
              type: 'primary',
              onClick: () => {
                console.log('删除', row)
              },
            },
            { default: () => '删除' },
          ),
        ])
      },
    },
  ]
  const tableData = ref<object[]>([])

  const getDictTypePage = () => {
    fetchDictTypePage({
      ...form,
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
    }).then((res) => {
      tableData.value = res.data.data
      pagination.page = res.data.currentPage
      pagination.pageSize = res.data.size
      pagination.itemCount = res.data.total
      pagination.pageCount = res.data.pages
    })
  }
  onMounted(() => {
    getDictTypePage()
  })
  return {
    form,
    tableColumns,
    tableData,
    pagination,
  }
}
