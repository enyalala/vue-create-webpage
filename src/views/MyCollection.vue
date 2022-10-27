<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useDramaInfo } from '../stores/DramaInfo'

const { dramaList } = useDramaInfo()
const collectId: number[] = reactive([])
const collectDrama: any[] = reactive([])
const moveMent = ref(false)

const lastShow = () => {
  moveMent.value = true
}
const lastHide = () => {
  moveMent.value = false
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
// console.log(collectDrama, collectId)
</script>

<template>
  <main>
    <div class="container" :class="{ one_row: rowCount < 2 }">
      <div class="collect_title_text">我的收藏</div>
      <div class="row" v-for="row in rowList" :key="row">
        <div v-if="col1Id[row] !== undefined">
          <div class="collection" :class="{ move: moveMent }">
            <router-link :to="'/dramalist/' + col1Id[row]">
              <img :src="getCoverUrl(col1Id[row])" alt="photo" />
              <div class="name_text">
                {{ col1Drama[row].name }}
              </div></router-link
            >
          </div>
        </div>
        <div v-if="col2Id[row] !== undefined">
          <div class="collection" :class="{ move: moveMent }">
            <router-link :to="'/dramalist/' + col2Id[row]">
              <img :src="getCoverUrl(col2Id[row])" alt="photo" />
              <div class="name_text">
                {{ col2Drama[row].name }}
              </div></router-link
            >
          </div>
        </div>
        <div v-if="col3Id[row] !== undefined">
          <div class="collection" :class="{ move: moveMent }">
            <router-link :to="'/dramalist/' + col3Id[row]">
              <img :src="getCoverUrl(col3Id[row])" alt="photo" />
              <div class="name_text">
                {{ col3Drama[row].name }}
              </div></router-link
            >
          </div>
        </div>
        <div v-if="col4Id[row] !== undefined">
          <div
            class="collection"
            @mouseover="lastShow"
            @mouseleave="lastHide"
            :class="{ move: moveMent }"
          >
            <router-link :to="'/dramalist/' + col4Id[row]">
              <img :src="getCoverUrl(col4Id[row])" alt="photo" />
              <div class="name_text">
                {{ col4Drama[row].name }}
              </div></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
  margin: 0px auto;
  background-color: #222;
}

.one_row {
  height: 100vh;
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
