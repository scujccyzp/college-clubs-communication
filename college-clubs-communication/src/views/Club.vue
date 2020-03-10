<template>
  <div class="club">
    <ul class="top">
      <li @click="active = 1" :class="{bb:active == 1}">全部社团</li>
      <li @click="getFollow()" :class="{bb:active == 2}">我关注的</li>
    </ul>
    <div class="tab-content" v-show="active == 1">
      <ul class="left-tab">
        <li
          v-for="(item, index) in category"
          :key="index"
          :categoryId="item.categoryId"
          @click="select(item.category_id)"
          :class="{on:isActive == item.category_id}"
        >{{item.category_name}}</li>
      </ul>
      <ul class="right-content">
        <ClubList></ClubList>
      </ul>
    </div>
    <div class="followed" v-show="active == 2">
      <ul>
        <FollowedList :followedList="followedList"></FollowedList>
      </ul>
    </div>
  </div>
</template>

<script>
import ClubList from "@/components/ClubList.vue";
import FollowedList from "@/components/FollowedList.vue";
export default {
  name: "club",
  components: {
    ClubList,
    FollowedList
  },
  data() {
    return {
      active: 1,
      category: [],
      isActive: 1,
      followedList: [],
      userId: 0
    };
  },
  created() {
    this.userId = sessionStorage.getItem("userId"); //获取userid
    this.axios
      .get("/clubs/category")
      .then(res => {
        if (res.data.state == "200") {
          this.category = res.data.data;
          this.select(1);
          console.log(this.category);
        } else {
          console.log("失败");
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    select(i) {
      this.isActive = i;

      this.axios.get(`/clubs/clubList?userId=${this.userId}&categoryId=${i}`).then(res => {
        if (res.data.state == "200") {
          this.$store.state.clubList = res.data.data;
          console.log(res.data.data);
        }
      });
    },
    getFollow() {
      this.active = 2;
      this.axios.get(`/clubs/followedClubs?userId=${this.userId}`).then(res => {
        if (res.data.state == "200") {
          this.followedList = res.data.data;
          console.log(this.followedList);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/style/base.less";
.club {
  background: rgb(243, 243, 243);
}
.top {
  width: 100%;
  height: calc(15vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #ccc;
  li {
    font-size: 38px;
    padding: 10px 10px;
    margin: 0 30px;
  }
}
.tab-content {
  width: 100%;
  height: 85vh;
  display: flex;
  .left-tab {
    width: 20%;
    height: 100%;
    background: rgb(247, 247, 247);
    overflow: scroll;
    li {
      padding: 20px 0;
      text-align: center;
      font-size: 34px;
    }
  }
  .right-content {
    background: #fff;
    width: 80%;
    height: 100%;
    overflow: scroll;
    padding-left: 20px;
    box-sizing: border-box;
  }
}

.followed {
  width: 100%;
  height: 85vh;
  display: flex;
  ul {
    width: 100%;
  }
}

.bb {
  color:@theme;
  border-bottom: 6px solid @theme;
}

.on {
  background: #fff;
  color: @theme;
}
</style>