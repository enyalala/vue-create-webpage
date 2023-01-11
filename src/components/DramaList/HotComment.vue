<script setup lang="ts">
import type { Comment } from '@/models/Comment'
const props = defineProps({
  dramaInfo: {
    type: Object,
    required: true,
  },
  sortComments: {
    type: Array<Comment>,
    required: true,
  },
})

const emits = defineEmits(['likeComment'])

const likeComment = (idx: number) => {
  emits('likeComment', idx)
}
</script>

<template>
  <div v-if="props.dramaInfo.comments.length === 0" style="color: white">
    目前尚無評論。
  </div>
  <div v-else>
    <button
      v-for="eachComment in props.sortComments"
      :key="eachComment.sentence"
      class="btn_allcomments"
      @click="likeComment(eachComment.id)"
    >
      {{ eachComment.sentence
      }}<span v-if="eachComment.count !== 0" class="count">{{
        eachComment.count
      }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
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

  .count {
    color: white;
    margin-left: 5px;
  }
}
</style>
