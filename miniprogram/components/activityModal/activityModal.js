// components/activityModal/activityModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activityItem:Object
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    btnClass:['','them-light','them-low'],
    btnText:['','进入活动','活动已结束'],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
