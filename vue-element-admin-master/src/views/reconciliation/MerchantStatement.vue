<template>
    <div>
      <div class="bigBox">      
        <div class="items">用户类型：
           <select v-model="dataList.userType" class="selectBox"  @click="ss()" >
                <option v-for="(a,index) in options" :key="index" :value="a.value"  :disabled="a.disabled">{{ a.label }}</option>
           </select>  
          <!-- <el-input placeholder="请输入用户类型" v-model="dataList.userType" clearable></el-input> -->
          </div>
        <div  class="items">商户名称：<el-input placeholder="请输入商户名称" v-model="dataList.userName" clearable></el-input></div>
        <div  class="items">交易日期：<el-date-picker v-model="dataList.date" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
          </div> 
        <el-button @click="sumbit">下载对账单</el-button>
      </div>
    
        <!-- 下面是详情模态框 -->
       <el-dialog :visible.sync="dialogTableVisible" width='300px' top='30vh'>
            <div class="diaTilte"><img src="../../assets/login/prompt.png" alt=""><span>温馨提示</span></div>
            <div class="mians">该商品在指定日期未生成订单</div>
            <div class="btns"><el-button class="btnss"  @click="qued">确定</el-button></div>
      </el-dialog>     
    </div>
</template>

<script>
import { reconDownload } from "@/api/reconciliation";
export default {
  name: "MerchantStatement",
  data() {
    return {
      dataList: {
        userType: "dis",
        userName: "",
        date: ""
      },
      dialogTableVisible: false,
      options: [
        {
          value: "dis",
          label: "请选择用户类型",
          disabled: ""
        },
        {
          value: "普通用户",
          label: "普通用户"
        },
        {
          value: "超级VIP",
          label: "超级VIP"
        }
      ]
    };
  },
  methods: {
    //下载对账单
    sumbit() {
      var DownloadURL = "prepaid/prepaidtoexcel/";
      // reconDownload(DownloadURL,this.dataList).then(res => {
      //   console.log(res);
      //  let url = window.URL.createObjectURL(new Blob([res.data]));
      //   let link = document.createElement("a");
      //   link.style.display = "none";
      //   link.href = url;
      //   link.setAttribute("download", "商户交易.xls");
      //   document.body.appendChild(link);
      //   link.click();
      // if(res.data.code='202'){
      this.dialogTableVisible = true;
      // }

      // });
    },
    //模态框确定按钮
    qued() {
      this.dialogTableVisible = false;
    },
    ss() {
      this.options[0].disabled = "disabled";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bigBox {
  width: 500px;
  height: 300px;
  background-color: #fff;
  margin: 137px auto;
  font-size: 14px;
  color: #666666;
  position: relative;
  padding: 10px 0 1px 0;

  .items {
    margin: 20px 61px 0 61px;
    width: 500px;
    height: 36px;
    display: inline-block;
    .el-input {
      width: 314px;
      margin: 0;
      display: inline-block;
      top: 0;
      left: 0px;
    }
  }
  .el-button--medium {
    background-image: linear-gradient(-137deg, #4553a4 0%, #142855 100%);
    border-radius: 6px;
    font-size: 14px;
    color: #ffffff;
    width: 260px;
    height: 36px;
    position: relative;
    top: 30px;
    left: 25%;
  }
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 314px;
}
.el-dialog__wrapper {
  line-height: 2 !important;
  height: 100%;
  .el-dialog {
    position: relative;
    .diaTilte {
      position: absolute;
      top: 20px;
      left: 37%;
      span {
        margin-left: 5px;
        font-size: 14px;
        color: #f6a623;
      }
    }
  }
}
.mians {
  text-align: center;
}
.btns {
  margin: 30px auto 0;
  text-align: center;
}
.btnss {
  background-image: linear-gradient(-180deg, #ebf1fc 0%, #d1ddf6 100%);
  border-radius: 4px;
  font-size: 14px;
  color: #1c3672;
  width: 160px;
  height: 36px;
}
.selectBox {
  width: 311px;
  height: 36px;
  border: 1px solid #dcdfe6;
}
</style>