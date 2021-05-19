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
          label="备件编号"
          prop='spareCode'
        >
          <com-input
            v-model="form.spareCode"
            placeholder="请输入备件编号"
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item
          label="备件名称"
          prop='spareName'
        >
          <com-input
            v-model="form.spareName"
            placeholder="请输入备件名称"
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item
          label="备件型号"
          prop='spareModel'
        >
          <com-input
            v-model="form.spareModel"
            placeholder="请输入备件型号"
            @keyup.enter.native="getList"
          />
        </el-form-item>
        <el-form-item
          label="单位"
          prop='spareUnit'
        >
          <com-input
            v-model="form.spareUnit"
            placeholder="请输入单位"
            @keyup.enter.native="getList"
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
            @click.prevent="insertFn"
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
              slot='spareType'
              slot-scope="scope"
            >
              {{ selectDictLabel($store.getters.spareType, scope.row.spareType) }}
            </template>
            <template slot-scope="scope">
              <com-button
                @click.prevent="detailsFn(scope.row)"
                type="text"
                class="caozuo"
              >详情</com-button>
              <com-button
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
import { List, Export, Delete } from "@api/sparePart";

export default {
  name: "sparePart",
  data() {
    return {
      exportLoad: false,
      name: "",
      form: {
        spareCode: "",
        spareName: "",
        spareModel: "",
        spareUnit: "",
        spareType: ""
      },
      state: {
        total: 0,
        list: [],
        columns: [
          {
            type: "selection"
          },
          {
            label: "序号",
            width: "80",
            prop: "index"
          },
          {
            label: "备件编号",
            prop: "spareCode"
          },
          {
            label: "备件名称",
            prop: "spareName"
          },
          {
            label: "备件型号",
            prop: "spareModel"
          },
          {
            label: "单位",
            prop: "spareUnit"
          },
          {
            label: "数量",
            prop: "spareNum"
          },
          {
            label: "分类",
            prop: "spareType"
          },
          {
            label: "工序",
            prop: "spareProcess"
          },
          {
            label: "操作",
            width: "150",
            
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
      return List(Object.assign({ pageNum, pageSize }, this.form)).then(res => {
        this.state.total = res.total;
        this.state.list = res.rows;
      });
    },
    // 新增设备信息
    insertFn() {
      this.name = "insert";
      this.$router.push({ path: "/sparePart-Add", query: { name: this.name } });
    },
    // 修改设备信息
    updateFn(row) {
      this.name = "update";
      this.$router.push({
        path: "/sparePart-Add",
        query: { id: row.sparePartsId, name: this.name }
      });
    },
    // 设备信息详情
    detailsFn(row) {
      this.name = "details";
      this.$router.push({
        path: "/sparePart-Add",
        query: { id: row.sparePartsId, name: this.name }
      });
    },
    // 删除设备
    deleteFn() {
      if (this.multipleSelection.length === 0) {
        this.msgInfo("请选择需要删除的数据！");
      } else {
        this.$$confirm("此操作将删除选中数据, 是否继续?")
          .then(() => {
            Delete(this.multipleSelection.map(item => item.sparePartsId)).then(
              () => {
                if (this.multipleSelection.length === this.state.list.length) {
                  if (this.$refs.table.lastcurrentPage) {
                    this.$refs.table.reload();
                  } else {
                    this.getList();
                  }
                } else {
                  this.getList();
                }
                this.msgSuccess("删除成功！");
              }
            );
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
          Export(this.form).finally(() => {
            this.exportLoad = false;
          });
        })
        .catch(() => {
          this.msgInfo("已取消导出！");
        });
    }
  },
  activated() {
    if (!["", "details"].includes(this.name)) {
      this.getList();
    }
  },
  // keepalive缓存的使用
  beforeRouteLeave(to, from, next) {
    // 前往详情页时缓存组件
    if (to.path === "/sparePart-Add") {
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
    }
  }
}
</style>
