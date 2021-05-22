<template>
    <div>
        <h1>缴费&查看就诊单</h1>
        <el-row type="flex" justify="center">
            <el-col>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            type="index">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="医生姓名">
                    </el-table-column>
                    <el-table-column
                            prop="disease"
                            label="病名">
                    </el-table-column>
                    <el-table-column
                            prop="cause"
                            label="病因">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="医药费">
                    </el-table-column>
                    <el-table-column
                            prop="sm"
                            label="服药说明">
                    </el-table-column>
                    <el-table-column
                            prop="tip"
                            label="医嘱">
                    </el-table-column>
                    <el-table-column
                            prop="processstep"
                            label="状态">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="开就诊单时间">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="300">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="downloadFile(scope.row)">下载病例本</el-button>
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="pay(scope.row)">缴费</el-button>
                          <el-button
                            size="mini"
                            type="primary"
                            @click="goPrint(scope.row)">打印</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog
                title="假装这是缴费二维码"
                :visible.sync="dialogVisible"
                width="30%">
            <el-image
                    style="width: 200px; height: 200px"
                    :src="require('../../assets/img/code.png')"></el-image>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="pay2">缴费</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
              </span>
        </el-dialog>
      <div v-if="print" id="printCons">
        <el-row>
          <el-col>
            <p class="cf">桂林卫生院处方筏</p>
          </el-col>
        </el-row>
        <divider></divider>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <p class="cf">患者编号：{{data.username}}</p>
          </el-col>
          <el-col :span="6">
            <p class="cf">姓名：{{data.name}}</p>
          </el-col>
          <el-col :span="6">
            <p class="cf">性别：{{data.sex}}</p>
          </el-col>
          <el-col :span="6">
            <p class="cf">年龄：{{data.age}}</p>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <p class="cf">日期：{{data.date}}</p>
          </el-col>
          <el-col :span="6">
            <p class="cf">联系电话：{{data.telephone}}</p>
          </el-col>
          <el-col :span="6">
            <p class="cf">邮箱：{{data.email}}</p>
          </el-col>
          <el-col :span="6">
            <p class="cf">地址：{{data.address}}</p>
          </el-col>
        </el-row>
        <divider></divider>
        <el-row type="flex" justify="center">
          <el-col :span="4"><p class="cf">病名：</p></el-col>
          <el-col :span="20">
            <p class="cf">{{setForm.disease}}</p>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="4"><p class="cf">病因：</p></el-col>
          <el-col :span="20">
            <p class="cf">{{setForm.cause}}</p>
          </el-col>
        </el-row>
        <divider></divider>
        <el-row type="flex" justify="center">
          <el-col :span="12"><p class="cf" style="text-align: left;padding-left: 40px;">RP</p></el-col>
          <el-col :span="12"><p class="cf" style="text-align: right;padding-right: 40px;">{{setForm.ji}}剂</p></el-col>
        </el-row>
        <p class="cf">注：中药的单位为g，其他药看具体规格，盒装为盒，袋装为袋，吊瓶为瓶...</p>
        <el-row type="flex" justify="center" v-for="(item,index) in cfdetail" :key="index" v-if='index%2==0'>
          <el-col :span="12">
            <p class="cf">{{item.mediname}} {{item.medinum}}</p>
          </el-col>
          <el-col :span="12" v-if='index+1<cfdetail.length'>
            <p class="cf">{{cfdetail[index+1].mediname}} {{cfdetail[index+1].medinum}}</p>
          </el-col>
        </el-row>
        <divider></divider>
        <el-row type="flex" justify="center">
          <el-col :span="4"><p class="cf">服药说明：</p></el-col>
          <el-col :span="20">
            <p class="cf">{{setForm.sm}}</p>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="4"><p class="cf">医嘱：</p></el-col>
          <el-col :span="20">
            <p class="cf">{{setForm.tip}}</p>
          </el-col>
        </el-row>
        <divider></divider>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <p class="cf">医药费：{{setForm.money}}</p>
          </el-col>
          <el-col :span="12">
            <p class="cf">医生签名：{{doctorname}}</p>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import axios from "axios";
  import printJS from "print-js";
  import Divider from "../../common/divider/Divider";
  export default {
    name: "payAndVform",
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        processid: '',
        doctor: '',
        doctorname: '',
        print: false,
        cfdetail: [],
        data: [],
        setForm: [],
        name: this.$store.state.user.name,

      }
    },
    created() {
      this.getMyVform();
    },
    methods: {
      goPrint(row){
        if (row.cfid === undefined || row.cfid === '') {
          this.$message.error('处方id不能为空');
          return
        }
        this.doctorname = row.name
        this.getMyCfdetail(row.cfid)
        this.getMyCfByProcessid(row.processid)
        printJS({
          printable: 'printCons',
          type: 'html',
          targetStyles: ['*'],
          ignoreElements:['no-print','bc','gb']
        })
        this.print = !this.print
      },
      getMyCfdetail(cfid) {
        var self = this
        axios.post('http://localhost:9091/hvs/vform/getMyCfdetail',{
          cfid: cfid
        }).then(function(res){
          self.cfdetail = res.data
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      getMyCfByProcessid(id) {
        var self = this
        axios.post('http://localhost:9091/hvs/vform/getMyCfByProcessid',{
          processid: id
        }).then(function(res){
          self.data = res.data[0]
          self.setForm = res.data[0]
        }).catch(function(err){
          self.$message.error(err);
        })
      },
      pay2() {
        var self = this
        axios.post('http://localhost:9091/hvs/process/updateP',{
          processid: self.processid,
          doctor: self.doctor,
          userid: self.$store.state.user.userid
        }).then(function(res){
          if (res.data.success) {
            self.$message.success('缴费成功');
            self.getMyVform();
          } else {
            self.$message.error(res.data.msg);
          }
        }).catch(function(err){
          self.$message.error(err);
        })
        this.dialogVisible = !this.dialogVisible
      },
      pay(row) {
        this.processid = row.processid
        this.doctor = row.doctor
        this.dialogVisible = !this.dialogVisible
      },
      downloadFile(row) {
        window.location.href='http://localhost:9091/hvs/set/downloadFile/' + row.filename;
      },
      getMyVform() {
        var self = this
        axios.post('http://localhost:9091/hvs/vform/getMyVform',{
          userid: self.$store.state.user.userid
        }).then(function(res){
          self.tableData = res.data
        }).catch(function(err){
          self.$message.error(err);
        })
      }
    }
  }
</script>

<style scoped>
  #printCons{
    width: 700px;
    border: 1px solid black;
  }
  .cf{
    margin: 20px 0 20px 0;
    font-size: 20px;
  }
</style>
