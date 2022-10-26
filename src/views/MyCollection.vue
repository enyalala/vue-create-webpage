<script setup lang="ts">
// import required modules
import { ref } from 'vue'
</script>

<template>
  <main>
    <div class="container">
      <div class="collect_title_text">我的收藏</div>
      <div class="row">
        <div class="collection">
          <img src="../assets/img/homeS3P2.jpg" alt="" />
        </div>
        <div class="collection">
          <img src="../assets/img/homeS3P2.jpg" alt="" />
        </div>
        <div class="collection">
          <img src="../assets/img/homeS3P2.jpg" alt="" />
        </div>
        <div class="collection">
          <img src="../assets/img/homeS3P2.jpg" alt="" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.container {
  width: 100%;
  height: 100vh;
  margin: 0px auto;
  background-color: #222;
}
.row {
  width: 780px;
  height: 264px;
  /* 讓此元素裡的第一層元素橫向排版 */
  display: flex;
  margin: 0px auto;
  overflow: auto;
  border: 1px solid red;
}

.row::-webkit-scrollbar {
  display: none;
}

.collect_title_text {
  color: white;
  font-size: 30px;
  font-weight: bold;
  padding: 30px 0px 80px 75px;
}

.collection {
  width: 184px;
  object-fit: scale-down;
  margin-right: 10px;
  transition: all 0.3s ease-out;
  flex-shrink: 0;
}

.collection:nth-child(2n) {
  width: 184px;
  object-fit: scale-down;
  margin-right: 10px;
  transition: all 0.3s ease-out;
  flex-shrink: 0;
}

.collection:nth-child(3n) {
  width: 184px;
  object-fit: scale-down;
  margin-right: 10px;
  transition: all 0.3s ease-out;
  flex-shrink: 0;
}

.collection:hover {
  width: 368px;
}

.collection:nth-child(2n):hover {
  width: 368px;
}

.collection:nth-child(3n):hover {
  width: 368px;
}

img {
  width: 100%;
  height: 100%;
}
</style>
