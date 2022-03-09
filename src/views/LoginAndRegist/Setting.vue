<template>
  <div>
    <h1>设置</h1>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="userName">
            <el-input maxlength="10" :disabled="disabled" type="text" v-model="user.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input maxlength="16" minlength="1" :disabled="disabled" type="password" v-model="user.password"
                      show-password></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input maxlength="11" disabled="disabled" type="text" v-model="user.phone"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group :disabled="disabled" v-model="user.sex">
              <el-radio label="男" border>男</el-radio>
              <el-radio label="女" border>女</el-radio>
            </el-radio-group>
          </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input :disabled="disabled" type="text" v-model="user.age"></el-input>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUser">修改</el-button>
            <el-button type="danger" @click="LogOut">退出登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "setting",
  data() {
    return {
      disabled: true,
      user: {}
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      var self = this;
      axios.post('http://localhost:9091/bs/user/getUserById', {
        userId: this.$store.state.user.userId
      }).then(function(res){
        if (res.data.success) {
          self.user = res.data.user
        } else {
          self.$message.error(res.data.msg);
        }
      }).catch(function(err){
        self.$message.error(err);
      })
    },
    updateUser() {
      this.disabled = !this.disabled;
      if (!this.disabled) {
        return
      }
      var self = this
      axios.post('http://localhost:9091/bs/user/updateUser', {
        userId: this.$store.state.user.userId,
        userName: self.user.userName,
        password: self.password,
        age: self.user.age,
        sex: self.user.sex
      }).then(function(res){
        if (res.data.success) {
          self.$message.success('修改成功');
          self.getUser()
        } else {
          self.$message.error(res.data.msg);
        }
      }).catch(function(err){
        self.$message.error(err);
      })
    },
    LogOut() {
      this.$store.commit('setUser', {});
      this.$message.success('注销成功，即将跳转登录页');
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
