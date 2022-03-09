<template>
    <div>
        <h1>书籍分类管理</h1>
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
                            prop="categoryId"
                            label="分类编号">
                    </el-table-column>
                    <el-table-column
                            prop="categoryName"
                            label="分类名">
                    </el-table-column>
                    <el-table-column
                            prop="categoryCode"
                            label="分类代码">
                    </el-table-column>
                    <el-table-column
                            prop="belong"
                            label="隶属">
                    </el-table-column>
                    <el-table-column
                            prop="des"
                            label="描述">
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="分类时间">
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
                        <el-form-item label="分类编号" prop="categoryId">
                            <el-input maxlength="10" disabled type="text" v-model="setForm.categoryId"></el-input>
                        </el-form-item>
                        <el-form-item label="分类名" prop="categoryName">
                            <el-input maxlength="10" type="text" v-model="setForm.categoryName"></el-input>
                        </el-form-item>
                        <el-form-item label="分类代码" prop="categoryCode">
                            <el-input maxlength="16" :disabled="!isAdd" type="text" v-model="setForm.categoryCode"></el-input>
                        </el-form-item>
                        <el-form-item label="隶属" prop="belong">
                            <el-select v-model="setForm.belong" placeholder="隶属不选则为一级分类">
                                <el-option
                                        v-for="item in belongList"
                                        :key="item.categoryId"
                                        :label="item.categoryName"
                                        :value="item.categoryCode">
                                    <span style="float: left">{{ item.categoryCode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.categoryName }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="描述" prop="des">
                            <el-input type="textarea" maxlength="50" show-word-limit v-model="setForm.des"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                      <el-button v-if="isAdd" type="primary" @click="addCategory">确 定</el-button>
                      <el-button v-else type="primary" @click="updateCategory">修 改</el-button>
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
    name: "categoryConfig",
    data() {
      return {
        belongList: [],
        tableData: [],
        setForm: {},
        dialogVisible: false,
        isAdd: true,
        title: '新增'
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        this.getCategoryList();
        this.getBelongList();
      },
      getBelongList() {
        var self = this
        axios.post('http://localhost:9091/bs/category/getBelongList').then(function(res){
          self.belongList = res.data.belongList
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      getCategoryList() {
        var self = this
        axios.post('http://localhost:9091/bs/category/getCategoryList').then(function(res){
          self.tableData = res.data.categoryList
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
      addCategory() {
        var self = this;
        axios.post('http://localhost:9091/bs/category/addCategory', {
          categoryName: self.setForm.categoryName,
          categoryCode: self.setForm.categoryCode,
          belong: self.setForm.belong,
          des: self.setForm.des
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('新增成功');
            self.initPage();
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
      updateCategory() {
        var self = this;
        axios.post('http://localhost:9091/bs/category/updateCategory', {
          categoryId: self.setForm.categoryId,
          categoryName: self.setForm.categoryName,
          belong: self.setForm.belong,
          des: self.setForm.des
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('修改成功');
            self.initPage();
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
        axios.post('http://localhost:9091/bs/category/deleteCategory', {
          categoryId: row.categoryId
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('删除成功');
            self.initPage();
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
