<script setup lang="ts">
import { type DictDataProps, useDictData } from '@/views/system/dictData/hooks/useDictData.ts'
import SearchForm from '@/components/form/SearchForm.vue'
import CrudTable from '@/components/table/CrudTable.vue'

defineOptions({
  name: 'SysDictData',
})

const props = defineProps<DictDataProps>()

const {
  form,
  pagination,
  tableColumns,
  tableData,
  loading,
  getDictDataPage,
  openAddDialog,
  openEditDialog,
  removeDictDataBatch,
  backDictTypePage,
} = useDictData(props)
</script>

<template>
  <n-space vertical>
    <SearchForm
      :model="form"
      :show-feedback="false"
      label-placement="left"
      @submit="getDictDataPage()"
    >
      <template #form>
        <n-form-item-gi label="字典标签" path="form.label">
          <n-input v-model:value="form.label" placeholder="请输入字典标签" clearable />
        </n-form-item-gi>
      </template>
    </SearchForm>
    <CrudTable
      :columns="tableColumns"
      :data="tableData"
      :pagination="pagination"
      :loading="loading"
      @refresh="getDictDataPage"
      @update:pageNum="getDictDataPage"
      @update:pageSize="getDictDataPage"
      @add="openAddDialog"
      @edit="openEditDialog"
      @delete="removeDictDataBatch"
    >
      <template #action-buttons>
        <n-button type="error" @click="backDictTypePage">关闭</n-button>
      </template>
    </CrudTable>
  </n-space>
</template>

<style scoped lang="scss"></style>
