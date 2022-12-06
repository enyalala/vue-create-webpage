<script setup lang="ts">
import TopSwiper from '@/components/TopSwiper.vue'
import SecSwiper from '@/components/SecSwiper.vue'
import TrdSwiper from '@/components/TrdSwiper.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { ref, reactive, onMounted, computed } from 'vue'
import { getDramas } from '@/apis/index'
import type { Drama } from '@/models/Drama'

const isLoading = ref(true)

const dramaList: Drama[] = reactive([])

const topDramaList = computed(() => {
  return dramaList.filter((drama) => drama.classification.includes('首頁'))
})

const secDramaList = computed(() => {
  return dramaList.filter((drama) => drama.classification.includes('新劇'))
})

const trdDramaList = computed(() => {
  return dramaList.filter((drama) => drama.classification.includes('熱播'))
})

const list = computed(() => [
  {
    classes: 'swiper-container',
    component: TopSwiper,
    propsData: topDramaList.value,
  },
  {
    classes: 'swiper-container swiper2',
    component: SecSwiper,
    propsData: secDramaList.value,
    sectionData: {
      sectionTitle: '新劇跟播中',
      to: '/newdrama',
    },
  },
  {
    classes: 'swiper-container swiper3',
    component: TrdSwiper,
    propsData: trdDramaList.value,
    sectionData: {
      sectionTitle: '熱播排行榜',
      to: '/hotdrama',
    },
  },
])

onMounted(async () => {
  isLoading.value = true
  const res = await getDramas()
  Object.assign(dramaList, res.data)
  isLoading.value = false
})
</script>

<template>
  <vueLoading v-if="isLoading" v-model:active="isLoading" color="white" />
  <template v-else>
    <div v-for="(data, index) in list" :key="index" :class="data.classes">
      <SectionTitle
        v-if="data.sectionData"
        v-bind="data.sectionData"
      ></SectionTitle
      ><template v-if="dramaList">
        <component :is="data.component" :propsData="data.propsData"></component
      ></template>
    </div>
  </template>
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
