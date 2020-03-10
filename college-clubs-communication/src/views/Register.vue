<template>
  <div class="register">
    <div class="top">
      <div>
        <h3>锦城社团交流平台</h3>
        <p>welcome</p>
      </div>
    </div>
    <div class="register-box">
            <h3>注册</h3>
      <form>
        <div class="input-box">
          <input type="text" placeholder="请输入用户名" />
        </div>
        <div class="input-box">
          <input type="text" placeholder="请输入手机号" />
        </div>
        <div class="input-box">
          <input type="password" placeholder="请输入密码" />
        </div>
        <div class="input-box">
          <input type="password" placeholder="请确认密码" />
        </div>
        <button class="confirm" type="button">注册</button>
      </form>
    </div>
    <router-link to="/login">已有账号</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.register {
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
  .register-box {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px;
    height: 900px;
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