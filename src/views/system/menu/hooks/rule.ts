import type { FormRules } from 'naive-ui'

export const menuRules: FormRules = {
  parentId: [{ type: 'string', required: true, message: '请输入上级菜单', trigger: 'change' }],
  type: [{ type: 'number', required: true, trigger: 'change', message: '请选择菜单类型' }],
  name: [{ type: 'string', required: true, message: '请输入路由名称', trigger: 'blur' }],
  title: [{ type: 'string', required: true, message: '请输入菜单名称', trigger: 'blur' }],
  path: [{ type: 'string', required: true, message: '请输入路由地址', trigger: 'blur' }],
  sort: [{ type: 'number', required: true, message: '请输入排序', trigger: 'blur' }],
}
