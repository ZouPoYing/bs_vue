<template>
    <div>
        <h1>购物车</h1>
        <el-row type="flex" justify="end">
            <el-col :span="4">
                <p class="price">总计：￥{{total}}</p>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="pay">结算</el-button>
            </el-col>
        </el-row>
        <el-card v-for="(item,index) in shoppingCar" :key="index">
            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <el-image
                            style="width: 300px; height: 300px" fit="contain"
                            :src="item.bookPic"></el-image>
                </el-col>
                <el-col :span="16">
                    <el-row type="flex" justify="center" style="margin-left: 20px">
                        <el-col :span="8">
                            <p class="bookName">{{item.bookName}}</p>
                            <p class="author">作者：{{item.author}}</p>
                            <p class="press">出版社：{{item.press}}</p>
                            <p class="category">类别：{{item.categoryValue}}</p>
                        </el-col>
                        <el-col :span="6">
                            <p class="price">￥{{item.price}}</p>
                        </el-col>
                        <el-col :span="6">
                            <el-input-number v-model="item.num" @change="handleChange(item.shoppingId,item.num)" :min="1"></el-input-number>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="danger" @click="deleteShopping(item.shoppingId)">删 除</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog
                title="支付二维码"
                :visible.sync="dialogVisible"
                width="30%">
            <el-card>
                <p class="address">{{address.address}}----{{address.detail}}</p>
                <el-row type="flex" justify="start">
                    <el-col span="4">
                        <p>{{address.name}}</p>
                    </el-col>
                    <el-col span="8">
                        <p>{{address.phone}}</p>
                    </el-col>
                </el-row>
            </el-card>
            <el-image
                    style="width: 200px; height: 200px"
                    :src="require('../../assets/img/code.png')"></el-image>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="pay2(address.addressId)">支付</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: "shoppingCar",
    data() {
      return {
        total: 0,
        shoppingCar: [],
        tableData: [],
        dialogVisible: false,
        setForm: [],
        address: {}
      }
    },
    created() {
      this.getShoppingCar();
    },
    methods: {
      pay2(addressId) {
        var self = this
        axios.post('http://localhost:9091/bs/order/pay',{
          addressId: addressId,
          total: self.total,
          userId: self.$store.state.user.userId
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('支付成功');
            self.getShoppingCar();
          } else {
            self.$message.error(res.data.msg);
          }
        }).catch(function(err){
          self.$message.error(err);
        })
        this.dialogVisible = !this.dialogVisible
      },
      pay() {
        var self = this;
        axios.post('http://localhost:9091/bs/address/getMyDefaultAddress', {
          userId: self.$store.state.user.userId
        }).then(function(res){
          if (res.data.success) {
            self.address = res.data.address
            self.dialogVisible = !self.dialogVisible
          } else {
            self.$message.error(res.data.msg);
          }
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      getShoppingCar() {
        var self = this
        axios.post('http://localhost:9091/bs/shopping/getShoppingCar',{
          userId: self.$store.state.user.userId
        }).then(function(res){
          if (res.data.success) {
            self.shoppingCar = res.data.shoppingCar
            self.total = 0
            self.shoppingCar.forEach(function (item,index,arr) {
              self.total += item.price * item.num
            })
          } else {
            self.$message.error(res.data.msg);
          }
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      deleteShopping(shoppingId) {
        var self = this;
        axios.post('http://localhost:9091/bs/shopping/deleteShopping', {
          shoppingId: shoppingId
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('删除成功');
            self.getShoppingCar();
          } else {
            self.$message.error(res.data.msg);
          }
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      handleChange(shoppingId,num) {
        var self = this;
        axios.post('http://localhost:9091/bs/shopping/changeShoppingNum', {
          shoppingId: shoppingId,
          num: num
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('操作成功');
            self.total = 0
            self.shoppingCar.forEach(function (item,index,arr) {
              self.total += item.price * item.num
            })
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
    p {
        text-align: left;
    }

    .address {
        font-size: 20px;
    }

    .bookName {
        font-size: 25px;
    }

    .price {
        font-size: 30px;
        color: red;
    }
</style>
