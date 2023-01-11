<script setup lang="ts">
import HotComment from '@/components/DramaList/HotComment.vue'
import { ref, onUpdated, type PropType } from 'vue'
import type { Drama } from '@/models/Drama'
import type { Comment } from '@/models/Comment'

const props = defineProps({
  dramaInfo: {
    type: Object as PropType<Drama>,
    required: true,
  },
  sortComments: {
    type: Array<Comment>,
    required: true,
  },
})

const emits = defineEmits(['addComments', 'removeComments', 'likeComment'])
const enteredComment = ref('')
const editIsTrue = ref(false)

const addComment = () => {
  enteredComment.value.trim()
  if (enteredComment.value !== '') {
    emits('addComments', enteredComment.value)
    enteredComment.value = ''
  }
}

const completeShow = () => {
  editIsTrue.value = true
}

const editShow = () => {
  editIsTrue.value = false
}

const likeComment = (idx: number) => {
  emits('likeComment', idx)
}

const removeComment = (idx: number) => {
  emits('removeComments', idx)
}

onUpdated(() => {
  if (props.dramaInfo.comments.length === 0) {
    editIsTrue.value = false
  }
})
</script>

<template>
  <div class="modal">
    <slot name="close"> </slot>
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
    </div>
    <button
      class="btn_edit"
      @click="completeShow"
      v-show="props.dramaInfo.comments.length !== 0 && !editIsTrue"
    >
      編輯
    </button>
    <button
      class="btn_edit"
      @click="editShow"
      v-show="props.dramaInfo.comments.length !== 0 && editIsTrue"
    >
      完成
    </button>
    <div class="inner_comment_title">
      <div class="hot_title">我的短評</div>
    </div>
    <div v-if="props.dramaInfo.comments.length === 0" style="color: white">
      目前尚無評論。
    </div>
    <div v-else>
      <button
        v-for="(comment, index) in props.dramaInfo.comments"
        :key="index"
        class="btn_allcomments"
        @click="likeComment(index)"
      >
        {{ comment.sentence
        }}<span v-if="comment.count !== 0" class="count">{{
          comment.count
        }}</span>
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
    <HotComment
      :dramaInfo="props.dramaInfo"
      @likeComment="likeComment"
      :sortComments="sortComments"
    />
  </div>
  <div class="overlay"></div>
</template>

<style lang="scss" scoped>
@import '@/styles/variable';
.modal {
  position: fixed;
  left: 30%;
  width: 40%;
  height: 700px;

  background-color: black;
  padding: 0px 20px 20px;
  border-radius: 6px;
  border: 1px solid rgb(75, 75, 75);
  z-index: 900;
  overflow-y: scroll;

  .comment_area {
    position: relative;
    margin-bottom: 20px;
    z-index: 900;

    .comment_count {
      position: absolute;
      right: 10px;
      top: 10px;
      color: white;
      font-size: 14px;
    }

    .text_area {
      width: 100%;
      height: 100%;
      padding: 10px 95px 100px 10px;
      background-color: rgb(40, 40, 40);
      border-radius: 4px;
      border: none;
      color: white;
      resize: none;
      font-size: 14px;

      &:focus {
        border: 1px solid $color-kktv-pink;
      }
    }

    .btn_output {
      position: absolute;
      bottom: 15px;
      right: 10px;
      padding: 5px 12px;
      cursor: pointer;
      text-align: center;
      width: 60px;
      height: 35px;
      color: white;
      font-size: 14px;
      border-radius: 4px;
      background-color: $color-kktv-pink;
    }
  }

  .btn_delete {
    cursor: pointer;
    background: none;
    border: none;
    color: gray;

    &:hover {
      color: white;
    }
  }

  .inner_comment_title {
    display: flex;
    position: relative;
    margin: 15px 0px;
    .hot_title {
      font-size: 16px;
      color: #ffffff;
      font-weight: 500;
    }
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
    color: $color-kktv-pink;
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

    &:hover {
      color: white;
    }
  }
}

.count {
  color: white;
  margin-left: 5px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 800;
}
</style>
