<script setup lang="ts">
import BaseForm from '@/components/form/BaseForm.vue'
import BaseTable from '@/components/table/BaseTable.vue'
import { useDictType } from '@/views/system/dictType/hooks/useDictType.ts'
import type { DataTableRowKey } from 'naive-ui'

defineOptions({
  name: 'SysDictType',
})
const { form, tableColumns, tableData, pagination } = useDictType()
</script>

<template>
  <n-space vertical>
    <BaseForm :model="form" :show-feedback="false" label-placement="left">
      <template #form>
        <n-form-item-gi label="字典名称" path="form.name">
          <n-input v-model:value="form.name" placeholder="请输入字典名称" />
        </n-form-item-gi>
        <n-form-item-gi label="字典类型" path="form.type">
          <n-input v-model:value="form.type" placeholder="请输入字典类型" />
        </n-form-item-gi>
      </template>
    </BaseForm>
    <BaseTable
      :columns="tableColumns"
      :data="tableData"
      :pagination="pagination"
      @update:pageNum="
        (value) => {
          pagination.page = value
          console.log(value)
        }
      "
      @update:pageSize="
        (value) => {
          pagination.pageSize = value
          console.log(value)
        }
      "
      @update:checked-row-keys="(rowKeys: DataTableRowKey[]) => console.log(rowKeys)"
      @add="() => console.log('add')"
    ></BaseTable>
  </n-space>
</template>

<style scoped lang="scss"></style>
