<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";
import TopSwiper from "./components/TopSwiper.vue";
import SecSwiper from "./components/SecSwiper.vue";
</script>

<template>
  <div class="container">
    <div class="navbar">
      <div class="navbar_content">
        <ul class="left">
          <li>
            <a href="">
              <img
                class="navbar_logo"
                src="./assets/img_kktv_logo.svg"
                alt="logo"
            /></a>
          </li>
          <li><a class="navbar_link" href="">精選</a></li>
          <li><a class="navbar_link" href="">戲劇</a></li>
          <li><a class="navbar_link" href="">動畫</a></li>
          <li><a class="navbar_link" href="">娛樂</a></li>
          <li><a class="navbar_link" href="">更多</a></li>
          <li><a class="navbar_link" ßhref="">我的收藏</a></li>
        </ul>
      </div>
    </div>
    <div>
      <TopSwiper />
    </div>
    <div class="swiper2">
      <p class="title_text">新劇跟播中</p>
      <SecSwiper />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  margin: 0px auto;
  background-color: #222;
}
.navbar {
  width: 100%;
  color: #fff;
  background-color: #551127;
  z-index: 1000;
  top: 0;
}
.navbar_content {
  width: 100%;
  height: 100%;
  display: flex;
}

.navbar_logo {
  width: 100px;
  height: 22px;
  vertical-align: middle;
}
.navbar .left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.navbar_link {
  margin: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  text-decoration: none;
  height: 56px;
  line-height: 20px;
  color: #fff;
}
ul {
  list-style: none;
}
li {
  list-style: none;
}
.swiper2 {
  margin: 80px 0;
}

.title_text {
  color: white;
  font-size: 22px;
}
</style>
