<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <div class="navbar">
      <div class="navbar_content">
        <ul class="left">
          <li>
            <router-link to="/">
              <img
                class="navbar_logo"
                src="./assets/img_kktv_logo.svg"
                alt="logo"
            /></router-link>
          </li>
          <li>
            <router-link to="/" class="navbar_link">精選</router-link>
          </li>
          <li>
            <router-link to="/" class="navbar_link" href="">戲劇</router-link>
          </li>
          <li>
            <router-link to="/" class="navbar_link" href="">動畫</router-link>
          </li>
          <li>
            <router-link to="/" class="navbar_link" href="">娛樂</router-link>
          </li>
          <li>
            <router-link to="/" class="navbar_link" href="">更多</router-link>
          </li>
          <li>
            <router-link to="/" class="navbar_link" ßhref=""
              >我的收藏</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: auto;
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
</style>