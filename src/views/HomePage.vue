<script setup lang="ts">
import TopSwiper from '@/components/TopSwiper.vue'
import NewDramaSwiper from '@/components/NewDramaSwiper.vue'
import HotDramaSwiper from '@/components/HotDramaSwiper.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { reactive, onMounted, computed } from 'vue'
import type { Drama } from '@/models/Drama'
import { fireStoreInstance } from '@/firebase'
import { onSnapshot } from '@firebase/firestore'

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
    component: NewDramaSwiper,
    propsData: secDramaList.value,
    sectionData: {
      sectionTitle: '新劇跟播中',
      to: '/newdrama',
    },
  },
  {
    classes: 'swiper-container swiper3',
    component: HotDramaSwiper,
    propsData: trdDramaList.value,
    sectionData: {
      sectionTitle: '熱播排行榜',
      to: '/hotdrama',
    },
  },
])

onMounted(async () => {
  // console.log('hi')
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
  <div v-for="(data, index) in list" :key="index" :class="data.classes">
    <SectionTitle
      v-if="data.sectionData"
      v-bind="data.sectionData"
    ></SectionTitle
    ><template v-if="dramaList.length">
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
