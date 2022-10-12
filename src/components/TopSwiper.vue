<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../assets/swiper.css";

// import required modules
import { Autoplay, Pagination, Mousewheel, Keyboard } from "swiper";

const modules: any = [Autoplay, Pagination, Mousewheel, Keyboard];
</script>

<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      ><a href=""><img src="../assets/s1photo1.jpg" alt="photo" /></a
    ></swiper-slide>
    <swiper-slide
      ><a href=""><img src="../assets/s1photo2.jpg" alt="photo" /></a
    ></swiper-slide>
    <swiper-slide
      ><a href=""><img src="../assets/s1photo3.jpg" alt="photo" /></a
    ></swiper-slide>
    <swiper-slide
      ><a href=""><img src="../assets/s1photo4.jpg" alt="photo" /></a
    ></swiper-slide>
    <swiper-slide
      ><a href=""><img src="../assets/s1photo5.jpg" alt="photo" /></a
    ></swiper-slide>
  </swiper>
</template>
