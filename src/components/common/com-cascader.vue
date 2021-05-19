<template>
  <el-cascader
    :size='$attrs.size || $store.getters.size'
    ref='cascader'
    v-model="s_value"
    :options="Options"
    :props="props"
    :show-all-levels="showAllLevels"
    :filterable='filterable'
    v-on="$listeners"
    v-bind="$attrs"
    :clearable='clearable'
  ></el-cascader>
</template>
 
<script>
export default {
  name: "com-cascader",
  model: {
    prop: "value",
    event: "change"
  },
  /***
   * 参数属性
   * @property {Object[]} value 默认值
   */
  props: {
    type: "",
    value: null,
    props: {
      default: function() {
        return {
          expandTrigger: "hover",
          value: "id",
          emitPath: false,
          checkStrictly: true
        };
      }
    },
    showAllLevels: {
      default: false
    },
    filterable: {
      default: true
    },
    list: {
      type: Array,
      default: () => []
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      s_value: this.value,
      Options: []
    };
  },
  watch: {
    value(val) {
      this.s_value = val;
    },
    s_value(val) {
      this.$refs.cascader.dropDownVisible = false;
      this.$emit("change", val);
    },
    list: {
      handler(val) {
        this.Options = val;
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    /**
     * GetnameList 用户树
     * GetdeptList 部门数
     * GeteqptNameTree 设备树
     */
    if (this.type) {
      this.$store.dispatch(this.type).then(data => {
        this.Options = data;
      });
    }
  }
};
</script>