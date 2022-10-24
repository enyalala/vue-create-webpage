<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import { useDramaInfo } from '../stores/DramaInfo'
import { useRoute } from 'vue-router'

import CommentDialog from '../views/CommentDialog.vue'

// Data ///////////////////////////////////////////////////////////////
// 封面圖片列參數

const { dramaList } = useDramaInfo()

const id = Number(useRoute().params.dramaId)
const dramaInfoList = dramaList[id]

const num: Ref<number> = ref(1)
// 按鈕參數
const collectIsHover = ref(false)
const scoreIsHover = ref(false)
// 戲劇資訊參數
const actorsDeleteLast = dramaInfoList.actor.slice(0, -1)
const actorLast = dramaInfoList.actor[dramaInfoList.actor.length - 1]

const directorsDeleteLast = dramaInfoList.director.slice(0, -1)
const directorLast = dramaInfoList.director[dramaInfoList.director.length - 1]

const screenwritersDeleteLast = dramaInfoList.screenwriter.slice(0, -1)
const screenwriterLast =
  dramaInfoList.screenwriter[dramaInfoList.screenwriter.length - 1]

const typesDeleteLast = dramaInfoList.type.slice(0, -1)
const typeLast = dramaInfoList.type[dramaInfoList.type.length - 1]

const labelsDeleteLast = dramaInfoList.label.slice(0, -1)
const labelLast = dramaInfoList.label[dramaInfoList.label.length - 1]

//  評論參數
const enteredComment = ref('')
const comments: string[] = reactive([])
const commentIsTrue = ref(false)

// Function //////////////////////////////////////////////////////////
const getCoverUrl = (name: number) => {
  return new URL(`../assets/img/dramacover/cover${name}.jpg`, import.meta.url)
    .href
}

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

const addComment = () => {
  comments.push(enteredComment.value)
  enteredComment.value = ''
}

const outputDialog = () => {
  commentIsTrue.value = true
}

// const removeComment = (idx: number) => {
//   comments.splice(idx, 1)
// }

// onMounted(() => {
//     刪除評論
//     if (comments.length > 0) {
//       const getComments = document.getElementById('comments')!
//       const addDeleteIcon = () => {
//         console.log(getComments)
//         getComments.insertAdjacentHTML(
//           'beforeend',
//           `<font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />`
//         )
//       }
//     }
//   const edit = document.getElementById('edit_button')!
//   edit.addEventListener('click', function () {
//     if (comments.length > 0) {
//       const getComments = document.getElementById('comments_id')!
//       console.log(getComments)
//       getComments.insertAdjacentHTML(
//         'beforeend',
//         `<button v-for="index in comments" @click="removeComment(index)"><svg class="svg-inline--fa fa-circle-xmark" aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="" fill="currentColor" d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"></path></svg></button>`
//       )
//     }
//   })
// })

// 圖片自動切換 //////////////////////////////////////////////////////
setInterval(() => {
  if (num.value < dramaInfoList.sidephotocount) {
    num.value++
  } else {
    num.value = 0
    num.value++
  }
  return num.value
}, 5000)

const getSideUrl = (name: number, count: number) => {
  return new URL(
    `../assets/img/sidephoto/sidephoto${name}_${count}.jpg`,
    import.meta.url
  ).href
}
// setInterval(() => console.log(num.value), 5000)
</script>

