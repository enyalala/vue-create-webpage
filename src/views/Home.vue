<script setup lang="ts">
import TopSwiper from '../components/TopSwiper.vue'
import SecSwiper from '../components/SecSwiper.vue'
import TrdSwiper from '../components/TrdSwiper.vue'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const subtitle1Show = ref(false)
const subtitle2Show = ref(false)

const title1Over = () => {
  subtitle1Show.value = true
}
const title1Leave = () => {
  subtitle1Show.value = false
}

const title2Over = () => {
  subtitle2Show.value = true
}
const title2Leave = () => {
  subtitle2Show.value = false
}
</script>

<template>
  <div class="swiper1">
    <TopSwiper />
  </div>
  <div class="swiper2">
    <router-link
      to="/newdrama"
      @mouseover="title1Over"
      @mouseleave="title1Leave"
      ><span class="home_title_text">新劇跟播中</span
      ><span class="home_subtitle_text" v-show="subtitle1Show"
        >更多 ＞</span
      ></router-link
    >
    <SecSwiper />
  </div>
  <div class="swiper3">
    <router-link
      to="/hotdrama"
      @mouseover="title2Over"
      @mouseleave="title2Leave"
      ><span class="home_title_text">熱播排行榜</span
      ><span class="home_subtitle_text" v-show="subtitle2Show"
        >更多 ＞</span
      ></router-link
    >
    <TrdSwiper />
  </div>
</template>

<style scoped>
.swiper1 {
  width: 100%;
  height: auto;
}
.swiper2 {
  width: 100%;
  height: auto;
  padding: 40px 0px;
}

.swiper3 {
  width: 100%;
  height: auto;
  padding: 20px 0px 40px 0px;
}

.home_title_text {
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin: 5px 0px 10px 75px;
  display: inline-block;
}

.home_subtitle_text {
  color: white;
  font-size: 15px;
  font-weight: bold;
  margin: 0px 20px;
}

.home_subtitle_text:hover {
  color: #df396e;
}
</style>
