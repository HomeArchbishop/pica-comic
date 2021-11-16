<template>
  <router-link class="recommend-item a-theme" :to="link">
    <div class="img-div">
      <img :src="$util.formatImgUrl(item.thumb.fileServer, item.thumb.path)">
    </div>
    <span class="title">
      {{ item.title && item.title.slice(0, 13) }}
      {{ item.title && item.title.length > 13 ? '...' : '' }}
    </span>
    <span class="description">
      {{ item.description }}
    </span>
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
@import '../assets/less/var';
.recommend-item {
  &:last-child {
    margin-right: 0;
  }
  display: flex;
  flex-direction: column;
  width: 140px;
  height: 198px;
  margin-right: 10px;
  margin-top: 10px;
  box-shadow: 0 0 8px 2px @color-anti-theme-sub;
  border-radius: @card-radius-default;
  overflow: hidden;
  &:hover {
    .img-div img {
      height: 150px
    }
  }
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
      transition: 500ms;
    }
  }
  .title {
    font-weight: 800;
    font-size: 16px;
    padding: 0 6px;
    margin-top: 4px;
  }
  .description {
    font-size: 13px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    padding: 0 6px;
    margin-top: 4px;
  }
}
</style>
