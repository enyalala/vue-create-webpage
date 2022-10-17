<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

// import required modules
import { Pagination, Navigation } from 'swiper'

const modules2: any = [Pagination, Navigation]
</script>

<template>
  <swiper
    :slidesPerView="'auto'"
    :centeredSlidesBounds="true"
    :spaceBetween="30"
    :slidesPerGroup="2"
    :navigation="true"
    :modules="modules2"
    class="mySwiper2"
  >
    <swiper-slide>Slide 1</swiper-slide><swiper-slide>Slide 2</swiper-slide
    ><swiper-slide>Slide 3</swiper-slide><swiper-slide>Slide 4</swiper-slide
    ><swiper-slide>Slide 5</swiper-slide><swiper-slide>Slide 6</swiper-slide
    ><swiper-slide>Slide 7</swiper-slide><swiper-slide>Slide 8</swiper-slide>
  </swiper>
</template>

<style>
.mySwiper2.swiper {
  width: 100%;
  height: 230px;
  padding: 0px 75px;
}

.mySwiper2 .swiper-slide {
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

.mySwiper2 .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mySwiper2 .swiper-slide {
  width: 47%;
}

.mySwiper2 .swiper-slide:nth-child(2n) {
  width: 47%;
}

.mySwiper2 .swiper-slide:nth-child(3n) {
  width: 47%;
}
</style>
