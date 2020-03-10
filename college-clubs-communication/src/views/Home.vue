<template>
  <div class="home">
    <Top>主页</Top>
    <div class="hot-activity">
      <div class="top">
        <p>热门活动</p>
        <router-link to="/activity" class="to-all">查看全部活动</router-link>
      </div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banner" :key="index" @click="goActivity(item.activity_id)">
          <img :src="imgIp + item.activity_imgs" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hot-clubs">
      <div class="top">
        <p>热门社团</p>
        <router-link to="/club" class="to-all">查看全部社团</router-link>
      </div>
      <div class="clubs">
        <div class="club-item" v-for="(item, index) in hotClub" :key="index" @click="goClub(item.club_id)">
          <div class="club-avatar">
            <img :src="imgIp + item.club_avatar" alt />
          </div>
          <p class="club-name">{{item.club_name}}</p>
        </div>
      </div>
    </div>
    <News v-for="(item, index) in newsList" :key="index" :newsList="item"></News>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import News from "@/components/News.vue";
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";

Vue.use(Swipe);
Vue.use(SwipeItem);

export default {
  name: "home",
  components: {
    Top,
    News
  },
  data() {
    return {
      newsList: [],
      banner: [],
      imgIp: [],
      hotClub: []
    };
  },
  created() {
    this.imgIp = this.$store.state.imgAddress; //获取图片地址

    this.axios.get("/activity/banner").then(res => { //获取banner
      if (res.data.state == "200") {
        this.banner = res.data.data;
        console.log(this.banner);
      }
    })

    this.axios.get("/clubs/hotclub").then(res => { //获取热门社团
      if (res.data.state == "200") {
        this.hotClub = res.data.data;
        console.log(this.hotClub);
      }
    })

    this.axios.get("/news/hotnews").then(res => { //获取热门新闻
      if (res.data.state == "200") {
        this.newsList = res.data.data;
        console.log(this.newsList);
      }
    });
  },
  methods: {
    goActivity(id) {
      this.$router.push({ path: "/activitydetail/" + id });
    },
    goClub(id) {
      this.$router.push({ path: "/clubdetail/?clubId=" + id });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.my-swipe {
  width: 100%;
  height: 300px;
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    width: 100%;
    height: 100%;
    background: @theme;
    text-align: center;
    img {
      width: 100%;
      max-height: 100%;
    }
  }
}
.home {
  background: rgb(245, 245, 245);
  box-sizing: border-box;
  min-height: 100vh;
  padding: 100px 0;
  .hot-activity {
    padding: 0 20px 20px;
    background: #fff;
    margin-bottom: 20px;
    .top {
      padding: 20px 0 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        padding-left: 20px;
        border-left: 8px solid @theme;
      }
      .all-activities {
        font-size: 24px;
        color: @theme;
      }
    }
    .my-swipe {
      border-radius: 10px;
    }
  }
  .hot-clubs {
    padding: 0 20px 20px;
    background: #fff;
    .top {
      padding: 20px 0 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        padding-left: 20px;
        border-left: 8px solid @theme;
      }
    }
    .clubs {
      display: flex;
      justify-content: space-between;
      .club-item {
        width: 120px;
        text-align: center;
        .club-avatar {
          border-radius: 20px;
          width: 100%;
          height: 120px;
          background: #eee;
          overflow: hidden;
          margin-bottom: 10px;
          padding: 4px;
          box-sizing: border-box;
          img {
            border-radius: 20px;
            width: 100%;
            height: 100%;
          }
        }

        .club-name {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 26px;
        }
      }
    }
  }
}

.to-all {
  font-size: 24px;
  color: @theme;
}
</style>