<template>
  <div>
    <h1>书籍信息管理</h1>
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
                          prop="bookId"
                          label="书籍编号">
                  </el-table-column>
                  <el-table-column
                          prop="bookName"
                          label="书名">
                  </el-table-column>
                  <el-table-column
                          prop="author"
                          label="作者">
                  </el-table-column>
                  <el-table-column
                          prop="press"
                          label="出版社">
                  </el-table-column>
                  <el-table-column
                          prop="price"
                          label="价格">
                  </el-table-column>
                  <el-table-column
                          prop="isSale"
                          label="是否上架">
                  </el-table-column>
                  <el-table-column
                          prop="category"
                          label="分类">
                  </el-table-column>
                  <el-table-column
                          show-overflow-tooltip
                          prop="des"
                          label="描述">
                  </el-table-column>
                  <el-table-column
                          width="150"
                          prop="createTime"
                          label="上架时间">
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
                      <el-form-item label="书籍编号" prop="bookId">
                          <el-input maxlength="10" disabled type="text" v-model="setForm.bookId"></el-input>
                      </el-form-item>
                      <el-form-item label="书名" prop="bookName">
                          <el-input maxlength="10" type="text" v-model="setForm.bookName"></el-input>
                      </el-form-item>
                      <el-form-item label="作者" prop="author">
                          <el-input maxlength="16" type="text" v-model="setForm.author"></el-input>
                      </el-form-item>
                      <el-form-item label="出版社" prop="press">
                          <el-input maxlength="50" type="text" v-model="setForm.press"></el-input>
                      </el-form-item>
                      <el-form-item label="价格" prop="price">
                          <el-input maxlength="10" type="number" v-model="setForm.price"></el-input>
                      </el-form-item>
                      <el-form-item label="书的图片" prop="bookPic">
                          <el-upload action :limit="1" :http-request="handleUploadForm" :on-remove="handleRemove"
                                  :auto-upload="true" :before-upload="beforeAvatarUpload">
                              <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
                          </el-upload>
                      </el-form-item>
                      <el-form-item label="分类" prop="category">
                          <el-cascader
                                  v-model="setForm.category"
                                  :options="categorySelect"
                                  @change="handleChange"></el-cascader>
                      </el-form-item>
                      <el-form-item label="是否上架" prop="isSale">
                          <el-radio-group v-model="setForm.isSale">
                              <el-radio label="是" border>是</el-radio>
                              <el-radio label="否" border>否</el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <el-form-item label="描述" prop="des">
                          <el-input type="textarea" maxlength="250" show-word-limit v-model="setForm.des"></el-input>
                      </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                      <el-button v-if="isAdd" type="primary" @click="addBook">确 定</el-button>
                      <el-button v-else type="primary" @click="updateBook">修 改</el-button>
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
    name: "pInfoManagement",
    data() {
      return {
        fileId: '',
        categorySelect: [],
        tableData: [],
        setForm: {},
        dialogVisible: false,
        isAdd: true,
        title: '新增'
      }
    },
    created() {
      this.getCategorySelect()
      this.getBookList();
    },
    methods: {
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleRemove() {
        this.$message.success('文件移除成功');
        this.fileId = ''
      },
      handleUploadForm(param) {
        var self = this
        let formData = new FormData();
        formData.append('userId', this.$store.state.user.userId)
        formData.append('file', param.file)
        axios.post('http://localhost:9091/bs/file/upload',formData).then(function(res){
          if (res.data.success) {
            self.$message.success('文件上传成功');
            self.fileId = res.data.fileId;
          } else {
            self.$message.error(res.data.msg);
          }
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      getCategorySelect() {
        var self = this
        axios.post('http://localhost:9091/bs/category/getCategorySelect').then(function(res){
          var categorySelect = res.data.categorySelect
          if (categorySelect.length === 0) {
            self.categorySelect = categorySelect
            return
          }
          var dataArr = []
          categorySelect.map(categoryItem => {
            if (dataArr.length == 0) {
              dataArr.push({value:categoryItem.pcode,label:categoryItem.pname,children:[{value:categoryItem.ccode,label:categoryItem.cname}]})
            } else {
              let res = dataArr.some(item => {
                if (item.value == categoryItem.pcode) {
                  item.children.push({value:categoryItem.ccode,label:categoryItem.cname})
                  return true
                }
              })
              if (!res) {
                dataArr.push({value:categoryItem.pcode,label:categoryItem.pname,children:[{value:categoryItem.ccode,label:categoryItem.cname}]})
              }
            }
          })
          self.categorySelect = dataArr
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      handleChange(value) {
        console.log(value);
      },
      getBookList() {
        var self = this
        axios.post('http://localhost:9091/bs/book/getBookList').then(function(res){
          self.tableData = res.data.bookList
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      add() {
        this.setForm = {}
        this.setForm.isSale = '是'
        this.title = '新增'
        this.dialogVisible = !this.dialogVisible
        this.isAdd = true
        this.fileId = ''
      },
      addBook() {
        var self = this;
        axios.post('http://localhost:9091/bs/book/addBook', {
          bookName: self.setForm.bookName,
          author: self.setForm.author,
          press: self.setForm.press,
          price: self.setForm.price,
          bookPic: self.fileId,
          category: self.setForm.category.toString(),
          isSale: self.setForm.isSale,
          des: self.setForm.des
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('新增成功');
            self.getBookList();
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
        this.fileId = ''
      },
      updateBook() {
        var self = this;
        axios.post('http://localhost:9091/bs/book/updateBook', {
          bookName: self.setForm.bookName,
          author: self.setForm.author,
          press: self.setForm.press,
          price: self.setForm.price,
          bookPic: self.fileId,
          category: self.setForm.category.toString(),
          isSale: self.setForm.isSale,
          des: self.setForm.des,
          bookId: self.setForm.bookId
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('修改成功');
            self.getBookList();
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
        axios.post('http://localhost:9091/bs/book/deleteBook', {
          bookId: row.bookId
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('删除成功');
            self.getBookList();
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
