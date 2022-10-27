<script setup lang="ts">
import { ref, reactive, onUpdated } from 'vue'
import type { Ref } from 'vue'
import { useDramaInfo } from '../stores/DramaInfo'
import { useRoute } from 'vue-router'

import CommentDialog from '../views/CommentDialog.vue'

// Data ///////////////////////////////////////////////////////////////
const { dramaList } = useDramaInfo()
const id = Number(useRoute().params.dramaId)
const dramaInfoList = dramaList[id]

// 封面圖片列參數
const num: Ref<number> = ref(1)

// 按鈕參數
const collectIsHover = ref(false)
const scoreIsHover = ref(false)
const hideStar = ref(true)
const standardText = ref('')
const yourScore = ref(0)

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
const subtitleShow = ref(false)
const editIsTrue = ref(false)

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
  enteredComment.value.trim()
  if (enteredComment.value !== '') {
    comments.push(enteredComment.value)
    enteredComment.value = ''
  }
}

const outputDialog = () => {
  commentIsTrue.value = true
}

const hideModal = () => {
  commentIsTrue.value = false
}

const titleOver = () => {
  subtitleShow.value = true
}
const titleLeave = () => {
  subtitleShow.value = false
}

const completeShow = () => {
  editIsTrue.value = true
}

const editShow = () => {
  editIsTrue.value = false
}

