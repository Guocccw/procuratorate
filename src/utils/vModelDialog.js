/*
 * @Author: Guocc
 * @Date: 2022-09-30 13:36:18
 * @LastEditTime: 2022-09-30 13:39:36
 * @LastEditors: Guocc
 * @Description:
 */
export default {
  model: {
    prop: "visible",
    event: "toggle",
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  computed: {
    innerVisible: {
      get: function () {
        return this.visible;
      },
      set: function (val) {
        this.$emit("toggle", val);
      },
    },
  },
};
