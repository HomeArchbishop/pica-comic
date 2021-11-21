<template>
  <div class="coffee-container">
    <div class="main">
      <div class="title">升级</div>
      <div class="content">
        <div class="sub-title">升级为我带来什么？</div>
        <p><u><b>升级并不能给您带来任何东西</b></u>，却可以为开发者带来一瓶可乐╮(￣▽￣"")╭</p>
      </div>
      <div class="content">
        <div class="sub-title">升级方案</div>
        <p>我们推出了三种方案，您可以进行选择。（当然，我们推荐您最多只买一份）</p>
      </div>
      <table class="coffee-table" cellspacing="0" cellpadding="0">
        <tbody>
          <tr class="head">
            <th class="empty"></th>
            <th>
              <div class="inside-card">
                <div class="cate-name">哔咔</div>
                <hr width="100%" noShade>
                <div class="price">免费</div>
              </div>
            </th>
            <th>
              <div class="inside-card">
                <div class="cate-name">哔咔 plus</div>
                <hr width="100%" noShade>
                <div class="price">¥5</div>
              </div>
            </th>
            <th>
              <div class="inside-card">
                <div class="cate-name">哔咔 pro</div>
                <hr width="100%" noShade>
                <div class="price">¥10</div>
              </div>
            </th>
          </tr>
          <tr class="row" v-for="title in [
            '海量的漫画',
            '准确的搜索',
            '即时的更新',
            '清爽的界面',
            '干净的交互',
            '便捷的体验',
          ]" :key="title">
            <td class="table-title">{{ title }}</td>
            <td v-for="i in 3" :key="i"><TickIcon/></td>
          </tr>
          <tr class="row">
            <td class="table-title">钱包少五块钱</td>
            <td></td>
            <td v-for="i in 2" :key="i"><TickIcon/></td>
          </tr>
          <tr class="row">
            <td class="table-title">钱包少十块钱</td>
            <td v-for="i in 2" :key="i"></td>
            <td><TickIcon/></td>
          </tr>
          <tr class="foot">
            <td class="empty"></td>
            <td>
              <div class="detail-card"></div>
            </td>
            <td>
              <div class="detail-card">您的好意我心领了。</div>
            </td>
            <td>
              <div class="detail-card">万分感谢！</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="content">
        <div class="sub-title">更改您的方案</div>
        <p>如果您对您已购的方案不满意，我们随时可以提供退款服务。</p>
      </div>
    </div>
  </div>
</template>

<script>
import TickIcon from '../components/TickIcon'
export default {
  name: 'CoffeeView',
  components: {
    TickIcon
  }
}
</script>

<style lang="less" scoped>
@import '../assets/less/color';
@import '../assets/less/var';
.coffee-container {
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
.title {
  font-weight: 800;
  font-size: 25px;
  border-bottom: 1px solid @color-theme;
  margin-top: 20px;
}
.content {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  &:nth-last-child(1) {
    margin-bottom: 20px;
  }
  p {
    font-size: 18px;
    margin: 20px 0 0 0;
  }
  .sub-title {
    display: flex;
    width: fit-content;
    min-width: 4em;
    font-size: 20px;
    font-weight: 900;
    margin-bottom: -4px;
    border-bottom: 3px solid @color-anti-theme-sub;
    &::before {
      content: '>';
      margin-right: 4px;
    }
  }
}
.coffee-table {
  display: flex;
  font-size: 16px;
  width: 100%;
  color: @color-anti-theme;
  table-layout: fixed;
  margin-top: 10px;
  tbody {
    width: fit-content;
    overflow: hidden;
    box-shadow: 0 0 8px 2px @color-anti-theme-sub;
    border-radius: @card-radius-default;
    tr {
      text-align: center;
      &:nth-child(2n) {
        background-color: @color-theme-sub;
      }
      &:nth-child(2n+1) {
        background-color: @color-theme-sub-dark;
      }
      td:nth-child(2), th:nth-child(2) {
        box-shadow: -8px 0 4px -4px @color-theme;
      }
      &.head {
        th {
          color: @color-theme-sub;
          &.empty {
            background-color: transparent;
          }
          .inside-card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            padding: 10px;
            background-color: @color-theme-sub-dark;
            color: @color-anti-theme-sub;
            .cate-name {
              font-size: 24px;
              padding: 4px 0;
            }
            hr {
              border-color: @color-anti-theme-sub;
            }
            .price {
              font-size: 22px;
              padding: 4px 0;
            }
          }
        }
      }
      &.row {
        height: 40px;
        td {
          width: 200px;
          padding: 10px;
          &.table-title {
            width: 300px;
            text-align: left;
            background-color: @color-theme-sub-dark;
            box-shadow: -8px -3px 8px 0 @color-anti-theme-sub;
            flex: 1;
          }
        }
        &:not(:nth-child(2)) td.table-title {
          border-top: 1px solid @color-anti-theme-sub;
        }
      }
      &.foot {
        height: 200px;
        td {
          box-shadow: none;
          &.empty {
            background-color: transparent;
          }
        }
      }
    }
  }
}
</style>
