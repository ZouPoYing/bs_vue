<template>
  <div>
    <h1>用户信息管理</h1>
    <el-row type="flex">
      <el-col :span="18" pull="5">
        <el-button
          size="mini"
          type="primary"
          @click="add">新增</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="用户编号">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="注册时间">
          </el-table-column>
          <el-table-column
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="update(scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteRow(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          width="30%">
          <el-form label-width="100px" class="demo-ruleForm" enctype="multipart/form-data">
            <el-form-item label="用户编号" prop="username">
              <el-input maxlength="10" type="text" disabled v-model="setForm.userId"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input maxlength="10" type="text" v-model="setForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input maxlength="16" type="text" v-model="setForm.password"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input maxlength="11" type="text" v-model="setForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="setForm.sex">
                <el-radio label="男" border>男</el-radio>
                <el-radio label="女" border>女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input type="text" v-model="setForm.age"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button v-if="isAdd" type="primary" @click="addDetail">确 定</el-button>
            <el-button v-else type="primary" @click="updateDetail">修 改</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserInfoManagement",
  data() {
    return {
      tableData: [],
      setForm: {},
      dialogVisible: false,
      isAdd: true,
      title: '新增'
    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      var self = this
      axios.post('http://localhost:9091/bs/user/getUserList').then(function(res){
        if (res.data.success) {
          self.tableData = res.data.userList
        }
      }).catch(function(err){
        self.$message.error(err);
      })
    },
    add() {
      this.setForm = {}
      this.title = '新增'
      this.dialogVisible = !this.dialogVisible
      this.isAdd = true
    },
    addDetail() {
      var self = this;
      axios.post('http://localhost:9091/bs/user/addUserDetail', {
        userName: self.setForm.userName,
        password: self.setForm.password,
        phone: self.setForm.phone,
        sex: self.setForm.sex,
        age: self.setForm.age
      }).then(function(res){
        if (res.data.success) {
          self.$message.success('新增成功');
          self.getUserList();
          self.dialogVisible = !self.dialogVisible
        } else {
          self.$message.error(res.data.msg);
          self.dialogVisible = !self.dialogVisible
        }
      }).catch(function(err){
        self.$message.error(err);
        self.dialogVisible = !self.dialogVisible
      })
    },
    update(row) {
      this.title = '修改'
      this.dialogVisible = true
      this.isAdd = false
      this.setForm = row
    },
    updateDetail() {
      var self = this;
      axios.post('http://localhost:9091/bs/user/updateUserDetail', {
        userName: self.setForm.userName,
        userId: self.setForm.userId,
        password: self.setForm.password,
        phone: self.setForm.phone,
        sex: self.setForm.sex,
        age: self.setForm.age
      }).then(function(res){
        if (res.data.success) {
          self.$message.success('修改成功');
          self.getUserList();
          self.dialogVisible = !self.dialogVisible
        } else {
          self.$message.error(res.data.msg);
          self.dialogVisible = !self.dialogVisible
        }
      }).catch(function(err){
        self.$message.error(err);
        self.dialogVisible = !self.dialogVisible
      })
    },
    deleteRow(row) {
      var self = this;
      axios.post('http://localhost:9091/bs/user/deleteUser', {
        userId: row.userId
      }).then(function(res){
        if (res.data.success) {
          self.$message.success('删除成功');
          self.getUserList();
        } else {
          self.$message.error(res.data.msg);
        }
      }).catch(function(err){
        self.$message.error(err);
      })
    }
  }
}
</script>

<style scoped>

</style>
