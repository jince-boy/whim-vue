<script setup lang="ts">
import { type FormInst } from 'naive-ui'

/**
 * BaseForm 通用表单组件 Props
 * @template T 表单数据类型
 */
interface BaseFormProps<T extends Record<string, unknown>> {
  /** 表单数据（父组件维护） */
  model: T
  /** 表单验证规则 */
  rules?: Record<string, unknown>
  /** 是否显示反馈信息 */
  showFeedback?: boolean
  /** 标签位置 */
  labelPlacement?: 'left' | 'top'
}

/**
 * 使用泛型定义 Props 类型（默认值为 Record<string, unknown>）
 * 这样父组件传入时可自动推导出类型
 */
const props = defineProps<BaseFormProps<Record<string, unknown>>>()

/**
 * 定义组件事件
 * @event submit 表单提交时触发
 * @event reset 表单重置时触发
 */
const emit = defineEmits<{
  <T extends Record<string, unknown>>(e: 'submit', values: T): void
  <T extends Record<string, unknown>>(e: 'reset', values: T): void
}>()

/** Naive UI 表单实例 */
const formRef = ref<FormInst | null>()
/**
 * 与父组件 model 保持引用同步
 * 使用 toRef 而不是解构拷贝，保证数据实时双向绑定
 */
const formModel = toRef(props, 'model')
/**
 * 存储一份初始表单数据快照，用于重置
 * 使用 shallowRef 避免不必要的深层响应
 */
const defaultFormModel = shallowRef({ ...props.model })

/**
 * 提交表单
 * 先触发 Naive UI 校验，成功后 emit 事件
 */
const submit = async () => {
  await formRef.value?.validate()
  emit('submit', toRaw(formModel.value) as typeof props.model)
}

/**
 * 重置表单
 * 恢复到初始快照，并清空校验状态
 */
const resetFields = async () => {
  Object.keys(defaultFormModel.value).forEach((key) => {
    formModel.value[key] = defaultFormModel.value[key] ?? null
  })
  formRef.value?.restoreValidation()
  emit('reset', toRaw(formModel.value) as typeof props.model)
}

/** 暴露方法给父组件调用 */
defineExpose({
  submit,
  resetFields,
})
</script>

<template>
  <n-card :bordered="false">
    <n-form
      ref="formRef"
      inline
      label-width="auto"
      :model="formModel"
      :rules="rules"
      :show-feedback="props.showFeedback"
      :label-placement="props.labelPlacement"
      label-align="left"
    >
      <n-grid :cols="4" x-gap="12" y-gap="12">
        <!-- 表单项插槽 -->
        <slot name="form"></slot>

        <!-- 操作按钮区 -->
        <slot name="action">
          <n-gi>
            <n-space>
              <n-button type="primary" @click="submit">搜索</n-button>
              <n-button @click="resetFields">重置</n-button>
            </n-space>
          </n-gi>
        </slot>
      </n-grid>
    </n-form>
  </n-card>
</template>

<style scoped lang="scss">
:deep(.n-input__placeholder) {
  line-height: 1.6;
}
</style>
