<template>
  <div class="link-container">
    <div class="main">
      <div class="iframe-div">
        <iframe :src="link" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinkView',
  data () {
    return {
      link: this.$route.params.link
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.link-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: scroll;
}
.main {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  .iframe-div {
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    iframe {
      display: flex;
      flex: 1;
      width: 100%;
    }
  }
}
</style>
