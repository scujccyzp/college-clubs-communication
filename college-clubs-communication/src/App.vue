<template>
  <div id="app">
    <div>
      <keep-alive include="home,activity,club">
        <router-view class="views" v-if="isRouterAlive" />
      </keep-alive>
      
      <div v-show="$route.meta.navShow">
        <van-tabbar v-model="active" active-color="#7169e2" route>
          <van-tabbar-item replace icon="home-o" to="/home">主页</van-tabbar-item>
          <van-tabbar-item replace icon="friends-o" to="/activity">活动</van-tabbar-item>
          <van-tabbar-item replace icon="fire-o" to="/club">社团</van-tabbar-item>
          <van-tabbar-item replace icon="user-circle-o" to="/my">我的</van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar);
Vue.use(TabbarItem);

export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      active: 0
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style lang="less">
@import "./assets/style/base.less";

</style>
