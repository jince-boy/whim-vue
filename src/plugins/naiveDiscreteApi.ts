import { type ConfigProviderProps, createDiscreteApi } from 'naive-ui'
import { useThemeStore } from '@/stores/modules/theme.ts'

export function setupNaiveDiscreteApi() {
  const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
    theme: useThemeStore().getTheme,
  }))
  const { message, notification, dialog, loadingBar, modal } = createDiscreteApi(
    ['message', 'notification', 'dialog', 'loadingBar', 'modal'],
    {
      configProviderProps: configProviderPropsRef,
    },
  )

  window['$message'] = message
  window['$dialog'] = dialog
  window['$notification'] = notification
  window['$loadingBar'] = loadingBar
  window['$modal'] = modal
}
