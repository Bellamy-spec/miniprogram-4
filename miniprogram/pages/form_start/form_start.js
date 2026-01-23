// pages/form_start/form_start.js
const db = wx.cloud.database()

// 获取当前时间并格式化为 yyyy-mm-dd hh:ii:ss
function getCurrentDateTime() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

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

    // 按钮样式
    button_style: "",
    tap_event: "submit",
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

  async submit(){
    // 点击按钮提交
    // console.log(this.data)

    // 检查信息是否填全
    if(!this.data.name){
      // 提示姓名未填写
      wx.showToast({
        title: "姓名未填",
        icon: 'error',
        duration: 2000
      })
      return
    }
    if(!this.data.id_num){
      // 提示身份证号未填
      wx.showToast({
        title: "身份证号未填",
        icon: 'error',
        duration: 2000
      })
      return
    }
    if(!this.data.home){
      // 提示户籍所在地未填
      wx.showToast({
        title: "户籍所在地未填",
        icon: 'error',
        duration: 2000
      })
      return
    }

    // 检验身份证号
    const {result: {correct, gender}} = await wx.cloud.callFunction({
      name: "id_lab",
      data: {
        id_num: this.data.id_num
      }
    })
    // console.log(correct, gender)
    if(!correct){
      // 提示身份证号错误
      wx.showToast({
        title: "身份证号错误",
        icon: 'error',
        duration: 2000
      })
      return
    }
    if(gender != this.data.gender_options[this.data.gender_index]){
      // 提示性别错误
      wx.showToast({
        title: "性别错误",
        icon: 'error',
        duration: 2000
      })
      return
    }

    // 用户最终确认
    wx.showModal({
      title: '信息确认',
      content: "提交后数据不可修改，你确定要提交吗？"
    })
    .then(res => {
      if(res.confirm){
        console.log("可写入数据库")
        console.log(getCurrentDateTime())
        // 此处待进一步开发...
        db.collection('army_info').add({
          data: {
            class_and_grade: this.data.gc_options[this.data.gc_index],
            name: this.data.name,
            gender: this.data.gender_options[this.data.gender_index],
            id_num: this.data.id_num,
            home: this.data.home,
            conclusion: this.data.conclusion_options[this.data.conclusion_index],
            is_pre: this.data.bol_options[this.data.bol_index],
            add_datetime: getCurrentDateTime(),
          }
        })
        .then(res => {
          console.log("添加数据：", res)
          wx.showToast({
            title: "提交成功",
            icon: 'success',
            duration: 2000
          })
  
          // 设置按钮不可点击，防止重复提交
          this.setData({
            tap_event: "",
            button_style: "opacity: 0.4;",
          })
        })
        .catch(err => {
          console.log(err)
        })
      }
      else if(res.cancel){
        // 用户点击了取消
        console.log("待进一步确认")
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
})