<template>
  <div class="login">
    <div class="top">
      <div>
        <h3>锦城社团交流平台</h3>
        <p>welcome</p>
      </div>
    </div>
    <div class="login-box">
      <h3>登陆</h3>
      <form>
        <div class="input-box">
          <input type="text" placeholder="请输入手机号" v-model="username" />
        </div>
        <div class="input-box">
          <input type="password" placeholder="请输入密码" v-model="userpass" />
        </div>
        <button class="confirm" type="button" @click="getLogin">登陆</button>
      </form>
    </div>
    <router-link to="/register">免费注册</router-link>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      userpass: ""
    };
  },
  methods: {
    getLogin() {
      console.log("登录");
      this.axios
        .post("/users/login", {
          username: this.username,
          userpass: this.userpass
        })
        .then(res => {
          console.log(res.data);
          if (res.data.state == "200") {
            var token = res.data.token;
            var userId = res.data.userId;
            console.log(userId);
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userId", userId);

            // 获取参数（未登录时想访问的路由）
            var url = this.$route.query.redirect;

            url = url ? url : "/home";
            // 切换路由
            this.$router.replace(url);
          } else {
            console.log("登陆失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.login {
  background: #fff;
  width: 100%;
  height: 100vh;
  text-align: center;
  .top {
    background: @theme;
    border-radius: 0 0 240px 240px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    p {
      font-weight: 300;
    }
  }
  .login-box {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px;
    height: 700px;
    text-align: center;
    form {
      width: 100%;
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .input-box {
        width: 100%;
        input {
          text-indent: 50px;
          box-sizing: border-box;
          width: 100%;
          height: 100px;
          border-radius: 40px;
          border: 1px solid #ccc;
          padding: 20px 10px;
          outline: none;
          font-size: 34px;
        }
      }
      .confirm {
        width: 100%;
        height: 100px;
        border: none;
        border-radius: 60px;
        background: @theme;
        font-size: 30px;
        font-weight: 600;
        letter-spacing: 10px;
        color: #fff;
        box-shadow: 0 0 30px #999;
        outline: none;
      }
    }
  }
}
</style>