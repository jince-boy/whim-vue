<script setup lang="ts">
import type { Menu, MenuItem } from '@/views/system/menu/hooks/types.ts'
import type { FormInst } from 'naive-ui'
import type { DictData } from '@/components/dict/useDict.ts'
import { menuRules } from '@/views/system/menu/hooks/rule.ts'
import WhimSelectIcon from '@/components/icon/WhimSelectIcon.vue'
import iconfont from '@/assets/iconfont/iconfont.json'

enum MenuType {
  DIRECTORY = 1, // 目录
  MENU = 2, // 菜单
  BUTTON = 3, // 按钮
  EXTERNAL = 4, // 外链
}

const props = withDefaults(
  defineProps<{
    modelValue?: Menu
    extendedData?: {
      rowId: string
      rowType: number
      menuTypeDict: DictData[]
      sysShowStatusDict: DictData[]
      sysRunStatusDict: DictData[]
      sysMenuKeepAliveStatus: DictData[]
      menuData: MenuItem[]
    }
  }>(),
  {
    modelValue: () => ({
      id: '',
      name: '',
      title: '',
      parentId: '0',
      type: 0,
      path: '',
      queryParam: '',
      component: '',
      keepAlive: 0,
      sort: 0,
      code: '',
      visible: 0,
      status: 0,
      icon: '',
      redirect: '',
      remark: '',
    }),
    extendedData: () => ({
      rowId: '0',
      rowType: 1,
      menuTypeDict: [] as DictData[],
      sysShowStatusDict: [] as DictData[],
      sysRunStatusDict: [] as DictData[],
      sysMenuKeepAliveStatus: [] as DictData[],
      menuData: [] as MenuItem[],
    }),
  },
)

const formRef = ref<FormInst | null>()
const formModel = ref(props.modelValue)
const parentNodeType = ref<number>(props.extendedData.rowType)

/** 允许作为父节点的菜单类型 */
const allowedTypes = [MenuType.DIRECTORY, MenuType.MENU]

/** 菜单树：只保留 allowedTypes */
const menuData = computed(() => {
  const filterMenuByType = (menu: MenuItem[]): MenuItem[] =>
    menu
      .map((item) => {
        const newItem: MenuItem = { ...item }
        if (newItem.children?.length) {
          const filteredChildren = filterMenuByType(newItem.children)
          newItem.children = filteredChildren.length > 0 ? filteredChildren : undefined
        }
        return newItem
      })
      .filter((item) => allowedTypes.includes(item.type))
  return [
    {
      title: '顶级菜单',
      id: '0',
      type: MenuType.DIRECTORY,
      children: filterMenuByType(props.extendedData.menuData),
    } as MenuItem,
  ]
})

/** 根据 parentId 动态决定可选菜单类型 */
const menuTypeData = computed(() => {
  return parentNodeType.value === 1
    ? props.extendedData.menuTypeDict
    : props.extendedData.menuTypeDict.filter((d) => d.value === String(MenuType.BUTTON))
})

/** 父节点切换时，修正 parentId 和 type */
const selectedParentIdHandler = (value: string, option: MenuItem) => {
  formModel.value.parentId = value
  parentNodeType.value = option.type
  formModel.value.type = Number(menuTypeData.value[0].value)
}

/**
 * 显示状态切换时，更新status
 * @param value
 */
const showStatusChangeHandler = (value: 0 | 1) => {
  formModel.value.visible = value
}

/**
 * 菜单状态切换时，更新status
 * @param value
 */
const menuStatusChangeHandler = (value: 0 | 1) => {
  formModel.value.status = value
}
/**
 * 缓存状态切换时，更新keepAlive
 * @param value
 */
const menuKeepAliveChangeHandler = (value: 0 | 1) => {
  formModel.value.keepAlive = value
}
/** 初始化默认菜单类型 */
onMounted(() => {
  formModel.value.type = Number(menuTypeData.value[0].value)
})

defineExpose({
  formRef,
  formModel,
})
</script>

