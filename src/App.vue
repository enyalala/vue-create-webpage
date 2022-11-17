<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, reactive, watch, onMounted } from 'vue'
import type { NavData } from '@/models/SectionData'
import { getDramas } from '@/apis/index'

// const getImgUrl: () => string = () => {
//   return new URL('./assets/img/kktv_logo.svg', import.meta.url).href
// }

const inputSearch = ref('')
const searchShow = ref(false)
/** 關鍵字搜尋的文字，是否從歷史記錄選取的 */
const isSearchValueFromHistory = ref(false)
const selectItemIndex = ref(-1)
const selectItemName = ref('')
const dramaList = reactive([])

const navlist = reactive<NavData[]>([
  {
    classes: '',
    to: '/',
    navtitle: '',
    imgData: {
      imgClasses: 'navbar_logo',
      imgSrc: getImgUrl(),
      imgAlt: 'photo',
    },
  },
  {
    classes: 'navbar_link',
    to: '/',
    navtitle: '戲劇',
  },
  {
    classes: 'navbar_link',
    to: '/',
    navtitle: '動畫',
  },
  {
    classes: 'navbar_link',
    to: '/',
    navtitle: '娛樂',
  },
  {
    classes: 'navbar_link',
    to: '/',
    navtitle: '更多',
  },
  {
    classes: 'navbar_link',
    to: '/mycollection',
    navtitle: '我的收藏',
  },
])
const historySearch: string[] = reactive([])
const filterInfos: string[] = reactive([])
const searchInfo: string[] = reactive([])

const returnItem = (name: string, idx: number) => {
  selectItemName.value = name
  selectItemIndex.value = idx
  historySearch.push(name)
}

const selectItem = (name: string, fromHistory = false) => {
  inputSearch.value = name
  isSearchValueFromHistory.value = fromHistory
}

const switchSearch = () => {
  searchShow.value = !searchShow.value
}

watch(inputSearch, () => {
  dramaList.filter((drama: any) => {
    if (inputSearch.value !== '') {
      const matchName = drama.name.match(inputSearch.value)
      const matchActor = drama.actor.filter((actor: string) =>
        actor.includes(inputSearch.value)
      )

      if (matchName) {
        filterInfos.push(matchName.input)
      }
      if (matchActor.length > 0) {
        matchActor.forEach((value: string) => filterInfos.push(value))
      }

      // 刪除重複值儲存至searchInfo
      Object.assign(searchInfo, [...new Set(filterInfos)])
    } else {
      filterInfos.splice(0, filterInfos.length)
      searchInfo.splice(0, searchInfo.length)
    }
  })
  // console.log(filterInfos, searchInfo)
})

function getImgUrl(): string {
  return new URL('./assets/img/kktv_logo.svg', import.meta.url).href
}

onMounted(() => {
  getDramas(dramaList)
})
</script>

<template>
  <div class="container">
    <div class="navbar">
      <div class="navbar_content">
        <ul class="nav_left">
          <li>
            <router-link
              v-for="(data, index) in navlist"
              :key="index"
              :class="data.classes"
              :to="data.to"
            >
              <img
                v-if="data.imgData"
                :class="data.imgData.imgClasses"
                :src="data.imgData.imgSrc"
                :alt="data.imgData.imgAlt"
              />{{ data.navtitle }}</router-link
            >
          </li>
        </ul>
        <div class="nav_right">
          <button v-if="!searchShow" class="btn_search" @click="switchSearch">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </button>
          <div v-else class="search_content">
            <button class="btn_search">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </button>
            <input
              class="search_input"
              type="text"
              placeholder="搜尋片名或人名"
              v-model="inputSearch"
              @input="isSearchValueFromHistory = false"
            />
            <button class="btn_search" @click="switchSearch">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
            <ul class="auto_complete_list">
              <div
                v-if="
                  (!inputSearch || isSearchValueFromHistory) &&
                  historySearch.length
                "
              >
                <li class="auto_complete_header">
                  <span>搜尋記錄</span><button class="clear">清除記錄</button>
                </li>
                <li
                  class="auto_complete_item"
                  v-for="(hisItem, index) in historySearch"
                  :key="index"
                  @mouseover="selectItem(hisItem, true)"
                >
                  <router-link
                    class="auto_complete_text"
                    to="/search"
                    @click="returnItem(hisItem, index)"
                    >{{ hisItem }}</router-link
                  >
                </li>
              </div>
              <div v-if="!isSearchValueFromHistory">
                <li
                  class="auto_complete_item"
                  v-for="(item, index) in searchInfo"
                  :key="index"
                  @mouseover="selectItem(item)"
                >
                  <router-link
                    class="auto_complete_text"
                    to="/search"
                    @click="returnItem(item, index)"
                    >{{ item }}</router-link
                  >
                </li>
              </div>
            </ul>
          </div>
          <img src="@/assets/img/kktv_member.svg" alt="photo" />
        </div>
      </div>
    </div>
    <div class="nav_box"></div>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variable';

.container {
  width: 100%;
  height: auto;
  margin: 0px auto;
  background-color: #222;
  .navbar {
    width: 100%;
    color: #fff;
    background-color: #551127;
    top: 0;
    position: fixed;
    z-index: 500;
    .navbar_content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;

      .nav_right {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        & img {
          width: 30px;
          margin: 0px 20px;
        }
        .btn_search {
          width: 32px;
          height: 32px;
          padding: 5px;
          cursor: pointer;
          background: transparent;
          border: none;
          color: white;
          transition: all 0.3s ease-out;
          &:hover {
            color: rgb(240, 72, 110);
          }
        }
        .search_content {
          justify-content: center;
          align-items: center;
          position: relative;
          width: 244px;
          border-bottom: 1px solid hsla(0, 0%, 100%, 0.6);
          display: flex;

          .search_input {
            width: 100%;
            font-size: 14px;
            height: 40px;
            background: transparent;
            color: white;
            outline: none;
            border: none;
          }

          .auto_complete_list {
            position: absolute;
            background-color: #121212;
            width: calc(100% - 20px);
            top: 100%;
            list-style: none;
            padding: 0px;
            .auto_complete_header {
              line-height: 32px;
              font-size: 14px;
              padding: 0px 16px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: #999;

              .clear {
                cursor: pointer;
                background: transparent;
                color: #ccc;
                border: none;

                &:hover {
                  color: #fff;
                }
              }
            }
            .auto_complete_item {
              width: 100%;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              line-height: 48px;
              padding: 0px 16px;
              border-bottom: 1px solid rgba(75, 75, 75, 0.5);
              &:hover {
                background-color: rgba(75, 75, 75, 0.3);
                .auto_complete_text {
                  color: rgb(240, 72, 110);
                }
              }

              .auto_complete_text {
                color: #ccc;
              }
            }
          }
        }
      }
      .nav_left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        list-style: none;

        .navbar_logo {
          width: 100px;
          height: 22px;
          vertical-align: middle;
          cursor: pointer;
        }

        .navbar_link {
          margin: 0 10px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          text-decoration: none;
          height: 56px;
          line-height: 20px;
          color: #fff;
        }
      }
    }
  }
  .nav_box {
    width: 100%;
    height: $nav-height;
  }
}
</style>
