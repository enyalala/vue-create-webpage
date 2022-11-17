<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useDramaInfo } from '@/stores/DramaInfo'
import { Pagination, Navigation } from 'swiper'
import { ref, reactive } from 'vue'
import { useImageUrl } from '@/stores/GetImageUrl'

const { getCoverUrl, getSideUrl } = useImageUrl()
const { dramaList } = useDramaInfo()
const modules3: any = [Pagination, Navigation]
const slideMove = ref(false)
const dramaId: number[] = reactive([])

dramaList.forEach((drama) => {
  if (drama.classification.includes('熱播')) {
    dramaId.push(drama.id)
  }
})

const dramaIdDeleteLast = dramaId.slice(0, -1)
const dramaIdLast = dramaId[dramaId.length - 1]
const selectIndex = ref(-1)

const lastSlideShow = () => {
  slideMove.value = true
}
const lastSlideHide = () => {
  slideMove.value = false
}

const dramaover = (idx: number) => {
  selectIndex.value = idx
}

const dramaleave = (idx: number) => {
  selectIndex.value = idx
}

const getRankUrl = (name: number) => {
  return new URL(
    `../assets/img/hotDramaRank/ranking-${name}.png`,
    import.meta.url
  ).href
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
    <swiper-slide
      v-for="(id, index) in dramaIdDeleteLast"
      :key="id"
      :class="{ move: slideMove }"
    >
      <router-link :to="'/dramalist/' + id"
        ><div class="content">
          <div class="img_content" v-if="index !== selectIndex">
            <img
              class="img1"
              @mouseover="dramaover(index)"
              :src="getCoverUrl(id)"
              alt="photo"
            />
          </div>
          <div class="img_content" v-else>
            <img
              class="img1"
              @mouseleave="dramaover(-1)"
              :src="getCoverUrl(id)"
              alt="photo"
            />

            <img
              class="img2"
              @mouseleave="dramaleave(-1)"
              :src="getSideUrl(id, 1)"
              alt="photo"
            />
          </div>
          <img class="img_rank" :src="getRankUrl(index + 1)" alt="" />
          <div class="name_text">{{ dramaList[id].name }}</div>
        </div></router-link
      ></swiper-slide
    ><swiper-slide
      @mouseover="lastSlideShow"
      @mouseleave="lastSlideHide"
      :class="{ move: slideMove }"
      ><router-link :to="'/dramalist/' + dramaIdLast"
        ><div class="content">
          <div class="img_content" v-if="!slideMove">
            <img class="img1" :src="getCoverUrl(dramaIdLast)" alt="photo" />
          </div>
          <div class="img_content" v-else>
            <img class="img1" :src="getCoverUrl(dramaIdLast)" alt="photo" />
            <img class="img2" :src="getSideUrl(dramaIdLast, 1)" alt="photo" />
          </div>
          <img class="img_rank" :src="getRankUrl(dramaId.length)" alt="" />
          <div class="name_text">{{ dramaList[dramaIdLast].name }}</div>
        </div></router-link
      ></swiper-slide
    >
  </swiper>
</template>

<style lang="scss" scoped>
@import '@/styles/variable';
.mySwiper3.swiper {
  width: 100%;
  height: 280px;
  padding: 0px 75px;
}

.mySwiper3 .swiper-slide {
  font-size: 18px;
  background-color: #222;

  width: $base-swiper3-width;
  transition: all 0.5s ease-out;

  &:hover {
    width: 2 * $base-swiper3-width;
  }

  &:nth-child(2n) {
    &:hover {
      width: 2 * $base-swiper3-width;
    }
  }

  &:nth-child(3n) {
    &:hover {
      width: 2 * $base-swiper3-width;
    }
  }

  &:last-child:hover {
    width: 2 * $base-swiper3-width;
  }

  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .img_content {
      width: auto;
      overflow: hidden;
      height: 213px;

      .img1 {
        width: 100%;
        position: absolute;
        z-index: 100;

        &:hover {
          width: 150%;

          animation-name: imgchange;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;

          @keyframes imgchange {
            50% {
              opacity: 0.5;
            }
            100% {
              opacity: 0;
            }
          }
        }
      }
      .img2 {
        height: 213px;
        position: absolute;
      }
    }
    .img_rank {
      position: absolute;
      width: 42px;
      top: 213px;
    }

    .name_text {
      color: white;
      position: absolute;
      top: 255px;
      font-size: 14px;
      font-weight: bold;
    }

    .info {
      width: 300px;
      height: 100px;
      position: absolute;
      overflow: hidden;
      color: white;
    }
  }
}
.mySwiper3 .swiper-slide.move {
  transform: translateX(-150px);
}
</style>
