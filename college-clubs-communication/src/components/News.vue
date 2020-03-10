<template>
  <div class="news" v-if="newsList">
    <div class="left">
      <p class="title">{{newsList.news_title}}</p>
      <div class="left-bottom">
        <span class="club-name">{{newsList.club_name}}</span>
        <span class="news-time">{{newsList.news_time}}</span>
      </div>
    </div>
    <div class="right">
      <img :src="imgIp + newsList.news_img" alt />
    </div>
  </div>
</template>

<script>
export default {
  props:['newsList'],
  created() {
    this.imgIp = this.$store.state.imgAddress;
  }
};
</script>

<style lang="less" scoped>
  .news {
    width: 100%;
    height: 220px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    margin: 10px 0;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    .left {
      height: 100%;
      width: 460px;
      padding: 20px 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 30px;
        font-weight: 600;
      }
      .left-bottom {
        .club-name {
          font-size: 26px;
        }
        .news-time {
          font-size: 24px;
          color: #aaa;
          margin-left: 20px;
        }
      }
    }
    .right {
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
  }
</style>