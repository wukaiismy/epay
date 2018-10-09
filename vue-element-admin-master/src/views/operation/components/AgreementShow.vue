<template>
    <div class="agreeBox">
         <el-table class="tableBox" :header-cell-style="{background:'#F0F0F0'}"  :data="gridData" border fit highlight-current-row style="width:100%;">                            
            <el-table-column property="agreeTitle" label="协议标题"  align="center"></el-table-column>
            <el-table-column property="agreeType" label="协议类型"   align="center"></el-table-column>                                                                        
            <el-table-column  label="操作"   align="center" >
              <template slot-scope="scope" >
                <el-button @click="passsubmit(scope.row)" type="text" size="small" class="moneyStyles" >查看</el-button>                
                <el-button @click="edits(scope.row)" type="text" size="small" class="stopServer" >编辑</el-button>              
              </template>
            </el-table-column>       
    </el-table>
    </div>
</template>

<script>
export default {
  name: "AgreementShow",
  data() {
    return {
      gridData: [
        {
          agreeTitle: "用户认证协议",
          agreeType: "c端用户认证协议"
        },
        {
          agreeTitle: "担保账户协议",
          agreeType: "担保账户充值协议"
        },
        {
          agreeTitle: "商户运营协议",
          agreeType: "商户运营申请协议"
        },
        {
          agreeTitle: "渠道运营协议",
          agreeType: "渠道业务申请协议"
        }
      ]
    };
  },
  methods: {
    // 查看按钮
    passsubmit(data) {
      console.log(data);
      this.$emit("showAgree", data.agreeTitle);
    },

    // 编辑按钮
    edits(data) {
      console.log(data);
      this.$emit("editAgree", data.agreeTitle);
    }
  }
};
</script>

<style scoped>
.agreeBox {
  width: 900px;
  height: 227px;
  margin: 90px auto;
}
.tableBox {
  margin-bottom: 10px;
}

.searchs {
  width: 110px;
  font-size: 14px;
  color: #d0011b;
  text-align: center;
  margin-right: 1%;
  padding-left: 0;
  padding-right: 0;
  border-radius: 6px;
  border: 1px solid #d0011b;
  height: 34px;
}
.ppss {
  color: #4990e2;
  font-size: 14px;
}
.noppss {
  color: #999999;
  font-size: 14px;
}
.stopServer {
  font-size: 14px;
  color: #f6a623;
  margin-left: 20px;
  margin-right: 20px;
}
.rightMenu {
  width: 96%;
  padding-bottom: 50px;
  background-color: #fff;
  display: inline-block;
  margin-bottom: 40px;
}
.moneyStyles {
  font-size: 14px;
  color: #1c3672;
  margin-right: 30px;
}
.deleted {
  font-size: 14px;
  color: #d0011b;
  margin-left: 30px;
}
</style>