<template>
  <div>
    <h1>书城</h1>
    <el-row type="flex" justify="center">
      <el-col>
        <el-button @click="clearFilter">清除所有过滤器</el-button>
        <el-table
          ref="filterTable"
          :data="tableData.filter(data => !search || data.bookName.includes(search)
          || data.author.includes(search) || data.press.includes(search))"
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
            label="作者"
            :filters="author"
            :filter-method="filterAuthor">
          </el-table-column>
          <el-table-column
            prop="press"
            label="出版社"
            :filters="press"
            :filter-method="filterPress">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格">
          </el-table-column>
          <el-table-column
            prop="category"
            label="分类"
            :filters="fDepartment"
            :filter-method="filterKS">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="des"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="上架时间">
          </el-table-column>
          <el-table-column
            label="操作"
            width="150">
            <template slot="header" slot-scope="scope">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        type="primary"
                        @click="view(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog
          title="详情"
          :visible.sync="dialog"
          width="50%">
      <el-form label-width="100px" class="demo-ruleForm" enctype="multipart/form-data">
          <el-row type="flex" justify="center">
              <el-col :span="8">
                  <el-image
                          style="width: 300px; height: 300px" fit="contain"
                          :src="viewData.bookPic"></el-image>
              </el-col>
              <el-col :span="16">
                  <el-row type="flex" justify="center" style="margin-left: 20px">
                      <el-col :span="24">
                          <p class="bookName">{{viewData.bookName}}</p>
                          <p class="author">作者：{{viewData.author}}</p>
                          <p class="press">出版社：{{viewData.press}}</p>
                          <p class="price">￥{{viewData.price}}</p>
                          <p class="category">类别：{{viewData.category}}</p>
                          <p class="createTime">上架时间：{{viewData.createTime}}</p>
                          <p class="des">描述：{{viewData.des}}</p>
                          <el-button type="primary" @click="addShoppingCar(viewData.bookId)">加入购物车</el-button>
                      </el-col>
                  </el-row>
              </el-col>
          </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Book",
    data() {
      return {
        search: '',
        tableData: [],
        viewData: [],
        dialog: false,
        doctor: '',
        author: [],
        press: []
      }
    },
    created() {
      this.getBookList();
      this.getFieldList('author');
      this.getFieldList('press');
    },
    methods: {
      addShoppingCar(bookId) {
        var self = this
        if (this.$store.state.user.userId == undefined || this.$store.state.user.userId == '') {
          self.$message.error('请先登录');
        } else {
          axios.post('http://localhost:9091/bs/shopping/addShoppingCar',{
            userId: this.$store.state.user.userId,
            bookId: bookId
          }).then(function(res){
            if (res.data.success) {
              self.$message.success('添加购物车成功');
            } else {
              self.$message.error(res.data.msg);
            }
          }).catch(function(err){
            self.$message.error(err);
          })
        }
      },
      view(row) {
        this.dialog = true
        this.viewData = row
      },
      getBookList() {
        var self = this
        axios.post('http://localhost:9091/bs/book/getSaleBookList').then(function(res){
          self.tableData = res.data.bookList
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      getFieldList(type) {
        var self = this
        axios.post('http://localhost:9091/bs/book/getFieldList',{
          type: type,
        }).then(function(res){
          if (res.data.success) {
            if (type == 'author') {
              self.author = res.data.author
            } else if (type == 'press') {
              self.press = res.data.press
            }
          } else {
            self.$message.error(res.data.msg);
          }
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      filterAuthor(value, row) {
        return row.author === value;
      },
      filterPress(value, row) {
        return row.press === value;
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      }
    }
  }
</script>

<style scoped>
    p {
        text-align: left;
    }

    .bookName {
        font-size: 25px;
    }

    .price {
        font-size: 30px;
        color: red;
    }
</style>
