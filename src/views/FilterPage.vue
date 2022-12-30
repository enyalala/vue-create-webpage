<script setup lang="ts">
import NormalPage from '@/components/NormalPage.vue'

import { reactive, onMounted, computed } from 'vue'
import type { FilterInfoData } from '@/models/FilterInfoData'
import { getDramas } from '@/apis/api'
import type { Drama } from '@/models/Drama'

const filterInfoList = reactive<FilterInfoData[]>([
  {
    filterTitle: '類別 /',
    filterItem: [
      { filterItemTiTle: '戲劇', selected: false },
      { filterItemTiTle: '動漫', selected: true },
      { filterItemTiTle: '娛樂', selected: false },
    ],
  },
  {
    filterTitle: '排序 /',
    filterItem: [
      { filterItemTiTle: '最新', selected: true },
      { filterItemTiTle: '熱門', selected: false },
      { filterItemTiTle: '好評', selected: false },
    ],
  },
  {
    filterTitle: '地區 /',
    filterItem: [
      { filterItemTiTle: '全部地區', selected: true },
      { filterItemTiTle: '韓國', selected: false },
      { filterItemTiTle: '日本', selected: false },
    ],
  },
  {
    filterTitle: '類型 /',
    filterItem: [
      { filterItemTiTle: '全部類型', selected: true },
      { filterItemTiTle: '奇幻冒險', selected: false },
      { filterItemTiTle: '校園戀愛', selected: false },
      { filterItemTiTle: '溫馨喜劇', selected: false },
      { filterItemTiTle: '運動競技', selected: false },
      { filterItemTiTle: '歷史軍武', selected: false },
      { filterItemTiTle: '職場社會', selected: false },
    ],
  },
])

const dramaList: { data: Drama | null } = reactive({ data: null })
const dramaFilter = computed(() => {
  return dramaList.data?.filter((drama: Drama) =>
    drama.classification.includes('動畫')
  )
})

const selectFilterItem = (rowIndex: number, colIndex: number) => {
  const selectedRow = filterInfoList[rowIndex].filterItem
  selectedRow.filter((item, idx) => {
    if (idx === colIndex) {
      item.selected = true
    } else {
      item.selected = false
    }
  })
}

onMounted(async () => {
  dramaList.data = (await getDramas()).data ?? null
})
</script>

<template>
  <main>
    <div class="container">
      <div class="title_text">動漫</div>
      <div class="filter_info">
        <div
          v-for="(data, index) in filterInfoList"
          :key="index"
          class="filter_title_text"
        >
          <span> {{ data.filterTitle }}</span>
          <a
            href=""
            v-for="(item, idx) in data.filterItem"
            :key="idx"
            class="filter_item_text"
            :class="{ filter_item_text_selected: item.selected }"
            @click.prevent="selectFilterItem(index, idx)"
            >{{ item.filterItemTiTle }}</a
          >
        </div>
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
  width: 100%;
  padding: 0 70px;

  .title_text {
    color: white;
    font-size: 30px;
    font-weight: bold;
    padding: 30px 0px 20px;
  }
  .filter_info {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    margin-bottom: 30px;

    .filter_title_text {
      color: white;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 1px;
      margin: 15px 0;

      .filter_item_text {
        color: #999;
        font-weight: 500;
        margin-left: 15px;
        padding: 9px 12px;
        cursor: pointer;

        &:hover {
          color: white;
        }
      }

      .filter_item_text_selected {
        color: white;
        border-radius: 20px;
        border: 1px solid white;
        background-color: rgb(255, 255, 255, 0.1);
      }
    }
  }
}
</style>
