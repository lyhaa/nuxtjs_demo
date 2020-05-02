<template>
  <div class="container">
    <div @click="tnonclick">这是个首页</div>
    <div class="logout">
      <input type="button" value="退出登录" @click="logout">
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import axios from "@nuxtjs/axios";
export default {
  data() {
    return {
      topicList:{}
    }
  },
  components: {
    Logo
  },
  // async asyncData({ $axios }) {
    
  //   console.log(resList);
  //   return {
  //     topicList: resList
  //   };
  // },
  methods: {
    tnonclick() {
      console.log(this.topicList);
      // this.$axios.get(`/home`)
      // .then(res=>{
      //   console.log(res);
      // })
    },
    logout(){
       window.localStorage.removeItem('usertoken');
       window.location.reload();
    }
  },
  async mounted() {
    let [resList] =  await Promise.all([this.$axios.get(`/home`)]);
    console.log(resList);
  },
};
</script>

<style lang="scss" scope>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
.logout{
  input[type=button]{
    border: 1px solid paleturquoise;
    background: transparent;
    padding: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
  position: fixed;
  top: 0;
  right: 100px;
}
</style>
