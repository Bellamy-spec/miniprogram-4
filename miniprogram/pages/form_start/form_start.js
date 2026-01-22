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
    conclusion_options: ["应服兵役", "免服兵役", "不得服兵役"],
    conclusion_index: 0,
    bol_options: ["是", "否"],
    bol_index: 0,
    name: "",
    id_num: "",
    home: "",
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

  setConclusionOption(e){
    // 兵役登记结论选项发生变化
    this.setData({
      conclusion_index: e.detail.value,
    })
  },

  setBolOption(e){
    // 是否预备役登记选项发生变化
    this.setData({
      bol_index: e.detail.value,
    })
  },

  onNameInput(e){
    // 姓名输入
    this.setData({
      name: e.detail.value,
    })
  },

  onIdNumInput(e){
    // 身份证号输入
    this.setData({
      id_num: e.detail.value,
    })
  },

  onHomeInput(e){
    // 户籍所在地输入
    this.setData({
      home: e.detail.value,
    })
  },

  submit(){
    // 点击按钮提交
    console.log(this.data)
    // 此处待进一步开发...
  },
})