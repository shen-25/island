import {
  HTTP
} from "../util/http-p";


class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }

  //获取书籍详细信息
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }


  //获取书籍点赞情况
  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  // 获取书籍短评
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

   // 新增短评
   postComment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

  // 搜索接口
  search(start,q){
    return this.request({
      url:'book/search?summary=1',
      data:{
        q:q,
        start:start
      }
    })
  }


}

export { BookModel }