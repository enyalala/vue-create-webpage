<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  comments: {
    type: [Array, String] as PropType<string[] | string>,
    default: '',
  },
})
</script>

<template>
  <div v-if="props.comments.length === 0" style="color: white">
    目前尚無評論。
  </div>
  <div v-else>
    <button
      v-for="comment in props.comments"
      :key="comment"
      class="btn_allcomments"
    >
      {{ comment }}
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
}
</style>
