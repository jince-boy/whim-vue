import type { FormInst } from 'naive-ui'
import { MdPerson, IosLock } from '@vicons/ionicons4'
import { ShieldTask16Filled } from '@vicons/fluent'
import type { LoginForm } from '@/views/login/logic/types.ts'
import { login, getCaptcha } from '@/api/system/auth'
import { useAuthStore } from '@/stores/modules/auth.ts'

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
        login(form).then((res) => {
          if (res.code == 200) {
            message.success(res.message)
            authStore.login(res.data.token, form.rememberMe)
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
    MdPerson,
    IosLock,
    ShieldTask16Filled,
    handleLogin,
    handleCaptcha,
  }
}
