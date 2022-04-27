<template>
  <el-row>
    <el-col :sm="{span:24}" :xs="{span:24}">
      <h1>网板借用页面</h1>
      <span>领用人：{{this.operator.borrower}}</span>
      <span style="float: right" @click="dialogVisible = true"><el-button type="success">领用</el-button></span>
      <el-divider></el-divider>
    </el-col>
    <span style="float: right"><el-input v-model="silkScreenId" placeholder="请扫描网板" ref="getFocus" @keyup.enter="enterSubmit"/></span>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="网板ID" width="80" />
      <el-table-column prop="silkScreenName" label="网板名称" width="100" />
      <el-table-column prop="productCode" label="产品编码" />
      <el-table-column prop="drawingNo" label="图号" width="100" />
      <el-table-column prop="purchaseNo" label="采购单号" width="100" />
      <el-table-column prop="purchaseDate" label="采购日期" width="100" />
      <el-table-column prop="statusCN" label="使用状态" />
      <el-table-column prop="shelfLabel" label="架位" />
      <el-table-column prop="borrower" label="借用人" />
      <el-table-column prop="remark" label="备注" />
    </el-table>
  </el-row>
  <el-dialog v-model="dialogVisible" title="是否确认领用网板？" width="30%">
    <template #default>
      <span >
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="onsubmit"
        >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>
<script>
import axios from "axios"

const addRecordBatch = async (params) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `api/standing-book/silkScreenBorrow/addRecordBatch`,
      headers: {
        'Content-Type': "application/json"
      },
      data:params
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const findSilkScreen = async (params) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `api/standing-book/silkScreenBorrow/findSilkScreen/${params}`,
      headers: {
        'Content-Type': "application/json"
      }
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export default {
  name:"ScreenBorrow",
  data(){
    return{
      operator:{
        borrower:this.$route.query.borrower,
        jobNo:this.$route.query.jobNo
      },
      tableData:[],
      silkScreenId:"",
      dialogVisible:false
    }
  },
  mounted() {
  },
  methods:{
    onsubmit(){
      const params=this.tableData;
        const recordBatchPromise = addRecordBatch(params);
        recordBatchPromise
            .then((data) => {
              if (data.success){
                this.$message.warning('网板借用成功');
                this.dialogVisible=false;
                this.tableData=null;
                this.$router.push({path:"/ScreenBorrowLogin"})
              }
            })
            .catch((error) => {
              console.log(error);
            });
    },
    enterSubmit(){
      let str = this.silkScreenId;
      let index = str.lastIndexOf('/');
      str = str.substring(index + 1, str.length);
      let id = parseInt(str);
      let screenList=this.tableData;

      let boolean=screenList.some(function (screen){
        if (screen.id===id){
          return true;
        }
      })
      if(!boolean){
        const screenPromise = findSilkScreen(id);
        screenPromise
            .then((data) => {
              console.log(data);
              if (data.data.status===1){
                let obj=data.data;
                obj["borrower"]=this.operator.borrower;
                obj["jobNo"]=this.operator.jobNo;
                obj["operationType"]="B";
                obj["silkScreenId"]=id;
                this.tableData.push(obj);

              }else {
                this.$message.error('当前扫描网板已被借出，请先归还');
              }
            })
            .catch((error) => {
              console.log(error);
            });
      }else {
        this.$message.error('请勿重复扫描同一块网板');
      }
      this.silkScreenId="";
    }
  }
}
</script>
<style>
</style>
