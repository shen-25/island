const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false,
    loading: false,
  },

  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray: tempArray,
      });
    },

    getCurrentStart() {
      return this.data.dataArray.length;
    },

    setTotal(total) {

      this.data.total = total;
      if (total == 0) {
        this.setData({
          noneResult: true
        })
      }
    },

    hasMore() {
      return this.data.dataArray.length < this.data.total;
    },

    initialize() {
      this.setData({
        dataArray: [],
        total: null,
        noneResult: false,
        loading: false,
      })
    },


    isLocked() {
      return this.data.loading;
    },

    locked() {
      this.setData({
        loading: true
      })
    },

    unLocked() {
      this.setData({
        loading: false
      })
    },

  }
});

export { paginationBev };
