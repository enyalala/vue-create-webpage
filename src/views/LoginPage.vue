<script setup lang="ts">
import type { UserData } from '@/models/UserData'
import { reactive, ref } from 'vue'
import { useUserInfo } from '@/stores/UserInfo'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase/config'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { fireStoreInstance } from '@/firebase'

const router = useRouter()
const { setCurrentUser } = useUserInfo()

const errorMessageText = ref('')
const mode = ref('login')
const registerDone = ref(false)

const user: UserData = reactive({
  email: 'test@gmail.com',
  password: '111111',
})

// 切換「登入」或「註冊」狀態
const changeMode = () => {
  errorMessageText.value = ''
  user.email = ''
  user.password = ''
  if (mode.value === 'login') {
    mode.value = 'register'
  } else {
    mode.value = 'login'
  }
}

const userLoginRegister = () => {
  if (mode.value === 'login') {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((response) => {
        console.log('登入成功')
        setCurrentUser(response.user)
        router.push({ path: '/' })

        // console.log(UserInfo)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === 'auth/wrong-password-email') {
          errorMessageText.value = '輸入密碼錯誤。'
        } else if (errorCode === 'auth/user-not-found') {
          errorMessageText.value = '此帳號尚未被註冊'
        } else {
          errorMessageText.value = '請輸入正確格式之帳號或密碼。'
        }
        console.log('code:' + errorCode)
        console.log('message:' + errorMessage)
      })
  } else {
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((register) => {
        console.log('註冊成功')
        registerDone.value = true
        fireStoreInstance.setDoc({
          path: 'userInfo',
          pathSegments: [`user${register.user.uid}`],
          data: { id: register.user.uid, email: register.user.email },
        })

        setTimeout(() => {
          mode.value = 'login'
          user.email = ''
          user.password = ''
          registerDone.value = false
        }, 3000)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        if (errorCode === 'auth/email-already-in-use') {
          errorMessageText.value = '該帳號已被註冊使用。'
        } else if (errorCode === 'auth/weak-password') {
          errorMessageText.value = '請輸入六位以上的密碼。'
        } else {
          errorMessageText.value = '請輸入正確格式之帳號或密碼。'
        }
        console.log('code:' + errorCode)
        console.log('mes:' + errorMessage)
      })
  }
}
</script>

<template>
  <form @submit.prevent>
    <div class="container">
      <div class="login_box">
        <div class="title">
          <img
            v-if="mode === 'login'"
            src="@/assets/img/kktvImage/kktv_member.svg"
            alt="photo"
          />
          <img v-else src="@/assets/img/kktvImage/kktv_logo.svg" alt="photo" />
        </div>
        <div class="input_content">
          <input
            class="input_blank"
            type="email"
            placeholder="請輸入Email帳號"
            v-model.trim="user.email"
          />
          <input
            class="input_blank"
            type="text"
            placeholder="請輸入密碼"
            v-model.trim="user.password"
          />
          <div class="alert_content">
            <p class="alert_text">{{ errorMessageText }}</p>
          </div>
        </div>
        <div class="btn-loginpage">
          <button class="btn_on" @click="userLoginRegister">
            {{ mode === 'login' ? '登入' : '註冊' }}
          </button>
        </div>
        <div class="btn-register">
          <button class="btn_on">忘記密碼</button
          ><button class="btn_on" @click="changeMode">
            {{ mode === 'login' ? '註冊帳號' : '會員登入' }}
          </button>
        </div>
        <div class="register_done" v-if="registerDone">
          <font-awesome-icon icon="fa-solid fa-circle-check" />
          <span> 會員註冊成功，請重新登入</span>
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
    height: 380px;
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
      width: 205px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .input_blank {
        margin: 10px 0;
        padding-left: 10px;
        font-size: 14px;
        letter-spacing: 1px;
        width: 200px;
        height: 40px;
        background: transparent;
        outline: none;
        border: 1px solid rgb(52, 51, 51, 0.5);
      }
      .alert_content {
        height: 20px;

        .alert_text {
          font-size: 12px;
          color: red;
          font-weight: bold;
        }
      }
    }
    .btn-loginpage {
      position: absolute;
      top: 75%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      .btn_on {
        width: 200px;
        height: 35px;
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        border-radius: 5px;
        background-color: $color-kktv-pink;
        border: none;
      }
    }

    .btn-register {
      position: absolute;
      top: 90%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;

      .btn_on {
        color: gray;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        background-color: transparent;
        border: none;
        margin-right: 10px;

        &:hover {
          color: $color-kktv-pink;
        }
      }
    }

    .register_done {
      position: absolute;
      top: -15%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 250px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      border: 1px solid $color-kktv-pink;
      background-color: white;
      border-radius: 10px;
      font-weight: bold;
      font-size: 16px;
      color: $color-kktv-pink;

      animation-name: collectAlert;
      animation-duration: 3s;
      animation-fill-mode: forwards;

      @keyframes collectAlert {
        0% {
          opacity: 1;
        }
        10% {
          opacity: 1;
        }
        85% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    }
  }
}
</style>
