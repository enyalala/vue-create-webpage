<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import type { Drama } from '@/models/Drama'
import { fireStoreInstance } from '@/firebase'
import { onSnapshot } from 'firebase/firestore'

import NormalPage from '@/components/NormalPage.vue'

// API:Firebase
const dramaList: Drama[] = reactive([])

const dramaFilter = computed(() => {
  return dramaList.filter((drama: Drama) =>
    drama.classification.includes('熱播')
  )
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
  <main>
    <div class="container">
      <div class="new_title_text">熱播排行榜</div>
      <template v-if="dramaFilter">
        <NormalPage :dramaFilter="dramaFilter"
      /></template>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/styles/variable';
.container {
  color: white;
  width: 100%;
  min-height: calc(100vh - $nav-height);
  margin: 0px auto;
  background-color: #222;

  .new_title_text {
    color: white;
    font-size: 30px;
    font-weight: bold;
    padding: 30px 0px 80px 75px;
  }
}
</style>
