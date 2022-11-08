<script setup lang="ts">
import { reactive, ref, onUpdated } from 'vue'
import { RouterLink } from 'vue-router'
import { useDramaInfo } from '@/stores/DramaInfo'
import type { CollectData } from '@/models/SectionData'
import { useImageUrl } from '@/stores/GetImageUrl'

const { getCoverUrl, getSideUrl } = useImageUrl()
const { dramaList } = useDramaInfo()
const collectId: number[] = reactive([])
const collectDrama: any[] = reactive([])
const lastIndex = ref(-1)
const selectIndex = ref(-1)
const selectIdx = ref(-1)

const selectImg = (row: number, col: number) => {
  selectIndex.value = row
  selectIdx.value = col
}

const lastShow = (row: number) => {
  lastIndex.value = row
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

const uncollect = (index: number, idx: number) => {
  dramaList[collectList[idx].condition[index]].collect = false
}

onUpdated(() => {
  dramaList.forEach((drama) => {
    if (drama.collect === true) {
      collectId.push(drama.dramaid)
    }
  })
})
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
              :class="{ move: index === lastIndex }"
              @mouseover="idx === 3 ? lastShow(index) : null"
              @mouseleave="idx === 3 ? lastShow(-1) : null"
            >
              <router-link :to="'/dramalist/' + col.condition[row]">
                <div v-if="index === selectIndex && idx === selectIdx">
                  <div class="img-box" @mouseleave="selectImg(-1, -1)">
                    <img :src="getSideUrl(col.condition[row], 1)" alt="photo" />
                    <router-link
                      to="/mycollection"
                      class="collect_icon"
                      @click="uncollect(index, idx)"
                    >
                      <font-awesome-icon icon="fa-solid fa-heart" />
                    </router-link>
                  </div>
                </div>
                <div class="img-box" v-else>
                  <img
                    @mouseover="selectImg(index, idx)"
                    :src="getCoverUrl(col.condition[row])"
                    alt="photo"
                  />
                </div>
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

  .collect_title_text {
    color: white;
    font-size: 30px;
    font-weight: bold;
    padding: 30px 0px 80px 75px;
  }

  .row {
    width: 840px;
    height: 330px;
    display: flex;
    margin: 0px auto;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .collection {
      width: $base-collect-width;
      height: 100%;
      object-fit: scale-down;
      margin-right: 10px;
      transition: all 0.4s ease-out;
      flex-shrink: 0;

      .name_text {
        color: white;
        font-size: 16px;
        font-weight: 500;
      }
      .img-box {
        width: 100%;
        height: $base-collect-height;
        position: relative;

        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .collect_icon {
          color: rgb(240, 72, 110);
          position: absolute;
          bottom: 5px;
          right: 10px;
          font-size: 24px;
          background: none;
          border: none;
          :hover {
            color: rgb(237, 90, 124);
            cursor: pointer;
          }
        }
      }

      &:nth-child(2n) {
        width: $base-collect-width;
        height: $base-collect-height;

        margin-right: 10px;
        transition: all 0.4s ease-out;
        flex-shrink: 0;

        &:hover {
          width: 2 * $base-collect-width;
        }
      }

      &:nth-child(3n) {
        width: $base-collect-width;
        height: $base-collect-height;

        margin-right: 10px;
        transition: all 0.4s ease-out;
        flex-shrink: 0;

        &:hover {
          width: 2 * $base-collect-width;
        }
      }

      &:hover {
        width: 2 * $base-collect-width;
      }
    }
  }
}

.collection.move {
  transform: translateX(-210px);
}
</style>
