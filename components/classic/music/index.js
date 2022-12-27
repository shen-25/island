import {
  classicBeh
} from "../classic-beh";

// properties(Read only)(duration,currentTime,paused,buffered)
// properties(src(m4a, aac, mp3, wav),startTime,title,epname,singer,coverImgUrl,webUrl,protocol)
const mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],

  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false, // 默认不播放
    pauseSrc: "images/player@pause.png",
    playSrc: "images/player@play.png",
  },

  attached(event) {
    this._recoverStatus();
    this._monitorSwitch();
  },

  detached: function (event) {
    // mMgr.stop()
  },

  /**
   * 组件的方法列表,方法写在这里
   */
  methods: {
    onPlay(event) {
      if (!this.data.playing) {
        this.setData({
          playing: true,
        });
        /**
         * mMgr必须设置title才能播放音乐
         */
        mMgr.title = this.properties.title;
        mMgr.src = this.properties.src;
      } else {
        this.setData({
          playing: false,
        });
        if (!mMgr.paused) {
          mMgr.pause();
        }
      }
    },
    _recoverStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false,
        });
        return;
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true,
        });
      }
    },

    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus();
      });
      mMgr.onPause(() => {
        this._recoverStatus();
      });
      mMgr.onStop(() => {
        this._recoverStatus();
      });
      mMgr.onEnded(() => {
        this._recoverStatus();
      });
    },
  },
});
