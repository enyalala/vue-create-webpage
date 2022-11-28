<script setup lang="ts">
const props = defineProps({
  sectionTitle: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <router-link class="section_title_container" :to="props.to"
    ><span class="home_title_text">{{ props.sectionTitle }}</span
    ><span class="home_subtitle_text">更多 ＞</span></router-link
  >
</template>

<style lang="scss" scoped>
@import '@/styles/variable';
.section_title_container {
  font-size: 30px;

  &:hover {
    .home_subtitle_text {
      display: inline-block;
    }
  }

  .home_title_text {
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin: 5px 0px 10px 75px;
    display: inline-block;
  }

  .home_subtitle_text {
    color: white;
    font-size: 15px;
    font-weight: bold;
    margin: 0px 20px;
    display: none;

    &:hover {
      color: $color-kktv-pink;
    }
  }
}
</style>
