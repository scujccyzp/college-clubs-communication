<template>
  <div class="avtivity">
    <Top>活动广场</Top>
    <ActivityList v-for="(item, index) in activityList" :key="index" :activityList="item"></ActivityList>
  </div>
</template>

<script>
import Top from "@/components/Top.vue";
import ActivityList from "@/components/ActivityList.vue";

export default {
  name: "activity",
  data() {
    return {
      activityList: []
    }
  },
  components: {
    Top,
    ActivityList
  },
  created() {
    this.axios.get('/activity/activitylist')
    .then(res=> {
      if(res.data.state == 200) {
        this.activityList = res.data.data;
        console.log(this.activityList);
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .avtivity {
    background: rgb(245, 245, 245);
    box-sizing: border-box;
    min-height: 100vh;
    padding: 100px 0;
  }
</style>