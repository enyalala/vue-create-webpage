<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useDramaInfo } from '@/stores/DramaInfo'
import type { CollectData } from '@/models/SectionData'

const { dramaList } = useDramaInfo()
const collectId: number[] = reactive([])
const collectDrama: any[] = reactive([])
const selectIndex = ref(-1)
const selectIdx = ref(-1)

const lastShow = (row: number, col: number) => {
  selectIndex.value = row
  selectIdx.value = col
}

dramaList.forEach((drama) => {
  if (drama.collect === true) {
    collectId.push(drama.dramaid)
  }
})

const col1Id = collectId.filter((eachId) => collectId.indexOf(eachId) % 4 === 0)
const col2Id = collectId.filter((eachId) => collectId.indexOf(eachId) % 4 === 1)
const col3Id = collectId.filter((eachId) => collectId.indexOf(eachId) % 4 === 2)
const col4Id = collectId.filter((eachId) => collectId.indexOf(eachId) % 4 === 3)
const rowCount = Math.ceil(collectId.length / 4)
const rowList = [...new Array(rowCount).keys()]

dramaList.forEach((drama) => {
  if (drama.collect === true) {
    collectDrama.push(drama)
  }
})

const col1Drama = collectDrama.filter((drama) => col1Id.includes(drama.dramaid))
const col2Drama = collectDrama.filter((drama) => col2Id.includes(drama.dramaid))
const col3Drama = collectDrama.filter((drama) => col3Id.includes(drama.dramaid))
const col4Drama = collectDrama.filter((drama) => col4Id.includes(drama.dramaid))

const getCoverUrl = (name: number) => {
  return new URL(`../assets/img/dramacover/cover${name}.jpg`, import.meta.url)
    .href
}

const collectList = reactive<CollectData[]>([
  {
    condition: col1Id,
    drama_name: col1Drama,
  },
  {
    condition: col2Id,
    drama_name: col2Drama,
  },
  {
    condition: col3Id,
    drama_name: col3Drama,
  },
  {
    condition: col4Id,
    drama_name: col4Drama,
  },
])
</script>

<template>
  <main>
    <div class="container">
      <div class="collect_title_text">我的收藏</div>
      <div class="row" v-for="(row, index) in rowList" :key="row">
        <div v-for="(col, idx) in collectList" :key="idx">
          <div v-if="col.condition[row] !== undefined">
            <div
              class="collection"
              :class="{ move: index === selectIndex }"
              @mouseover="idx === 3 ? lastShow(index, idx) : null"
              @mouseleave="idx === 3 ? lastShow(-1, -1) : null"
            >
              <router-link :to="'/dramalist/' + col.condition[row]">
                <img :src="getCoverUrl(col.condition[row])" alt="photo" />
                <div class="name_text">
                  {{ col.drama_name[row].name }}
                </div></router-link
              >
            </div>
          </div>
        </div>
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
}

.row {
  width: 840px;
  height: 330px;
  display: flex;
  margin: 0px auto;
  overflow: auto;
}

.row::-webkit-scrollbar {
  display: none;
}

.name_text {
  color: white;
  font-size: 16px;
  font-weight: 500;
}

.collect_title_text {
  color: white;
  font-size: 30px;
  font-weight: bold;
  padding: 30px 0px 80px 75px;
}

.collection {
  width: 198px;
  height: 270px;
  object-fit: scale-down;
  margin-right: 10px;
  transition: all 0.3s ease-out;
  flex-shrink: 0;
}

.collection:nth-child(2n) {
  width: 198px;
  height: 270px;
  object-fit: scale-down;
  margin-right: 10px;
  transition: all 0.3s ease-out;
  flex-shrink: 0;
}

.collection:nth-child(3n) {
  width: 198px;
  height: 270px;
  object-fit: scale-down;
  margin-right: 10px;
  transition: all 0.3s ease-out;
  flex-shrink: 0;
}

.collection:hover {
  width: 408px;
}

.collection:nth-child(2n):hover {
  width: 408px;
}

.collection:nth-child(3n):hover {
  width: 408px;
}

.collection.move {
  transform: translateX(-210px);
}

img {
  width: 100%;
  height: 100%;
}
</style>
