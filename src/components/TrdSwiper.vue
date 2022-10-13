<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
// import "../assets/swiper.css";

// import required modules
import { Pagination, Navigation } from "swiper";

const modules3: any = [Pagination, Navigation];
</script>

<template>
  <swiper
    :slidesPerView="8"
    :centeredSlides="false"
    :spaceBetween="10"
    :pagination="{
      clickable: true,
    }"
    :fadeEffect="{
      crossFade: true,
    }"
    :navigation="true"
    :modules="modules3"
    class="mySwiper3"
  >
    <swiper-slide>Slide 1</swiper-slide><swiper-slide>Slide 2</swiper-slide
    ><swiper-slide>Slide 3</swiper-slide><swiper-slide>Slide 4</swiper-slide
    ><swiper-slide>Slide 5</swiper-slide><swiper-slide>Slide 6</swiper-slide
    ><swiper-slide>Slide 7</swiper-slide><swiper-slide>Slide 8</swiper-slide
    ><swiper-slide>Slide 9</swiper-slide>
  </swiper>
</template>

<style scoped>
.mySwiper3.swiper {
  width: 90%;
  height: 200px;
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
  width: 50%;
}

.mySwiper3 .swiper-slide:nth-child(2n) {
  width: 50%;
}

.mySwiper3 .swiper-slide:nth-child(3n) {
  width: 50%;
}
</style>
