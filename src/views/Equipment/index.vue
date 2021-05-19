<template>
  <div class="index">
    <div class="padding-10">
      <el-form
        inline
        ref="ruleForm"
        label-position="right"
        :model="form"
        class="validate--bottom"
      >
        <el-form-item
          label="设备编号"
          prop='eqptCode'
        >
          <com-input
            v-model="form.eqptCode"
            placeholder="请输入设备编号"
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item
          label="设备型号"
          prop='specificationModel'
        >
          <com-input
            v-model="form.specificationModel"
            placeholder="请输入设备型号"
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item
          label="设备类型"
          prop='eqptType'
        >
          <com-select
            type='GeteqptTypeList'
            v-model="form.eqptType"
            placeholder="请选择设备类型"
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item
          label="设备名称"
          prop='eqptName'
        >
          <com-input
            v-model="form.eqptName"
            placeholder="请输入设备名称"
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item
          label="设备状态"
          prop='eqptStatus'
        >
          <com-select
            v-model="form.eqptStatus"
            placeholder="请选择设备状态"
            :list='$store.getters.eqptStatusList'
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item
          label="部署位置"
          prop='eqptLocation'
        >
          <com-input
            v-model="form.eqptLocation"
            placeholder="请输入部署位置"
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item>
          <com-button
            type="primary"
            icon='el-icon-search'
            @click.prevent="getList"
          >搜 索</com-button>
          <com-button
            icon='el-icon-refresh'
            @click.prevent="resetForm('ruleForm'),$refs.table.reload()"
          >重 置</com-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="padding-10 massage flex-col">
      <div class="list">
        <div class="padding-10">
          <com-button
            plain
            type="primary"
            @click.prevent="insertFn(true)"
            icon="el-icon-plus"
          >批 量 新 增</com-button>
          <com-button
            plain
            type="primary"
            @click.prevent="insertFn(false)"
            icon="el-icon-plus"
          >新 增</com-button>
          <com-button
            plain
            type="info"
            @click.prevent="exportFn"
            icon="el-icon-download"
            :disabled="exportLoad"
          >{{exportLoad?"导出中...":"导 出"}}</com-button>
          <com-button
            plain
            type="danger"
            @click.prevent="deleteFn"
            icon="el-icon-delete"
          >删 除</com-button>
        </div>

        <xdh-list-panel
          ref='table'
          :load="loadData"
          :state="state"
        >
          <xdh-table
            slot-scope="table"
            :data="state.list"
            :columns="state.columns"
            @selection-change="(val)=>{multipleSelection = val}"
          >
            <template
              slot='index'
              slot-scope="scope"
            >
              {{scope.$index + 1 + ($refs.table.currentPage- 1) * $refs.table.pageSize }}
            </template>
            <template
              slot='eqptType'
              slot-scope="scope"
            >
              {{ selectDictLabel($store.getters.eqptTypeList, scope.row.eqptType) }}
            </template>
            <template
              slot='eqptStatus'
              slot-scope="scope"
            >
              {{ selectDictLabel($store.getters.eqptStatusList, scope.row.eqptStatus) }}
            </template>
            <template slot-scope="scope">
              <com-button
                :disabled="['3'].includes(scope.row.eqptStatus)"
                @click.prevent="baofeiFn(scope.row)"
                type="text"
                class="caozuo"
              >报废</com-button>
              <com-button
                @click.prevent="detailsFn(scope.row)"
                type="text"
                class="caozuo"
              >详情</com-button>
              <com-button
                :disabled="['3'].includes(scope.row.eqptStatus)"
                type="text"
                class="caozuo"
                @click.prevent='updateFn(scope.row)'
              >修改</com-button>
            </template>
          </xdh-table>
        </xdh-list-panel>
      </div>
    </div>
  </div>
</template>
 
<script>
/**
 * 接口部分
 */
import {
  equipmentList,
  equipmentExport,
  equipmentDelete
} from "@api/Equipment";
import store from "@/store";

