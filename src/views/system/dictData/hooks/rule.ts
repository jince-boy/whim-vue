import type { FormRules } from 'naive-ui'

export const dictDataRules: FormRules = {
  label: [{ required: true, message: '请输入数据标签', trigger: 'blur' }],
  value: [{ required: true, message: '请输入数据键值', trigger: 'blur' }],
  listClass: [{ required: true, message: '请输入回显样式', trigger: 'blur' }],
  sort: [
    {
      required: true,
      validator: (rule, value) => {
        if (value === null || value === undefined || value === '') {
          return new Error('请输入排序')
        }
        return true
      },
      trigger: ['blur', 'change'],
    },
  ],
}
