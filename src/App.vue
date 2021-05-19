<template>
  <div id="app">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view v-if='isRouter'></router-view>
    </transition>
  </div>
</template>

<script>
import { debounce } from "@utils/util";
export default {
  name: "APP",
  data() {
    return {
      isRouter: true,
      screenWidth: document.documentElement.clientWidth //屏幕宽度
    };
  },
  provide() {
    return {
      screenWidth: () => this.screenWidth
    };
  },
  watch: {
    screenWidth: {
      // 通过handler来监听属性变化, 初次调用 newValue为""空字符串， oldValue为 undefined
      handler(newValue, oldValue) {
        let size = "";
        if (newValue > 1920) {
          size = "medium";
        } else if (newValue > 1200 && newValue <= 1920) {
          size = "small";
        } else {
          size = "mini";
        }
        if (this.$ELEMENT.size !== size) {
          this.$ELEMENT.size = size;
          // this.reload();
        }
        this.$store.commit("SET_SIZE", size);
      },
      // 配置立即执行属性
      immediate: true
    }
  },
  mounted() {
    var _this = this;
    window.onresize = debounce(function() {
      // 定义窗口大小变更通知事件
      _this.screenWidth = document.documentElement.clientWidth; //窗口宽度
    }, 150);
  },
  methods: {
    reload() {
      this.isRouter = false;
      this.$nextTick(function() {
        this.isRouter = true;
      });
    }
  }
};
</script>

<style scoped lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
