<script setup lang="ts">
import CrudTable from '@/components/table/CrudTable.vue'
import SearchForm from '@/components/form/SearchForm.vue'
import { useLoginLog } from '@/views/system/loginLog/hooks/useLoginLog.ts'
import { useIcon } from '@/components/icon/useIcon.ts'

const { createIcon } = useIcon()

const {
  form,
  dateRange,
  sysStatusOptions,
  handleDateChange,
  pagination,
  tableColumns,
  tableData,
  loading,
  getLoginLogPage,
  exportExcel,
  removeDictTypeBatch,
  handleCleanLoginLog,
} = useLoginLog()
</script>

<template>
  <n-space vertical>
    <SearchForm
      :model="form"
      :show-feedback="false"
      label-placement="left"
      @submit="getLoginLogPage()"
      @reset="dateRange = null"
    >
      <template #form>
        <n-form-item-gi label="用户名" path="form.username">
          <n-input v-model:value="form.username" placeholder="请输入用户名" clearable />
        </n-form-item-gi>
        <n-form-item-gi label="IP地址" path="form.ipAddress">
          <n-input v-model:value="form.ipAddress" placeholder="请输入登录IP地址" clearable />
        </n-form-item-gi>
        <n-form-item-gi label="登录状态" path="form.type">
          <n-select
            placeholder="请选择登录状态"
            v-model:value="form.status"
            :options="sysStatusOptions"
            clearable
          />
        </n-form-item-gi>
        <n-form-item-gi label="登录时间" path="form.type">
          <n-date-picker
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            v-model:value="dateRange"
            type="datetimerange"
            clearable
            @update:value="handleDateChange"
          />
        </n-form-item-gi>
      </template>
    </SearchForm>
    <CrudTable
      :columns="tableColumns"
      :data="tableData"
      :pagination="pagination"
      :loading="loading"
      :delete-button-permission="['system:loginLog:delete']"
      :export-button-permission="['system:loginLog:export']"
      :add-button-show="false"
      :edit-button-show="false"
      @refresh="getLoginLogPage"
      @update:pageNum="getLoginLogPage"
      @update:pageSize="getLoginLogPage"
      @export="exportExcel"
      @delete="removeDictTypeBatch"
    >
      <template #action-buttons-left>
        <n-button
          v-permission="['system:loginLog:clean']"
          type="error"
          :render-icon="createIcon('shanchu')"
          @click="handleCleanLoginLog"
          >清空</n-button
        >
      </template>
    </CrudTable>
  </n-space>
</template>

<style scoped lang="scss"></style>
