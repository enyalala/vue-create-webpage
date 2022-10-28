<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useDramaInfo } from '../stores/DramaInfo'
import { Pagination, Navigation } from 'swiper'
import { ref, reactive } from 'vue'
import 'swiper/css'
import 'swiper/css/pagination'

const modules3: any = [Pagination, Navigation]
const slideMove = ref(false)
const dramaHover = ref(true)
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
// const sidephotoCountDeleteLast = sidephotoCount.slice(0, -1)
// const sidephotoCountLast = sidephotoCount[sidephotoCount.length - 1]
// const numDeleteLast = new Array(sidephotoCountDeleteLast.length)
// const numCount = [...numDeleteLast.keys()]
// numDeleteLast.fill(1)
// const numLast = ref(1)

const getS3ImageUrl = (name: number) => {
  return new URL(`../assets/img/dramacover/cover${name}.jpg`, import.meta.url)
    .href
}

const lastSlideShow = () => {
  slideMove.value = true
}
const lastSlideHide = () => {
  slideMove.value = false
}

const dramaover = () => {
  dramaHover.value = false
}

const dramaleave = () => {
  dramaHover.value = true
}

// 圖片自動切換 //////////////////////////////////////////////////////
// setInterval(() => {
//   numCount.forEach((count) => {
//     if (numDeleteLast[count] < sidephotoCountDeleteLast[count]) {
//       numDeleteLast[count]++
//     } else {
//       numDeleteLast[count] = 0
//       numDeleteLast[count]++
//     }
//     return numDeleteLast[count]
//   })
// }, 5000)
// console.log(dramaIdDeleteLast.indexOf(0))
// setInterval(
//   () => console.log(numDeleteLast[dramaIdDeleteLast.indexOf(0)]),
//   5000
// )
const getSideUrl = (name: number, count: number) => {
  return new URL(
    `../assets/img/sidephoto/sidephoto${name}_${count}.jpg`,
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
      v-for="id in dramaIdDeleteLast"
      :key="id"
      :class="{ move: slideMove }"
      ><router-link v-if="dramaHover" :to="'/dramalist/' + id"
        ><img
          @mouseover="dramaover"
          :src="getS3ImageUrl(id)"
          alt="photo" /></router-link
      ><router-link v-else :to="'/dramalist/' + id"
        ><img
          @mouseleave="dramaleave"
          :src="getSideUrl(id, 1)"
          alt="photo" /></router-link></swiper-slide
    ><swiper-slide
      @mouseover="lastSlideShow"
      @mouseleave="lastSlideHide"
      :class="{ move: slideMove }"
      ><router-link :to="'/dramalist/' + dramaIdLast"
        ><img :src="getS3ImageUrl(dramaIdLast)" alt="photo" /></router-link
    ></swiper-slide>
  </swiper>
</template>

<style>
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
}

.mySwiper3 .swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mySwiper3 .swiper-slide {
  width: 160px;
  transition: all 0.3s ease-out;
}

.mySwiper3 .swiper-slide:nth-child(2n) {
  width: 160px;
}

.mySwiper3 .swiper-slide:nth-child(3n) {
  width: 160px;
}

.mySwiper3 .swiper-slide:hover {
  width: 320px;
}

.mySwiper3 .swiper-slide:nth-child(2n):hover {
  width: 320px;
}

.mySwiper3 .swiper-slide:nth-child(3n):hover {
  width: 320px;
}

.mySwiper3 .swiper-slide:last-child:hover {
  width: 320px;
}

.mySwiper3 .swiper-slide.move {
  transform: translateX(-150px);
}
</style>
