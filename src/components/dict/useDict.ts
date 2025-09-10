import { ref } from 'vue'
import { fetchDictDataListByDictType } from '@/api/system/dict'

type TagType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

export interface DictData {
  id: number | string
  dictType: string
  label: string
  value: string
  listClass: TagType
  sort: number
  remark: string
}

export async function useDict(dictType: string) {
  const dictData = ref<DictData[]>([])

  const res = await fetchDictDataListByDictType(dictType)
  if (res.code === 200) {
    dictData.value = res.data
  }

  // 根据 value 找字典项
  const getDictData = (value: string) => {
    return dictData.value.find((item) => item.value === value)
  }

  return {
    dictData,
    getDictData
  }
}
