<template>
  <router-link class="recommend-item" :to="link" tag="div">
    <div class="img-div" @click.stop="$util.showBigImg($util.formatImgUrl(item.thumb.fileServer, item.thumb.path))">
      <img :src="$util.formatImgUrl(item.thumb.fileServer, item.thumb.path)" @click.prevent alt="加载失败">
    </div>
    <div class="content-div">
      <div class="title">{{ item.title }}</div>
      <div class="description">{{ item.description }}</div>
      <div class="author">作者：{{ item.author }}</div>
      <div class="chineseTeam">汉化：{{ item.chineseTeam }}</div>
      <div class="tag-div">
        <router-link :to="{ name: 'TagSearchView', params: {t: tagName} }" tag="div"
          class="tag" v-for="tagName in item.tags" :key="tagName">{{ tagName }}</router-link>
      </div>
      <div class="detail-div">
        <div class="likeCount">{{ item.totalViews }}喜欢</div>
        <div class="viewCount">{{ item.totalViews }}观看</div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'ItemLarge',
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
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  min-height: 200px;
  margin-top: 10px;
  padding: 10px;
  box-shadow: 0 0 8px 2px @color-anti-theme-sub;
  border-radius: @card-radius-default;
  cursor: pointer;
  .img-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 140px;
    height: 180px;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
      max-height: 180px;
      border: none;
    }
  }
  .content-div {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
    height: 100%;
    line-height: 25px;
    .title {
      font-size: 18px;
      font-weight: 700;
    }
    .description {
      color: @color-theme-sub;

    }
    .tag-div {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .tag {
        display: flex;
        border: 1px solid @color-theme;
        margin-right: 5px;
        margin-top: 1px;
        padding: 2px;
        height: 18px;
        font-size: 14px;
        line-height: 14px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .detail-div {
      display: flex;
      flex-direction: row;
      .likeCount,
      .viewCount {
        display: flex;
        margin-left: 5px;
        margin-top: 8px;
        padding: 2px;
        height: 18px;
        font-size: 14px;
        line-height: 14px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
