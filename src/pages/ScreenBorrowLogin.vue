<template>
  <el-row>
    <el-col :sm="{span:24}" :xs="{span:24}">
      <h1>网板管理</h1>
    </el-col>
    <el-col :sm="{span:12}" :offset="6">
      <el-card>
        领用人登录：<el-input v-model="input" placeholder="请扫描工号" ref="getFocus" @keyup.enter="onSubmit"/>

      </el-card>
    </el-col>
  </el-row>
</template>
<script>
    import axios from "axios"

    const queryOperatorJobId = async (params) => {
      try {
        const response = await axios({
          method: 'GET',
          url: `api/standing-book/operator/queryOperatorJobId/${params}`,
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
      name:"ScreenBorrowLogin",
      data(){
        return{
          input:'',
        }
      },
      mounted() {
        this.$refs.getFocus.focus();
      },
      methods:{
        onSubmit(){
          const operatorPromise = queryOperatorJobId(this.input);
          operatorPromise
              .then((data) => {
                if (data.success){
                  this.$router.push({path:"/ScreenBorrow",query:{borrower:data.data.operatorName,jobNo:data.data.operatorJobId}})
                }else {
                  this.input='';
                  this.$message.warning('请联系管理员添加领取权限');
                }
              })
              .catch((error) => {
                console.log(error);
              });
        }
      }
    }
</script>
<style>

</style>
