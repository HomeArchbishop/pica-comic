<template>
  <div class="setting-container">
    <div class="main">
      <div class="display-card">
        <div class="title">关于</div>
        <div align="center"><img width="120" src="../../static/img/pica-comic-logo.png" alt="Pica-comic logo"></div>
        <h1 align="center">Picable哔咔漫画客户端</h1>
        <div class="para">
          Picable是哔咔漫画<b><u>非官方</u></b>的客户端，旨在让PC（电脑）与移动端（手机）访问哔咔更加便捷，功能更加灵活人性化，为绅士淑女们提供极致的享受。
        </div>
        <div class="para">
          目前实现了官方的<b>绝大部分</b>功能，还添加了一些个性化功能，满足各位的日常需要绰绰有余😏。
        </div>
        <div class="sub-title">为什么要开发这个</div>
        <div class="para">
          大约一阵子前，由于懂得都懂的原因，哔咔的ios端官方签名不给用了，需要自签，比较麻烦。再加之早就想用PC端看漫画了（因为屏幕大啊），就写了这个应用。
        </div>
        <div class="sub-title">开发者碎碎念</div>
        <div class="para">
          <b><u>感谢大家看到这里</u></b>。作为一个刚起步的开发者，想做点练手的东西，于是LSP的本性驱使我尝试这个idea。才开始项目名就叫pica-comic，非常的朴实，也是为了方便搜索。
          后来想想换个新名，那就叫Picable好了。<code>Picable = Pica + able</code>，也就是希望让这个项目变得越来越able。[那么至于为什么不叫<code>Picapable</code>呢，因为Picapable这个名字太长，会让人觉得不知所云（笑）。]
        </div>
        <div class="para">
          我把这个项目发出来，希望大家能够喜欢。不足之处万望赐教。<b><u>如果Star一下当然更好啦，一个Star能够让我兴奋好久😚</u></b>。
          <a href="https://github.com/HomeArchbishop/pica-comic">GitHub地址></a>
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
    color: @color-anti-theme-sub;
  }
  h1 {
    margin: 10px 0;
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
    line-height: 1.8em;
    font-size: 18px;
    text-indent: 2em;
    * {
      display: inline;
    }
  }
}
</style>
