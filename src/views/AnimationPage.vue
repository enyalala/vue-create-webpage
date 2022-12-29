<script setup lang="ts">
import TopSwiper from '@/components/TopSwiper.vue'
import AnimationPage from '@/components/FilterButton.vue'
import WeeklyNew from '@/components/AnimationPage/WeeklyNew.vue'
import HotDramaSwiper from '@/components/HotDramaSwiper.vue'
import SectionTitle from '@/components/SectionTitle.vue'

import { reactive, onMounted, computed } from 'vue'
import { getDramas } from '@/apis/api'
import type { Drama } from '@/models/Drama'

const dramaList: Drama[] = reactive([])

const topDramaList = computed(() => {
  return dramaList.filter((drama) => drama.classification.includes('動畫首頁'))
})

const trdDramaList = computed(() => {
  return dramaList.filter((drama) => drama.classification.includes('動畫熱播'))
})

onMounted(async () => {
  const res = await getDramas()
  Object.assign(dramaList, res.data)
})
</script>

<template>
  <template v-if="dramaList.length">
    <TopSwiper :propsData="topDramaList" />
    <AnimationPage />
    <WeeklyNew />
    <SectionTitle :sectionTitle="'熱播排行榜'" />
    <HotDramaSwiper :propsData="trdDramaList"
  /></template>
</template>

<style lang="scss" scoped></style>
