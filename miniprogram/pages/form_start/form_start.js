// pages/form_start/form_start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gc_options: [
      "高一1班",
      "高一2班",
      "高一3班",
    ],
    gc_index: 0,
    gender_options: ["男", "女"],
    gender_index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 生成班级选项
    var gcList = []
    for(let grade of ["高一", "高二", "高三"]){
      // console.log(grade)
      for(var c = 1; c < 13; c++){
        let gc = grade + c + "班"
        gcList.push(gc)
      }
    }
    console.log(`共生成${gcList.length}个班级选项`)
    this.setData({
      gc_options: gcList,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  setGcOption(e){
    // 班级选项发生变化
    this.setData({
      gc_index: e.detail.value,
    })
  },

  setGenderOption(e){
    // 性别选项发生变化
    this.setData({
      gender_index: e.detail.value,
    })
  },
})