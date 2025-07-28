import type { FormInst } from 'naive-ui'
import type { LoginForm } from '@/views/login/logic/types.ts'
import { login, getCaptcha } from '@/api/system/auth'
import { useAuthStore } from '@/stores/modules/auth.ts'
import router from '@/router'
import createIcon from '@/components/icon/icon.ts'

const userIcon = createIcon('yonghu')
const passwordIcon = createIcon('mima')
const captchaIcon = createIcon('yanzhengma')

const authStore = useAuthStore()

export function useLogin() {
  const message = useMessage()
  const formRef = ref<FormInst | null>(null)
  const form = reactive<LoginForm>({
    username: '',
    password: '',
    uuid: '',
    captcha: null,
    rememberMe: false,
  })
  const captcha = ref('')

  const handleLogin = () => {
    formRef.value?.validate((errors) => {
      if (!errors) {
        login(form).then(async (res) => {
          if (res.code == 200) {
            message.success(res.message)
            await authStore.login(res.data.token, form.rememberMe)
            await router.push(
              decodeURIComponent((router.currentRoute.value.query.redirect as string) || '/'),
            )
          } else {
            handleCaptcha()
            message.error(res.message)
          }
        })
      }
    })
  }
  const handleCaptcha = () => {
    getCaptcha().then((res) => {
      form.uuid = res.data.uuid
      captcha.value = res.data.base64
    })
  }
  onMounted(() => {
    handleCaptcha()
  })
  return {
    formRef,
    form,
    captcha,
    userIcon,
    passwordIcon,
    captchaIcon,
    handleLogin,
    handleCaptcha,
  }
}
