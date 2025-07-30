import { type GlobalThemeOverrides } from 'naive-ui'

// 提取公共配置
const commonThemeOverrides: Pick<GlobalThemeOverrides, 'common'> = {
  common: {
    fontWeightStrong: '600'
  },
}

export const lightThemeOverrides: GlobalThemeOverrides = {
  ...commonThemeOverrides, // 复用 common 配置
  Layout: {
    footerColor: '#fff',
  },
}

export const darkThemeOverrides: GlobalThemeOverrides = {
  ...commonThemeOverrides, // 复用 common 配置
  Layout: {
    footerColor: 'rgb(24,24,28)',
  },
}
