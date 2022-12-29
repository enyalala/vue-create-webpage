<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['afterCollect', 'afterScored'])

const props = defineProps({
  dramaInfo: {
    type: Object,
    required: true,
  },
})

const hideStar = ref(true)
const isCollectClick = ref(false)
const standardText = ref('')

const isCollect = ref(props.dramaInfo.collect)

const scored = (score: number) => {
  hideStar.value = true
  emits('afterScored', score)
}

const collect = () => {
  isCollect.value = !isCollect.value
  isCollectClick.value = true
  emits('afterCollect', isCollect.value)
}

const changeFiveStar = () => {
  hideStar.value = false
}

/** 星星評分定義 */
const starStandard = (num: number) => {
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
</script>

<template>
  <div class="btn_content">
    <template v-if="props.dramaInfo">
      <div class="collect_alert" v-if="isCollectClick && isCollect">
        <font-awesome-icon icon="fa-solid fa-circle-check" />
        <span> 收藏成功</span>
      </div>
      <div class="collect_alert" v-else-if="isCollectClick && !isCollect">
        <font-awesome-icon icon="fa-solid fa-circle-check" />
        <span> 取消收藏</span>
      </div>
      <button class="btn_three" @click="collect()">
        <div v-if="!props.dramaInfo.collect" class="btn_three_icon">
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
      <div v-if="hideStar && props.dramaInfo.score === 0">
        <button class="btn_three" @click="changeFiveStar">
          <div class="btn_three_content">
            <div class="btn_three_icon">
              <font-awesome-icon icon="fa-regular fa-star" />
            </div>
            <div class="btn_three_text">評分</div>
          </div>
        </button>
      </div>
      <div v-else-if="hideStar && props.dramaInfo.score !== 0">
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
              @mouseover="starStandard(5)"
              @click="scored(5)"
            >
              <font-awesome-icon icon="fa-solid fa-star" />
            </button>
            <button
              class="btn_star_icon2"
              @mouseover="starStandard(4)"
              @click="scored(4)"
            >
              <font-awesome-icon icon="fa-solid fa-star" />
            </button>
            <button
              class="btn_star_icon3"
              @mouseover="starStandard(3)"
              @click="scored(3)"
            >
              <font-awesome-icon icon="fa-solid fa-star" />
            </button>
            <button
              class="btn_star_icon4"
              @mouseover="starStandard(2)"
              @click="scored(2)"
            >
              <font-awesome-icon icon="fa-solid fa-star" />
            </button>
            <button
              class="btn_star_icon5"
              @mouseover="starStandard(1)"
              @click="scored(1)"
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
@import '@/styles/variable';
.btn_content {
  margin-top: 40px;
  display: flex;
  position: relative;

  .collect_alert {
    position: absolute;
    top: -30px;
    color: $color-kktv-pink;
    font-size: 14px;

    animation-name: collectAlert;
    animation-duration: 3s;
    animation-fill-mode: forwards;

    @keyframes collectAlert {
      0% {
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      85% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
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
        color: $color-kktv-pink;
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
