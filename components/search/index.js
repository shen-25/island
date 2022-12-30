import {
   BookModel 
} from "../../models/book"

import {
  KeywordModel
} from "../../models/keyword"

const keywordModel = new KeywordModel()
const bookModel = new BookModel()


Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    q: ''
  },

  //不利于复用
  attached(event){
    const historyWords = keywordModel.getHistory()
    this.setData({
      historyWords,
    })

    const hotWords = keywordModel.getHot()
    hotWords.then(res=>{
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event){
      this.setData({
        searching: false
      })
      this.triggerEvent('cancel', {}, {})
    },
    onConfirm(event){
      const q = event.detail.value || event.detail.text

      this.setData({
        searching: true,
        q
      })
      bookModel.search(0, q).then((res) =>{
        // console.log(res)
        this.setData({
          dataArray: res.books
        })
        keywordModel.addToHistory(q)
      })
    },
    onDelete(event){
      this.setData({
        searching: false
      })
    },
  }
})
