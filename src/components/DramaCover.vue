<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useImageUrl } from '@/stores/GetImageUrl'

const { getCoverUrl, getSideUrl } = useImageUrl()

const num: Ref<number> = ref(1)

const props = defineProps({
  idOfDrama: {
    type: Number,
    default: 0,
  },
  dramaInfoList: {
    type: Object,
    required: true,
  },
  yourScore: {
    type: Number,
    default: 0,
  },
})

// 圖片自動切換 //////////////////////////////////////////////////////
setInterval(() => {
  if (num.value < props.dramaInfoList.sidephotocount) {
    num.value++
  } else {
    num.value = 0
    num.value++
  }
  return num.value
}, 5000)
</script>

<template>
  <div class="cover_row">
    <div class="cover_content">
      <span class="cover_name_text">{{ props.dramaInfoList.name }}</span>
      <div class="cover_year_text">
        {{ props.dramaInfoList.year }} |
        <font-awesome-icon icon="fa-solid fa-star" /> {{ props.yourScore }}
      </div>
    </div>
    <div class="cover_bg"></div>
    <img class="cover_img" :src="getCoverUrl(props.idOfDrama)" alt="" />
    <img class="side_img" :src="getSideUrl(props.idOfDrama, num)" alt="photo" />
  </div>
</template>

<style lang="scss" scoped>
.cover_row {
  width: 100%;
  height: 350px;
  position: relative;
  margin: 0px auto;

  .cover_content {
    position: absolute;
    left: 230px;
    top: 100px;
    z-index: 100;

    .cover_name_text {
      color: white;
      font-size: 30px;
      font-weight: bold;
    }
    .cover_year_text {
      color: gray;
      font-size: 12px;
      font-weight: bold;
    }
  }

  .cover_bg {
    width: 70%;
    height: 350px;
    background: linear-gradient(90deg, black 85%, transparent 100%);
    position: absolute;
    z-index: 50;
  }
  .cover_img {
    transform: scale(0.8);
    position: absolute;
    left: 50px;
    top: 50px;
    z-index: 100;
  }

  .side_img {
    height: 100%;
    position: absolute;
    right: 0px;
    z-index: 20;
  }
}
</style>
