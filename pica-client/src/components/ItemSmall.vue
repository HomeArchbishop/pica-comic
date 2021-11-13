<template>
  <router-link class="recommend-item a-theme" :to="link">
    <div class="img-div">
      <img :src="$util.formatImgUrl(item.thumb.fileServer, item.thumb.path)">
    </div>
    <span class="title">{{ item.title }}</span>
    <span class="description">{{ item.description }}</span>
  </router-link>
</template>

<script>
export default {
  name: 'ItemSmall',
  props: [
    'item',
    'link'
  ]
}
</script>
<style lang="less" scoped>
@import 'https://css.gg/css';
@import '../assets/less/color';
.recommend-item {
  &:first-child {
    margin-left: 0;
  }
  display: flex;
  flex-direction: column;
  width: 140px;
  height: 198px;
  margin-left: 6px;
  .img-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 140px;
    height: 140px;
    overflow: hidden;
    cursor: pointer;
    img {
      flex: 1;
      height: 140px;
      object-fit: cover;
      border: none;
    }
  }
  .title {
    font-weight: 800;
    font-size: 16px;
  }
  .description {
    font-size: 13px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
}
</style>
