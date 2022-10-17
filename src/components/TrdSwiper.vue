<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

// import required modules
import { Pagination, Navigation } from 'swiper'
import { ref } from 'vue'

const modules3: any = [Pagination, Navigation]
const slideMove = ref(false)

const lastSlideShow = () => {
  slideMove.value = true
}
const lastSlideHide = () => {
  slideMove.value = false
}
</script>

<template>
  <swiper
    :slidesPerView="'auto'"
    :centeredSlides="false"
    :spaceBetween="10"
    :fadeEffect="{
      crossFade: true,
    }"
    :navigation="true"
    :modules="modules3"
    class="mySwiper3"
  >
    <swiper-slide :class="{ move: slideMove }"
      ><a href=""
        ><img src="../assets/img/homeS3P1.jpg" alt="img" /></a></swiper-slide
    ><swiper-slide :class="{ move: slideMove }"
      ><a href=""
        ><img src="../assets/img/homeS3P2.jpg" alt="img" /></a></swiper-slide
    ><swiper-slide :class="{ move: slideMove }"
      ><a href=""
        ><img src="../assets/img/homeS3P3.jpg" alt="img" /></a></swiper-slide
    ><swiper-slide :class="{ move: slideMove }"
      ><a href=""
        ><img src="../assets/img/homeS3P4.jpg" alt="img" /></a></swiper-slide
    ><swiper-slide :class="{ move: slideMove }"
      ><a href=""
        ><img src="../assets/img/homeS3P5.jpg" alt="img" /></a></swiper-slide
    ><swiper-slide :class="{ move: slideMove }"
      ><a href=""
        ><img src="../assets/img/homeS3P6.jpg" alt="img" /></a></swiper-slide
    ><swiper-slide :class="{ move: slideMove }"
      ><a href=""
        ><img src="../assets/img/homeS3P7.jpg" alt="img" /></a></swiper-slide
    ><swiper-slide :class="{ move: slideMove }"
      ><a href=""
        ><img src="../assets/img/homeS3P8.jpg" alt="img" /></a></swiper-slide
    ><swiper-slide :class="{ move: slideMove }"
      ><a href=""
        ><img src="../assets/img/homeS3P9.jpg" alt="img" /></a></swiper-slide
    ><swiper-slide
      @mouseover="lastSlideShow"
      @mouseleave="lastSlideHide"
      :class="{ move: slideMove }"
      ><a href=""><img src="../assets/img/homeS3P10.jpg" alt="img" /></a
    ></swiper-slide>
  </swiper>
</template>

<style>
.mySwiper3.swiper {
  width: 100%;
  height: 200px;
  padding: 0px 75px;
}

.mySwiper3 .swiper-slide {
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

.mySwiper3 .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mySwiper3 .swiper-slide {
  width: 160px;
  transition: all 0.3s ease-out;
}

.mySwiper3 .swiper-slide:nth-child(2n) {
  width: 160px;
}

.mySwiper3 .swiper-slide:nth-child(3n) {
  width: 160px;
}

.mySwiper3 .swiper-slide:hover {
  width: 320px;
}

.mySwiper3 .swiper-slide:nth-child(2n):hover {
  width: 320px;
}

.mySwiper3 .swiper-slide:nth-child(3n):hover {
  width: 320px;
}

.mySwiper3 .swiper-slide:last-child:hover {
  width: 320px;
}

.mySwiper3 .swiper-slide.move {
  transform: translateX(-150px);
}
</style>
