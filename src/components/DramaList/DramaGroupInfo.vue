<script setup lang="ts">
import type { GroupInfoData } from '@/models/GroupInfoData'
import { reactive, type PropType } from 'vue'
import type { Drama } from '@/models/Drama'

const props = defineProps({
  dramaInfo: {
    type: Object as PropType<Drama>,
    required: true,
  },
})

const groupInfoList = reactive<GroupInfoData[]>([
  {
    groupInfoTitle: '演員',
    dataName: 'actor',
  },
  {
    groupInfoTitle: '導演',
    dataName: 'director',
  },
  {
    groupInfoTitle: '編劇',
    dataName: 'screenwriter',
  },
  {
    groupInfoTitle: '類型',
    dataName: 'type',
  },
  {
    groupInfoTitle: '標籤',
    dataName: 'label',
  },
])
</script>
<template>
  <div
    class="group_info_title"
    v-for="(info, index) in groupInfoList"
    :key="index"
  >
    <template v-if="props.dramaInfo[info.dataName]">
      {{ info.groupInfoTitle }}
      <div class="group_info_content">
        <div
          v-for="(data, dramaIndex) in props.dramaInfo[info.dataName]"
          :key="dramaIndex"
        >
          <a href="" class="group_info_text">{{ data }}</a
          ><template
            v-if="dramaIndex < props.dramaInfo[info.dataName].length - 1"
            >/</template
          >
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variable';
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
    transition: all 0.1s ease-out;

    &:hover {
      color: $color-kktv-pink;
    }
  }
}
.group_info_content {
  display: flex;
  flex-wrap: wrap;
}
</style>
