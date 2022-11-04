<script setup lang="ts">
import TopSwiper from '@/components/TopSwiper.vue'
import SecSwiper from '@/components/SecSwiper.vue'
import TrdSwiper from '@/components/TrdSwiper.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { reactive, shallowRef } from 'vue'
import type { SectionData } from '@/models/SectionData'

const list = reactive<SectionData[]>([
  {
    classes: 'swiper-container',
    component: shallowRef(TopSwiper),
  },
  {
    classes: 'swiper-container swiper2',
    component: shallowRef(SecSwiper),
    sectionData: {
      sectionTitle: '新劇跟播中',
      to: '/newdrama',
    },
  },
  {
    classes: 'swiper-container swiper3',
    component: shallowRef(TrdSwiper),
    sectionData: {
      sectionTitle: '熱播排行榜',
      to: '/hotdrama',
    },
  },
])
</script>

<template>
  <div v-for="(data, index) in list" :key="index" :class="data.classes">
    <SectionTitle
      v-if="data.sectionData"
      v-bind="data.sectionData"
    ></SectionTitle>
    <component :is="data.component"></component>
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