<template>
  <n-form
    label-align="right"
    ref="formRef"
    label-width="85"
    label-placement="left"
    :model="formModel"
    :rules="menuRules"
    require-mark-placement="left"
  >
    <n-form-item label="上级菜单" path="parentId">
      <n-tree-select
        :options="menuData"
        label-field="title"
        key-field="id"
        :default-value="props.extendedData.rowId"
        @update:value="selectedParentIdHandler"
      />
    </n-form-item>
    <n-form-item label="菜单类型" path="type">
      <n-radio-group v-model:value="formModel.type">
        <n-radio-button
          v-for="item in menuTypeData"
          :key="item.value"
          :value="Number(item.value)"
          :label="item.label"
        />
      </n-radio-group>
    </n-form-item>
    <n-form-item
      label="菜单图标"
      v-if="
        formModel.type === MenuType.DIRECTORY ||
        formModel.type === MenuType.MENU ||
        formModel.type === MenuType.EXTERNAL
      "
      path="icon"
    >
      <WhimSelectIcon :icon-data="iconfont.glyphs" v-model="formModel.icon" />
    </n-form-item>
    <n-grid :cols="2" :x-gap="12">
      <n-form-item-gi label="菜单名称" path="title">
        <n-input v-model:value="formModel.title" type="text" placeholder="请输入菜单名称" />
      </n-form-item-gi>
      <n-form-item-gi label="外链地址" v-if="formModel.type === MenuType.EXTERNAL" path="redirect">
        <n-input v-model:value="formModel.redirect" type="text" placeholder="请输入外链地址" />
      </n-form-item-gi>
      <n-form-item-gi label="权限标识" v-if="formModel.type === MenuType.BUTTON" path="code">
        <n-input v-model:value="formModel.code" type="text" placeholder="请输入权限标识" />
      </n-form-item-gi>
      <n-form-item-gi
        label="路由名称"
        v-if="formModel.type === MenuType.DIRECTORY || formModel.type === MenuType.MENU"
        path="name"
      >
        <n-input v-model:value="formModel.name" type="text" placeholder="请输入路由名称" />
      </n-form-item-gi>
      <n-form-item-gi
        label="路由地址"
        v-if="formModel.type === MenuType.DIRECTORY || formModel.type === MenuType.MENU"
        path="path"
      >
        <n-input v-model:value="formModel.path" type="text" placeholder="请输入路由地址" />
      </n-form-item-gi>
      <n-form-item-gi label="组件路径" v-if="formModel.type === MenuType.MENU" path="component">
        <n-input v-model:value="formModel.component" type="text" placeholder="请输入组件路径" />
      </n-form-item-gi>
      <n-form-item-gi label="路由参数" v-if="formModel.type === MenuType.MENU" path="queryParam">
        <n-input v-model:value="formModel.queryParam" type="text" placeholder="路由参数" />
      </n-form-item-gi>
      <n-form-item-gi label="菜单顺序" path="sort">
        <n-input-number style="width: 100%" v-model:value="formModel.sort" :min="0" :max="9999" />
      </n-form-item-gi>
      <n-form-item-gi
        label="显示状态"
        v-if="formModel.type === MenuType.DIRECTORY || formModel.type === MenuType.MENU"
        path="visible"
      >
        <n-tabs
          v-model:value="formModel.visible"
          size="small"
          type="segment"
          animated
          style="width: 100px"
          @update:value="showStatusChangeHandler"
        >
          <n-tab
            v-for="item in props.extendedData.sysShowStatusDict"
            :key="item.value"
            :name="item.value"
            >{{ item.label }}</n-tab
          >
        </n-tabs>
      </n-form-item-gi>
      <n-form-item-gi label="菜单状态" path="status">
        <n-tabs
          v-model:value="formModel.status"
          size="small"
          type="segment"
          animated
          style="width: 100px"
          @update:value="menuStatusChangeHandler"
        >
          <n-tab
            v-for="item in props.extendedData.sysRunStatusDict"
            :key="item.value"
            :name="item.value"
            >{{ item.label }}</n-tab
          >
        </n-tabs>
      </n-form-item-gi>
      <n-form-item-gi label="缓存状态" v-if="formModel.type === MenuType.MENU" path="keepAlive">
        <n-tabs
          v-model:value="formModel.keepAlive"
          size="small"
          type="segment"
          animated
          style="width: 100px"
          @update:value="menuKeepAliveChangeHandler"
        >
          <n-tab
            v-for="item in props.extendedData.sysMenuKeepAliveStatus"
            :key="item.value"
            :name="item.value"
            >{{ item.label }}</n-tab
          >
        </n-tabs>
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>
