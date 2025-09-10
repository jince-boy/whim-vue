<script setup lang="ts">
import SearchForm from '@/components/form/SearchForm.vue'
import { useMenu } from '@/views/system/menu/hooks/useMenu.ts'
import WhimTable from '@/components/table/WhimTable.vue'

const { form, tableData, loading, getMenuList, tableColumns, expandedRowKeys } = useMenu()
</script>

<template>
  <n-space vertical>
    <SearchForm :model="form" :show-feedback="false" label-placement="left" @submit="getMenuList()">
      <template #form>
        <n-form-item-gi label="菜单名称" path="form.title">
          <n-input v-model:value="form.title" placeholder="请输入菜单名称" clearable />
        </n-form-item-gi>
      </template>
    </SearchForm>
    <WhimTable
      :columns="tableColumns"
      :data="tableData"
      :pagination="false"
      :loading="loading"
      :delete-button-show="false"
      :edit-button-show="false"
      :add-button-permission="['system:menu:add']"
      :export-button-permission="['system:menu:export']"
      :expanded-row-keys="expandedRowKeys"
      @refresh="getMenuList"
    >

    </WhimTable>
  </n-space>
</template>

<style scoped lang="scss"></style>
