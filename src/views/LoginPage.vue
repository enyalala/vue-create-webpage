<script setup lang="ts">
import { ref } from 'vue'
import { useUserInfo } from '@/stores/UserInfo'
import { RouterLink } from 'vue-router'

const { userInfo } = useUserInfo()
console.log(userInfo[0].account)

const accountInput = ref('lena@gmail.com')
const passwordInput = ref('a0000')
const formIsVaild = ref(true)
const mode = ref('login')

const submitForm = () => {
  formIsVaild.value = true
  if (
    accountInput.value === '' ||
    !accountInput.value.includes('@') ||
    passwordInput.value.length < 4
  ) {
    formIsVaild.value = false
    return
  }
}
const switchAuthMode = () => {
  if (mode.value === 'login') {
    mode.value = 'signup'
  } else {
    mode.value = 'login'
  }
}

const userLogin = () => {
  if (
    accountInput.value === userInfo[0].account &&
    passwordInput.value === userInfo[0].password
  ) {
    console.log('hi')
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="container">
      <div class="login_box">
        <div class="title">
          <img src="@/assets/img/kktvImage/kktv_member.svg" alt="photo" />
        </div>
        <div class="input_content">
          <div class="input_text">
            帳號：
            <div>
              <input
                class="input_blank"
                type="text"
                placeholder="請輸入帳號"
                v-model.trim="accountInput"
              />
            </div>
          </div>
          <div class="input_text">
            密碼：
            <div>
              <input
                class="input_blank"
                type="text"
                placeholder="請輸入帳號"
                v-model.trim="passwordInput"
              />
            </div>
          </div>
          <p v-if="!formIsVaild" class="alert_text">帳號或密碼錯誤</p>
        </div>
        <div class="btn-loginpage">
          <button class="btn-login" @click="userLogin">登入</button>
          <button class="btn-login" @click="switchAuthMode">註冊</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import '@/styles/variable';
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - $nav-height);
  margin: 0px auto;
  background-color: #222;

  .login_box {
    width: 400px;
    height: 330px;
    position: relative;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;

    .title {
      position: absolute;
      top: 18%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .input_content {
      position: absolute;
      top: 53%;
      left: 50%;
      transform: translate(-50%, -50%);

      .input_text {
        margin-bottom: 10px;
        color: black;
        font-size: 16px;
        font-weight: bold;

        .input_blank {
          font-size: 14px;
          height: 30px;
          background: transparent;
          outline: none;
          border: none;
          border-bottom: 1px solid rgb(52, 51, 51);
        }
      }

      .alert_text {
        font-size: 12px;
        color: red;
        font-weight: bold;
      }
    }
    .btn-loginpage {
      position: absolute;
      top: 85%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      .btn-login {
        width: 60px;
        height: 35px;
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        border-radius: 5px;
        background-color: $color-kktv-pink;
        border: none;
        margin: 0 15px;
      }
    }
  }
}
</style>
