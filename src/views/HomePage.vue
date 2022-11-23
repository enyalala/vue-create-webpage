<script setup lang="ts">
import TopSwiper from '@/components/TopSwiper.vue'
import SecSwiper from '@/components/SecSwiper.vue'
import TrdSwiper from '@/components/TrdSwiper.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { reactive, shallowRef, onMounted, computed } from 'vue'
import type { SectionData } from '@/models/SectionData'
import { getDramas } from '@/apis/index'
import type { Drama } from '@/models/Drama'

const dramaList: Drama[] = reactive([])
const topSwiperId: number[] = reactive([])

const secSwiperId: number[] = reactive([])
const trdSwiperId: number[] = reactive([])

const topDramaList = computed(() => {
  return dramaList.filter((drama) => drama.classification.includes('首頁'))

  //   if (drama.classification.includes('首頁')) {
  //     topDramaList.push(drama)
  //     return topDramaList
  //   } else if (drama.classification.includes('新劇')) {
  //     secDramaList.push(drama)
  //   } else if (drama.classification.includes('熱播')) {
  //     trdDramaList.push(drama)
  //   }
  // })
})

const secDramaList = computed(() => {
  return dramaList.filter((drama) => drama.classification.includes('新劇'))
})

const trdDramaList = computed(() => {
  return dramaList.filter((drama) => drama.classification.includes('熱播'))
})

// console.log(topDramaList)

const list = computed(() => [
  {
    classes: 'swiper-container',
    component: shallowRef(TopSwiper),
    propsData: topDramaList,
  },
  {
    classes: 'swiper-container swiper2',
    component: shallowRef(SecSwiper),
    propsData: secDramaList,
    sectionData: {
      sectionTitle: '新劇跟播中',
      to: '/newdrama',
    },
  },
  {
    classes: 'swiper-container swiper3',
    component: shallowRef(TrdSwiper),
    propsData: trdDramaList,
    sectionData: {
      sectionTitle: '熱播排行榜',
      to: '/hotdrama',
    },
  },
])

console.log(list.value)
onMounted(async () => {
  Object.assign(dramaList, (await getDramas()).data)
})
</script>

<template>
  <div v-for="(data, index) in list" :key="index" :class="data.classes">
    <SectionTitle
      v-if="data.sectionData"
      v-bind="data.sectionData"
    ></SectionTitle
    ><template v-if="data.propsData">
      <component :is="data.component" :propsData="data.propsData"></component
    ></template>
  </div>
</template>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: auto;

  &.swiper2 {
    padding: 40px 0px;
  }

  &.swiper3 {
    padding: 20px 0px 40px 0px;
  }
}
</style>
