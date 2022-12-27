// components/tag/index.js
Component({

  /**
   * 启动多插槽，不设置插槽不生效
   * 如果是单插槽，可以不设置，但是必须设置匿名插槽才可生效，我测试的
   */
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */

  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
