<template>
  <div id="login">
    <h1>登录</h1>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="电话号码" prop="phone">
            <el-input maxlength="11" type="text" v-model="ruleForm.phone" placeholder="请输入电话号码"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input minlength="1" maxlength="16" type="password" v-model="ruleForm.password"
                      placeholder="请输入1-16位字符或数字" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-link style="padding: 0 10px 0 10px" @click="toRegist" :underline="false">立即注册</el-link>
            <el-link style="padding: 0 10px 0 10px" @click="toForgetPassword" :underline="false">忘记密码</el-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Login',
  data () {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电话号码'))
      } else {
        callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        password: '',
        phone: ''
      },
      rules: {
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      var self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:9091/bs/user/login',{
            phone: this.ruleForm.phone,
            password: this.ruleForm.password
          }).then(function (res) {
            if (res.data.success) {
              self.$store.commit('setUser',res.data.user);
              self.$emit('login');
              self.$message.success('登录成功，即将跳转首页');
              setTimeout(() => {
                self.$router.push('/home')
              }, 1000)
            } else {
              self.$message.error(res.data.msg);
            }
          }).catch(function(err){
            self.$message.error(err);
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    toRegist() {
      this.$router.push('/regist')
    },
    toForgetPassword() {
      this.$router.push('/forgetPassword')
    }
  }
}
</script>

<style scoped>
#login{
  width: 100%;
  height: 100%;
  /*background: url("../../assets/img/head.jpg") no-repeat;*/
  /*background-size:100% 100%;*/
  //background: lightslategray;
}
</style>
