<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Autoplay, Pagination, Mousewheel, Keyboard, Navigation } from 'swiper'

const modules1: any = [Autoplay, Pagination, Mousewheel, Keyboard, Navigation]
</script>

<template>
  <swiper
    :slidesPerView="2"
    :centeredSlides="true"
    :spaceBetween="10"
    :loop="true"
    :loopedSlides="5"
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
      ><a href=""><img src="../assets/img/homeS1P1.jpg" alt="photo" /></a
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
  position: relative;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  overflow: hidden;
}
.mySwiper1 .swiper-slide a {
  position: absolute;
  left: -50px;
}
.mySwiper1 .swiper-slide img {
  display: block;
  height: 380px;
  object-fit: contain;
}

.mySwiper1 .swiper-slide {
  width: 70%;
}

.mySwiper1 .swiper-slide:nth-child(2n) {
  width: 70%;
}

.mySwiper1 .swiper-slide:nth-child(3n) {
  width: 70%;
}
</style>
