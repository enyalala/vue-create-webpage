<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { reactive, onMounted } from 'vue'
import type { NavData } from '@/models/SectionData'
import type { Drama } from '@/models/Drama'
import { getDramas } from '@/apis/api'
import { isLoading } from '@/stores/Loading'
import SearchBar from '@/components/SearchBar.vue'

const dramaList: { data: Drama | null } = reactive({ data: null })
const navlist = reactive<NavData[]>([
  {
    classes: '',
    to: '/',
    navtitle: '',
    imgData: {
      imgClasses: 'navbar_logo',
      imgSrc: getImgUrl(),
      imgAlt: 'photo',
    },
  },
  {
    classes: 'navbar_link',
    to: '/',
    navtitle: '戲劇',
  },
  {
    classes: 'navbar_link',
    to: '/',
    navtitle: '動畫',
  },
  {
    classes: 'navbar_link',
    to: '/',
    navtitle: '娛樂',
  },
  {
    classes: 'navbar_link',
    to: '/',
    navtitle: '更多',
  },
  {
    classes: 'navbar_link',
    to: '/mycollection',
    navtitle: '我的收藏',
  },
])

function getImgUrl(): string {
  return new URL('./assets/img/kktv_logo.svg', import.meta.url).href
}

onMounted(async () => {
  dramaList.data = (await getDramas()).data ?? null
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
              v-for="(data, index) in navlist"
              :key="index"
              :class="data.classes"
              :to="data.to"
            >
              <img
                v-if="data.imgData"
                :class="data.imgData.imgClasses"
                :src="data.imgData.imgSrc"
                :alt="data.imgData.imgAlt"
              />{{ data.navtitle }}</router-link
            >
          </li>
        </ul>
        <template v-if="dramaList.data">
          <SearchBar :dramaList="dramaList.data"
        /></template>
      </div>
    </div>
    <div class="nav_box"></div>
    <!-- <template v-if="isLoading === false"> -->
    <router-view />
    <!-- </template> -->
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
