<template>
  <div>
    <div class="top">
      <div class="back" @click="back">
        <van-icon color="#fff" size="30" name="arrow-left" />
      </div>
      <img v-if="activityDetail.activity_imgs" :src="imgIp + activityDetail.activity_imgs" alt />
    </div>
    <div class="content">
      <div class="content-top">
        <p class="title">详情</p>
        <div v-if="activityDetail.isactive == 1">
          <button v-if="activityDetail.user_id == null" class="join" @click="join">报名</button>
          <button v-else class="joined">已报名</button>
        </div>
      </div>
      <div class="info">
        <div class="name">
          <p>{{activityDetail.activity_name}}</p>
          <span v-if="activityDetail.isactive == 1" class="active">报名中</span>
          <span v-else class="end">已截止</span>
        </div>
        <div class="content-item">
          <p class="title">活动简介</p>
          <p class="text">{{activityDetail.activity_intro}}</p>
        </div>
        <div class="content-item">
          <p class="title">活动地址</p>
          <p class="text">{{activityDetail.activity_address}}</p>
        </div>
        <div class="content-item">
          <p class="title">活动时间</p>
          <p class="text">{{activityDetail.activity_time}}</p>
        </div>
        <div class="content-item">
          <p class="title">承办方</p>
          <p class="text">{{activityDetail.club_name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon, Toast } from "vant";

Vue.use(Toast);
Vue.use(Icon);

export default {
  name: "activityDetail",
  data() {
    return {
      activityId: 0,
      activityDetail: {},
      userId: 0
    };
  },
  created() {
    this.activityId = this.$route.params.activityId; //获取活动id

    this.imgIp = this.$store.state.imgAddress;

    this.userId = sessionStorage.getItem("userId");

    this.axios
      .get(
        `/activity/activityDetail?userId=${this.userId}&activityId=${this.activityId}`
      )
      .then(res => {
        if (res.data.state == 200) {
          this.activityDetail = res.data.data[0];
          console.log(this.activityDetail);
        }
      });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    join() {
      let param = new URLSearchParams();
      param.append("userId", this.userId);
      param.append("activityId", this.activityId);
      this.axios.post("/activity/joinactivity", param).then(res => {
        if (res.data.state == 200) {
          this.$set(this.activityDetail, `user_id`, this.userId)
          Toast.success("报名成功");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.top {
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -50px;
  img {
    height: 100%;
  }
}
.content {
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  background: #fff;
  position: relative;
  z-index: 1;
  border-radius: 40px 40px 0 0;
  .content-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    .title {
      font-size: 40px;
      font-weight: 600;
    }
    .join {
      width: 100px;
      height: 50px;
      border: none;
      background: @theme;
      color: #fff;
      font-size: 28px;
      border-radius: 10px;
      text-align: center;
      line-height: 50px;
    }
    .joined {
      width: 100px;
      height: 50px;
      border: none;
      background: #eee;
      color: #888;
      font-size: 28px;
      border-radius: 10px;
      text-align: center;
      line-height: 50px;
    }
  }
  .info {
    padding: 40px 0;
    .name {
      text-align: center;
      p {
        font-size: 40px;
        font-weight: 600;
      }
    }
    .content-item {
      margin: 30px 0;
      .title {
        font-weight: 600;
      }
      .text {
        margin-top: 10px;
        font-size: 28px;
      }
    }
  }
}

.back {
  position: fixed;
  top: 20px;
  left: 10px;
}

.active {
  width: 100px;
  height: 50px;
  font-size: 26px;
  font-weight: 600;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
  background: rgb(237, 238, 253);
  color: rgb(85, 85, 207);
  padding: 10px 10px;
}
.end {
  width: 100px;
  height: 50px;
  font-size: 26px;
  font-weight: 600;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
  background: #eee;
  color: #888;
  padding: 10px 10px;
}
</style>