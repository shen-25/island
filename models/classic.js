import {
  HTTP
} from "../util/http";
class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.data.index)
        const key = this._getKey(res.data.index)
        wx.setStorageSync(key, res.data)
      }

    })
  }

  getClassic(index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          sCallback(res.data)
          const key = this._getKey(res.data.index)
          wx.setStorageSync(key, res.data)
        }
      })
    } else {
      sCallback(classic)
    }

  }

  isFirst(index) {
    return index === 1
  }

  isLatest(index) {
    const latestIndex = this._getLatestIndex()
    return index === latestIndex
  }
  _setLatestIndex(index) {
    wx.setStorageSync('latestIndex', index)
  }

  _getLatestIndex() {
    return wx.getStorageSync('latestIndex')
  }

  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}
export { ClassicModel }