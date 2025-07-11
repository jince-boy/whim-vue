import {defineStore} from "pinia";

import {lightTheme, darkTheme, type GlobalTheme} from 'naive-ui'

export const useThemeStore = defineStore('theme', {
    state: () => {
        const savedTheme = localStorage.getItem('theme') || 'light'
        return {
            theme: savedTheme as 'light' | 'dark'
        }
    },
    getters: {
        getTheme(state): GlobalTheme {
            return state.theme === 'light' ? lightTheme : darkTheme
        }
    },
    actions: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', this.theme)
        }
    }
})
