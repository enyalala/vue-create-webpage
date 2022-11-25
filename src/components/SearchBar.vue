<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, reactive, watch } from 'vue'
import { useSearchItem } from '@/stores/SearchItem'

const { searchItemInfo } = useSearchItem()

const emits = defineEmits(['returnDramas'])

const props = defineProps({
  dramaList: {
    type: Object,
    required: true,
  },
})

const inputSearch = ref('')
const searchShow = ref(false)
/** 關鍵字搜尋的文字，是否從歷史記錄選取的 */
const isSearchValueFromHistory = ref(false)
const selectItemIndex = ref(-1)

const historySearch: Set<string> = reactive(new Set())
/** 關鍵字搜尋相關結果 */
const filterInfos: Set<string> = reactive(new Set())

/** 關鍵字搜尋行為 */
const returnItem = (name: string, idx: number) => {
  searchItemInfo.selectItemName = name
  selectItemIndex.value = idx
  historySearch.add(name)
  inputSearch.value = ''
  emits('returnDramas')
}

/** 關鍵字選取行為，並判斷是否從歷史記錄選取 */
const selectItem = (name: string, fromHistory = false) => {
  inputSearch.value = name
  isSearchValueFromHistory.value = fromHistory
}

/** 清除歷史搜尋記錄 */
const clearRecord = () => {
  historySearch.clear()
}

/** 搜尋列展開與閉合 */
const switchSearch = () => {
  searchShow.value = !searchShow.value
}

/** 監控搜尋框文字輸入 - inputSearch */
watch(inputSearch, () => {
  props.dramaList.filter((drama: any) => {
    if (inputSearch.value !== '') {
      const matchName = drama.name.match(inputSearch.value)
      const matchActor = drama.actor.filter((actor: string) =>
        actor.includes(inputSearch.value)
      )

      if (matchName) {
        filterInfos.add(matchName.input)
      }
      if (matchActor.length > 0) {
        matchActor.forEach((value: string) => filterInfos.add(value))
      }
    } else {
      /** 當搜尋行為結束，清空搜尋相關結果 */
      filterInfos.clear()
    }
  })
  // console.log(filterInfos, searchInfo)
})
</script>

<template>
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
            (!inputSearch || isSearchValueFromHistory) && historySearch.size
          "
        >
          <li class="auto_complete_header">
            <span>搜尋記錄</span
            ><button class="clear" @click="clearRecord">清除記錄</button>
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
            v-for="(item, index) in filterInfos"
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
</template>

<style lang="scss" scoped>
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
</style>
