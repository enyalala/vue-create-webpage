<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper'
import { useImageUrl } from '@/stores/GetImageUrl'

const props = defineProps({ propsData: { type: Object, required: true } })

const { getCoverUrl, getSideUrl } = useImageUrl()
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
    <swiper-slide v-for="data in props.propsData" :key="data"
      ><router-link :to="'/dramalist/' + data.id">
        <div class="content">
          <div class="cover_bg"></div>
          <div class="text_content">
            <span class="name_text">{{ data.name }}</span>
            <div class="star_text">
              <font-awesome-icon icon="fa-solid fa-star" />
              {{ data.score }}
            </div>
            <div class="desc_text">{{ data.description }}</div>
          </div>
          <div class="cover_img">
            <img :src="getCoverUrl(data.id)" alt="" />
          </div>
          <div class="side_img">
            <img :src="getSideUrl(data.id, 1)" alt="photo" />
          </div></div></router-link
    ></swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
.mySwiper2.swiper {
  width: 100%;
  height: 230px;
  padding: 0px 75px;

  --swiper-navigation-color: white;
  --swiper-navigation-size: 30px;
}
.mySwiper2 .swiper-slide {
  font-size: 18px;
  background: #fff;
  position: relative;
  height: 100%;
  width: 47%;

  &:nth-child(2n) {
    width: 47%;
  }

  &:nth-child(3n) {
    width: 47%;
  }

  .content {
    width: 100%;
    height: 100%;
    position: relative;

    .text_content {
      width: 250px;
      height: 140px;
      position: absolute;
      left: 140px;
      top: 65px;
      z-index: 100;
      overflow: hidden;

      .name_text {
        color: white;
        font-size: 14px;
        font-weight: bold;
      }

      .star_text {
        position: absolute;
        top: 45px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
      }
      .desc_text {
        position: absolute;
        color: rgba(255, 255, 255, 0.7);
        top: 88px;
        font-size: 12px;
        line-height: 18px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    & img {
      width: 100%;
      height: 100%;
    }
    .cover_bg {
      width: 70%;
      height: 100%;
      background: linear-gradient(90deg, black 65%, transparent 100%);
      position: absolute;
      z-index: 50;
    }
    .cover_img {
      height: 60%;
      position: absolute;
      left: 20px;
      top: 70px;
      z-index: 100;
    }
    .side_img {
      height: 100%;
      position: absolute;
      right: 0px;
      z-index: 20;
    }
  }
}
</style>
