// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
    },
    readOnly: {
      type: Boolean,
    },
  },

  /**
   * 组件的初始数据
   * 组件内部使用在这里定义
   */
  data: {
    //数据绑定
    yesSrc: "./images/like.png",
    disSrc: "./images/like@dis.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (event) {
      console.log(this.properties.readOnly);
      if (this.properties.readOnly) {
        return;
      }
      let like = this.properties.like;
      let count = this.properties.count;
      count = like ? count - 1 : count + 1;
      like = !like;
      console.log(like);
      this.setData({
        count: count,
        like: like,
      });
      let behavior = this.properties.like ? "like" : "cancel";
      this.triggerEvent(
        "like",
        {
          behavior: behavior,
        },
        {}
      );
    },
  },
});