export default {
  name: "Equipment",
  data() {
    return {
      exportLoad: false,
      name: "",
      form: {
        eqptCode: "",
        specificationModel: "",
        eqptType: "",
        eqptName: "",
        eqptLocation: "",
        eqptStatus: ""
      },
      state: {
        total: 0,
        list: [],
        columns: [
          {
            type: "selection",
            //设置置禁止选中的条件：
            selectable: function(row) {
              return row.dutyUser === store.getters.user.userId;
            }
          },
          {
            label: "序号",
            width: "80",
            prop: "index"
          },
          {
            label: "设备编号",
            prop: "eqptCode"
          },
          {
            label: "固定资产编号",
            prop: "assetCode"
          },
          {
            label: "设备名称",
            prop: "eqptName"
          },
          {
            label: "设备型号",
            prop: "specificationModel"
          },
          {
            label: "设备类型",
            prop: "eqptType"
          },
          {
            label: "设备状态",
            prop: "eqptStatus"
          },
          {
            label: "部署位置",
            prop: "eqptLocation"
          },
          {
            label: "责任部门",
            prop: "deptName"
          },
          {
            label: "责任人",
            prop: "userName"
          },
          {
            label: "操作",
            width: "180"
          }
        ]
      },
      multipleSelection: []
    };
  },
  methods: {
    // 本页面的查询函数
    getList() {
      this.$refs.table.loadData();
    },
    // 初始化表格查询逻辑
    loadData(pageNum, pageSize) {
      return equipmentList(
        Object.assign({ pageNum, pageSize }, this.form)
      ).then(res => {
        this.state.total = res.total;
        this.state.list = res.rows;
        this.$store.dispatch("GeteqptNameTree", true);
        this.$store.dispatch("GetspecificationModel", true);
      });
    },
    // 新增设备信息
    insertFn(batch) {
      this.name = "insert";
      this.$router.push({
        path: "/Equipment-Add",
        query: { name: this.name, batch: batch }
      });
    },
    // 修改设备信息
    updateFn(row) {
      this.name = "update";
      this.$router.push({
        path: "/Equipment-Add",
        query: { id: row.eqptId, name: this.name }
      });
    },
    // 设备信息详情
    detailsFn(row) {
      this.name = "details";
      this.$router.push({
        path: "/Equipment-Add",
        query: { id: row.eqptId, name: this.name }
      });
    },
    // 删除设备
    deleteFn() {
      if (this.multipleSelection.length === 0) {
        this.msgInfo("请选择需要删除的数据！");
      } else {
        this.$$confirm("此操作将永久删除选中数据, 是否继续?")
          .then(() => {
            equipmentDelete(
              this.multipleSelection.map(item => item.eqptId)
            ).then(() => {
              if (this.multipleSelection.length === this.state.list.length) {
                if (this.$refs.table.lastcurrentPage) {
                  this.$refs.table.reload();
                } else {
                  this.getList();
                }
              } else {
                this.getList();
              }
              this.msgSuccess("删除成功");
            });
          })
          .catch(() => {
            this.msgInfo("已取消删除！");
          });
      }
    },
    // 导出设备
    exportFn() {
      this.$$confirm()
        .then(() => {
          this.exportLoad = true;
          equipmentExport(this.form).finally(() => {
            this.exportLoad = false;
          });
        })
        .catch(() => {
          this.msgInfo("已取消导出！");
        });
    },
    // 报废设备
    baofeiFn(row) {
      this.name = "baofei";
      this.$router.push({
        path: "/Equipment-Add",
        query: { id: row.eqptId, name: this.name }
      });
    }
  },
  created() {
    this.$store.dispatch("GeteqptStatusList");
  },
  activated() {
    if (!["", "details"].includes(this.name)) {
      this.getList();
    }
  },
  // keepalive缓存的使用
  beforeRouteLeave(to, from, next) {
    // 前往详情页时缓存组件
    if (to.path === "/Equipment-Add") {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
      this.$destroy();
    }
    next();
  }
};
</script>
 
<style scoped lang = "scss">
.index {
  .massage {
    flex: 1 0 auto;
    height: 0;
    background: gainsboro;
    .list {
      background: #fff;
      flex: 1 0 auto;
      height: 0;
      display: flex;
      flex-direction: column;
      /deep/.r45 {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
