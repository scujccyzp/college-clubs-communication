<template>
  <div class="activity" @click="goDetail(activityList.activity_id)">
    <div class="left">
      <img :src="imgIp + activityList.activity_imgs" alt />
    </div>
    <div class="right">
      <p class="name">{{activityList.activity_name}}</p>
      <span v-if="activityList.isactive == 1" class="active">报名中</span>
      <span v-else class="end">已截止</span>
      <p class="club-name">{{activityList.club_name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["activityList"],
  created() {
    this.imgIp = this.$store.state.imgAddress;
  },
  methods: {
    goDetail(id) {
      this.$router.push({ path: "/activitydetail/" + id });
    }
  }
};
</script>

<style lang="less" scoped>
.activity {
  width: 100%;
  height: 240px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #eee;
  background: #fff;
  .left {
    width: 300px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 14px;
    margin-right: 20px;
    img {
      width: auto;
      height: 110%;
    }
  }
  .right {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      font-size: 32px;
      font-weight: 600;
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
    }
    .club-name {
      font-size: 26px;
      color: #999;
    }
  }
}
</style>