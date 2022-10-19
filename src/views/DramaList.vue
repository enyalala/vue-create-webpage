<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { Ref } from 'vue'
import { computed } from '@vue/reactivity'
import { useDramaInfo } from '../stores/DramaInfo'
import sidephoto1 from '../assets/img/drama001/sidephoto001_1.jpg'
import sidephoto2 from '../assets/img/drama001/sidephoto001_2.jpg'
import sidephoto3 from '../assets/img/drama001/sidephoto001_3.jpg'
import sidephoto4 from '../assets/img/drama001/sidephoto001_4.jpg'

// Data ///////////////////////////////////////////////////////////////
// 封面圖片列參數
const sidephoto = [sidephoto1, sidephoto2, sidephoto3, sidephoto4]
const num: Ref<number> = ref(1)
// 按鈕參數
const collectIsHover = ref(false)
const scoreIsHover = ref(false)
// 戲劇資訊參數
const { drama001 } = useDramaInfo()

// Function //////////////////////////////////////////////////////////
const collectHover = () => {
  collectIsHover.value = true
}

const collectLeave = () => {
  collectIsHover.value = false
}

const scoreHover = () => {
  scoreIsHover.value = true
}

const scoreLeave = () => {
  scoreIsHover.value = false
}
onMounted(() => {
  const getActorTitle = document.getElementById('actortitle')!
  const getDirectorTitle = document.getElementById('directortitle')!
  const getScreenwriterTitle = document.getElementById('screenwritertitle')!
  const getTypeTitle = document.getElementById('typetitle')!
  const getLabelTitle = document.getElementById('labeltitle')!

  // 演員序列
  if (drama001.actor.length > 1) {
    const actorLast = drama001.actor.pop()
    drama001.actor.forEach((actor) => {
      getActorTitle.insertAdjacentHTML(
        'beforeend',
        `<a href="" class="actor_info_content">${actor}</a>/`
      )
    })
    getActorTitle.insertAdjacentHTML(
      'beforeend',
      `<a href="" class="actor_info_content">${actorLast}</a>`
    )
  } else {
    getActorTitle.insertAdjacentHTML(
      'beforeend',
      `<a href="" class="actor_info_content">${drama001.actor}</a>`
    )
  }

  // 導演序列
  if (drama001.director.length > 1) {
    const directorLast = drama001.director.pop()
    drama001.director.forEach((director) => {
      getDirectorTitle.insertAdjacentHTML(
        'beforeend',
        `<a href="" class="actor_info_content">${director}</a>/`
      )
    })
    getDirectorTitle.insertAdjacentHTML(
      'beforeend',
      `<a href="" class="actor_info_content">${directorLast}</a>`
    )
  } else {
    getDirectorTitle.insertAdjacentHTML(
      'beforeend',
      `<a href="" class="actor_info_content">${drama001.director}</a>`
    )
  }

  // 編劇序列
  if (drama001.screenwriter.length > 1) {
    const screenwriterLast = drama001.screenwriter.pop()
    drama001.screenwriter.forEach((screenwriter) => {
      getScreenwriterTitle.insertAdjacentHTML(
        'beforeend',
        `<a href="" class="actor_info_content">${screenwriter}</a>/`
      )
    })
    getScreenwriterTitle.insertAdjacentHTML(
      'beforeend',
      `<a href="" class="actor_info_content">${screenwriterLast}</a>`
    )
  } else {
    getScreenwriterTitle.insertAdjacentHTML(
      'beforeend',
      `<a href="" class="actor_info_content">${drama001.screenwriter}</a>`
    )
  }

  // 類型序列
  if (drama001.type.length > 1) {
    const typeLast = drama001.type.pop()
    drama001.type.forEach((type) => {
      getTypeTitle.insertAdjacentHTML(
        'beforeend',
        `<a href="" class="actor_info_content">${type}</a>/`
      )
    })
    getTypeTitle.insertAdjacentHTML(
      'beforeend',
      `<a href="" class="actor_info_content">${typeLast}</a>`
    )
  } else {
    getTypeTitle.insertAdjacentHTML(
      'beforeend',
      `<a href="" class="actor_info_content">${drama001.type}</a>`
    )
  }

  // 標籤序列
  if (drama001.label.length > 1) {
    const labelLast = drama001.label.pop()
    drama001.label.forEach((label) => {
      getLabelTitle.insertAdjacentHTML(
        'beforeend',
        `<a href="" class="actor_info_content">${label}</a>/`
      )
    })
    getLabelTitle.insertAdjacentHTML(
      'beforeend',
      `<a href="" class="actor_info_content">${labelLast}</a>`
    )
  } else {
    getLabelTitle.insertAdjacentHTML(
      'beforeend',
      `<a href="" class="actor_info_content">${drama001.label}</a>`
    )
  }
})

