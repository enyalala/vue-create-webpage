<script setup lang="ts">
import CommentDialog from '@/views/CommentDialog.vue'
import DramaCover from '@/components/DramaCover.vue'
import ThreeButton from '@/components/ThreeButton.vue'
import DramaGroupInfo from '@/components/DramaGroupInfo.vue'
import HotComment from '@/components/HotComment.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getOneDramas } from '@/apis/index'
import type { Drama } from '@/models/Drama'

// Data ///////////////////////////////////////////////////////////////
const dramaInfo: { data: Drama | null } = reactive({ data: null })
const idOfDrama = Number(useRoute().params.dramaId)

// Function //////////////////////////////////////////////////////////

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

onMounted(async () => {
  dramaInfo.data = (await getOneDramas(idOfDrama)).data ?? null

  console.log(dramaInfo)
})
</script>

<template>
  <main>
    <div class="container">
      <CommentDialog
        v-if="commentIsTrue"
        @addComments="addCommentsCallback"
        @removeComments="removeCommentsCallback"
        :dramaInfo="dramaInfo.data"
      >
        <template #close>
          <div class="close_zone">
            <div class="close" @click="hideModal">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </div></div></template
      ></CommentDialog>
      <template v-if="dramaInfo.data">
        <DramaCover :dramaInfo="dramaInfo.data" :idOfDrama="idOfDrama" />
        <div class="drama_info">
          <ThreeButton :idOfDrama="idOfDrama" />
          <div class="group_info">
            <DramaGroupInfo :dramaInfo="dramaInfo.data" />
          </div>
          <div class="intro_title">劇我所知</div>
          <div
            class="group_info_title"
            v-for="item in dramaInfo.data.highlight"
            :key="item"
          >
            {{ item }}
          </div>
          <div class="desc_text">{{ dramaInfo.data.description }}</div>
          <div class="comment_title">
            <div class="hot_title">熱門短評</div>
            <button class="subtitle_text" @click="outputDialog">更多 ＞</button>
            <button class="comment_text" @click="outputDialog">我也要說</button>
          </div>
          <div class="comment_content"><HotComment :comments="comments" /></div>
        </div>
      </template>
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
