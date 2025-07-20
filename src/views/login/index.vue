<script setup lang="ts">
import { useLogin } from '@/views/login/logic/useLogin.ts'
import { loginRules } from '@/views/login/logic/rule.ts'

defineOptions({
  name: 'LoginPage',
})

const {
  formRef,
  form,
  captcha,
  MdPerson,
  IosLock,
  ShieldTask16Filled,
  handleLogin,
  handleCaptcha,
} = useLogin()
</script>

<template>
  <n-config-provider :theme="null">
    <n-flex justify="center" align="center" class="login-container">
      <n-card class="login-box" hoverable>
        <h2>Whim Admin</h2>
        <n-form
          ref="formRef"
          :label-width="80"
          :model="form"
          :rules="loginRules"
          size="medium"
          :show-label="false"
        >
          <n-form-item path="username">
            <n-input
              v-model:value="form.username"
              placeholder="用户名"
              :input-props="{ autocomplete: 'new-password' }"
            >
              <template #prefix>
                <n-icon :component="MdPerson" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              type="password"
              v-model:value="form.password"
              placeholder="密码"
              :input-props="{ autocomplete: 'new-password' }"
            >
              <template #prefix>
                <n-icon :component="IosLock" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item label="验证码" path="captcha">
            <n-space :wrap="false">
              <n-input
                v-model:value="form.captcha"
                placeholder="验证码"
                :input-props="{ autocomplete: 'new-password' }"
              >
                <template #prefix>
                  <n-icon :component="ShieldTask16Filled" />
                </template>
              </n-input>
              <n-image
                width="100"
                height="34"
                :src="captcha"
                preview-disabled
                lazy
                class="captcha"
                alt="验证码"
                @click="handleCaptcha"
              />
            </n-space>
          </n-form-item>
          <n-form-item>
            <n-checkbox v-model:checked="form.rememberMe">记住密码</n-checkbox>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" class="login-button" @click="handleLogin">登录</n-button>
          </n-form-item>
        </n-form>
      </n-card>
      <n-el class="copyright">Copyright © 2025–Present Whim. All Rights Reserved.</n-el>
    </n-flex>
  </n-config-provider>
</template>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  background-image: url('@/assets/login-bg.svg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;

  .copyright {
    color: #fff;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 20px 0;
  }
}

.login-box {
  max-width: 400px;

  h2 {
    text-align: center;
  }

  .captcha {
    vertical-align: middle;
    cursor: pointer;
  }
}

.login-button {
  width: 100%;
}
</style>
