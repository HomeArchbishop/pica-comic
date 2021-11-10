<template>
  <div class="setting-container">
    <div class="main">
      <div class="display-card">
        <div class="title">关于</div>
        <div class="sub-title">作者的话</div>
        <div class="para">
          大约一阵子前，哔咔的ios端官方签名不给用了，需要自签，比较麻烦。再加之早就想用PC端看漫画了，就写了这个桌面端应用。
          本来是给自己用的，但感觉还不错，就发出来了。
        </div>
        <div class="para">
          核心功能都实现了，还有一些边角功能没有完工。近期会逐步更新。另外，如果使用者是开发者那最好不过，因为当前版本不算稳定，
          开发者会手动处理一些异常。不会处理的人也没有关系，稳定版稍后更新。（稍后有可能就是几天后，因为就是正在开发。）
        </div>
        <div class="sub-title">声明</div>
        <div class="para">
          哔咔漫画桌面客户端（下称“本软件”）是<b><u>非官方</u></b>的免费哔咔漫画客户端。
        </div>
        <div class="para">
          本软件提供的内容仅用于个人学习、研究或欣赏。通过使用本站内容随之而来的风险与本站无关
        </div>
        <div class="para">
          使用者可将本软件及其源码依据MIT开源协议使用。
        </div>
        <div class="para">
          本软件不提供任何形式的保证。所有与使用本站相关的直接风险均由用户承担。
        </div>
        <div class="para">
          当您使用本软件时，说明您已经同意并接受本页面的所有信息。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
.setting-container {
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
    border-bottom: 1px solid @color-theme;
  }
  .sub-title {
    display: flex;
    width: fit-content;
    min-width: 4em;
    margin-top: 10px;
    margin-top: 20px;
    font-size: 20px;
    font-weight: 900;
    margin-bottom: -4px;
    border-bottom: 3px solid @color-anti-theme-sub;
    &::before {
      content: '>';
      margin-right: 4px;
    }
  }
  .para {
    display: block;
    margin-top: 10px;
    font-size: 18px;
    text-indent:2em;
    * {
      display: inline;
    }
  }
}
</style>
