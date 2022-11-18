<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useImageUrl } from '@/stores/GetImageUrl'
import { useSearchItem } from '@/stores/SearchItem'
import type { Drama } from '@/models/Drama'
import { getDramas } from '@/apis/index'

const { searchItemInfo } = useSearchItem()

const { getCoverUrl, getSideUrl } = useImageUrl()

const selectDrama: any = reactive([])
const dramaList: Drama[] = reactive([])

onMounted(async () => {
  Object.assign(dramaList, (await getDramas()).data)
  dramaList.forEach((drama) => {
    if (
      drama.name.includes(searchItemInfo.selectItemName) ||
      drama.actor.includes(searchItemInfo.selectItemName)
    ) {
      selectDrama.push(drama)
    }
  })
})
</script>

<template>
  <main>
    <div class="container">
      <div class="collect_title_text">
        {{ searchItemInfo.selectItemName }} 的搜尋結果：
      </div>
      <div v-for="(drama, index) in selectDrama" :key="index">
        <router-link :to="'/dramalist/' + drama.id"
          ><img :src="getCoverUrl(drama.id)"
        /></router-link>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '@/styles/variable';
.container {
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
