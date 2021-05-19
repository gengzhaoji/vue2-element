<template>
  <el-date-picker
    class='com'
    v-model="s_value"
    v-on="$listeners"
    v-bind="$attrs"
    :picker-options="s_pickerOptions"
    :editable='$attrs.editable || false'
    :size='$attrs.size || $store.getters.size'
    :clearable='clearable'
    :value-format='valueFormat'
  >
  </el-date-picker>
</template>
 
<script>
import date from "@utils/date";
import { typeOf } from "@utils/convert";
export default {
  name: "com-date-picker",
  model: {
    prop: "value",
    event: "change"
  },
  /***
   * 参数属性
   * @property {Object[]} value 默认值
   */
  props: {
    value: {
      type: [String, Array, Date],
      default: ""
    },
    pickerOptions: {
      type: Object
    },
    now: {
      type: Boolean,
      defaut: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    valueFormat: function() {
      if (this.$attrs["value-format"]) {
        return this.$attrs["value-format"];
      } else {
        if (this.$attrs.type.match(/time/gi)) {
          return "yyyy-MM-dd HH:mm:ss";
        } else {
          return "yyyy-MM-dd";
        }
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        if (this.type === "") {
          this.type = typeOf(this.value);
        }
        this.s_value = val;
      },
      deep: true,
      immediate: true
    },
    s_value: {
      handler(val) {
        if (val == null) {
          this.$emit("change", this.type === "array" ? [] : "");
        } else {
          this.$emit("change", val);
        }
      },
      deep: true
    },
    pickerOptions: {
      hanlder(val) {
        if (["datetimerange", "daterange"].includes(this.$props.type)) {
          this.s_pickerOptions = { ...val };
        } else {
          this.s_pickerOptions = {
            shortcuts: [
              {
                text: "今天",
                onClick(picker) {
                  picker.$emit("pick", new Date());
                }
              },
              {
                text: "昨天",
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit("pick", date);
                }
              },
              {
                text: "一周前",
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit("pick", date);
                }
              }
            ],
            ...val
          };
        }
      },
      deep: true
    },
    now: {
      handler(val) {
        if (val) {
          this.s_value = date(new Date(), this.valueFormat);
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      type: "",
      s_value: this.value,
      s_pickerOptions: ["datetimerange", "daterange"].includes(this.$props.type)
        ? { ...this.pickerOptions }
        : {
            shortcuts: [
              {
                text: "今天",
                onClick(picker) {
                  picker.$emit("pick", new Date());
                }
              },
              {
                text: "昨天",
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24);
                  picker.$emit("pick", date);
                }
              },
              {
                text: "一周前",
                onClick(picker) {
                  const date = new Date();
                  date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit("pick", date);
                }
              }
            ],
            ...this.pickerOptions
          }
    };
  }
};
</script>

<style scoped lang = "scss">
.el-date-editor.el-input {
  width: 100%;
  min-width: 209px;
}
</style>