<template>
  <main>
    <div class="container">
      <CommentDialog v-if="commentIsTrue" />
      <div class="cover_row">
        <div class="cover_content">
          <span class="cover_name_text">{{ dramaInfoList.name }}</span>
          <div class="cover_year_text">
            {{ dramaInfoList.year }} |
            <font-awesome-icon icon="fa-solid fa-star" />
          </div>
        </div>
        <div class="cover_bg"></div>
        <img class="cover_img" :src="getCoverUrl(id)" alt="" />
        <img class="side_img" :src="getSideUrl(id, num)" alt="photo" />
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
        <div class="group_info">
          <div id="actortitle" class="group_info_title">
            演員
            <div
              v-if="dramaInfoList.actor.length > 1 === true"
              class="group_info_content"
            >
              <div
                v-for="actorDeleteLast in actorsDeleteLast"
                :key="actorDeleteLast"
              >
                <a href="" class="group_info_text">{{ actorDeleteLast }}</a
                >/
              </div>
              <a href="" class="group_info_text">{{ actorLast }}</a>
            </div>
            <div v-else>
              <div v-for="actor in dramaInfoList.actor" :key="actor">
                <a href="" class="group_info_text">{{ actor }}</a>
              </div>
            </div>
          </div>
          <div id="directortitle" class="group_info_title">
            導演
            <div
              v-if="dramaInfoList.director.length > 1 === true"
              class="group_info_content"
            >
              <div
                v-for="directorDeleteLast in directorsDeleteLast"
                :key="directorDeleteLast"
              >
                <a href="" class="group_info_text">{{ directorDeleteLast }}</a
                >/
              </div>
              <a href="" class="group_info_text">{{ directorLast }}</a>
            </div>
            <div v-else>
              <div v-for="director in dramaInfoList.director" :key="director">
                <a href="" class="group_info_text">{{ director }}</a>
              </div>
            </div>
          </div>
          <div id="screenwritertitle" class="group_info_title">
            編劇
            <div
              v-if="dramaInfoList.screenwriter.length > 1 === true"
              class="group_info_content"
            >
              <div
                v-for="screenwriterDeleteLast in screenwritersDeleteLast"
                :key="screenwriterDeleteLast"
              >
                <a href="" class="group_info_text">{{
                  screenwriterDeleteLast
                }}</a
                >/
              </div>
              <a href="" class="group_info_text">{{ screenwriterLast }}</a>
            </div>
            <div v-else>
              <div
                v-for="screenwriter in dramaInfoList.screenwriter"
                :key="screenwriter"
              >
                <a href="" class="group_info_text">{{ screenwriter }}</a>
              </div>
            </div>
          </div>
          <div id="typetitle" class="group_info_title">
            類型
            <div
              v-if="dramaInfoList.type.length > 1 === true"
              class="group_info_content"
            >
              <div
                v-for="typeDeleteLast in typesDeleteLast"
                :key="typeDeleteLast"
              >
                <a href="" class="group_info_text">{{ typeDeleteLast }}</a
                >/
              </div>
              <a href="" class="group_info_text">{{ typeLast }}</a>
            </div>
            <div v-else>{{ dramaInfoList.type }}</div>
          </div>
          <div id="labeltitle" class="group_info_title">
            標籤
            <div
              v-if="dramaInfoList.label.length > 1 === true"
              class="group_info_content"
            >
              <div
                v-for="labelDeleteLast in labelsDeleteLast"
                :key="labelDeleteLast"
              >
                <a href="" class="group_info_text">{{ labelDeleteLast }}</a
                >/
              </div>
              <a href="" class="group_info_text">{{ labelLast }}</a>
            </div>
            <div v-else>{{ dramaInfoList.label }}</div>
          </div>
        </div>
        <div class="intro_title">劇我所知</div>
        <div
          class="group_info_title"
          v-for="highlight in dramaInfoList.highlight"
          :key="highlight"
        >
          {{ highlight }}
        </div>
        <div class="desc_text">{{ dramaInfoList.description }}</div>
        <div class="comment_title">
          <div class="intro_title">熱門短評</div>
          <button class="comment_text" @click="outputDialog">我也要說</button>
          <button class="comment_text" @click="addComment">送出</button>
          <button id="edit_button" class="comment_text">編輯</button>
          <input type="text" v-model="enteredComment" />
          <div v-if="comments.length === 0" style="color: white">
            目前尚無評論。
          </div>
          <div v-else>
            <button
              id="comments_id"
              v-for="comment in comments"
              :key="comment"
              style="display: flex"
            >
              {{ comment }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.container {
  width: 100%;
  margin: 0px auto;
  background-color: #222;
}
.cover_row {
  width: 100%;
  height: 350px;
  position: relative;
  margin: 0px auto;
}

.sidephoto_row {
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

.cover_content {
  position: absolute;
  left: 230px;
  top: 100px;
  z-index: 100;
}

.cover_name_text {
  color: white;
  font-size: 30px;
  font-weight: bold;
}

.cover_year_text {
  color: gray;
  font-size: 12px;
  font-weight: bold;
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

.group_info {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
}

.group_info_title {
  color: #999;
  font-size: 14px;
  font-weight: 400;
  display: flex;
}

.group_info_content {
  display: flex;
}

.group_info_text {
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

.comment_text {
  color: #df396e;
  margin-right: 0px;
}

.group_info_text:hover {
  color: #df396e;
}
</style>
