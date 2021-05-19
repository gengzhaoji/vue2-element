<template>
  <div>
    <el-popover
      ref='popoverRef'
      trigger="click"
      placement='bottom-end'
    >
      <com-cascader
        class='margin-bottom-5'
        v-model="deptId"
        placeholder="请选择部门"
        type='GetdeptList'
      />
      <com-cascader
        v-model="s_value"
        placeholder="请选择人员"
        :list='nameList'
      />
      <el-form-item
        :prop='prop'
        :label="label"
        :rules="rules"
        slot="reference"
      >
        <com-cascader
          disabled
          v-model="s_value"
          :placeholder="placeholder"
          :list='nameList'
        />
      </el-form-item>
    </el-popover>
  </div>
</template>
 
<script>
/**
 * 请求接口
 */
import { userNameTreeselect } from "@/api/system/user";

export default {
  name: "com-dept-name",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: null,
    label: "",
    prop: "",
    placeholder: {
      default: "请选择人员"
    },
    rules: null
  },
  data() {
    return {
      deptId: "",
      s_value: "",
      nameList: []
    };
  },
  watch: {
    value(val) {
      this.s_value = val;
    },
    s_value(val) {
      this.$emit("change", val);
      this.$refs.popoverRef.doClose();
    },
    deptId: {
      handler(val) {
        userNameTreeselect({ deptId: val }).then(res => {
          this.nameList = res.data;
        });
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-input.is-disabled .el-input__inner {
  background-color: #ffffff;
  cursor: pointer;
}
</style>
