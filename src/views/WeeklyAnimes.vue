<script setup lang="ts">
import NormalPage from '@/components/NormalPage.vue'

import { useRoute } from 'vue-router'
import { reactive, onMounted, computed } from 'vue'
import { getDramas } from '@/apis/api'
import type { Drama } from '@/models/Drama'

const weeklyAnimesQuery = useRoute().query

const dramaList: { data: Drama | null } = reactive({ data: null })
const dramaFilter = computed(() => {
  return dramaList.data?.filter((drama: Drama) =>
    drama.classification.includes(`${weeklyAnimesQuery.japWeekName}`)
  )
})

onMounted(async () => {
  dramaList.data = (await getDramas()).data ?? null
})
</script>

<template>
  <main>
    <div class="container">
      <div class="collect_title_text">
        動畫新番表 - {{ weeklyAnimesQuery.japWeekName }} ({{
          weeklyAnimesQuery.shortWeekName
        }})
      </div>
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

  .collect_title_text {
    color: white;
    font-size: 30px;
    font-weight: bold;
    padding: 30px 0px 80px 75px;
  }
}
</style>
