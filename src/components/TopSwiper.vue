<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type { Drama } from '@/models/Drama'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { RouterLink } from 'vue-router'
import { Autoplay, Pagination, Mousewheel, Keyboard, Navigation } from 'swiper'
import { useImageUrl } from '@/stores/GetImageUrl'

const { getSideUrl } = useImageUrl()

const modules1: any = [Autoplay, Pagination, Mousewheel, Keyboard, Navigation]

const props = defineProps({
  propsData: { type: Array<Drama>, required: true },
})
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
    <swiper-slide v-for="data in props.propsData" :key="data.id"
      ><router-link :to="'/dramalist/' + data.id"
        ><img
          class="topswiper_img1"
          :src="getSideUrl(data.id, 1)"
          alt="photo"
        /><img
          class="topswiper_img2"
          :src="getSideUrl(data.id, 1)"
          alt="photo"
        />
        <div v-if="data.name.length <= 11">
          <div class="topswiper_title">
            {{ data.homestatus }}
            <div class="line"></div>
          </div>
          <div class="topswiper_dramaname">《{{ data.name }}》</div>
        </div>
        <div v-else>
          <div class="topswiper_title_long">
            {{ data.homestatus }}
            <div class="line"></div>
          </div>
          <div class="topswiper_dramaname_long">《{{ data.name }}》</div>
        </div>
        <div class="topswiper_desc">
          {{ data.homedescription }}
        </div>
      </router-link></swiper-slide
    ></swiper
  >
</template>

<style lang="scss">
.mySwiper1.swiper {
  width: 100%;
  height: 380px;

  --swiper-navigation-color: white;
  --swiper-navigation-size: 30px;
  --swiper-pagination-color: white;
}

.mySwiper1 .swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  width: 70%;

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

  & a {
    width: 100%;
    height: 100%;
  }
  .topswiper_img1 {
    position: absolute;
    height: 380px;
    left: 0px;
    z-index: 100;
  }

  .topswiper_img2 {
    position: absolute;
    width: 100%;
    right: 0px;
    opacity: 0.4;
    filter: brightness(40%) contrast(120%);
  }

  .topswiper_title {
    position: absolute;
    left: 700px;
    top: 250px;
    font-size: 15px;
    color: white;
  }

  .topswiper_title_long {
    position: absolute;
    left: 700px;
    top: 200px;
    font-size: 15px;
    color: white;
  }

  .topswiper_dramaname {
    position: absolute;
    left: 700px;
    top: 280px;
    font-size: 30px;
    color: white;
    font-weight: bold;
  }

  .topswiper_dramaname_long {
    position: absolute;
    width: 280px;
    left: 700px;
    top: 230px;
    text-align: left;
    font-size: 30px;
    color: white;
    font-weight: bold;
  }

  .topswiper_desc {
    position: absolute;
    left: 700px;
    top: 330px;
    font-size: 16px;
    color: white;
  }

  .line {
    display: inline-block;
    padding-left: 10px;
    width: 230px;
    height: 0.5px;
    background-color: white;
    vertical-align: middle;
  }

  &:nth-child(2n) {
    width: 70%;
  }

  &:nth-child(3n) {
    width: 70%;
  }
}
</style>
