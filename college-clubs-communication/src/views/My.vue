<template>
  <div class="my">
    <div class="top">
      <p class="title">我的</p>
      <div class="user-infom">
        <div class="avatar" v-if="userInfo.user_avatar">
          <img :src="imgIp + userInfo.user_avatar" alt />
        </div>
        <div class="text">
          <p class="name">{{userInfo.user_name}}</p>
          <p class="department">{{userInfo.user_department}}</p>
        </div>
      </div>
      <ul class="box">
        <li>
          <div class="box-item">
            <van-icon color="#fe7192" size="34" name="fire" />
          </div>
          <p>我的活动</p>
        </li>
        <li>
          <div class="box-item">
            <van-icon color="#39a9ed" size="34" name="friends" />
          </div>
          <p>我的社团</p>
        </li>
      </ul>
    </div>
    <ul class="options">
      <li>
        <div class="option-left">
          <van-icon size="28" name="user-o" />
          <span>我的信息</span>
        </div>
        <van-icon name="arrow" />
      </li>
      <li>
        <div class="option-left">
          <van-icon size="28" name="comment-o" />
          <span>消息通知</span>
        </div>
        <van-icon name="arrow" />
      </li>
      <li>
        <div class="option-left">
          <van-icon size="28" name="question-o" />
          <span>使用攻略</span>
        </div>
        <van-icon name="arrow" />
      </li>
    </ul>
    <div class="bottom">
      <button @click="diaLog" class="log-out">退出登录</button>
    </div>
  </div>
</template>

<script>
/* import Top from "@/components/Top.vue"; */
import Vue from "vue";
import { Icon, Dialog } from "vant";

Vue.use(Icon);
Vue.use(Dialog);

export default {
  name: "my",
  data() {
    return {
      userId: 0,
      imgIp: "",
      userInfo: []
    };
  },
  created() {
    this.userId = sessionStorage.getItem("userId"); //获取userid

    this.imgIp = this.$store.state.imgAddress; //获取图片地址

    this.axios
      .get(`/users/userinfo?userId=${this.userId}`) //请求用户信息
      .then(res => {
        if (res.data.state == 200) {
          this.userInfo = res.data.data[0];
          console.log(this.userInfo);
        }
      });
  },
  methods: {
    diaLog() {
      Dialog.confirm({
        title: "确认退出?"
      })
        .then(() => {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("userId");
          this.$router.replace("/login");
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.my {
  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: 100px;
  .top {
    width: 100%;
    height: 500px;
    background: @theme;
    border-radius: 0 0 400px 0;
    padding: 30px 20px;
    box-sizing: border-box;
    .title {
      font-size: 50px;
      color: #fff;
      margin-bottom: 20px;
      text-align: center;
    }
    .user-infom {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 120px;
      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        color: #fff;
        display: flex;
        height: 80%;
        flex-direction: column;
        justify-content: space-between;
        .name {
          font-size: 34px;
          font-weight: 600;
        }
        .department {
          font-size: 28px;
        }
      }
    }
    .box {
      width: 100%;
      height: 160px;
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 0 10px #eee;
      margin-top: 30px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      li {
        height: 78%;
        flex-direction: column;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .box-item {
          width: 80px;
          height: 80px;
          background: @theme;
          border-radius: 50%;
          box-shadow: 0 0 30px @theme;
          /*  color:  */
          display: flex;
          justify-content: center;
          align-items: center;
        }
        p {
          font-size: 24px;
          color: #333;
        }
      }
    }
  }
  .options {
    padding: 20px;
    box-sizing: border-box;
    li {
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgb(245, 245, 245);
      .option-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          font-size: 34px;
          margin-left: 20px;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    text-align: center;
    margin-top: 140px;
    .log-out {
      width: 500px;
      height: 90px;
      border: none;
      background: @theme;
      color: #fff;
      font-size: 40px;
      border-radius: 10px;
    }
  }
}
</style>