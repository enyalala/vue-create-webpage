<script setup lang="ts">
import { ref } from 'vue'
import { useUserInfo } from '@/stores/UserInfo'

const { userInfo } = useUserInfo()
console.log(userInfo[0].account)
const accountInput = ref('')
const passwordInput = ref('')

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
  <main>
    <div class="container">
      <div class="login_box">
        <div class="title">
          <img src="@/assets/img/kktv_member.svg" alt="photo" />
        </div>
        <div class="input_content">
          <div class="input_text">
            帳號：
            <div>
              <input
                class="input_blank"
                type="text"
                placeholder="請輸入帳號"
                v-model="accountInput"
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
                v-model="passwordInput"
              />
            </div>
          </div>
        </div>
        <button class="btn-login" @click="userLogin">登入</button>
      </div>
    </div>
  </main>
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
    }

    .btn-login {
      width: 60px;
      height: 35px;
      position: absolute;
      top: 85%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 5px;
      background-color: $color-kktv-pink;
      border: none;
    }
  }
}
</style>
