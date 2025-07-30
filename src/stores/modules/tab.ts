import { type MenuOption } from 'naive-ui'

export const useTabStore = defineStore('tab', {
  state: () => ({
    tabs: [] as MenuOption[],
  }),
  getters: {},
  actions: {},
})
