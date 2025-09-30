<script setup lang="ts">
import SearchForm from '@/components/form/SearchForm.vue'
import WhimTable2 from '@/components/table/WhimTable2.vue'
import { useDictType } from '@/views/system/dictType/hooks/useDictType.ts'
import { useIcon } from '@/components/icon/useIcon.ts'

defineOptions({
  name: 'SysDictType',
})
const { createIcon } = useIcon()
const {
  form,
  tableColumns,
  tableData,
  pagination,
  loading,
  getDictTypePage,
  openAddDialog,
  // openEditDialog,
  removeDictTypeBatch,
  handleResetDictCache,
  exportExcel,
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
    <WhimTable2
      :columns="tableColumns"
      :data="tableData"
      :pagination="pagination"
      :loading="loading"
      @add="openAddDialog"
      @update:checked-row-keys="(row)=>console.log(row)"
    >
      <template #action-buttons-right>
        <n-button
          v-permission="['system:dictType:reset']"
          type="error"
          :render-icon="createIcon('refresh-2')"
          @click="handleResetDictCache"
          >刷新缓存</n-button
        >
      </template>
    </WhimTable2>
  </n-space>
</template>

<style scoped lang="scss"></style>
