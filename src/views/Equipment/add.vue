<template>
  <div class="index">
    <div class="padding-10 title">
      {{title}}
    </div>
    <div class="padding-10 massage flex-col">
      <div
        class="list"
        v-loading='loading'
      >
        <el-form
          class="list validate--bottom"
          inline
          label-position="top"
          ref='form'
          :rules="rules"
          :model="form"
          :disabled="['details'].includes(routerMage.name)"
        >
          <div class="back-f margin-bottom-10">
            <div class="padding-10 fw border_title">
              设备信息
            </div>
            <div class="padding-10">
              <el-form-item
                label="设备编号"
                prop="eqptCode"
              >
                <com-input
                  v-model="form.eqptCode"
                  placeholder="请输入设备编号"
                  :disabled="['update', 'baofei','details'].includes(routerMage.name)"
                ></com-input>
              </el-form-item>
              <el-form-item
                label="固定资产编号"
                prop="assetCode"
              >
                <com-input
                  v-model="form.assetCode"
                  placeholder="请输入固定资产编号"
                  :disabled="['update', 'baofei','details'].includes(routerMage.name)"
                ></com-input>
              </el-form-item>
              <el-form-item
                label="设备型号"
                prop="specificationModel"
              >
                <com-input
                  v-model="form.specificationModel"
                  placeholder="请输入设备型号"
                  :disabled="['update', 'baofei','details'].includes(routerMage.name)"
                />
              </el-form-item>
              <el-form-item
                label="设备类型"
                prop="eqptType"
              >
                <com-select
                  type='GeteqptTypeList'
                  v-model="form.eqptType"
                  placeholder="请输入设备类型"
                  :disabled="['baofei'].includes(routerMage.name)"
                />
              </el-form-item>
              <el-form-item
                label="设备名称"
                prop='eqptName'
              >
                <com-input
                  :disabled="['baofei'].includes(routerMage.name)"
                  v-model="form.eqptName"
                  placeholder="请输入设备名称"
                ></com-input>
              </el-form-item>
              <el-form-item
                label="采购日期"
                prop='buyTime'
              >
                <com-date-picker
                  v-model="form.buyTime"
                  type="date"
                  placeholder="请选择采购日期"
                  :picker-options='pickerOptions_buyTime'
                  :disabled="['baofei'].includes(routerMage.name)"
                />
              </el-form-item>
              <el-form-item
                label="合同编号"
                prop='contractCode'
              >
                <com-input
                  v-model="form.contractCode"
                  placeholder="请输入合同编号"
                  :disabled="['baofei'].includes(routerMage.name)"
                ></com-input>
              </el-form-item>
              <el-form-item
                label="价格(元)"
                prop='eqptPrice'
              >
                <com-input-number
                  v-model="form.eqptPrice"
                  placeholder="请输入价格"
                  :disabled="['baofei'].includes(routerMage.name)"
                ></com-input-number>
              </el-form-item>
            </div>
          </div>

          <div class="back-f margin-bottom-10">
            <div class="padding-10 fw border_title">
              状态信息
            </div>
            <div class="padding-10">
              <el-form-item
                label="设备状态"
                prop='eqptStatus'
              >
                <com-select
                  :disabled="['baofei'].includes(routerMage.name)"
                  v-model="form.eqptStatus"
                  type='GeteqptStatusList'
                />
              </el-form-item>
              <el-form-item
                label="额定寿命"
                prop='eqptLifetime'
              >
                <com-input-number
                  :disabled="['baofei'].includes(routerMage.name)"
                  v-model="form.eqptLifetime"
                  placeholder="请输入额定寿命"
                >
                  <el-form-item
                    slot="append"
                    prop='eqptLifetimeUnit'
                  >
                    <com-select
                      style='width: 80px;'
                      v-model="form.eqptLifetimeUnit"
                      type='GeteqptLifetimeUnit'
                      placeholder="单位"
                      :disabled="['baofei'].includes(routerMage.name)"
                    />
                  </el-form-item>
                </com-input-number>
              </el-form-item>
              <el-form-item
                label="部署位置"
                prop='eqptLocation'
              >
                <com-input
                  v-model="form.eqptLocation"
                  placeholder="请输入部署位置"
                  :disabled="['baofei'].includes(routerMage.name)"
                ></com-input>
              </el-form-item>
              <el-form-item
                label="服役开始时间"
                prop='applyTime'
              >
                <com-date-picker
                  v-model="form.applyTime"
                  type="date"
                  placeholder="请选择服役开始时间"
                  :picker-options='pickerOptions_applyTime'
                  :disabled="['baofei'].includes(routerMage.name)"
                />
              </el-form-item>
            </div>
          </div>

          <div class="back-f margin-bottom-10">
            <div class="padding-10 fw border_title">
              其他信息
            </div>
            <div class="padding-10">
              <el-form-item
                label="责任部门"
                prop='dutyDeptId'
              >
                <com-cascader
                  v-model="form.dutyDeptId"
                  type='GetdeptList'
                  placeholder="请选择责任部门"
                  :disabled="['baofei'].includes(routerMage.name)"
                />
              </el-form-item>
              <el-form-item
                label="责任人"
                prop='dutyUser'
              >
                <com-cascader
                  v-model="form.dutyUser"
                  :list='nameList'
                  placeholder="请选择责任人"
                  :disabled="['baofei'].includes(routerMage.name)"
                />
              </el-form-item>
              <el-form-item
                label="制造商"
                prop='manufacturer'
              >
                <com-input
                  v-model="form.manufacturer"
                  placeholder="请输入制造商"
                  :disabled="['baofei'].includes(routerMage.name)"
                />
              </el-form-item>
              <el-form-item
                label="供应商"
                prop='supplier'
              >
                <com-input
                  v-model="form.supplier"
                  placeholder="请输入供应商"
                  :disabled="['baofei'].includes(routerMage.name)"
                />
              </el-form-item>
              <el-form-item
                label="供应商联系人"
                prop='supplierLinkman'
              >
                <com-input
                  v-model="form.supplierLinkman"
                  placeholder="请输入供应商联系人"
                  :disabled="['baofei'].includes(routerMage.name)"
                />
              </el-form-item>
              <el-form-item
                label="供应商联系人电话"
                prop='supplierPhone'
              >
                <com-input
                  v-model="form.supplierPhone"
                  placeholder="请输入供应商联系人电话"
                  :disabled="['baofei'].includes(routerMage.name)"
                />
              </el-form-item>
            </div>
          </div>

          <div
            class="back-f margin-bottom-10"
            v-if="['baofei','details'].includes(routerMage.name)"
          >
            <div class="padding-10 fw border_title">
              报废信息
            </div>
            <div class="padding-10">
              <el-form-item
                label="报废批准时间"
                prop='scrapApproverTime'
                :rules='[{ required: true, message: "请选择报废批准时间", trigger: "blur" }]'
              >
                <com-date-picker
                  v-model="form.scrapApproverTime"
                  type="date"
                  placeholder="请选择报废批准时间"
                  :picker-options='pickerOptions_scrapApproverTime'
                >
                </com-date-picker>
              </el-form-item>
              <el-form-item
                label="报废时间"
                prop='scrapTime'
                :rules='[{ required: true, message: "请选择报废时间", trigger: "blur" }]'
              >
                <com-date-picker
                  v-model="form.scrapTime"
                  type="date"
                  placeholder="请选择报废时间"
                  :picker-options='pickerOptions_scrapTime'
                />
              </el-form-item>
              <el-form-item
                label="报废批准人"
                prop='scrapApprover'
                :rules='[{ required: true, message: "请选择报废批准人", trigger: "blur" }]'
              >
                <com-cascader
                  v-model="form.scrapApprover"
                  :list='$store.getters.nameList'
                  placeholder="请选择报废批准人"
                />
              </el-form-item>
              <el-form-item
                label="报废原因"
                prop='scrapReason'
                :rules='[{ required: true, message: "请输入报废原因", trigger: "blur" }]'
              >
                <com-input
                  v-model="form.scrapReason"
                  placeholder="请输入报废原因"
                />
              </el-form-item>
            </div>
          </div>

          <div
            class="back-f margin-bottom-10"
            style='flex: 1 0 auto;'
          >
            <div class="padding-10 fw border_title">
              上传信息
            </div>
            <div class="padding-10">
              <el-form-item label="设备图片">
                <el-form :disabled="['baofei','details'].includes(routerMage.name)">
                  <file-upload
                    img
                    v-model='imgList'
                    :fileType="['png', 'jpg', 'jpeg']"
                    :fileSize='10'
                  ></file-upload>
                </el-form>

              </el-form-item>
              <el-form-item label="上传附件">
                <el-form :disabled="['baofei','details'].includes(routerMage.name)">
                  <file-upload v-model='fileList'></file-upload>
                </el-form>
              </el-form-item>
              <el-form-item
                label="报废附件"
                v-if="['baofei','details'].includes(routerMage.name)"
                required
              >
                <file-upload v-model='baofeiFileList'></file-upload>
              </el-form-item>
              <el-form-item
                label="备注"
                prop="remark"
              >
                <com-input
                  type="textarea"
                  v-model="form.remark"
                  :autosize="{ minRows: 14,maxRows:15}"
                  placeholder="请输入备注"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>

        <div class="back-f">
          <div class="padding-10 tr">
            <com-button
              type="primary"
              @click.prevent='subFn'
              v-if="!['details'].includes(routerMage.name)"
            >提 交</com-button>
            <com-button @click.prevent="cancelFn">{{['details'].includes(routerMage.name)?'返 回':'取 消'}}</com-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
