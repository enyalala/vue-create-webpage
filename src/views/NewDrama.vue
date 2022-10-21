<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

// import required modules
import { Pagination, Navigation } from 'swiper'
import { ref } from 'vue'

const modulesNew: any = [Pagination, Navigation]
const slideMoveNew = ref(false)

const lastSlideShowNew = () => {
  slideMoveNew.value = true
}
const lastSlideHideNew = () => {
  slideMoveNew.value = false
}
</script>

<template>
  <main>
    <div class="container">
      <div class="new_title_text">新劇跟播中</div>
      <div class="row">
        <div>
          <swiper
            :slidesPerView="'auto'"
            :spaceBetween="10"
            :fadeEffect="{ crossFade: true }"
            :modules="modulesNew"
            class="mySwiperNew"
          >
            <swiper-slide :class="{ move: slideMoveNew }">Slide 1</swiper-slide
            ><swiper-slide :class="{ move: slideMoveNew }">Slide 2</swiper-slide
            ><swiper-slide :class="{ move: slideMoveNew }">Slide 3</swiper-slide
            ><swiper-slide :class="{ move: slideMoveNew }">Slide 4</swiper-slide
            ><swiper-slide :class="{ move: slideMoveNew }">Slide 5</swiper-slide
            ><swiper-slide :class="{ move: slideMoveNew }">Slide 6</swiper-slide
            ><swiper-slide
              @mouseover="lastSlideShowNew"
              @mouseleave="lastSlideHideNew"
              :class="{ move: slideMoveNew }"
              >Slide 7</swiper-slide
            >
          </swiper>
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
  width: 1350px;
  /* 讓此元素裡的第一層元素橫向排版 */
  display: flex;
  margin: 0px auto;
  flex-wrap: wrap;
  border: 1px solid red;
}

.new_title_text {
  color: white;
  font-size: 30px;
  font-weight: bold;
  padding: 30px 0px 80px 75px;
}

.img_size {
  width: 100%;
}

.mySwiperNew.swiper {
  width: 100%;
  height: 200px;
}

.mySwiperNew .swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.mySwiperNew .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mySwiperNew .swiper-slide {
  width: 184px;
  transition: all 0.3s ease-out;
}

.mySwiperNew .swiper-slide:nth-child(2n) {
  width: 184px;
}

.mySwiperNew .swiper-slide:nth-child(3n) {
  width: 184px;
}

.mySwiperNew .swiper-slide:hover {
  width: 368px;
}

.mySwiperNew .swiper-slide:nth-child(2n):hover {
  width: 368px;
}

.mySwiperNew .swiper-slide:nth-child(3n):hover {
  width: 368px;
}

.mySwiperNew .swiper-slide:last-child:hover {
  width: 368px;
}

.mySwiperNew .swiper-slide.move {
  transform: translateX(-180px);
}
</style>
