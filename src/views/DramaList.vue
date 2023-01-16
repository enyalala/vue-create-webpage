<script setup lang="ts">
import CommentDialog from '@/components/DramaList/CommentDialog.vue'
import DramaCover from '@/components/DramaList/DramaCover.vue'
import ThreeButton from '@/components/DramaList/ThreeButton.vue'
import DramaGroupInfo from '@/components/DramaList/DramaGroupInfo.vue'
import HotComment from '@/components/DramaList/HotComment.vue'

import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Drama } from '@/models/Drama'
import type { Comment } from '@/models/Comment'
import { fireStoreInstance } from '@/firebase'
import { onSnapshot, QuerySnapshot, updateDoc } from 'firebase/firestore'

const commentIsTrue = ref(false)
const currentVisitor = ref(0)
let isAddedVisitor = false

const dramaInfo: { data: Drama | null } = reactive({ data: null })
// const dramaInfo: Drama[] = reactive([])

const idOfDrama = Number(useRoute().params.dramaId)

const comments: Comment[] = reactive([])

/** 加入評論 */
const addComments = async (res: string) => {
  comments.push({ id: comments.length, sentence: res, count: 0 })
  fireStoreInstance.patchComment({
    path: 'dramaInfo',
    pathSegments: [`drama${idOfDrama}`],
    data: comments,
  })
}

/** 移除評論 */
const removeComments = async (res: number) => {
  comments.splice(res, 1)
  fireStoreInstance.patchComment({
    path: 'dramaInfo',
    pathSegments: [`drama${idOfDrama}`],
    data: comments,
  })
}

/** 喜歡這則評論 */
const likeComment = async (res: number) => {
  if (comments[res].count === 0) {
    comments[res].count++
  } else {
    comments[res].count--
  }
  fireStoreInstance.patchComment({
    path: 'dramaInfo',
    pathSegments: [`drama${idOfDrama}`],
    data: comments,
  })
}

/** 依熱門度排序評論 */
const sortComments = computed(() => {
  return (
    dramaInfo.data?.comments.slice(0).sort((a, b) => b.count - a.count) ?? []
  )
})

const outputDialog = () => {
  commentIsTrue.value = true
}
const hideModal = () => {
  commentIsTrue.value = false
}

/** 切換戲劇收藏 */
const afterCollect = async (res: boolean) => {
  fireStoreInstance.patchCollect({
    path: 'dramaInfo',
    pathSegments: [`drama${idOfDrama}`],
    data: res,
  })
}

/** 切換評分分數 */
const afterScored = async (score: number) => {
  fireStoreInstance.patchScored({
    path: 'dramaInfo',
    pathSegments: [`drama${idOfDrama}`],
    data: score,
  })
}

onMounted(async () => {
  // dramaInfo.data = (await getSingleData(idOfDrama)).data ?? null
  // Object.assign(comments, dramaInfo.data?.comments)
  // const addVisitorResponse = await patchVisitor(
  //   idOfDrama,
  //   dramaInfo.data.visitor
  // )
  // dramaInfo.data = addVisitorResponse.data ?? null

  // const currentVisitor = ref(0)
  onSnapshot(
    fireStoreInstance.getSingleData({
      path: 'dramaInfo',
      pathSegments: [`drama${idOfDrama}`],
    }),
    (querySnapshot) => {
      dramaInfo.data = (querySnapshot.data() as Drama) ?? null
      Object.assign(comments, dramaInfo.data?.comments)
      currentVisitor.value = dramaInfo.data?.visitor

      if (!isAddedVisitor) {
        isAddedVisitor = true
        addVisitor()
      }
    }
  )

  const addVisitor = () => {
    if (typeof currentVisitor.value === 'number') {
      currentVisitor.value = currentVisitor.value + 1
      console.log(currentVisitor.value)
      fireStoreInstance.patchVisitor({
        path: 'dramaInfo',
        pathSegments: [`drama${idOfDrama}`],
        data: currentVisitor.value,
      })
    } else {
      console.log('not working')
    }
  }
})
</script>

<template>
  <main>
    <div class="container">
      <template v-if="dramaInfo.data">
        <CommentDialog
          v-if="commentIsTrue"
          @addComments="addComments"
          @removeComments="removeComments"
          @likeComment="likeComment"
          :dramaInfo="dramaInfo.data"
          :sortComments="sortComments"
        >
          <template #close>
            <div class="close_zone">
              <div class="close" @click="hideModal">
                <font-awesome-icon icon="fa-solid fa-xmark" />
              </div></div></template
        ></CommentDialog>
        <DramaCover :dramaInfo="dramaInfo.data" :idOfDrama="idOfDrama" />
        <div class="drama_info">
          <ThreeButton
            :dramaInfo="dramaInfo.data"
            @afterCollect="afterCollect"
            @afterScored="afterScored"
          />
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
          <div class="comment_content">
            <HotComment
              :dramaInfo="dramaInfo.data"
              :sortComments="sortComments"
              @likeComment="likeComment"
            />
          </div>
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
    color: $color-kktv-pink;
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
        color: $color-kktv-pink;
      }
    }
  }
}

.comment_content {
  &:hover {
    .subtitle_text {
      display: inline-block;
      &:hover {
        color: $color-kktv-pink;
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
