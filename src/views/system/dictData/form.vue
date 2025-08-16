<script setup lang="ts">
import { dictDataRules } from '@/views/system/dictData/hooks/rule.ts'
import type { FormInst, SelectOption, SelectGroupOption } from 'naive-ui'
import type { DictData } from '@/views/system/dictData/hooks/types.ts'

const props = withDefaults(defineProps<{ modelValue?: DictData }>(), {
  modelValue: () => ({
    id: '',
    dictType: '',
    label: '',
    value: '',
    listClass: 'default',
    sort: 0,
    remark: '',
  }),
})

const options: Array<SelectOption | SelectGroupOption> = [
  {
    label: '默认',
    value: 'default',
  },
  {
    label: '主要',
    value: 'primary',
  },
  {
    label: '信息',
    value: 'info',
  },
  {
    label: '成功',
    value: 'success',
  },
  {
    label: '警告',
    value: 'warning',
  },
  {
    label: '危险',
    value: 'error',
  },
]

const formRef = ref<FormInst | null>()
const formModel = ref(props.modelValue)

defineExpose({
  formRef,
  formModel,
})
</script>

<template>
  <n-form
    ref="formRef"
    label-width="auto"
    label-placement="left"
    :model="formModel"
    :rules="dictDataRules"
    require-mark-placement="left"
  >
    <n-form-item label="字典类型" path="dictType">
      <n-input v-model:value="formModel.dictType" disabled placeholder="请输入字典类型" />
    </n-form-item>
    <n-form-item label="数据标签" path="label">
      <n-input v-model:value="formModel.label" placeholder="请输入数据标签" />
    </n-form-item>
    <n-form-item label="数据键值" path="value">
      <n-input v-model:value="formModel.value" placeholder="请输入数据键值" />
    </n-form-item>
    <n-form-item label="回显样式" path="listClass">
      <n-select
        v-model:value="formModel.listClass"
        :options="options"
        placeholder="请选择回显样式"
      />
    </n-form-item>
    <n-form-item label="排序" path="sort">
      <n-input-number
        style="width: 100%"
        v-model:value="formModel.sort"
        clearable
        placeholder="请输入排序"
      />
    </n-form-item>
    <n-form-item label="备注">
      <n-input v-model:value="formModel.remark" type="textarea" placeholder="请输入字典备注" />
    </n-form-item>
  </n-form>
</template>

<style scoped lang="scss"></style>
