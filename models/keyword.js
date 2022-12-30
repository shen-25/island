import {
  HTTP
} from "../util/http-p"


class KeywordModel extends HTTP{

   key = 'q'
   maxLength = 10

  getHistory(){
    return wx.getStorageSync(this.key) || [];
  }

  getHot(){
    return this.request({
      url:'book/hot_keyword'
    })
  }

  addToHistory(keyword){
    // console.log(keyword.length)
    if(keyword.trim() == ''){
        return
    }
    let words = this.getHistory() 
    // console.log(words)
    let index = words.indexOf(keyword)
    if(index != -1){
       words.splice(index, 1)
    }
    if(words.length >= this.maxLength){
      words.pop()
    }
    words.unshift(keyword)
    wx.setStorageSync(this.key, words)

  }
  
}

export {KeywordModel}