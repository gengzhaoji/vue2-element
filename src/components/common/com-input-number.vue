<template>
  <el-input
    :clearable='clearable'
    :size='$attrs.size || $store.getters.size'
    :value="s_value"
    @input="e => setnum(e)"
    v-on="$listeners"
    v-bind="$attrs"
    :maxlength='$attrs.maxlength || 20'
  >
    <slot
      name='prefix'
      slot="prefix"
    ></slot>
    <slot
      name='suffix'
      slot="suffix"
    ></slot>
    <slot
      name='prepend'
      slot="prepend"
    ></slot>
    <slot
      name='append'
      slot="append"
    ></slot>
  </el-input>
</template>
 
<script>
export default {
  name: "com-input-number",
  model: {
    prop: "value",
    event: "change"
  },
  /***
   * 参数属性
   * @property {Object[]} value 默认值
   */
  props: {
    value: null,
    numberType: {
      type: [String],
      default: "init"
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      s_value: this.value
    };
  },
  watch: {
    value(val) {
      this.s_value = val;
    },
    s_value(val) {
      this.$emit("change", val);
    }
  },
  methods: {
    setnum(value) {
      if (this.numberType === "float") {
        value = value.replace(/[^\d.]/g, ""); //只保留数字和点(".")，其余的字符都去掉
        value = value.replace(/\.{2,}/g, "."); //只保留第一个点("."),有两个点(".")只保留一个
        value = value
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", "."); //把点(".")进行转换防止被正则表达式抹掉
        value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //限制只能输入两位小数
        if (value.indexOf(".") < 0 && value != "") {
          //限制首位不能是0
          value = parseFloat(value);
        }
        this.s_value = value;
      } else if (this.numberType === "init") {
        this.s_value = value.replace(/[^0-9]/gi, "");
      }
    }
  }
};
</script>
