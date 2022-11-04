<script setup lang="ts">
import type { GroupInfoData } from '@/models/SectionData'
import { reactive, type PropType } from 'vue'

const props = defineProps({
  dramaInfoList: {
    type: Object,
    required: true,
  },
  actorsDeleteLast: {
    type: [Array, String] as PropType<string[] | string>,
    default: '',
  },
  actorLast: {
    type: [String],
    default: '',
  },
  directorsDeleteLast: {
    type: [Array, String] as PropType<string[] | string>,
    default: '',
  },
  directorLast: {
    type: [String],
    default: '',
  },
  screenwritersDeleteLast: {
    type: [Array, String] as PropType<string[] | string>,
    default: '',
  },
  screenwriterLast: {
    type: [String],
    default: '',
  },
  typesDeleteLast: {
    type: [Array, String] as PropType<string[] | string>,
    default: '',
  },
  typeLast: {
    type: [String],
    default: '',
  },
  labelsDeleteLast: {
    type: [Array, String] as PropType<string[] | string>,
    default: '',
  },
  labelLast: {
    type: [String],
    default: '',
  },
})

const groupInfoList = reactive<GroupInfoData[]>([
  {
    group_info_title: '演員',
    data_name: 'actor',
    data_delete_last: props.actorsDeleteLast,
    data_last: props.actorLast,
  },
  {
    group_info_title: '導演',
    data_name: 'director',
    data_delete_last: props.directorsDeleteLast,
    data_last: props.directorLast,
  },
  {
    group_info_title: '編劇',
    data_name: 'screenwriter',
    data_delete_last: props.screenwritersDeleteLast,
    data_last: props.screenwriterLast,
  },
  {
    group_info_title: '類型',
    data_name: 'type',
    data_delete_last: props.typesDeleteLast,
    data_last: props.typeLast,
  },
  {
    group_info_title: '標籤',
    data_name: 'label',
    data_delete_last: props.labelsDeleteLast,
    data_last: props.labelLast,
  },
])
</script>
<template>
  <div
    class="group_info_title"
    v-for="(info, index) in groupInfoList"
    :key="index"
  >
    {{ info.group_info_title }}
    <div
      v-if="dramaInfoList[info.data_name].length > 1 === true"
      class="group_info_content"
    >
      <div
        v-for="dataDeleteLast in info.data_delete_last"
        :key="dataDeleteLast"
      >
        <a href="" class="group_info_text">{{ dataDeleteLast }}</a
        >/
      </div>
      <a href="" class="group_info_text">{{ info.data_last }}</a>
    </div>
    <div v-else>
      <div v-for="data in props.dramaInfoList[info.data_name]" :key="data">
        <a href="" class="group_info_text">{{ data }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.group_info_title {
  color: #999;
  font-size: 14px;
  font-weight: 400;
  display: flex;

  .group_info_text {
    margin: 0px 10px;
    color: white;
    font-weight: bold;
    font-size: 14px;

    &:hover {
      color: rgb(240, 72, 110);
    }
  }
}
.group_info_content {
  display: flex;
  flex-wrap: wrap;
}
</style>
