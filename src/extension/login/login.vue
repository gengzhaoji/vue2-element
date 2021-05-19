<template>
  <div class="login">
    <el-form
      class="validate--bottom login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="content">
        <h2 class="title flex-y-center"><img
            src="@/assets/img/logo2.png"
            alt=""
          >{{NAME}}</h2>
        <el-form-item prop="username">
          <el-input
            ref="username"
            size='medium'
            v-model="loginForm.username"
            placeholder="账号"
            prefix-icon="icon-username"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            size='medium'
            v-model="loginForm.password"
            show-password
            placeholder="密码"
            prefix-icon="icon-password"
            @keyup.enter.native="handleLogin"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            ref="code"
            size='medium'
            v-model="loginForm.code"
            placeholder="验证码"
            style="width: 70%"
            prefix-icon="icon-code"
            @keyup.enter.native="handleLogin"
          >
          </el-input>
          <div class="login-code tr">
            <img
              :src="codeUrl"
              @click.prevent="getCode"
              class="login-code-img"
            />
          </div>
        </el-form-item>
        <div class="flex m-between">
          <el-checkbox
            v-model="loginForm.rememberMe"
            style="margin:0px 0px 25px 0px;"
          >记住密码</el-checkbox>
          <div
            class="tr"
            style="color: #B4B4B4;"
          >
            公测中...
          </div>
        </div>
        <el-form-item style="width:100%;">
          <el-button
            size='medium'
            :loading="loading"
            type="primary"
            style="width:100%"
            @click.prevent="handleLogin"
          >
            {{loading?'登 录 中...':'登 录'}}
          </el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import { set, get, remove, has } from "@/utils/cookie";
import { NAME } from "@/config";
export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      loginForm: {
        username: has("username") ? get("username") : "",
        password: has("password") ? decrypt(get("password")) : "",
        rememberMe: has("rememberMe") ? Boolean(get("rememberMe")) : false,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined,
      NAME
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    } else {
      this.$refs.code.focus();
    }
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            const time = 30 * 24 * 60 * 60;
            set("username", this.loginForm.username, time);
            set("password", encrypt(this.loginForm.password), time);
            set("rememberMe", this.loginForm.rememberMe, time);
          } else {
            remove("username");
            remove("password");
            remove("rememberMe");
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" }).catch(() => {});
            })
            .catch(() => {
              this.loading = false;
              this.getCode();
            });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  background-image: url("./images/background2.png"),
    url("./images/background.png");
  background-size: auto 90%, cover;
  background-repeat: no-repeat;
  background-position: 25% 50%, center;
  position: relative;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  min-width: 500px;
  padding: 25px 25px 0 25px;
  position: absolute;
  top: 5%;
  right: 8%;
  height: 84%;
  box-sizing: border-box;
  background-image: url("./images/wave.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: 100%;
  .content {
    position: relative;
    top: 50%;
    transform: translateY(-80%);
    .title {
      font-family: "youshe";
      letter-spacing: 4px;
      margin: 0px auto 30px auto;
      color: #242424;
      font-size: 32px;
      font-weight: 100;
      > img {
        height: 30px;
        margin-right: 10px;
      }
    }
    .el-input {
      height: 36px;
      font-size: 18px;
      input {
        height: 36px;
      }
    }
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 30%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.login-code-img {
  height: 36px;
}
</style>
