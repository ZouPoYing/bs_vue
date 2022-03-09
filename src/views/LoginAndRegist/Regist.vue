<template>
  <div>
    <h1>注册</h1>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-link @click="toLogin" :underline="false">立即登录</el-link>
            <el-link @click="toForgetPassword" :underline="false">忘记密码</el-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
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
  name: "Regist",
  data () {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
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
        username: '',
        phone: '',
        password: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      var self = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:9091/bs/user/regist',{
            userName: this.ruleForm.username,
            phone: this.ruleForm.phone,
            password: this.ruleForm.password
          }).then(function (res) {
            if (res.data.success) {
              self.$message.success('登录成功，即将跳转登录界面');
              setTimeout(() => {
                self.$router.push('/login')
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
    toLogin() {
      this.$router.push('/login')
    },
    toForgetPassword() {
      this.$router.push('/forgetPassword')
    }
  }
}
</script>

<style scoped>

</style>
