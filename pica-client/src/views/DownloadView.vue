<template>
  <div class="download-container">
    <div class="main">
      <div class="display-card">
        <span class="title">我的下载</span>
        <div class="list-area">
          <ItemLarge/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DownloadView'
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.download-container {
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
  width: 90%;
}
.display-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  .title {
    font-weight: 800;
    font-size: 25px;
  }
  .list-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 220px;
    padding-top: 10px;
    border-top: 1px solid black;
  }
}
</style>
