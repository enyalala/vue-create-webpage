<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { patchCollect, patchScored, getDramas } from '@/apis/index'
import type { Drama } from '@/models/Drama'

const props = defineProps({
  idOfDrama: {
    type: Number,
    required: true,
  },
})

const hideStar = ref(true)
const isCollect = ref(false)
const standardText = ref('')

const dramaList: Drama[] = reactive([])

const scored = (id: number, score: number) => {
  hideStar.value = true
  patchScored(id, score).then((response) => {
    Object.assign(dramaList, response.data)
  })
}

const collect = (id: number) => {
  isCollect.value = !isCollect.value
  patchCollect(id, isCollect.value).then((response) => {
    Object.assign(dramaList, response.data)
  })
}

const changeFiveStar = () => {
  hideStar.value = false
}
/** 星星評分定義 */
const starStardard = (num: number) => {
  if (num === 1) {
    standardText.value = '極不推薦'
  } else if (num === 2) {
    standardText.value = '不推薦'
  } else if (num === 3) {
    standardText.value = '還可以'
  } else if (num === 4) {
    standardText.value = '值得一看'
  } else if (num === 5) {
    standardText.value = '極力推薦'
  }
}

onMounted(async () => {
  Object.assign(dramaList, (await getDramas()).data)
})
</script>

<template>
  <div class="btn_content">
    <template v-if="dramaList[props.idOfDrama]">
      <button class="btn_three" @click="collect(props.idOfDrama)">
        <div
          v-if="dramaList[props.idOfDrama].collect === false"
          class="btn_three_icon"
        >
          <font-awesome-icon icon="fa-regular fa-heart" />
        </div>
        <div v-else class="btn_three_icon">
          <font-awesome-icon icon="fa-solid fa-heart" />
        </div>

        <div class="btn_three_text">收藏</div>
      </button>
      <button class="btn_three">
        <div class="btn_three_icon">
          <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />
        </div>
        <div class="btn_three_text">分享</div>
      </button>
      <div v-if="hideStar && dramaList[props.idOfDrama].score === 0">
        <button class="btn_three" @click="changeFiveStar">
          <div class="btn_three_content">
            <div class="btn_three_icon">
              <font-awesome-icon icon="fa-regular fa-star" />
            </div>
            <div class="btn_three_text">評分</div>
          </div>
        </button>
      </div>
      <div v-else-if="hideStar && dramaList[props.idOfDrama].score !== 0">
        <button class="btn_three" @click="changeFiveStar">
          <div class="btn_three_content">
            <div class="btn_three_icon">
              <font-awesome-icon icon="fa-solid fa-star" />
            </div>
            <div class="btn_three_text">評分</div>
          </div>
        </button>
      </div>

      <div class="group_info_content" v-else>
        <button class="btn_three">
          <div class="btn_star_content">
            <button
              class="btn_star_icon1"
              @mouseover="starStardard(5)"
              @click="scored(props.idOfDrama, 5)"
            >
              <font-awesome-icon icon="fa-solid fa-star" />
            </button>
            <button
              class="btn_star_icon2"
              @mouseover="starStardard(4)"
              @click="scored(props.idOfDrama, 4)"
            >
              <font-awesome-icon icon="fa-solid fa-star" />
            </button>
            <button
              class="btn_star_icon3"
              @mouseover="starStardard(3)"
              @click="scored(props.idOfDrama, 3)"
            >
              <font-awesome-icon icon="fa-solid fa-star" />
            </button>
            <button
              class="btn_star_icon4"
              @mouseover="starStardard(2)"
              @click="scored(props.idOfDrama, 2)"
            >
              <font-awesome-icon icon="fa-solid fa-star" />
            </button>
            <button
              class="btn_star_icon5"
              @mouseover="starStardard(1)"
              @click="scored(props.idOfDrama, 1)"
            >
              <font-awesome-icon icon="fa-solid fa-star" />
            </button>
          </div>
        </button>
        <div class="star_standard">{{ standardText }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.btn_content {
  margin-top: 40px;
  display: flex;
  .group_info_text {
    margin: 0px 10px;
    color: white;
    font-weight: bold;
    font-size: 14px;
  }

  .star_standard {
    background: white;
    width: 90px;
    font-size: 14px;
    border-radius: 30px;
    padding: 7px 10px;
    margin-left: 5px;
    text-align: center;
  }

  .group_info_content {
    display: flex;
    flex-wrap: wrap;
  }
  .btn_three {
    background: none;
    border-radius: 5px;
    border: 0.5px solid gray;
    margin-right: 10px;
    padding: 7px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .btn_three_text {
      color: white;
      font-size: 14px;
      font-weight: bold;
    }
    &:hover {
      .btn_three_icon {
        color: rgb(240, 72, 110);
      }
    }
    .btn_three_icon {
      color: white;
      margin-right: 5px;
    }

    .btn_three_content {
      justify-content: center;
      align-items: center;
      display: flex;
    }

    .btn_star_content {
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: row-reverse;

      %btn_star_style {
        background: none;
        border: none;
        color: gray;
        padding: 0;
      }

      @for $i from 1 through 5 {
        .btn_star_icon#{$i} {
          @extend %btn_star_style;
          &:hover {
            color: white;
          }
          @if $i < 5 {
            &:hover + .btn_star_icon#{$i + 1} {
              color: white;
            }
          }
          @if $i < 4 {
            &:hover + .btn_star_icon#{$i + 1} + .btn_star_icon#{$i + 2} {
              color: white;
            }
          }
          @if $i < 3 {
            &:hover
              + .btn_star_icon#{$i
              + 1}
              + .btn_star_icon#{$i
              + 2}
              + .btn_star_icon#{$i
              + 3} {
              color: white;
            }
          }
          @if $i < 2 {
            &:hover
              + .btn_star_icon#{$i
              + 1}
              + .btn_star_icon#{$i
              + 2}
              + .btn_star_icon#{$i
              + 3}
              + .btn_star_icon#{$i
              + 4} {
              color: white;
            }
          }
        }
      }
    }
  }
}
</style>
