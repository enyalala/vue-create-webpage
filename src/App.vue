<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { reactive } from 'vue'
import type { NavData } from '@/models/SectionData'

const getImgUrl: () => string = () => {
  return new URL('./assets/img_kktv_logo.svg', import.meta.url).href
}

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
</script>

<template>
  <div class="container">
    <div class="navbar">
      <div class="navbar_content">
        <ul>
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
  height: auto;
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
      ul {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        li {
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
