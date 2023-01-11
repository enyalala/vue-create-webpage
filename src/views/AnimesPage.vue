<script setup lang="ts">
import TopSwiper from '@/components/TopSwiper.vue'
import AnimationPage from '@/components/FilterButton.vue'
import WeeklyNew from '@/components/AnimesPage/WeeklyNew.vue'
import HotDramaSwiper from '@/components/HotDramaSwiper.vue'
import SectionTitle from '@/components/SectionTitle.vue'

import { reactive, onMounted, computed } from 'vue'
import type { Drama } from '@/models/Drama'
import { fireStoreInstance } from '@/firebase'
import { onSnapshot } from '@firebase/firestore'

const dramaList: Drama[] = reactive([])

const topDramaList = computed(() => {
  return dramaList.filter((drama) => drama.classification.includes('動畫首頁'))
})

const trdDramaList = computed(() => {
  return dramaList.filter((drama) => drama.classification.includes('動畫熱播'))
})

onMounted(async () => {
  onSnapshot(
    fireStoreInstance.getDramas({ path: 'dramaInfo' }),
    (querySnapshot) => {
      const res: Drama[] = reactive([])
      querySnapshot.forEach((doc) => {
        const dramaData = {
          id: doc.data().id,
          name: doc.data().name,
          classification: doc.data().classification,
          year: doc.data().year,
          actor: doc.data().actor,
          director: doc.data().director,
          screenwriter: doc.data().screenwriter,
          type: doc.data().type,
          label: doc.data().label,
          highlight: doc.data().highlight,
          description: doc.data().description,
          homestatus: doc.data().homestatus,
          homedescription: doc.data().homedescription,
          sidephotocount: doc.data().sidephotocount,
          comments: doc.data().comments,
          collect: doc.data().collect,
          score: doc.data().score,
          visitor: doc.data().visitor,
        }
        res.push(dramaData)
      })
      Object.assign(dramaList, res)
    }
  )
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
