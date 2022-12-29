<script setup lang="ts">
import { reactive } from 'vue'
import type { FilterBtnData } from '@/models/FilterBtnData'
import { RouterLink } from 'vue-router'

const btnList = reactive<FilterBtnData[]>([
  { to: '/filter', btnTitle: '篩選', icon: 'fa-solid fa-filter' },
  { to: '/filter', btnTitle: '奇幻冒險' },
  { to: '/filter', btnTitle: '校園戀愛' },
  { to: '/filter', btnTitle: '溫馨喜劇' },
  { to: '/filter', btnTitle: '運動競技' },
  { to: '/filter', btnTitle: '歷史軍武' },
  { to: '/filter', btnTitle: '職場社會' },
])
</script>

<template>
  <div class="filter_box">
    <div class="filter_content">
      <router-link
        v-for="(btn, index) in btnList"
        :key="index"
        :to="btn.to"
        class="filter_btn"
      >
        <!-- <font-awesome-icon :icon="btn.icon" /> -->
        {{ btn.btnTitle }}
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter_box {
  width: 100%;
  margin: 50px auto;

  .filter_content {
    width: fit-content;
    display: flex;
    margin: 0 auto;

    .filter_btn {
      margin: 0px 12px 0px 0px;
      text-align: center;
      font-size: 14px;
      line-height: 36px;
      letter-spacing: 1px;
      cursor: pointer;
      padding: 0px 12px;
      align-items: center;
      color: white;
      border-radius: 18px;
      border: 1px solid rgb(75, 75, 75);
      background-color: rgb(255, 255, 255, 0.1);
      font-weight: 500;

      &:hover {
        border: 1px solid white;
      }
    }
  }
}
</style>
