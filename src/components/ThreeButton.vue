<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  collectDrama: {
    type: Function,
    required: true,
  },
  dramaInfoList: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['yourScore'])
const yourScore = ref(0)
const hideStar = ref(true)
const standardText = ref('')

const scored = (score: number) => {
  yourScore.value = score
  hideStar.value = true
  emits('yourScore', yourScore)
}
const changeFiveStar = () => {
  hideStar.value = false
}

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
</script>

<template>
  <div class="btn_content">
    <button class="btn_three" @click="props.collectDrama">
      <div v-if="props.dramaInfoList.collect === false" class="btn_three_icon">
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
    <div v-if="hideStar && props.dramaInfoList.score === 0">
      <button class="btn_three" @click="changeFiveStar">
        <div class="btn_three_content">
          <div class="btn_three_icon">
            <font-awesome-icon icon="fa-regular fa-star" />
          </div>
          <div class="btn_three_text">評分</div>
        </div>
      </button>
    </div>
    <div v-else-if="hideStar && props.dramaInfoList.score !== 0">
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
            @click="scored(5)"
          >
            <font-awesome-icon icon="fa-solid fa-star" />
          </button>
          <button
            class="btn_star_icon2"
            @mouseover="starStardard(4)"
            @click="scored(4)"
          >
            <font-awesome-icon icon="fa-solid fa-star" />
          </button>
          <button
            class="btn_star_icon3"
            @mouseover="starStardard(3)"
            @click="scored(3)"
          >
            <font-awesome-icon icon="fa-solid fa-star" />
          </button>
          <button
            class="btn_star_icon4"
            @mouseover="starStardard(2)"
            @click="scored(2)"
          >
            <font-awesome-icon icon="fa-solid fa-star" />
          </button>
          <button
            class="btn_star_icon5"
            @mouseover="starStardard(1)"
            @click="scored(1)"
          >
            <font-awesome-icon icon="fa-solid fa-star" />
          </button>
        </div>
      </button>
      <div class="star_standard">{{ standardText }}</div>
    </div>
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
      .btn_star_icon1 {
        @extend %btn_star_style;

        &:hover {
          color: white;
        }

        &:hover + .btn_star_icon2 {
          color: white;
        }

        &:hover + .btn_star_icon2 + .btn_star_icon3 {
          color: white;
        }

        &:hover + .btn_star_icon2 + .btn_star_icon3 + .btn_star_icon4 {
          color: white;
        }
        &:hover
          + .btn_star_icon2
          + .btn_star_icon3
          + .btn_star_icon4
          + .btn_star_icon5 {
          color: white;
        }
      }
      .btn_star_icon2 {
        @extend %btn_star_style;
        &:hover {
          color: white;
        }

        &:hover + .btn_star_icon3 {
          color: white;
        }

        &:hover + .btn_star_icon3 + .btn_star_icon4 {
          color: white;
        }
        &:hover + .btn_star_icon3 + .btn_star_icon4 + .btn_star_icon5 {
          color: white;
        }
      }
      .btn_star_icon3 {
        @extend %btn_star_style;
        &:hover {
          color: white;
        }

        &:hover {
          color: white;
        }

        &:hover + .btn_star_icon4 {
          color: white;
        }
        &:hover + .btn_star_icon4 + .btn_star_icon5 {
          color: white;
        }
      }
      .btn_star_icon4 {
        @extend %btn_star_style;
        &:hover {
          color: white;
        }

        &:hover + .btn_star_icon5 {
          color: white;
        }
      }
      .btn_star_icon5 {
        @extend %btn_star_style;
        &:hover {
          color: white;
        }
      }
    }
  }
}
</style>
