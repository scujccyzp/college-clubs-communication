<template>
  <div>
    <div class="nav-bar">
      <div class="back" @click="back">
        <van-icon name="arrow-left" />
      </div>社团详情
    </div>
    <div class="top">
      <div class="top-left">
        <div class="avatar">
          <img v-if="clubDetail.club_avatar" :src="imgIp + clubDetail.club_avatar" alt />
        </div>
        <div class="text">
          <p class="club-name">{{clubDetail.club_name}}</p>
          <span class="category">{{clubDetail.category_name}}</span>
        </div>
      </div>
      <div v-if="clubDetail.user_id !== undefined">
        <button
          v-if="clubDetail.user_id == null"
          class="follow"
          @click="follow(clubDetail.club_id)"
        >+关注</button>
        <button v-else class="cancle-follow" @click="cancleFollow(clubDetail.club_id)">已关注</button>
      </div>
    </div>
    <van-tabs animated swipeable @click="onClick" color="#7169e2" title-active-color="#7169e2">
      <van-tab title="简介">
        <div class="intro">
          <div class="club-intro">
            <p>社团简介</p>
            <span v-if="clubDetail.club_intro !== null">{{clubDetail.club_intro}}</span>
            <span v-else>暂无</span>
          </div>
          <div class="club-qq">
            <p>QQ群</p>
            <span v-if="clubDetail.club_qq !== null">{{clubDetail.club_qq}}</span>
            <span v-else>暂无</span>
          </div>
        </div>
      </van-tab>
      <van-tab title="新闻">
        <div class="news-tab">
          <News v-for="(item, index) in newsList" :key="index" :newsList="item"></News>
        </div>
      </van-tab>
      <van-tab title="活动">
        <div class="activity-tab">
          <ActivityList v-for="(item, index) in activityList" :key="index" :activityList="item"></ActivityList>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs, Icon, Toast, Dialog } from "vant";
import News from "@/components/News.vue";
import ActivityList from "@/components/ActivityList.vue";

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Toast);
Vue.use(Icon);
Vue.use(Dialog);
export default {
  name: "clubDetail",
  components: {
    News,
    ActivityList
  },
  data() {
    return {
      clubId: 0,
      userid: 0,
      imgIp: "",
      clubDetail: [],
      newsList: [],
      activityList: [],
      index: -1
    };
  },
  created() {
    this.clubId = this.$route.query.clubId; //获取社团id

    this.imgIp = this.$store.state.imgAddress; //获取图片地址

    this.userId = sessionStorage.getItem("userId"); //获取userid

    this.index = this.$route.query.id;

    this.axios
      .get(`/clubs/detail?userId=${this.userId}&clubId=${this.clubId}`) //请求社团详情页数据
      .then(res => {
        if (res.data.state == 200) {
          this.clubDetail = res.data.data[0];
          console.log(this.clubDetail);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    back() {
      this.$router.back(-1);
    },
    onClick(name, title) {
      if (title == "新闻") {
        //请求新闻列表
        this.axios.get(`/news/clubnews?clubId=${this.clubId}`).then(res => {
          if (res.data.state == "200") {
            this.newsList = res.data.data;
            console.log(this.newsList);
          }
        });
      } else if (title == "活动") {
        //请求活动列表
        this.axios
          .get(`/activity/clubactivity?clubId=${this.clubId}`)
          .then(res => {
            if (res.data.state == "200") {
              this.activityList = res.data.data;
              console.log(this.activityList);
            }
          });
      }
    },
    follow(id) {
      //关注社团
      let param = new URLSearchParams();
      param.append("userId", this.userId);
      param.append("clubId", id);
      this.axios
        .post("/clubs/followClub", param)
        .then(res => {
          if (res.data.state == "200") {
            this.$set(this.clubDetail, `user_id`, this.userId);
            this.$set(
              this.$store.state.clubList[this.index],
              `user_id`,
              this.userId
            );
            Toast.success("关注成功");
          } else {
            console.log(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancleFollow(id) {
      //取消关注社团
      Dialog.confirm({
        title: "确认取消关注?"
      })
        .then(() => {
          let param2 = new URLSearchParams();
          param2.append("userId", this.userId);
          param2.append("clubId", id);
          this.axios
            .post("/clubs/canclefollow", param2)
            .then(res => {
              if (res.data.state == "200") {
                this.$set(this.clubDetail, `user_id`, null);
                this.$set(
                  this.$store.state.clubList[this.index],
                  `user_id`,
                  null
                );
                Toast.success("已取消");
              } else {
                console.log(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
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
.nav-bar {
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 40px;
  border-bottom: 1px solid #eee;
  text-align: center;
  .back {
    position: fixed;
    height: 100px;
    width: 80px;
    text-align: center;
    line-height: 114px;
  }
}
.top {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  .top-left {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .avatar {
      width: 150px;
      height: 150px;
      margin: 10px 20px 10px 10px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      height: 150px;
      line-height: 75px;
      .club-name {
        font-size: 28px;
        font-weight: 600;
      }
      .category {
        font-size: 26px;
        padding: 6px 16px;
        border-radius: 10px;
        background: rgb(237, 238, 253);
        color: rgb(85, 85, 207);
        font-weight: 600;
      }
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
  .cancle-follow {
    width: 100px;
    height: 54px;
    font-size: 26px;
    border: none;
    background: #eee;
    color: #888;
    border-radius: 10px;
  }
}

.intro {
  padding: 0 20px;
  border-top: 1px solid #eee;
  > * {
    margin-bottom: 40px;
  }
  p {
    font-size: 32px;
    font-weight: 600;
    margin-top: 30px;
  }
  span {
    font-size: 28px;
  }
}

.news-tab {
  border-top: 1px solid #eee;
}

.activity-tab {
  border-top: 1px solid #eee;
}
</style>