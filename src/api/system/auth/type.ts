export interface LoginResult {
  prefix: string
  token: string
  expire: number
}

export interface CaptchaResult {
  uuid: string
  base64: string
}
