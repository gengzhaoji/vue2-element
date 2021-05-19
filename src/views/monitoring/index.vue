<template>
  <div class="index">
    正在建设中...
  </div>
</template>
 
<script>
export default {
  name: "index",
  data() {
    return {
      loading: false,
      tableData: [],
      columns: [
        {
          type: "index"
        },
        {
          label: "日期",
          prop: "date"
        },
        {
          label: "姓名",
          prop: "name"
        },
        {
          label: "地址",
          prop: "address"
        }
      ]
    };
  },
  methods: {},
  mounted() {},
  created() {}
};
</script>
 
<style scoped lang = "scss">
.index {
}
</style>