<template>
  <div>
    <li v-for="(item, index) in $store.state.clubList" :key="index" @click="goDetail(item.club_id, index)">
        <div class="left-info">
          <div class="club-avatar">
            <img :src="imgIp + item.club_avatar" alt />
          </div>
          <p class="club-name">{{item.club_name}}</p>
        </div>
        <button class="follow" v-if="item.user_id == null" @click.stop="follow(item.club_id, index)">+关注</button>
        <button class="followed" v-else>已关注</button>
    </li>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  name: "clublist",
  data() {
    return {
      imgIp: "",
      userId: 0
    }
  },
  created() {
  this.imgIp = this.$store.state.imgAddress;
  this.userId = sessionStorage.getItem("userId");
  },
  methods: {
    follow(id, i) { //关注社团
      let param = new URLSearchParams();
      param.append("userId", this.userId);
      param.append("clubId", id);
      this.axios.post('/clubs/followClub', param)
        .then(res => {
        if (res.data.state == "200") {
          this.$set(this.$store.state.clubList[i], `user_id`, this.userId)
          Toast.success('关注成功');
          console.log(1);
        } else {
          console.log(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });

    },
    goDetail(id, i) { //跳转社团详情页
      this.$router.push({path: '/clubdetail/', query:{clubId: id,id: i}})
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
li {
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #eee;
  .left-info {
    width: 70%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: 600;
    .club-avatar {
      width: 100px;
      height: 100px;
      border-radius: 14px;
      padding: 4px;
      box-sizing: border-box;
      background: #eee;
      margin-right: 20px;
      img {
        width: 100%;
        border-radius: 14px;
     }
    }

    p {
      font-size: 30px;
    }
  }
  .follow {
      width: 100px;
      height: 54px;
      font-size: 26px;
      border: none;
      background: @theme;
      color: #fff;
      border-radius: 10px;
  }
  .followed{
    width: 100px;
    height: 50px;
    font-size: 28px;
    border-radius: 14px;
    border: 1px solid #bbb;
    background: #fff;
    color: #bbb;
  }
}
</style>