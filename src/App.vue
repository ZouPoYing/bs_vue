<template>
  <div id="app">
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal"> <!--上导航栏-->
          <el-row type="flex" justify="center">
              <el-col :span="16">
                  <p style="text-align: left;padding-left: 50px" >书籍销售系统</p>
              </el-col>
              <el-col :span="4">
                  <p>{{$store.state.user.userName}}</p>
              </el-col>
              <el-col :span="4">
                  <p @click="LogOut">退出</p>
              </el-col>
          </el-row>
      </el-menu>
    </el-header>
    <el-container style="height: 860px; border: 1px solid #eee">
      <el-aside width="300px"> <!--左导航栏-->
        <el-row style="height: 855px;" class="tac">
          <el-col>
            <el-row v-if="$store.state.user.userId" class="user" type="flex" justify="center" align="middle">
              <el-col @click.native="toSetting()">
                <el-avatar class="head-pic"> {{$store.state.user.userName}} </el-avatar>
              </el-col>
            </el-row>
            <el-row v-else class="login" type="flex" justify="center" align="middle">
              <el-button @click="toLogin">请登录</el-button>
            </el-row>
            <el-menu style="text-align: left"> <!--左导航栏有内容的部分-->
              <el-menu-item v-for="(item, index) in app" :key="index" @click="routerJump(item.router)" :class="color">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>  <!--功能-->
        <el-main>
          <el-col>
            <router-link></router-link>
            <router-view @login="getUserId"></router-view>
          </el-col>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
      user: {},
      router: '',
      color: false,
      isCollapse: true,
      app: []
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    LogOut() {
      this.$store.commit('setUser', {});
      this.getUser()
      this.$message.success('注销成功，即将跳转登录页');
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    },
    getUser() {
      var self = this;
      if (this.$store.state.user.userId == '') {
        self.getApp('');
      } else {
        axios.post('http://localhost:9091/bs/user/getUserById', {
          userId: this.$store.state.user.userId
        }).then(function(res){
          if (res.data.success) {
            self.user = res.data.user
            self.getApp(res.data.user.type)
          } else {
            self.$message.error(res.data.msg);
          }
        }).catch(function(err){
          self.$message.error(err);
        })
      }
    },
    getApp(type) {
      var self = this;
      axios.post('http://localhost:9091/bs/app/getAppByType', {
        type: type
      }).then(function(res){
        self.app = res.data.app;
      }).catch(function(err){
        self.$message.error(err);
      })
    },
    routerJump(router) {
      this.$router.push('/'+router)
      this.color = !this.color;
    },
    toLogin() {
      this.$router.push('/login')
    },
    toSetting() {
      this.$router.push('/setting')
    },
    getUserId() {
      this.getUser()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.user,.login {
  height: 100px;
}
</style>
