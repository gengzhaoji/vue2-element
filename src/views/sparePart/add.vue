<template>
  <div class="index">
    <div class="padding-10 back-f fw title">
      {{title}}
    </div>
    <div class="padding-10 back-gainsboro f1 h0 overflow-auto flex-col">
      <div class="back-f f1">
        <div
          class="padding-10"
          style="width: 40%;margin: 0 auto;"
          v-loading='loading'
        >
          <el-form
            ref="form"
            :model="form"
            label-width="120px"
            :rules="rules"
            :disabled="['details'].includes(routerMage.name)"
            class="validate--bottom"
          >
            <el-form-item
              label="备件编号"
              prop='spareCode'
            >
              <com-input
                v-model="form.spareCode"
                placeholder="请输入备件编号"
              />
            </el-form-item>
            <el-form-item
              label="备件名称"
              prop='spareName'
            >
              <com-input
                :disabled="['update'].includes(routerMage.name)"
                v-model="form.spareName"
                placeholder="请输入备件名称"
              />
            </el-form-item>
            <el-form-item
              label="备件型号"
              prop='spareModel'
            >
              <com-input
                :disabled="['update'].includes(routerMage.name)"
                v-model="form.spareModel"
                placeholder="请输入备件型号"
              />
            </el-form-item>
            <el-form-item
              label="数量"
              prop='spareNum'
            >
              <com-input-number
                numberType='float'
                v-model="form.spareNum"
                placeholder="请输入数量"
              ></com-input-number>
            </el-form-item>
            <el-form-item
              label="单位"
              prop='spareUnit'
            >
              <com-input
                v-model="form.spareUnit"
                placeholder="请输入单位"
              />
            </el-form-item>
            <el-form-item
              label="分类"
              prop='spareType'
            >
              <com-select
                v-model="form.spareType"
                placeholder="请选择分类"
                :list='$store.getters.spareType'
              />
            </el-form-item>
            <el-form-item
              label="工序"
              prop='spareProcess'
            >
              <com-input
                v-model="form.spareProcess"
                placeholder="请输入工序"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="padding-10 back-f tr">
      <com-button
        type="primary"
        @click.prevent='subFn'
        v-if="!['details'].includes(routerMage.name)"
      >提 交</com-button>
      <com-button @click.prevent="cancelFn">{{['details'].includes(routerMage.name)?'返 回':'取 消'}}</com-button>
    </div>
  </div>
</template>
 
<script>
/**
 * 接口部分
 */
import { Details, Updata, Insert } from "@api/sparePart";

export default {
  name: "sparePart-Add",
  data() {
    return {
      routerMage: {
        name: "",
        id: ""
      },
      form: {
        spareCode: "",
        spareName: "",
        spareModel: "",
        spareNum: "",
        spareUnit: "",
        spareType: "",
        spareProcess: ""
      },
      rules: {
        spareName: [
          { required: true, message: "请输入备件名称", trigger: "blur" }
        ],
        spareModel: [
          { required: true, message: "请输入备件型号", trigger: "blur" }
        ],
        spareUnit: [{ required: true, message: "请输入单位", trigger: "blur" }],
        spareNum: [{ required: true, message: "请输入数量", trigger: "blur" }],
        spareType: [{ required: true, message: "请选择分类", trigger: "blur" }]
      },
      loading: false
    };
  },
  computed: {
    title: function() {
      const { name } = this.routerMage;
      return name === "insert"
        ? "新增备件备品信息"
        : name === "update"
          ? "修改备件备品信息"
          : "备件备品信息详情";
    }
  },
  methods: {
    /**
     * 提交函数逻辑
     */
    subFn() {
      const vm = this;
      const { name } = vm.routerMage;
      vm.loading = true;
      vm.$refs["form"].validate(valid => {
        if (valid) {
          if (name === "insert") {
            // 新增的逻辑
            Insert(vm.form)
              .then(res => {
                vm.loading = false;
                vm.msgSuccess(res.msg || "新增成功！");
                vm.cancelFn();
              })
              .catch(err => {
                vm.form.spareName = "";
                vm.form.spareModel = "";
                vm.loading = false;
              });
          } else if (name === "update") {
            //修改的逻辑
            Updata(vm.form)
              .then(res => {
                vm.loading = false;
                vm.msgSuccess("修改成功！");
                vm.cancelFn();
              })
              .catch(err => {
                vm.loading = false;
              });
          }
        } else {
          vm.loading = false;
          return false;
        }
      });
    },
    /**
     * 取消返回函数逻辑
     */
    cancelFn() {
      this.$router.push({ path: "/sparePart" });
    }
  },
  created() {
    if (this.$route.query) {
      this.routerMage.name = this.$route.query.name;
      this.routerMage.id = this.$route.query.id;
    }
    /**
     * 详情等初始化查询-设备信息
     */
    if (["update", "details"].includes(this.routerMage.name)) {
      Details(this.routerMage.id).then(res => {
        this.form = res.data;
      });
    }
  }
};
</script>
 
<style scoped lang = "scss">
.index {
  .title {
    font-size: 18px;
    color: #1890ff;
  }
}
</style>
