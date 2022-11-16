<script setup lang="ts">
import { reactive } from 'vue'
import { useDramaInfo } from '@/stores/DramaInfo'
import { RouterLink } from 'vue-router'
import { useImageUrl } from '@/stores/GetImageUrl'
const { dramaList } = useDramaInfo()

const { getCoverUrl, getSideUrl } = useImageUrl()

const props = defineProps({
  selectItemName: {
    type: String,
    default: '',
  },
})

const selectDrama: any = reactive([])
dramaList.forEach((drama) => {
  if (
    drama.name.includes(props.selectItemName) ||
    drama.actor.includes(props.selectItemName)
  ) {
    selectDrama.push(drama)
  }
})
console.log(selectDrama)
</script>

<template>
  <main>
    <div class="container">
      <div class="collect_title_text">
        {{ props.selectItemName }} 的搜尋結果：
      </div>
      <div v-for="(drama, index) in selectDrama" :key="index">
        <router-link :to="'/dramalist/' + drama.dramaid"
          ><img :src="getCoverUrl(drama.dramaid)"
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
