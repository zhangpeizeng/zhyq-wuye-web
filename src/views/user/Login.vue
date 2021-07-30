<template>
  <div class="login-wrap">
    <img
      src="../../assets/login.png"
      class="bg"
      alt=""
    >
    <div class="user">
      <img
        src="../../assets/tree.png"
        alt=""
        class="tree"
      >
      <div class="top">智慧园区后台管理系统</div>
      <div class="type">
        <el-select
          v-model="query.loginType"
          placeholder="请选择"
        >
          <el-option
            label="账号登录"
            :value="1"
          >
          </el-option>
          <!-- <el-option
            label="手机号登录"
            :value="2"
          >
          </el-option>
          <el-option
            label="员工号登录 "
            :value="3"
          >
          </el-option> -->
        </el-select>
      </div>
      <div class="ipt">
        <div class="username">
          <el-input
            placeholder="请输入账号"
            v-model="username"
          ></el-input>
        </div>
        <div class="password">
          <el-input
            placeholder="请输入密码"
            v-model="password"
            show-password
          ></el-input>
        </div>
        <!-- <div class="rember_password">
          <el-checkbox v-model="checked" @keyup.13="login()">记住密码</el-checkbox>
        </div> -->
      </div>
      <div class="login_btn">
        <el-button
          type="primary"
          @click="login"
        >登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Encrypt } from '@/utils/aes'

export default {
  data () {
    return {
      checked: false,
      username: '',
      password: '',
      query: {
        loginType: 1,
        loginSource: 1
      }
    }
  },
  created () {},
  methods: {
    async login () {
      if (
        !this.username ||
        this.username.length < 5 ||
        this.username.length > 18 ||
        !this.password
      ) {
        this.$message.error('请输入正确的用户名和密码~')
        return
      }
      this.query.accountName = this.username
      this.query.password = Encrypt(this.password)
      const data = await this.$api.userApi.userLogin(this.query)
      this.$store.dispatch('Login', data).then(() => {
        this.$router.push('/home')
      })
    }
  },
  mounted () {
    document.onkeydown = (e) => {
      if (
        e.keyCode === 13 &&
        document.body.getElementsByClassName('login-wrap')[0]
      ) {
        this.login()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  width: 100vw;
  height: 100vh;
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -100;
  }
  .user {
    border-radius: 11px;
    width: 450px;
    height: 434px;
    background: #fff;
    padding: 40px 50px;
    font-size: 24px;
    color: #5273e1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.13);
    position: absolute;
    right: 15%;
    top: 20%;
    .tree {
      position: absolute;
      right: -148px;
      top: 180px;
      width: 138px;
      height: 227px;
      clear: both;
    }
    .top {
      font-size: 24px;
      font-weight: 600;
      color: rgba(51, 119, 255, 1);
      line-height: 24px;
      text-shadow: 0px 2px 14px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }
    .type {
      width: 100%;
      > div {
        width: 100%;
      }
    }
    .ipt {
      width: 100%;
    }
    .username {
      width: 100%;
      height: 44px;
    }
    .password {
      width: 100%;
      height: 44px;
      margin-top: 20px;
    }
    .login_btn {
      width: 100%;
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
