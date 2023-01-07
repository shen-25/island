import { BookModel } from "../../models/book";

import { KeywordModel } from "../../models/keyword";

import { paginationBev } from "../behavior/pagination";

const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
  behaviors: [paginationBev],

  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      // 监听more的改变，页面变她就变,methods定义loadMore
      observer: "loadMore",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: "",
    loadingCenter: false,
  },

  //不利于复用
  attached(event) {
    const historyWords = keywordModel.getHistory();
    this.setData({
      historyWords,
    });

    const hotWords = keywordModel.getHot();
    hotWords.then((res) => {
      this.setData({
        hotWords: res.hot,
      });
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.initialize();
      this.setData({
        searching: false,
      });
      this.triggerEvent("cancel", {}, {});
    },
    onConfirm(event) {
      this._showLoadingCenter();
      const q = event.detail.value || event.detail.text;
      this._showResult();

      this.setData({
        q,
      });
      bookModel.search(0, q).then((res) => {
        console.log(this.data.loadingCenter)
        this.setMoreData(res.books);
        this.setTotal(res.total);
        keywordModel.addToHistory(q);
        this._hideLoadingCenter();
      });
    },

    onDelete(event) {
      this._closeResult();
      this.initialize()
    },

    loadMore(event) {
      // console.log(this.data.loading)
      // console.log(this.hasMore())
      // console.log(this.data.total)

      if (this.data.q == "") {
        return;
      }
      //个人感觉不用加锁
      if (this.isLocked()) {
        return;
      }

      console.log(this.data.dataArray);

      if (this.hasMore()) {
        this.locked();
        bookModel.search(this.getCurrentStart(), this.data.q).then((res) => {
          this.setMoreData(res.books);
          this.unLocked();
        });
      }
    },

    /**
     * 增强代码的可读性
     * _开头代表私有方法，外部看到就别调用了
     */

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true,
      });
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false,
      });
    },

    _showResult() {
      this.setData({
        searching: true,
      });
    },


    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      });
    },
  },
});
