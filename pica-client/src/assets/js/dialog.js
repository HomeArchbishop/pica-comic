import Vue from 'vue'
import Dialog from '@/components/Dialog'

const DialogConstructor = Vue.extend(Dialog) // 扩展实例构造器

const dialogModal = async function ({ title, content, cancelBtn, autoClose, close, confirm, cancel }) {
  /*
  this.$dialog({
    title: '信息1',
    content: '登入成功！',
    cancelBtn: true, // 这个是启用取消按钮，
    autoClose: flase | number,
    close () {
      // 这里执行点击右上角需要做的事，默认执行关闭弹框
    },
    confirm () {
      // 这里执行点击确定按钮需要做的事，默认执行关闭弹框
    },
    cancel () {
      // 这里执行点击取消按钮需要做的事，默认执行关闭弹框
    }
  })
  */
  const dialogDom = new DialogConstructor({
    el: document.createElement('div') // 将Dialog组件挂载到新创建的div上
  })
  // 把Dialog组件的dom添加到body里
  document.getElementById('app').appendChild(dialogDom.$el)
  // 标题
  dialogDom.title = title
  // 单条内容
  dialogDom.content = content
  // 关闭按钮
  dialogDom.cancelBtn = cancelBtn
  // 自动关闭
  dialogDom.autoClose = autoClose
  // 弹框三个事件 右上角关闭 确定 取消
  dialogDom._close = close || undefined
  dialogDom._confirm = confirm || undefined
  dialogDom._cancel = cancel || undefined
}

export default dialogModal
