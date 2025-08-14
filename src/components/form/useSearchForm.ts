import { type FormInst } from 'naive-ui'
/**
 * Index 通用表单 Props 类型
 * @template T 表单数据类型
 */
export interface BaseFormProps<T extends Record<string, unknown>> {
  model: T
  rules?: Record<string, unknown>
  showFeedback?: boolean
  labelPlacement?: 'left' | 'top'
}

/**
 * Index 事件类型
 * @template T 表单数据类型
 */
export interface BaseFormEmits<T extends Record<string, unknown>> {
  (e: 'submit', values: T): void
  (e: 'reset', values: T): void
}

export function useBaseForm<T extends Record<string, unknown>>(
  props: BaseFormProps<T>,
  emit: BaseFormEmits<T>,
) {
  /** Naive UI 表单实例 */
  const formRef = ref<FormInst | null>(null)

  /** 与父组件 model 保持引用同步 */
  const formModel = toRef(props, 'model')

  /** 初始表单数据快照 */
  const defaultFormModel = shallowRef({ ...props.model })

  /** 提交表单 */
  const submit = async () => {
    await formRef.value?.validate()
    emit('submit', toRaw(formModel.value) as T)
  }

  /** 重置表单 */
  const resetFields = async () => {
    Object.keys(defaultFormModel.value).forEach((key) => {
      formModel.value[key] = defaultFormModel.value[key] ?? null
    })
    formRef.value?.restoreValidation()
    emit('reset', toRaw(formModel.value) as T)
  }

  return {
    formRef,
    formModel,
    submit,
    resetFields,
  }
}
