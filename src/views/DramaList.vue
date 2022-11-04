<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useDramaInfo } from '@/stores/DramaInfo'
import { useRoute } from 'vue-router'

import CommentDialog from '@/views/CommentDialog.vue'
import DramaCover from '@/components/DramaCover.vue'
import ThreeButton from '@/components/ThreeButton.vue'
import DramaGroupInfo from '@/components/DramaGroupInfo.vue'
import HotComment from '@/components/HotComment.vue'

// Data ///////////////////////////////////////////////////////////////
const { dramaList } = useDramaInfo()
const idOfDrama = Number(useRoute().params.dramaId)
const dramaInfoList = dramaList[idOfDrama]

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

// Function //////////////////////////////////////////////////////////
const yourScore = ref(0)
const yourSoreCallback = (res: number) => {
  yourScore.value = res
}

const comments: string[] = reactive([])
const addCommentsCallback = (res: string) => {
  comments.push(res)
}
const removeCommentsCallback = (res: number) => {
  comments.splice(res, 1)
}

const commentIsTrue = ref(false)
const outputDialog = () => {
  commentIsTrue.value = true
}
const hideModal = () => {
  commentIsTrue.value = false
}
const collectDrama = () => {
  dramaInfoList.collect = !dramaInfoList.collect
}
</script>

<template>
  <main>
    <div class="container">
      <CommentDialog
        v-if="commentIsTrue"
        @addComments="addCommentsCallback"
        @removeComments="removeCommentsCallback"
      >
        <template #close>
          <div class="close_zone">
            <div class="close" @click="hideModal">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </div></div></template
      ></CommentDialog>
      <DramaCover
        :dramaInfoList="dramaInfoList"
        :idOfDrama="idOfDrama"
        :yourScore="yourScore"
      />
      <div class="drama_info">
        <ThreeButton
          @yourScore="yourSoreCallback"
          :collectDrama="collectDrama"
          :dramaInfoList="dramaInfoList"
        />
        <div class="group_info">
          <DramaGroupInfo
            :dramaInfoList="dramaInfoList"
            :actorsDeleteLast="actorsDeleteLast"
            :actorLast="actorLast"
            :directorsDeleteLast="directorsDeleteLast"
            :directorLast="directorLast"
            :screenwritersDeleteLast="screenwritersDeleteLast"
            :screenwriterLast="screenwriterLast"
            :typesDeleteLast="typesDeleteLast"
            :typeLast="typeLast"
            :labelsDeleteLast="labelsDeleteLast"
            :labelLast="labelLast"
          />
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
          <div class="hot_title">熱門短評</div>
          <button class="subtitle_text" @click="outputDialog">更多 ＞</button>
          <button class="comment_text" @click="outputDialog">我也要說</button>
        </div>
        <div class="comment_content"><HotComment :comments="comments" /></div>
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
}

.comment_title {
  display: flex;
  position: relative;
  margin-top: 34px;
  margin-bottom: 13px;
  .hot_title {
    font-size: 16px;
    color: #ffffff;
    font-weight: 500;
  }
  .subtitle_text {
    color: white;
    font-size: 15px;
    font-weight: bold;
    margin: 0px 20px;
    background: transparent;
    border: none;
    display: none;
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
  &:hover {
    .subtitle_text {
      display: inline-block;
      &:hover {
        color: rgb(240, 72, 110);
      }
    }
  }
}

.comment_content {
  &:hover {
    .subtitle_text {
      display: inline-block;
      &:hover {
        color: rgb(240, 72, 110);
      }
    }
  }
}
.close_zone {
  position: sticky;
  background-color: black;
  top: 0px;
  width: 100%;
  height: 60px;
  z-index: 950;
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;
    color: white;
    cursor: pointer;
    z-index: 1000;
  }
}

.drama_info {
  width: 90%;
  height: auto;
  margin: 0px auto;
}

.group_info {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
}

.intro_title {
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
  margin-top: 34px;
  margin-bottom: 13px;
}

.desc_text {
  margin-top: 13px;
  color: #999;
  font-size: 14px;
  font-weight: 400;
}

.group_info_title {
  color: #999;
  font-size: 14px;
  font-weight: 400;
  display: flex;
}
</style>
