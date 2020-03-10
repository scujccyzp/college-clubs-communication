<template>
  <div>
    <li v-for="(item, index) in followedList" :key="index">
      <div class="left-info">
        <img :src="imgIp + item.club_avatar" alt />
        <p class="club-name">{{item.club_name}}</p>
      </div>
      <button class="followed">已关注</button>
    </li>
  </div>
</template>

<script>
export default {
  name: "followedList",
  props: ["followedList"],
  data() {
    return {
      imgIp: ""
    }
  },
  created() {
  this.imgIp = this.$store.state.imgAddress;
}
};
</script>

<style lang="less" scoped>
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
    img {
      width: 100px;
      border-radius: 14px;
    }
    p {
      font-size: 30px;
    }
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