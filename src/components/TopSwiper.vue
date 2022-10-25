<script setup lang="ts">
// Import Swiper Vue.js components
import { ref, reactive } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { RouterLink, useRoute } from 'vue-router'
import { useDramaInfo } from '../stores/DramaInfo'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Autoplay, Pagination, Mousewheel, Keyboard, Navigation } from 'swiper'

const modules1: any = [Autoplay, Pagination, Mousewheel, Keyboard, Navigation]

const { dramaList } = useDramaInfo()
const dramaId: number[] = reactive([])
dramaList.forEach((drama) => {
  dramaId.push(drama.dramaid)
})

const getS1ImageUrl = (name: number) => {
  return new URL(`../assets/img/homeS1P${name}.jpg`, import.meta.url).href
}
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
    <swiper-slide v-for="id in dramaId" :key="id"
      ><router-link :to="'/dramalist/' + id"
        ><img class="topswiper_img1" :src="getS1ImageUrl(id)" alt="photo" /><img
          class="topswiper_img2"
          :src="getS1ImageUrl(id)"
          alt="photo"
        />
        <div v-if="dramaList[id].name.length <= 11">
          <div class="topswiper_title">
            {{ dramaList[id].homestatus }}
            <div class="line"></div>
          </div>
          <div class="topswiper_dramaname">《{{ dramaList[id].name }}》</div>
        </div>
        <div v-else>
          <div class="topswiper_title_long">
            {{ dramaList[id].homestatus }}
            <div class="line"></div>
          </div>
          <div class="topswiper_dramaname_long">
            《{{ dramaList[id].name }}》
          </div>
        </div>
        <div class="topswiper_desc">
          {{ dramaList[id].homedescription }}
        </div>
      </router-link></swiper-slide
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

.mySwiper1 .swiper-slide .topswiper_title_long {
  position: absolute;
  left: 700px;
  top: 200px;
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

.mySwiper1 .swiper-slide .topswiper_dramaname_long {
  position: absolute;
  width: 280px;
  left: 700px;
  top: 230px;
  text-align: left;
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
