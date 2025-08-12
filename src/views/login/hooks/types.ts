export interface LoginForm {
  username: string
  password: string
  uuid: string
  rememberMe: boolean
  captcha: number | null
}
