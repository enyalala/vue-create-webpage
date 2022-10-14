<script setup lang="ts"></script>

<template>
  <main>
    <div class="container">
      <div class="title_text">新劇跟播中</div>
      <div class="row">
        <div class="col">
          <div class="card">
            <img class="img_size" src="../assets/img/newphoto1_1.jpg" alt="" />
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img class="img_size" src="../assets/img/newphoto1_1.jpg" alt="" />
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img class="img_size" src="../assets/img/newphoto1_1.jpg" alt="" />
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img class="img_size" src="../assets/img/newphoto1_1.jpg" alt="" />
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img class="img_size" src="../assets/img/newphoto1_1.jpg" alt="" />
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img class="img_size" src="../assets/img/newphoto1_1.jpg" alt="" />
          </div>
        </div>
        <div class="col">
          <div class="card">
            <img class="img_size" src="../assets/img/newphoto1_1.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.bigger {
  width: 180%;
}
.container {
  width: 100%;
  height: 100vh;
  margin: 0px auto;
  background-color: #222;
}
.row {
  max-width: 1350px;
  /* 讓此元素裡的第一層元素橫向排版 */
  display: flex;
  /* 取消自動縮放，空間不夠就換行 */
  flex-wrap: wrap;
  margin: 0px auto;
}

/* 一張卡片所在的容器 */
.col {
  width: calc(100% / 7);
  padding: 5px;
  justify-content: left;
  border: 1px solid white;
}

/* 一張卡片 */
.card {
  /* 將超出此區域的內容隱藏 */
  overflow: hidden;
  transform: scale(1, 1);
  transition: all 0.2s ease;
}

.card:hover {
  transform: scale(2, 1);
  position: relative;
}

.img_size {
  width: 100%;
}

.title_text {
  color: white;
  font-size: 30px;
  font-weight: bold;
  padding: 30px 0px 80px 75px;
}
</style>
