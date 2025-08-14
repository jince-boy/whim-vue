/**
 * 表单弹窗组合式函数
 * 提供创建带表单验证的模态对话框的可复用逻辑
 *
 * 功能特点：
 * - 可自定义标题和宽度
 * - 内置表单验证功能
 * - 支持提交/取消操作
 * - 支持自定义表单组件
 * - 类型安全的表单模型
 */
import { type FormInst, useModal, useDialog } from 'naive-ui'
import type { VNodeChild } from 'vue'
/**
 * 表单弹窗配置选项
 * @模板 T - 表单模型类型
 * @模板 E - 表单组件暴露的API类型（默认为 { formRef: FormInst; formModel: DictType }）
 */
interface FormModalOptions<T, E = { formRef: FormInst; formModel: T }> {
  /** 弹窗标题 */
  title: string
  /** 弹窗宽度（像素，可选） */
  width?: number
  /** 要渲染的表单组件 */
  formComponent: object
  /** 表单初始值（可选） */
  model?: T
  /**
   * 从组件实例获取表单API的函数
   * 默认返回 formRef 和 formModel
   */
  getFormApi?: (exposed: E) => {
    formRef: FormInst
    formModel: T
  }
  /**
   * 表单提交回调函数
   * @param formModel 当前表单数据
   * @param dialog 弹窗控制对象（包含关闭方法和标题）
   */
  onSubmit: (
    formModel: T,
    dialog: {
      destroy: () => void
      title: string
    },
  ) => Promise<void> | void
}

/**
 * 删除弹窗配置选项
 */
interface DeleteOptions {
  content: string | (() => VNodeChild)
  onSubmit: () => Promise<void> | void
}
/**
 * 创建表单弹窗的可组合函数
 * @返回 包含打开弹窗方法的对象
 */
export function useFormDialog() {
  const modal = useModal()
  const dialog = useDialog()
  const editFormRef = ref()
  /**
   * 打开表单弹窗
   * @param options 弹窗配置选项
   */
  const openFormDialog = <T>(options: FormModalOptions<T>) => {
    // 默认获取表单API的方法
    const getFormApi =
      options.getFormApi ??
      ((exposed: { formRef: FormInst; formModel: T }) => ({
        formRef: exposed.formRef,
        formModel: exposed.formModel,
      }))

    // 创建弹窗实例
    const m = modal.create({
      title: options.title,
      preset: 'dialog',
      showIcon: false,
      draggable: true,
      negativeText: '取消',
      positiveText: '确定',
      style: {
        width: `${options.width ?? 600}px`,
      },
      // 渲染表单组件
      content: () =>
        h(options.formComponent, {
          modelValue: options.model,
          ref: editFormRef,
        }),
      // 确定按钮点击事件
      onPositiveClick: async () => {
        if (!editFormRef.value) return

        // 获取表单引用和模型
        const { formRef, formModel } = getFormApi(editFormRef.value)

        // 执行表单验证
        await formRef.validate((errors) => {
          if (!errors) {
            // 验证通过后执行提交回调
            options.onSubmit(formModel, {
              destroy: () => m.destroy(),
              title: m.title as string,
            })
          }
        })
      },
    })
  }

  const openDeleteDialog = (options: DeleteOptions) => {
    dialog.warning({
      title: '删除警告',
      content: options.content,
      positiveText: '确定',
      negativeText: '取消',
      contentStyle: {
        textAlign: 'center',
      },
      onPositiveClick: () => {
        options.onSubmit()
      },
    })
  }
  return {
    openFormDialog,
    openDeleteDialog,
  }
}