/**
 * 接口部分
 */
import {
  equipmentDetails,
  equipmentUpdata,
  equipmentInsert,
  equipmentEqptNames
} from "@api/Equipment";
import { userNameTreeselect } from "@/api/system/user";
import { isPhoneNumber } from "@utils/util";
// 文件上传组件
import FileUpload from "@com/FileUpload";

export default {
  name: "addEquipment",
  components: {
    FileUpload
  },
  data() {
    var supplierPhone = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {
        if (isPhoneNumber(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    var eqptCode = (rule, val, callback) => {
      // 查询全部已有的设备编号
      equipmentEqptNames()
        .then(res => {
          const is = res.data
            .filter(item => item.eqptId !== this.form.eqptId)
            .some((item, idnex) => {
              if (item.eqptCode) {
                return item.eqptCode == this.form.eqptCode;
              }
            });
          if (is) {
            this.form.eqptCode = "";
            return callback(new Error("设备编号重复请重新输入！"));
          } else {
            callback();
          }
        })
        .catch(err => {
          callback();
        });
    };
    var assetCode = (rule, val, callback) => {
      // 查询全部已有的固定资产编号
      equipmentEqptNames()
        .then(res => {
          const is = res.data
            .filter(item => item.eqptId !== this.form.eqptId)
            .some((item, idnex) => {
              if (item.assetCode) {
                return item.assetCode == this.form.assetCode;
              }
            });
          if (is) {
            this.form.assetCode = "";
            return callback(new Error("固定资产编号重复请重新输入！"));
          } else {
            callback();
          }
        })
        .catch(err => {
          callback();
        });
    };

    return {
      routerMage: {
        name: "",
        batch: "",
        id: ""
      },
      form: {
        eqptCode: "",
        assetCode: "",
        specificationModel: "",
        eqptType: "",
        eqptName: "",
        eqptLocation: "",
        buyTime: "",
        contractCode: "",
        eqptPrice: "",
        eqptStatus: "",
        eqptLifetime: "",
        eqptLifetimeUnit: "",
        applyTime: "",
        deptName: "",
        dutyDeptId: "",
        dutyUser: "",
        userName: "",
        manufacturer: "",
        supplier: "",
        supplierLinkman: "",
        supplierPhone: "",
        scrapApprover: "",
        scrapApproverTime: "",
        scrapReason: "",
        scrapTime: "",
        remark: ""
      },
      nameList: [],
      rules: {
        eqptCode: [
          { required: true, message: "请输入设备编号", trigger: "blur" },
          { validator: eqptCode, trigger: "blur" }
        ],
        assetCode: [
          { required: true, message: "请输入固定资产编号", trigger: "blur" },
          { validator: assetCode, trigger: "blur" }
        ],
        specificationModel: [
          { required: true, message: "请输入设备型号", trigger: "blur" }
        ],
        supplierPhone: [{ validator: supplierPhone, trigger: "blur" }],
        eqptName: [
          { required: true, message: "请输入设备名称", trigger: "blur" }
        ],
        eqptStatus: [
          { required: true, message: "请选择设备状态", trigger: "blur" }
        ],
        dutyDeptId: [
          { required: true, message: "请选择责任部门", trigger: "blur" }
        ],
        dutyUser: [{ required: true, message: "请选择责任人", trigger: "blur" }]
      },
      deptreeOptions: {
        "node-key": "id"
      },
      loading: false,
      imgList: [],
      fileList: [],
      baofeiFileList: []
    };
  },
  computed: {
    title() {
      const { name } = this.routerMage;
      return name === "insert"
        ? "新增设备信息"
        : name === "update"
          ? "修改设备信息"
          : name === "baofei"
            ? "报废设备信息"
            : "设备信息详情";
    },
    pickerOptions_buyTime() {
      return {
        disabledDate: function(time) {
          return time.getTime() > new Date().getTime();
        }.bind(this)
      };
    },
    pickerOptions_applyTime() {
      return {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          }
        ],
        disabledDate: function(time) {
          return time.getTime() < new Date(this.form.buyTime).getTime();
        }.bind(this)
      };
    },
    pickerOptions_scrapApproverTime() {
      return {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          }
        ],
        disabledDate: function(time) {
          return time.getTime() < new Date(this.form.applyTime).getTime();
        }.bind(this)
      };
    },
    pickerOptions_scrapTime() {
      return {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          }
        ],
        disabledDate: function(time) {
          return (
            time.getTime() < new Date(this.form.scrapApproverTime).getTime()
          );
        }.bind(this)
      };
    }
  },
  watch: {
    "form.buyTime": function(val) {
      if (new Date(this.form.applyTime).getTime() <= new Date(val).getTime()) {
        this.form.applyTime = "";
      }
    },
    "form.applyTime": function(val) {
      if (
        new Date(this.form.scrapApproverTime).getTime() <=
          new Date(val).getTime() ||
        new Date(this.form.scrapApproverTime).getTime() <=
          new Date(this.form.buyTime).getTime()
      ) {
        this.form.scrapApproverTime = "";
      }
    },
    "form.scrapApproverTime": function(val) {
      if (
        new Date(this.form.scrapTime).getTime() <= new Date(val).getTime() ||
        new Date(this.form.scrapTime).getTime() <=
          new Date(this.form.applyTime).getTime() ||
        new Date(this.form.scrapTime).getTime() <=
          new Date(this.form.buyTime).getTime()
      ) {
        this.form.scrapTime = "";
      }
    },
    "form.dutyDeptId": {
      handler(val) {
        userNameTreeselect({ deptId: val }).then(res => {
          this.nameList = res.data;
        });
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 提交函数逻辑
     */
    subFn() {
      const vm = this;
      const { name } = vm.routerMage;
      vm.$refs["form"].validate(valid => {
        if (valid) {
          this.imgList.map(item => {
            item.fileType = "imgList";
            return item;
          });
          this.fileList.map(item => {
            item.fileType = "fileList";
            return item;
          });
          this.baofeiFileList.map(item => {
            item.fileType = "baofeiFileList";
            return item;
          });

          const data = Object.assign(
            {
              equipmentFileList: [
                ...this.imgList,
                ...this.fileList,
                ...this.baofeiFileList
              ]
            },
            vm.form
          );
          if (name === "insert") {
            // 新增的逻辑
            vm.loading = true;
            equipmentInsert(data)
              .then(res => {
                vm.loading = false;
                vm.msgSuccess("新增成功！");
                if (this.routerMage.batch) {
                  vm.resetForm("form");
                  vm.imgList = [];
                  vm.fileList = [];
                  vm.baofeiFileList = [];
                } else {
                  vm.cancelFn();
                }
              })
              .catch(err => {
                vm.loading = false;
              });
          } else if (name === "update") {
            //修改的逻辑
            vm.loading = true;
            equipmentUpdata(data)
              .then(res => {
                vm.loading = false;
                vm.msgSuccess("修改成功！");
                vm.cancelFn();
              })
              .catch(err => {
                vm.loading = false;
              });
          } else if (name === "baofei") {
            if (this.baofeiFileList.length) {
              vm.loading = true;
              // 报废设备信息
              equipmentUpdata(data)
                .then(res => {
                  vm.loading = false;
                  vm.msgSuccess("报废成功！");
                  vm.cancelFn();
                })
                .catch(err => {
                  vm.loading = false;
                });
            } else {
              vm.loading = false;
              this.msgInfo("请上传报废附件！");
            }
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
      this.$router.push({ path: "/Equipment" });
    }
  },
  created() {
    if (this.$route.query) {
      this.routerMage.batch = this.$route.query.batch;
      this.routerMage.name = this.$route.query.name;
      this.routerMage.id = this.$route.query.id;
    }
    // 获取用户树
    this.$store.dispatch("GetnameList");
    /**
     * 详情等初始化查询-设备信息
     */
    if (["update", "baofei", "details"].includes(this.routerMage.name)) {
      equipmentDetails(this.routerMage.id).then(res => {
        this.imgList = res.data.equipmentFileList.filter(
          item => item.fileType === "imgList"
        );
        this.fileList = res.data.equipmentFileList.filter(
          item => item.fileType === "fileList"
        );
        this.baofeiFileList = res.data.equipmentFileList.filter(
          item => item.fileType === "baofeiFileList"
        );
        delete res.data.equipmentFileList;
        this.form = res.data;
        // 报废时自动更改状态为报废（3）
        if (this.routerMage.name === "baofei") {
          this.form.eqptStatus = "3";
        }
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
    font-weight: bold;
  }
  .massage {
    flex: 1 0 auto;
    height: 0;
    background: gainsboro;
    .list {
      flex: 1 0 auto;
      height: 0;
      display: flex;
      flex-direction: column;
      overflow: auto;
      .back-f {
        background: #fff;
        /deep/.el-divider--horizontal {
          margin: 5px 0;
        }
      }
    }
  }
}
/deep/.el-upload .el-upload-dragger {
  min-width: 500px;
  height: 306px;
}
.avatar-uploader-icon {
  font-size: 30px;
  color: #1790ff;
  text-align: center;
  font-weight: bold;
}
</style>

