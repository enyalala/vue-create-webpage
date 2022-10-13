<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Mousewheel, Keyboard, Navigation } from "swiper";

const modules1: any = [Autoplay, Pagination, Mousewheel, Keyboard, Navigation];
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
    :modules="modules1"
    class="mySwiper1"
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

<style scoped>
.mySwiper1.swiper {
  width: 100%;
  height: 380px;
}

.mySwiper1 .swiper-slide {
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

.mySwiper1 .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.mySwiper1 .swiper-slide a {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
