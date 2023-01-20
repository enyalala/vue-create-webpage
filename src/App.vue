<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import { reactive, onMounted } from 'vue'
import type { NavData } from '@/models/NavData'
import type { Drama } from '@/models/Drama'
import { isLoading } from '@/stores/Loading'
import { useUserInfo } from '@/stores/UserInfo'
import { fakeDramas } from '@/fake/fakeDramas'
import { dramaInfoApi, fireStoreInstance } from '@/firebase'
import { onSnapshot } from 'firebase/firestore'
import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

const generateDramaFakeData = () => {
  fakeDramas.forEach((data) => {
    fireStoreInstance.setDoc({
      path: 'dramaInfo',
      pathSegments: [`drama${data.id}`],
      data,
    })
  })
}
// generateDramaFakeData()

// 重整不登出
const { UserInfo, setCurrentUser } = useUserInfo()
const subscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    setCurrentUser(user)
  }
})

subscribe()

// API:JSON SERVER
// const dramaList: { data: Drama | null } = reactive({ data: null })

// API:Firebase
const dramaList: Drama[] = reactive([])

const navList = reactive<NavData[]>([
  {
    classes: '',
    to: '/',
    navTitle: '',
    imgData: {
      imgClasses: 'navbar_logo',
      imgSrc: getImgUrl(),
      imgAlt: 'photo',
    },
  },
  {
    classes: 'navbar_link',
    to: '/',
    navTitle: '精選',
  },
  {
    classes: 'navbar_link',
    to: '/',
    navTitle: '戲劇',
  },
  {
    classes: 'navbar_link',
    to: '/animation',
    navTitle: '動畫',
  },
  {
    classes: 'navbar_link',
    to: '/',
    navTitle: '娛樂',
  },
  {
    classes: 'navbar_link',
    to: '/',
    navTitle: '更多',
  },
])

function getImgUrl(): string {
  return new URL('./assets/img/kktvImage/kktv_logo.svg', import.meta.url).href
}

onMounted(async () => {
  // API:JSON SERVER
  // dramaList.data = (await getDramas()).data ?? null

  onSnapshot(dramaInfoApi.getList(), (querySnapshot) => {
    const dramas = querySnapshot.docs.map((doc) => doc.data())
    Object.assign(dramaList, dramas)
  })
})
</script>

<template>
  <vueLoading v-model:active="isLoading" />
  <div class="container">
    <div class="navbar">
      <div class="navbar_content">
        <ul class="nav_left">
          <li>
            <router-link
              v-for="(data, index) in navList"
              :key="index"
              :class="data.classes"
              :to="data.to"
            >
              <img
                v-if="data.imgData"
                :class="data.imgData.imgClasses"
                :src="data.imgData.imgSrc"
                :alt="data.imgData.imgAlt"
              />{{ data.navTitle }}</router-link
            >
          </li>
          <li v-if="UserInfo.data">
            <router-link to="/mycollection/" class="navbar_link"
              >我的收藏</router-link
            >
          </li>
        </ul>
        <template v-if="dramaList">
          <SearchBar :dramaList="dramaList"
        /></template>
      </div>
    </div>
    <div class="nav_box"></div>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variable';

.container {
  width: 100%;
  min-height: 100vh;
  margin: 0px auto;
  background-color: #222;
  .navbar {
    width: 100%;
    color: #fff;
    background-color: #551127;
    top: 0;
    position: fixed;
    z-index: 500;
    .navbar_content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;

      .nav_left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        list-style: none;

        .navbar_logo {
          width: 100px;
          height: 22px;
          vertical-align: middle;
          cursor: pointer;
        }

        .navbar_link {
          margin: 0 10px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          text-decoration: none;
          height: 56px;
          line-height: 20px;
          color: #fff;

          &:focus {
            border-bottom: 3px solid $color-kktv-pink;
          }
          &:hover {
            color: $color-kktv-pink;
          }
        }
      }
    }
  }
  .nav_box {
    width: 100%;
    height: $nav-height;
  }
}
</style>
