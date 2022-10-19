<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { RouterLink } from 'vue-router'

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
    :slidesPerView="'auto'"
    :centeredSlides="true"
    :spaceBetween="10"
    :loop="true"
    :loopedSlides="5"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules1"
    class="mySwiper1"
  >
    <swiper-slide
      ><router-link to="/dramalist"
        ><img
          class="topswiper_img1"
          src="../assets/img/homeS1P1.jpg"
          alt="photo"
        /><img
          class="topswiper_img2"
          src="../assets/img/homeS1P1.jpg"
          alt="photo"
        />
        <div class="topswiper_title">
          全新集數上架
          <div class="line"></div>
        </div>
        <div class="topswiper_dramaname">《slient》</div>
        <div class="topswiper_desc">
          川口春奈X目黑蓮，重逢無聲世界的甜虐愛戀
        </div>
      </router-link></swiper-slide
    >
    <swiper-slide
      ><a href=""
        ><img
          class="topswiper_img1"
          src="../assets/img/homeS1P2.jpg"
          alt="photo"
        /><img
          class="topswiper_img2"
          src="../assets/img/homeS1P2.jpg"
          alt="photo"
        />
        <div class="topswiper_title">
          青春首播
          <div class="line"></div>
        </div>
        <div class="topswiper_dramaname">《青春灰姑娘》</div>
        <div class="topswiper_desc">攜美妝技巧重返１７歲、克服初戀陰影</div></a
      ></swiper-slide
    >
    <swiper-slide
      ><a href=""
        ><img
          class="topswiper_img1"
          src="../assets/img/homeS1P3.jpg"
          alt="photo"
        /><img
          class="topswiper_img2"
          src="../assets/img/homeS1P3.jpg"
          alt="photo"
        />
        <div class="topswiper_title">
          全新集數上架
          <div class="line"></div>
        </div>
        <div class="topswiper_dramaname">《戀愛心機又怎樣》</div>
        <div class="topswiper_desc">「派遣護理師X」岡田將生、泉澤祐希</div></a
      ></swiper-slide
    >
    <swiper-slide
      ><a href=""
        ><img
          class="topswiper_img1"
          src="../assets/img/homeS1P4.jpg"
          alt="photo"
        /><img
          class="topswiper_img2"
          src="../assets/img/homeS1P4.jpg"
          alt="photo"
        />
        <div class="topswiper_title">
          即將上架
          <div class="line"></div>
        </div>
        <div class="topswiper_dramaname">《詐欺獵人》</div>
        <div class="topswiper_desc">
          經典重開機！平野紫耀化身令和詐欺獵人
        </div></a
      ></swiper-slide
    >
    <swiper-slide
      ><a href=""
        ><img
          class="topswiper_img1"
          src="../assets/img/homeS1P5.jpg"
          alt="photo"
        /><img
          class="topswiper_img2"
          src="../assets/img/homeS1P5.jpg"
          alt="photo"
        />
        <div class="topswiper_title">
          新上架
          <div class="line"></div>
        </div>
        <div class="topswiper_dramaname">《喂！！帥哥》</div>
        <div class="topswiper_desc">那邊的帥哥，要不要當我女婿啊</div></a
      ></swiper-slide
    >
  </swiper>
</template>

<style>
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
  width: 100%;
  height: 100%;
}
.mySwiper1 .swiper-slide .topswiper_img1 {
  position: absolute;
  height: 380px;
  left: 0px;
  z-index: 100;
}

.mySwiper1 .swiper-slide .topswiper_img2 {
  position: absolute;
  width: 100%;
  right: 0px;
  opacity: 0.4;
  filter: brightness(40%) contrast(120%);
}

.mySwiper1 .swiper-slide .topswiper_title {
  position: absolute;
  left: 700px;
  top: 250px;
  font-size: 15px;
  color: white;
}

.mySwiper1 .swiper-slide .topswiper_dramaname {
  position: absolute;
  left: 700px;
  top: 280px;
  font-size: 30px;
  color: white;
  font-weight: bold;
}

.mySwiper1 .swiper-slide .topswiper_desc {
  position: absolute;
  left: 700px;
  top: 330px;
  font-size: 16px;
  color: white;
}

.mySwiper1 .swiper-slide .line {
  display: inline-block;
  padding-left: 10px;
  width: 230px;
  height: 0.5px;
  background-color: white;
  vertical-align: middle;
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
