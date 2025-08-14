<script setup lang="ts">
import SearchForm from '@/components/form/SearchForm.vue'
import CrudTable from '@/components/table/CrudTable.vue'
import { useDictType } from '@/views/system/dictType/hooks/useDictType.ts'

defineOptions({
  name: 'SysDictType',
})
const {
  form,
  tableColumns,
  tableData,
  pagination,
  loading,
  getDictTypePage,
  openAddDialog,
  openEditDialog,
  removeDictTypeBatch,
} = useDictType()
</script>

<template>
  <n-space vertical>
    <SearchForm
      :model="form"
      :show-feedback="false"
      label-placement="left"
      @submit="getDictTypePage()"
    >
      <template #form>
        <n-form-item-gi label="字典名称" path="form.name">
          <n-input v-model:value="form.name" placeholder="请输入字典名称" clearable />
        </n-form-item-gi>
        <n-form-item-gi label="字典类型" path="form.type">
          <n-input v-model:value="form.type" placeholder="请输入字典类型" clearable />
        </n-form-item-gi>
      </template>
    </SearchForm>
    <CrudTable
      :columns="tableColumns"
      :data="tableData"
      :pagination="pagination"
      :loading="loading"
      @refresh="getDictTypePage"
      @update:pageNum="getDictTypePage"
      @update:pageSize="getDictTypePage"
      @add="openAddDialog"
      @edit="openEditDialog"
      @delete="removeDictTypeBatch"
    ></CrudTable>
  </n-space>
</template>

<style scoped lang="scss"></style>
