<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useDramaInfo } from '@/stores/DramaInfo'
import { Pagination, Navigation } from 'swiper'
import { ref, reactive } from 'vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { useImageUrl } from '@/stores/GetImageUrl'

const { getCoverUrl, getSideUrl } = useImageUrl()
const modules3: any = [Pagination, Navigation]
const slideMove = ref(false)
const { dramaList } = useDramaInfo()

const dramaId: number[] = reactive([])
const sidephotoCount: number[] = reactive([])
dramaList.forEach((drama) => {
  if (drama.classification.includes('熱播')) {
    dramaId.push(drama.dramaid)
    sidephotoCount.push(drama.sidephotocount)
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
      ><router-link v-if="index !== selectIndex" :to="'/dramalist/' + id"
        ><img
          @mouseover="dramaover(index)"
          :src="getCoverUrl(id)"
          alt="photo" /></router-link
      ><router-link v-else :to="'/dramalist/' + id"
        ><img @mouseleave="dramaleave(-1)" :src="getSideUrl(id, 1)" alt="photo"
      /></router-link> </swiper-slide
    ><swiper-slide
      @mouseover="lastSlideShow"
      @mouseleave="lastSlideHide"
      :class="{ move: slideMove }"
      ><router-link :to="'/dramalist/' + dramaIdLast"
        ><img :src="getCoverUrl(dramaIdLast)" alt="photo" /></router-link
    ></swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
@import '@/styles/variable';
.mySwiper3.swiper {
  width: 100%;
  height: 200px;
  padding: 0px 75px;
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

  width: $base-swiper3-width;
  transition: all 0.3s ease-out;

  & img {
    width: 100%;
    height: 100%;
  }

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
}
.mySwiper3 .swiper-slide.move {
  transform: translateX(-150px);
}
</style>
