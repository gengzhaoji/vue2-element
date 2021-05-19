<template>
  <div
    class="f1 h0 flex-col"
    v-loading='loading'
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <slot
      :list="list"
      :page="currentPage"
      :size="pageSize"
    ></slot>
    <div
      class="padding-10"
      v-if="pager"
    >
      <xdh-pager
        :total="total"
        :page="currentPage"
        :size="pageSize"
        :sizes="sizes"
        layout="total,sizes, ->, prev, pager, next, jumper,slot"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
        v-bind="pagerOptions"
      >
        <slot
          v-if="$slots['pager-custom']"
          name="pager-custom"
        ></slot>
      </xdh-pager>
    </div>
  </div>
</template>

<script>
import XdhPager from "../xdh-pager";

/**
 * 插槽
 * @member slot
 * @property {String} [pager-custom] 分页组件自定义内容
 */

/**
 * 作用域插槽
 * @member scopedSlots
 * @property {String} default 定义列表内容，参数 list：列表数据， height：容器高度, page: 页码， pageSize：页大小
 */

export default {
  name: "XdhListPanel",
  componentName: "ListPanel",
  components: {
    XdhPager
  },
  /**
   * 参数属性

   * @property {Boolean} [pager = true] 是否使用分页控件
   * @property {Number} [size = 10] 分页每页显示记录条数
   * @property {Array} [sizes = [10, 20, 50, 100]] 显示分页每页的记录数选项（见分页控件）
   * @property {Object} [state = {list: [], total: 0}] 列表的state, 必须包含 list 和 total 如：{total:0, list:[]}
   * @property {Array} [state.list = []] listPanel 的列表数据
   * @property {Number} [state.total] 列表的总条数
   * @property {Function(page,size)} [load] 数据加载函数，参数为 加载页和 单页数量。需要返回 promise
   * @property {Boolean} [isAuto = true] 是否在组件初始化时自动加载数据
   * @property {Object} [pagerOptions] 分页组件参数选项
   */
  props: {
    // 分页每页显示记录条数
    size: {
      type: Number,
      default: 20
    },
    // 显示分页每页的记录数选项
    sizes: {
      type: Array,
      default() {
        return [5, 10, 20, 30, 50, 100];
      }
    },
    // 列表的state, 必须包含 list 和 total 如：{total:0, list:[]}
    state: {
      type: Object,
      default() {
        return {
          total: 0,
          list: []
        };
      }
    },
    // 加载数据函数，传入参数：page，size，必须要返回Promise
    load: {
      type: Function,
      default: null
    },
    // 是否在初始化时自动加载数据
    isAuto: {
      type: Boolean,
      default: true
    },
    // 是否显示分页
    pager: {
      type: Boolean,
      default: true
    },
    // 分页组件参数选项
    pagerOptions: {
      type: Object
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: this.size,
      loading: false
    };
  },
  computed: {
    list() {
      return this.state.list || [];
    },
    total() {
      return this.state.total || 0;
    },
    lastcurrentPage() {
      return this.currentPage === Math.ceil(this.total / this.pageSize);
    }
  },
  methods: {
    /**
     * 加载数据， 内部调用从组件props传入‘load’函数
     * @Function loadData
     */
    loadData() {
      if (!this.load || this.loading) return;
      this.loading = true;
      this.load(this.currentPage, this.pageSize)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    /**
     * 分页器页码变动是触发的函数
     * @Function handlePageChange
     * @param page
     */
    handlePageChange(page) {
      this.currentPage = page;
      this.loadData();
    },
    /**
     * 分页器每页数量变动时触发的函数
     * @Function handleSizeChange
     * @param size
     */
    handleSizeChange(size) {
      this.currentPage = 1;
      this.pageSize = size;
      this.loadData();
    },
    /**
     * 组件重置函数
     * @Function reload
     */
    reload() {
      this.currentPage = 1;
      this.loadData();
    }
  },
  created() {
    this.isAuto && this.loadData();
  }
};
</script>