// 圖片自動切換 //////////////////////////////////////////////////////
setInterval(() => {
  if (num.value < 4) {
    num.value++
  } else {
    num.value = 0
    num.value++
  }
  return num.value
}, 5000)
// setInterval(() => console.log(num.value), 5000)
</script>

<template>
  <main>
    <div class="container">
      <div class="cover_row">
        <div class="cover_bg"></div>
        <img
          class="cover_img"
          src="../assets/img/drama001/cover001.jpg"
          alt=""
        />
        <img class="side_img" :src="sidephoto[num - 1]" alt="photo" />
      </div>
      <div class="drama_info">
        <div class="btn_content">
          <button
            class="btn_three"
            @mouseover="collectHover"
            @mouseleave="collectLeave"
          >
            <div class="btn_three_icon">
              <font-awesome-icon
                icon="fa-regular fa-heart"
                :class="{ btn_icon_bright: collectIsHover }"
              />
            </div>
            <div class="btn_three_text">收藏</div>
          </button>
          <button class="btn_three">
            <div class="btn_three_icon">
              <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />
            </div>
            <div class="btn_three_text">分享</div>
          </button>
          <button
            class="btn_three"
            @mouseover="scoreHover"
            @mouseleave="scoreLeave"
          >
            <div
              class="btn_three_icon"
              :class="{ btn_icon_bright: scoreIsHover }"
            >
              <font-awesome-icon icon="fa-regular fa-star" />
            </div>
            <div class="btn_three_text">評分</div>
          </button>
        </div>
        <div class="actor_info">
          <div id="actortitle" class="actor_info_title">演員</div>
          <div id="directortitle" class="actor_info_title">導演</div>
          <div id="screenwritertitle" class="actor_info_title">編劇</div>
          <div id="typetitle" class="actor_info_title">類型</div>
          <div id="labeltitle" class="actor_info_title">標籤</div>
        </div>
        <div class="intro_title">劇我所知</div>
        <div class="actor_info_title" v-for="highlight in drama001.highlight">
          {{ highlight }}
        </div>
        <div class="desc_text">{{ drama001.description }}</div>
      </div>
    </div>
  </main>
</template>

<style>
.container {
  width: 100%;
  height: 100vh;
  margin: 0px auto;
  background-color: #222;
}
.cover_row {
  width: 100%;
  height: 350px;
  position: relative;
  margin: 0px auto;
}

.cover_bg {
  width: 70%;
  height: 350px;
  background: linear-gradient(90deg, black 85%, transparent 100%);
  position: absolute;
  z-index: 50;
}

.new_title_text {
  color: white;
  font-size: 30px;
  font-weight: bold;
  padding: 30px 0px 80px 75px;
}

.cover_img {
  transform: scale(0.8);
  position: absolute;
  left: 50px;
  top: 50px;
  z-index: 100;
}

.side_img {
  height: 100%;
  position: absolute;
  right: 0px;
  z-index: 20;
}

.drama_info {
  width: 90%;
  height: auto;
  margin: 0px auto;
}

.btn_content {
  margin-top: 40px;
  display: flex;
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
}

.btn_three_text {
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.btn_three_icon {
  color: white;
  margin-right: 5px;
}

.btn_icon_bright {
  color: #df396e;
}

.actor_info {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
}

.actor_info_title {
  color: #999;
  font-size: 14px;
  font-weight: 400;
}

.actor_info_content {
  margin: 0px 10px;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.intro_title {
  font-size: 16px;
  color: white;
  margin-top: 34px;
  margin-bottom: 13px;
  font-weight: 500;
}

.desc_text {
  margin-top: 13px;
  color: #999;
  font-size: 14px;
  font-weight: 400;
}
</style>
