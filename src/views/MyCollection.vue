<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useImageUrl } from '@/stores/GetImageUrl'
import { computed } from 'vue'
import type { Drama } from '@/models/Drama'
import { fireStoreInstance } from '@/firebase'
import { onSnapshot } from '@firebase/firestore'

const { getCoverUrl, getSideUrl } = useImageUrl()
const lastIndex = ref(-1)
const selectIndex = ref(-1)
const selectIdx = ref(-1)

const dramaList: Drama[] = reactive([])

const dramaRowList = computed(() => {
  return dramaList
    .filter(({ collect }) => collect)
    .reduce((prev, drama, index) => {
      const rowIndex = Math.floor(index / 4)

      if (!prev[rowIndex]) {
        prev.push([drama])
      } else {
        prev[rowIndex].push(drama)
      }

      return prev
    }, [] as Drama[][])
})

const selectImg = (row: number, col: number) => {
  selectIndex.value = row
  selectIdx.value = col
}

const lastShow = (row: number) => {
  lastIndex.value = row
}

const unCollect = (id: number) => {
  fireStoreInstance.patchUnCollect({
    path: 'dramaInfo',
    pathSegments: [`drama${id}`],
  })
}

onMounted(async () => {
  onSnapshot(
    fireStoreInstance.getDramas({ path: 'dramaInfo' }),
    (querySnapshot) => {
      const res: Drama[] = reactive([])
      querySnapshot.forEach((doc) => {
        const dramaData = {
          id: doc.data().id,
          name: doc.data().name,
          classification: doc.data().classification,
          year: doc.data().year,
          actor: doc.data().actor,
          director: doc.data().director,
          screenwriter: doc.data().screenwriter,
          type: doc.data().type,
          label: doc.data().label,
          highlight: doc.data().highlight,
          description: doc.data().description,
          homestatus: doc.data().homestatus,
          homedescription: doc.data().homedescription,
          sidephotocount: doc.data().sidephotocount,
          comments: doc.data().comments,
          collect: doc.data().collect,
          score: doc.data().score,
          visitor: doc.data().visitor,
        }
        res.push(dramaData)
      })
      Object.assign(dramaList, res)
    }
  )
})
</script>

<template>
  <main>
    <div class="container">
      <div class="collect_title_text">我的收藏</div>
      <div class="row" v-for="(row, index) in dramaRowList" :key="index">
        <div v-for="(drama, idx) in row" :key="idx">
          <div
            class="collection"
            :class="{ move: index === lastIndex }"
            @mouseover="idx === 3 ? lastShow(index) : null"
            @mouseleave="idx === 3 ? lastShow(-1) : null"
          >
            <router-link :to="'/dramalist/' + drama.id">
              <div v-if="index === selectIndex && idx === selectIdx">
                <div class="img-box" @mouseleave="selectImg(-1, -1)">
                  <img :src="getSideUrl(drama.id, 1)" alt="photo" />
                  <router-link
                    to="/mycollection"
                    class="collect_icon"
                    @click="unCollect(drama.id)"
                  >
                    <font-awesome-icon icon="fa-solid fa-heart" />
                  </router-link>
                </div>
              </div>
              <div class="img-box" v-else>
                <img
                  @mouseover="selectImg(index, idx)"
                  :src="getCoverUrl(drama.id)"
                  alt="photo"
                />
              </div>
              <div class="name_text">
                {{ drama.name }}
              </div></router-link
            >
          </div>
        </div>
      </div>
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
          color: $color-kktv-pink;
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

      &:nth-child(2n),
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
