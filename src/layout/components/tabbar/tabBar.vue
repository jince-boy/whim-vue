<script setup lang="ts">
import createIcon from '@/components/icon/icon.ts'
import type { ScrollbarInst, DropdownOption } from 'naive-ui'
import { useTabStore } from '@/stores/modules/tab.ts'
import type { TabState } from '@/stores/type.ts'

defineOptions({
  name: 'LayoutTabBar',
})
const router = useRouter()
const tabStore = useTabStore()
const scrollbar = ref<ScrollbarInst>()

const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)

const dropdownOptions = [
  {
    label: '内容全屏',
    key: 'fullscreen',
    icon: createIcon('full-screen'),
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '刷新当前',
    key: 'refreshCurrent',
    icon: createIcon('refresh-2'),
  },
  {
    label: '关闭当前',
    key: 'closeCurrent',
    icon: createIcon('add-3'),
  },
  {
    label: '关闭其他',
    key: 'closeOther',
    icon: createIcon('guanbiqita'),
  },
  {
    label: '关闭左侧',
    key: 'closeLeft',
    icon: createIcon('d-left'),
  },
  {
    label: '关闭右侧',
    key: 'closeRight',
    icon: createIcon('d-right'),
  },
  {
    label: '关闭全部',
    key: 'closeAll',
    icon: createIcon('closure'),
  },
] as DropdownOption[]

const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}

const onClickoutside = () => {
  showDropdown.value = false
}

const handleSelect = (key: string | number) => {
  showDropdown.value = false
}

const handleTabClick = (path: string) => {
  router.push(path)
}
// 关闭标签页的方法
const handleCloseTab = (tabName: string) => {
  // 先关闭标签页(更新状态)
  tabStore.closeTab(tabName)
  // 如果关闭的是当前路由对应的标签页，跳转到聚焦的标签页的路由
  if (router.currentRoute.value.name === tabName) {
    // 找到聚焦的标签页
    const focusedTab = tabStore.getAllTabs.find((tab) => tab.focused)
    if (focusedTab) {
      router.push(focusedTab.path)
    }
  }
}
const handleScroll = (type: string) => {
  if (type === 'left') {
    scrollbar.value?.scrollBy({
      left: -200,
      behavior: 'smooth',
    })
  }
  if (type === 'right') {
    scrollbar.value?.scrollBy({
      left: 200,
      behavior: 'smooth',
    })
  }
}
watch(
  () => router.currentRoute.value.fullPath, // 也可以用 route.path 或 route.name，主要是触发 watch
  () => {
    if (!router.currentRoute.value.meta?.title || !router.currentRoute.value.name) return
    const tab = {
      title: router.currentRoute.value.meta.title as string,
      path: router.currentRoute.value.fullPath,
      name: router.currentRoute.value.name as string,
      icon: router.currentRoute.value.meta.icon as string | undefined,
      closeable: true,
    } as TabState
    tabStore.addTab(tab)
  },
  { immediate: true },
)
</script>

<template>
  <n-el class="tab">
    <n-flex align="center" justify="space-between" :wrap="false" class="tab-wrapper">
      <n-button
        quaternary
        :focusable="false"
        :render-icon="createIcon('left')"
        class="tab-scroll tab-scroll-left"
        @click="handleScroll('left')"
      />
      <n-scrollbar trigger="none" ref="scrollbar" x-scrollable content-style="height:100%">
        <n-flex align="center" class="tab-box" :wrap="false">
          <n-button
            :type="item.focused ? 'primary' : 'default'"
            size="small"
            :secondary="!item.focused"
            :focusable="false"
            icon-placement="left"
            :render-icon="createIcon(item.icon)"
            v-for="item in tabStore.getAllTabs"
            :key="item.name"
            @click="handleTabClick(item.path)"
            @contextmenu="handleContextMenu"
          >
            {{ item.title }}
            <i
              class="iconfont icon-closure tab-close"
              v-if="item.closeable"
              @click.stop="handleCloseTab(item.name)"
            ></i>
          </n-button>
          <n-dropdown
            placement="bottom-start"
            trigger="manual"
            :x="x"
            :y="y"
            :options="dropdownOptions"
            :show="showDropdown"
            :on-clickoutside="onClickoutside"
            @select="handleSelect"
          />
        </n-flex>
      </n-scrollbar>
      <n-button
        quaternary
        :focusable="false"
        :render-icon="createIcon('right')"
        class="tab-scroll tab-scroll-right"
        @click="handleScroll('right')"
      />
    </n-flex>
  </n-el>
</template>

<style scoped lang="scss">
.tab {
  height: 36px;
  background-color: var(--card-color);
  border-bottom: 1px solid var(--divider-color);

  .tab-wrapper {
    height: 100%;
  }

  .tab-scroll {
    border-radius: 0;
    height: 100%;
  }

  .tab-scroll-left {
    border-right: 1px solid var(--divider-color);
  }

  .tab-scroll-right {
    border-left: 1px solid var(--divider-color);
  }

  .tab-box {
    width: 100%;
    height: 100%;
  }

  :deep(.n-scrollbar-rail__scrollbar) {
    display: none;
  }

  .tab-close {
    margin-left: var(--n-icon-margin);
  }
}
</style>
