<template>
  <div id="layout">
    <el-container>
      <!--头部-->
      <el-header
        class="header"
        height='80px'
      >
        <div
          class="title"
          :style='{width : aside_width}'
        >
          <transition name="sidebarLogoFade">
            <div
              v-if="collapse"
              key="collapse"
            >
              <img
                class="juzhong_transform"
                src="@/assets/img/logo.png"
                alt=""
              >
            </div>
            <div
              v-else
              key="expand"
            >
              <img
                src="@/assets/img/logo.png"
                alt=""
              >
              <span class="margin-left-10">富全矿山</span>
            </div>
          </transition>
        </div>
        <div class="f1 flex">
          <i
            class=""
            @click.prevent="collapse = !collapse"
            :class="[collapse?'icon-menu2':'icon-menu', 'btn']"
          ></i>
          <div class="message f1">
            <div class="li">
              <el-avatar
                class="tou"
                :src="$store.getters.avatar"
              ></el-avatar>
              <el-dropdown style="vertical-align: top;">
                <span class="el-dropdown-link">
                  {{$store.getters.user.userName}}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="$router.push({path:'/user/profile'})">个人中心</el-dropdown-item>
                  <el-dropdown-item
                    @click.native="logout"
                    divided
                  >退出登陆</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside
          :width="aside_width"
          :class="{'collapse':!collapse}"
        >
          <xdh-menu-toggle
            class="menu"
            :data="menus"
            :collapse="collapse"
            :default-active="activeMenu"
            @open="navSelect"
            @select="navSelect"
            unique-opened
          ></xdh-menu-toggle>
        </el-aside>

        <div class="main">
          <div class="content">
            <!--面包屑导航-->
            <div class="padding-10">
              <breadcrumb
                id="breadcrumb-container"
                class="breadcrumb-container"
              />
            </div>
            <div style='height: calc(100% - 56px)'>
              <!--内容区-->
              <transition
                name="fade-transform"
                mode="out-in"
              >
                <keep-alive>
                  <router-view
                    v-if="$route.meta.keepAlive"
                    :key="$route.path"
                  ></router-view>
                </keep-alive>
              </transition>
              <transition
                name="fade-transform"
                mode="out-in"
              >
                <router-view
                  v-if="!$route.meta.keepAlive"
                  :key="$route.path"
                ></router-view>
              </transition>
            </div>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
 
<script>
import { treeToArray } from "@utils/convert";
import { menus } from "@/config/menus";
import store from "@/store";

export default {
  name: "layout",
  components: {
    XdhMenuToggle: () => import("@com/xdh-menu-toggle"),
    Breadcrumb: () => import("@com/Breadcrumb")
  },
  inject: ["screenWidth"],
  data() {
    return {
      collapse: false,
      activeName: "通知",
      tabs: [3, 2, 3]
    };
  },
  computed: {
    width: function() {
      let width = this.screenWidth() * 0.2;
      if (width < 220) {
        width = 220;
      } else if (width > 300) {
        width = 300;
      }
      return width;
    },
    aside_width: function() {
      return this.collapse ? "65px" : `${this.width + 1}px`;
    },
    activeMenu() {
      const { meta, path } = this.$route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path.split("-")[0];
    },
    menus() {
      // return process.env.VUE_APP_TI !== "" ? this.$store.getters.menu : menus;
      return menus;
    }
  },
  methods: {
    logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.href = "/";
        });
      });
    },
    navSelect(id, path) {
      this.$router.push(id);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
$--line-height: 80px;
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

#layout {
  height: 100%;
  width: 100%;
  display: flex;

  .header {
    display: flex;
    padding: 0;
    border-bottom: 1px solid grey;
    box-shadow: 0px 0px 5px grey;
    background: #001629;
    .title {
      transition: all 0.3s;
      text-align: center;
      color: #ffffff;
      height: $--line-height;
      line-height: $--line-height;
      letter-spacing: 5px;
      > div {
        position: relative;
        height: 100%;
        img {
          height: 35px;
          vertical-align: text-bottom;
        }
        .margin-left-10 {
          font-size: 38px;
          font-weight: 100;
          font-family: "youshe";
          display: inline-block;
        }
      }
    }
    .f1 {
      .btn {
        font-size: 26px;
        color: #1890ff;
        line-height: $--line-height;
        cursor: pointer;
      }
      .message {
        flex: 1 0 auto;
        width: 0;
        height: $--line-height;
        text-align: right;
        .li {
          .icon-bell {
            color: #ffffff;
            font-size: 20px;
          }
          padding: 0 10px;
          display: inline-block;
          cursor: pointer;
        }
        .li:last-child {
          line-height: $--line-height;
          .tou {
            transform: translate(0, 15px);
            margin-right: 5px;
          }
          /deep/.el-dropdown-link {
            font-size: 20px;
            color: #ffffff;
          }
        }
      }
    }
  }

  /deep/.el-aside {
    overflow-x: hidden;
    border-right: 1px solid grey !important;
    box-shadow: 0px 5px 5px grey;
    z-index: 1;
  }
  .xdh-menu-toggle {
    position: relative;
    height: calc(100% - 40px);
  }
  .menu {
    /deep/.el-menu {
      background-color: transparent;
    }

    /deep/.el-menu-item,
    /deep/.el-submenu__title {
      border-left: 4px solid transparent;
      transition: border-left 0.2s;
    }
    /deep/div[class="el-submenu__title"]:hover {
      @include linear-gradient-lr(#e8f4fe, rgba(232, 244, 254, 0.1));
    }
    /deep/.el-menu-item.is-active {
      color: #1890ff;
      border-left: 4px solid #1890ff;
      @include linear-gradient-lr(#e8f4fe, rgba(232, 244, 254, 0.1));
    }
    /deep/.el-submenu.is-active {
      @include linear-gradient-lr(#e8f4fe, rgba(232, 244, 254, 0.1));
    }
    /deep/.el-menu-item:focus,
    /deep/.el-menu-item:hover {
      @include linear-gradient-lr(#e8f4fe, rgba(232, 244, 254, 0.1));
    }
    /deep/.is-opened {
      background: #f6f8fb !important;
    }
  }
  .main {
    padding: 0px;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    width: 0;
    position: relative;
    .content {
      position: absolute;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
