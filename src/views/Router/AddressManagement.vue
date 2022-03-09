<template>
    <div>
        <h1>收货地址管理</h1>
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
                            prop="addressId"
                            label="地址编号">
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
                            prop="isDefault"
                            label="是否默认">
                    </el-table-column>
                    <el-table-column
                            width="150"
                            prop="createTime"
                            label="创建时间">
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
                        <el-form-item label="地址编号" prop="addressId">
                            <el-input maxlength="10" disabled type="text" v-model="setForm.addressId"></el-input>
                        </el-form-item>
                        <el-form-item label="收货人" prop="name">
                            <el-input maxlength="10" type="text" v-model="setForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="电话号码" prop="phone">
                            <el-input maxlength="11" type="text" v-model="setForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="地址" prop="address">
                            <el-cascader
                                    v-model="setForm.address"
                                    :options="addressSelect"
                                    @change="handleChange"></el-cascader>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="detail">
                            <el-input type="textarea" maxlength="100" show-word-limit v-model="setForm.detail"></el-input>
                        </el-form-item>
                        <el-form-item label="是否默认" prop="isDefault">
                            <el-radio-group v-model="setForm.isDefault">
                                <el-radio label="是" border>是</el-radio>
                                <el-radio label="否" border>否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                      <el-button v-if="isAdd" type="primary" @click="addAddress">确 定</el-button>
                      <el-button v-else type="primary" @click="updateAddress">修 改</el-button>
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
    name: 'AddressManagement',
    data() {
      return {
        fileId: '',
        addressSelect: [
          {
          value: '北京市',
          label: '北京市',
          children: [{
            value: '朝阳区',
            label: '朝阳区',
            children: [{
              value: '安贞街道',
              label: '安贞街道'
            }, {
              value: '奥运村街道',
              label: '奥运村街道'
            }, {
              value: '八里庄街道',
              label: '八里庄街道'
            }]
          }, {
            value: '海淀区',
            label: '海淀区',
            children: [{
              value: '海淀街道',
              label: '海淀街道'
            }, {
              value: '东升镇',
              label: '东升镇'
            }, {
              value: '花园路街道',
              label: '花园路街道'
            }]
          }]
        },
          {
          value: '广东省',
          label: '广东省',
          children: [{
            value: '广州市',
            label: '广州市',
            children: [{
              value: '白云区',
              label: '白云区'
            }, {
              value: '黄埔区',
              label: '黄埔区'
            }, {
              value: '天河区',
              label: '天河区'
            }]
          }, {
            value: '深圳市',
            label: '深圳市',
            children: [{
              value: '南山区',
              label: '南山区'
            }, {
              value: '宝安区',
              label: '宝安区'
            }, {
              value: '福田区',
              label: '福田区'
            }]
          }, {
            value: '珠海市',
            label: '珠海市',
            children: [{
              value: '斗门区',
              label: '斗门区'
            }, {
              value: '金湾区',
              label: '金湾区'
            }, {
              value: '香洲区',
              label: '香洲区'
            }]
          }]
        },
          {
          value: '上海市',
          label: '上海市',
          children: [{
            value: '宝山区',
            label: '宝山区',
            children: [{
              value: '高镜镇',
              label: '高镜镇'
            }, {
              value: '大场镇',
              label: '大场镇'
            }, {
              value: '罗店镇',
              label: '罗店镇'
            }]
          }, {
            value: '崇明区',
            label: '崇明区',
            children: [{
              value: '长兴镇',
              label: '长兴镇'
            }, {
              value: '陈家镇',
              label: '陈家镇'
            }, {
              value: '城桥镇',
              label: '城桥镇'
            }]
          }]
        }],
        tableData: [],
        setForm: {},
        dialogVisible: false,
        isAdd: true,
        title: '新增'
      }
    },
    created() {
      this.getAddressList();
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      getAddressList() {
        var self = this
        axios.post('http://localhost:9091/bs/address/getAddressList',{
          userId: self.$store.state.user.userId
        }).then(function(res){
          if (res.data.success) {
            self.tableData = res.data.addressList
          } else {
            self.$message.error(res.data.msg);
          }
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      add() {
        this.setForm = {}
        this.setForm.isDefault = '是'
        this.title = '新增'
        this.dialogVisible = !this.dialogVisible
        this.isAdd = true
      },
      addAddress() {
        var self = this;
        axios.post('http://localhost:9091/bs/address/addAddress', {
          userId: self.$store.state.user.userId,
          name: self.setForm.name,
          phone: self.setForm.phone,
          address: self.setForm.address.toString(),
          detail: self.setForm.detail,
          isDefault: self.setForm.isDefault
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('新增成功');
            self.getAddressList();
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
      updateAddress() {
        var self = this;
        axios.post('http://localhost:9091/bs/address/updateAddress', {
          userId: self.$store.state.user.userId,
          name: self.setForm.name,
          phone: self.setForm.phone,
          address: self.setForm.address.toString(),
          detail: self.setForm.detail,
          isDefault: self.setForm.isDefault,
          addressId: self.setForm.addressId
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('修改成功');
            self.getAddressList();
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
        axios.post('http://localhost:9091/bs/address/deleteAddress', {
          addressId: row.addressId
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('删除成功');
            self.getAddressList();
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
