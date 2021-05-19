<template>
  <div
    class="xdh-menu-toggle"
    :class="{'is-collapse': collapse}"
  >
    <!--el-scrollbar组件设置高度100%包裹住需要滚动的dom结构即可。-->
    <el-scrollbar class="xdh-menu-toggle--expand">
      <!--width/height:100%-->
      <xdh-menu
        :collapse="false"
        v-on="$listeners"
        v-bind="$attrs"
      ></xdh-menu>
    </el-scrollbar>

    <xdh-menu
      class="xdh-menu-toggle--collapse"
      :collapse="true"
      v-on="$listeners"
      v-bind="$attrs"
    ></xdh-menu>

  </div>
</template>

<script>
/**
 * 折叠菜单组件
 * @module widgets/xdh-menu-toggle
 * @example
 *
 * // 使用说明
 */
import XdhMenu from '../xdh-menu/xdh-menu.vue'

export default {
  name: 'XdhMenuToggle',
  components: {
    XdhMenu
  },
  props: {
    // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
    collapse: Boolean,
  }
}
</script>

<style lang="scss" scoped>
$menu-toggle-index: 1000;

@mixin toggle-common {
  position: absolute;
  top: 0;
  transition: transform 0.3s;
}

.xdh-menu-toggle {
  position: relative;
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  @at-root {
    &--expand {
      width: 100%;
      height: 100%;
    }

    &--collapse {
      @include toggle-common;
      transform: translate3d(-100%, 0, 0);
      z-index: $menu-toggle-index;
      height: 100%;
      .el-scrollbar__wrap {
        overflow: visible;
      }
      .el-menu-item-group .el-submenu__title > span {
        display: none;
      }
    }

    &--expand {
      @include toggle-common;
    }
  }

  &.is-collapse {
    .xdh-menu-toggle--collapse {
      transform: translate3d(0, 0, 0);
    }

    .xdh-menu-toggle--expand {
      transform: translate3d(-200%, 0, 0);
    }
  }
}
</style>

