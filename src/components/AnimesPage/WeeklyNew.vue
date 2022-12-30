<script setup lang="ts">
import { reactive } from 'vue'
import type { WeeklyList } from '@/models/WeeklyList'

const weeklyList = reactive<WeeklyList[]>([
  {
    classes: 'col col1_bg',
    japWeekName: '日曜',
    twWeekName: '星期日',
    enWeekName: 'sunday',
    shortWeekName: '日',
  },
  {
    classes: 'col col2_bg',
    japWeekName: '月曜',
    twWeekName: '星期一',
    enWeekName: 'monday',
    shortWeekName: '一',
  },
  {
    classes: 'col col3_bg',
    japWeekName: '火曜',
    twWeekName: '星期二',
    enWeekName: 'tuesday',
    shortWeekName: '二',
  },
  {
    classes: 'col col4_bg',
    japWeekName: '水曜',
    twWeekName: '星期三',
    enWeekName: 'wednesday',
    shortWeekName: '三',
  },
  {
    classes: 'col col5_bg',
    japWeekName: '木曜',
    twWeekName: '星期四',
    enWeekName: 'thursday',
    shortWeekName: '四',
  },
  {
    classes: 'col col6_bg',
    japWeekName: '金曜',
    twWeekName: '星期五',
    enWeekName: 'friday',
    shortWeekName: '五',
  },
  {
    classes: 'col col7_bg',
    japWeekName: '土曜',
    twWeekName: '星期六',
    enWeekName: 'saturday',
    shortWeekName: '日',
  },
])
</script>

<template>
  <div class="week_box">
    <div class="week_title_text">2022 熱播動漫新番表</div>
    <div class="week_content">
      <router-link
        v-for="(day, index) in weeklyList"
        :to="{ path: day.enWeekName + 'animes', query: weeklyList[index] }"
        :key="index"
        :class="day.classes"
      >
        <div class="jap_text">{{ day.japWeekName }}</div>
        <div class="line"></div>
        <div class="tw_text">{{ day.twWeekName }}</div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.week_box {
  margin: 0px 0px 10px 75px;
  .week_title_text {
    margin-bottom: 10px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
  }
  .week_content {
    margin-right: 75px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    .col {
      width: 90%;
      height: 200px;

      .jap_text {
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 28px;
        font-weight: 500;
      }

      .line {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 140px;
        height: 0.5px;
        background-color: white;
      }

      .tw_text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 14px;
        font-weight: 500;
      }
    }

    .col1_bg {
      background: linear-gradient(180deg, #e74c3c 40%, #ec7063 100%);
    }
    .col2_bg {
      background: linear-gradient(180deg, #e67e22 40%, #eb984e 100%);
    }
    .col3_bg {
      background: linear-gradient(180deg, #f1c40f 40%, #f4d03f 100%);
    }
    .col4_bg {
      background: linear-gradient(180deg, #2ecc71 40%, #58d68d 100%);
    }
    .col5_bg {
      background: linear-gradient(180deg, #3498db 40%, #5dade2 100%);
    }
    .col6_bg {
      background: linear-gradient(180deg, #34495e 40%, #5d6d7e 100%);
    }
    .col7_bg {
      background: linear-gradient(180deg, #9b59b6 40%, #af7ac5 100%);
    }
  }
}
</style>
