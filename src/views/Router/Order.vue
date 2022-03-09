<template>
  <div>
    <h1>查看订单</h1>
    <el-row type="flex" justify="center">
      <el-col>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="orderId"
            label=订单编号>
          </el-table-column>
          <el-table-column
            prop="status"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="price"
            label="订单金额">
          </el-table-column>
          <el-table-column
            prop="name"
            label="收货人">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话号码">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="detail"
            label="详细地址">
          </el-table-column>
          <el-table-column
            prop="time"
            label="下单时间">
          </el-table-column>
          <el-table-column
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="OrderDetail(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "Order",
    data() {
      return {
        tableData: []
      }
    },
    created() {
      this.getOrder();
    },
    methods: {
      getOrder() {
        var self = this;
        axios.post('http://localhost:9091/bs/order/getOrder', {
          userId: self.$store.state.user.userId
        }).then(function(res){
          if (res.data.success) {
            self.tableData = res.data.order
          } else {
            self.$message.error(res.data.msg);
          }
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      OrderDetail(row) {
        this.$router.push({
          path: '/orderDetail',
          query: {
            orderId: row.orderId
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
