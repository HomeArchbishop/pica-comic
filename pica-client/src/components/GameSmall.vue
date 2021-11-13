<template>
  <router-link class="game-item a-theme" :to="link">
    <div class="img-div">
      <img :src="$util.formatImgUrl(item.icon.fileServer, item.icon.path)">
    </div>
    <div class="info-div">
      <b class="suggested" v-if="item.suggest">[荐]</b>
      <b class="r18-icon">
        {{ item.adult ? '[18+]' : '[无H]' }}
      </b>
      <span class="title">
        {{ item.title }}
      </span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'GameSmall',
  props: [
    'item',
    'link'
  ]
}
</script>
<style lang="less" scoped>
@import 'https://css.gg/css';
@import '../assets/less/color';
.game-item {
  &:first-child {
    margin-left: 0;
  }
  display: flex;
  flex-direction: column;
  width: 140px;
  min-height: 210px;
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
      height: 140px;
      flex: 1;
      object-fit: cover;
      border: none;
    }
  }
  .info-div {
    margin-top: 4px;
    .title {
      display: inline;
      font-weight: 800;
      font-size: 16px;
    }
    .suggested {
      color: @color-active-highlight-5;
    }
    .description {
      font-size: 13px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
  }
}
</style>
