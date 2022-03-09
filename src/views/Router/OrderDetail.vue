<template>
    <div>
        <h1>订单详情</h1>
        <el-row type="flex" justify="end">
            <el-col :span="4">
                <p class="price">总计：￥{{total}}</p>
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
                            <p class="price">总价：￥{{item.price}}</p>
                        </el-col>
                        <el-col :span="6">
                            <el-input-number v-model="item.num" disabled></el-input-number>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "orderDetail",
      data() {
          return{
            total: 0,
            shoppingCar: [],
            tableData: [],
            setForm: [],
            address: {}
          }
      },
      created() {
        this.getShoppingCar();
      },
      methods: {
        getShoppingCar() {
          var self = this
          axios.post('http://localhost:9091/bs/shopping/getOrderDetail',{
            userId: self.$store.state.user.userId,
            orderId: self.$route.query.orderId
          }).then(function(res){
            if (res.data.success) {
              self.shoppingCar = res.data.shoppingCar
              self.total = 0
              self.shoppingCar.forEach(function (item,index,arr) {
                self.total += Number(item.price)
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

    .bookName {
        font-size: 25px;
    }

    .price {
        font-size: 30px;
        color: red;
    }
</style>