const removeComment = (idx: number) => {
  comments.splice(idx, 1)
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

const scored = (score: number) => {
  yourScore.value = score
  hideStar.value = true
}

const collectDrama = () => {
  dramaInfoList.collect = !dramaInfoList.collect
}

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

onUpdated(() => {
  if (comments.length === 0) {
    editIsTrue.value = false
  }
})
</script>

<template>
  <main>
    <div class="container">
      <CommentDialog v-if="commentIsTrue">
        <template #closeZone>
          <div class="close_zone">
            <div class="close" @click="hideModal">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </div>
          </div>
        </template>
        <template #commentArea>
          <div class="comment_area">
            <textarea
              class="text_area"
              v-model="enteredComment"
              placeholder="來為喜歡的劇說些什麼吧..."
              maxlength="20"
              rows="2"
            ></textarea>
            <div class="comment_count">{{ enteredComment.length }}/20</div>
            <div>
              <button class="btn_output" @click="addComment">送出</button>
            </div>
          </div></template
        >
        <template #comments>
          <button
            class="btn_edit"
            @click="completeShow"
            v-show="comments.length !== 0 && !editIsTrue"
          >
            編輯
          </button>
          <button
            class="btn_edit"
            @click="editShow"
            v-show="comments.length !== 0 && editIsTrue"
          >
            完成
          </button>
          <div class="inner_comment_title">
            <div class="hot_title">我的短評</div>
          </div>
          <div v-if="comments.length === 0" style="color: white">
            目前尚無評論。
          </div>
          <div v-else>
            <button
              v-for="(comment, index) in comments"
              :key="comment"
              class="btn_allcomments"
            >
              {{ comment }}
              <button
                v-if="editIsTrue"
                @click="removeComment(index)"
                class="btn_delete"
              >
                <font-awesome-icon icon="fa-solid fa-circle-xmark" />
              </button>
            </button>
          </div>
          <div class="inner_comment_title">
            <div class="hot_title">熱門短評</div>
          </div>
          <div v-if="comments.length === 0" style="color: white">
            目前尚無評論。
          </div>
          <div v-else>
            <button
              v-for="hotcomment in comments"
              :key="hotcomment"
              class="btn_allcomments"
            >
              {{ hotcomment }}
            </button>
          </div></template
        >
      </CommentDialog>
      <div class="cover_row">
        <div class="cover_content">
          <span class="cover_name_text">{{ dramaInfoList.name }}</span>
          <div class="cover_year_text">
            {{ dramaInfoList.year }} |
            <font-awesome-icon icon="fa-solid fa-star" /> {{ yourScore }}
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
            @click="collectDrama"
          >
            <div v-if="dramaInfoList.collect === false" class="btn_three_icon">
              <font-awesome-icon
                icon="fa-regular fa-heart"
                :class="{ btn_icon_bright: collectIsHover }"
              />
            </div>
            <div v-else class="btn_three_icon">
              <font-awesome-icon
                icon="fa-solid fa-heart"
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
          <div v-if="hideStar && yourScore === 0">
            <button
              class="btn_three"
              @mouseover="scoreHover"
              @mouseleave="scoreLeave"
              @click="changeFiveStar"
            >
              <div class="btn_three_content">
                <div
                  class="btn_three_icon"
                  :class="{ btn_icon_bright: scoreIsHover }"
                >
                  <font-awesome-icon icon="fa-regular fa-star" />
                </div>
                <div class="btn_three_text">評分</div>
              </div>
            </button>
          </div>
          <div v-else-if="hideStar && yourScore !== 0">
            <button
              class="btn_three"
              @mouseover="scoreHover"
              @mouseleave="scoreLeave"
              @click="changeFiveStar"
            >
              <div class="btn_three_content">
                <div
                  class="btn_three_icon"
                  :class="{ btn_icon_bright: scoreIsHover }"
                >
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
        <div
          class="comment_title"
          @mouseover="titleOver"
          @mouseleave="titleLeave"
        >
          <div class="hot_title">熱門短評</div>
          <button
            class="subtitle_text"
            v-show="subtitleShow"
            @click="outputDialog"
          >
            更多 ＞
          </button>
          <button class="comment_text" @click="outputDialog">我也要說</button>
        </div>
        <div @mouseover="titleOver" @mouseleave="titleLeave">
          <div v-if="comments.length === 0" style="color: white">
            目前尚無評論。
          </div>
          <div v-else>
            <button
              v-for="comment in comments"
              :key="comment"
              class="btn_allcomments"
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
  height: auto;
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

.btn_three_content {
  justify-content: center;
  align-items: center;
  display: flex;
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

.btn_star_content {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
}

.btn_star_icon1 {
  background: none;
  border: none;
  color: gray;
  padding: 0;
}

.btn_star_icon2 {
  background: none;
  border: none;
  color: gray;
  padding: 0;
}

.btn_star_icon3 {
  background: none;
  border: none;
  color: gray;
  padding: 0;
}

.btn_star_icon4 {
  background: none;
  border: none;
  color: gray;
  padding: 0;
}

.btn_star_icon5 {
  background: none;
  border: none;
  color: gray;
  padding: 0;
}

.btn_star_icon5:hover {
  color: white;
}
.btn_star_icon4:hover {
  color: white;
}
.btn_star_icon4:hover + .btn_star_icon5 {
  color: white;
}

.btn_star_icon3:hover {
  color: white;
}

.btn_star_icon3:hover + .btn_star_icon4 {
  color: white;
}

.btn_star_icon3:hover + .btn_star_icon4 + .btn_star_icon5 {
  color: white;
}

.btn_star_icon2:hover {
  color: white;
}

.btn_star_icon2:hover + .btn_star_icon3 {
  color: white;
}

.btn_star_icon2:hover + .btn_star_icon3 + .btn_star_icon4 {
  color: white;
}

.btn_star_icon2:hover + .btn_star_icon3 + .btn_star_icon4 + .btn_star_icon5 {
  color: white;
}

.btn_star_icon1:hover {
  color: white;
}

.btn_star_icon1:hover + .btn_star_icon2 {
  color: white;
}

.btn_star_icon1:hover + .btn_star_icon2 + .btn_star_icon3 {
  color: white;
}
.btn_star_icon1:hover + .btn_star_icon2 + .btn_star_icon3 + .btn_star_icon4 {
  color: white;
}

.btn_star_icon1:hover
  + .btn_star_icon2
  + .btn_star_icon3
  + .btn_star_icon4
  + .btn_star_icon5 {
  color: white;
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

.btn_icon_bright {
  color: rgb(240, 72, 110);
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
  flex-wrap: wrap;
}

.group_info_text {
  margin: 0px 10px;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.intro_title {
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
  margin-top: 34px;
  margin-bottom: 13px;
}

.hot_title {
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
}

.desc_text {
  margin-top: 13px;
  color: #999;
  font-size: 14px;
  font-weight: 400;
}

.comment_title {
  display: flex;
  position: relative;
  margin-top: 34px;
  margin-bottom: 13px;
}

.inner_comment_title {
  display: flex;
  position: relative;
  margin: 15px 0px;
}

.comment_text {
  position: absolute;
  color: rgb(240, 72, 110);
  border: none;
  background: none;
  font-size: 16px;
  right: 0px;
  font-weight: 500;
  cursor: pointer;
}

.allcomments {
  margin: 20px 0px;
  color: white;
  font-size: 14px;
}

.btn_allcomments {
  border-radius: 34px;
  border: 1px solid gray;
  display: inline-block;
  margin: 0px 10px 10px 0px;
  padding: 7px 10px;
  font-size: 14px;
  cursor: pointer;
  color: rgb(153, 153, 153);
  background-color: transparent;
  letter-spacing: 1px;
  line-height: 1.5;
}

.btn_allcomments:hover {
  color: white;
}

.btn_edit {
  cursor: pointer;
  color: white;
  font-size: 14px;
  position: absolute;
  right: 15px;
  background: transparent;
  border: none;
  z-index: 900;
}

.btn_edit:hover {
  color: rgb(240, 72, 110);
}

.subtitle_text {
  color: white;
  font-size: 15px;
  font-weight: bold;
  margin: 0px 20px;
  background: transparent;
  border: none;
}

.subtitle_text:hover {
  color: rgb(240, 72, 110);
}

.group_info_text:hover {
  color: rgb(240, 72, 110);
}
</style>
