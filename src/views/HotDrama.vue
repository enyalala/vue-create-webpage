<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import { getDramas } from '@/apis/api'
import type { Drama } from '@/models/Drama'
import NormalPage from '@/components/NormalPage.vue'

const dramaList: { data: Drama | null } = reactive({ data: null })
const dramaFilter = computed(() => {
  return dramaList.data?.filter((drama: Drama) =>
    drama.classification.includes('熱播')
  )
})

onMounted(async () => {
  dramaList.data = (await getDramas()).data ?? null
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
