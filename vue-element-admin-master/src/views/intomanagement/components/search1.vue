<template>
    <div class="filter-container" >
        <el-row :gutter="1" >  
            <el-col :span="16">
              <div class="els">
                <div class="grid-content">商户名称：
                    <el-input v-model="searchList.storeName" clearable class="" style="width: 120px;"></el-input></div>                
                <div class="grid-content">商户编号：
                    <el-input v-model="searchList.storeNums" clearable class="" style="width: 120px;"></el-input></div>               
                <div class="grid-content">所属渠道商：
                    <el-input v-model="searchList.channels"  clearable class="" style="width: 120px;"></el-input></div>                            
                <div class="grid-content">所属渠道编号：
                    <el-input v-model="searchList.channelsNum" style="width:  120px;" clearable></el-input></div>
                </div>
              </el-col>
              <el-col :span="8">                 
                <div class="daoBox" >
                    <div class="piliang" @click="piliangSubmit">批量导入商户</div>
                    <div class="piliang adds" @click="addChain">新增商户</div>
                </div>
              </el-col>
         </el-row>
         <div  class="rows">           
                <span class="userSearch"> 创建时间：</span>
                  <el-date-picker v-model="searchList.value1"  type="daterange" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>                  
                <div class="grid-content">激活状态：
                    <select v-model="searchList.channelsStatus" class="selectBox"  @click="ss()" >
                       <option v-for="(a,index) in options" :key="index" :value="a.value"  :disabled="a.disabled">{{ a.label }}</option>
                    </select> 
                </div>                            
                <div class="grid-content">审核状态：
                    <select v-model="searchList.channelsStatus1" class="selectBox"  @click="ss()" >
                       <option v-for="(a,index) in options1" :key="index" :value="a.value"  :disabled="a.disabled">{{ a.label }}</option>
                    </select>  
                </div>                           
                <div class="grid-content">通道银行：
                    <el-input v-model="searchList.banks" style="width: 120px;" clearable></el-input></div>       
                <el-button v-waves class="searchs" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
                <div class="grid-content bb"></div>
          </div>
         
          <!-- 批量进件模态框 -->
         <el-dialog :visible.sync="dialogTableVisible"   width="30%" >
              <div class="diaTilte"><span>批量导入连锁商户</span></div>
              <div class="gards1"></div>
              <div class="downLoad" @click="downModle"><i class="el-icon-download"></i>下载批量进件模板</div>
               <div class="downLoad ds">请上传批量进件文件
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button> 
                <el-button  size="small" type="success" style="margin-left: 10px;"   @click="submitUpload">上传</el-button>
            </el-upload>
               </div>
               <!-- 上传说明 -->
               <div class="shuoming">
                  请按批量进件模版格式上传，如上传字段出现错误，将会造成整个文件上传失败，若上传失败，
                  请重新检查上传失败原因，然后重新上传。
                  上传成功后，请前往渠道进件列表中查看，并及时检查进件信息，若进件信息出现问题，请及
                  时修改，运营审核通过后将不能在此修改信息。
               </div>
</el-dialog>


    </div>
</template>

<script>
import { channelSearch, bulkImport } from "@/api/intomanagement";
import waves from "@/directive/waves"; // 水波纹指令
export default {
  name: "search1",
  directives: {
    waves
  },
  data() {
    return {
      searchList: {
        storeName: "",
        storeNums: "",
        channels: "",
        channelsNum: "",
        value1: "",
        channelsStatus: "",
        channelsStatus1: "",
        banks: ""
      },
      listLoading: false,
      dialogTableVisible: false,
      fileList: [],
      options: [
        {
          value: "",
          label: "选择激活状态",
          disabled: ""
        },
        {
          value: "0",
          label: "未激活"
        },
        {
          value: "1",
          label: "已激活"
        }
      ],
      options1: [
        {
          value: "",
          label: "选择审核状态",
          disabled: ""
        },
        {
          value: "0",
          label: "驳回"
        },
        {
          value: "1",
          label: "待审核"
        },
        {
          value: "2",
          label: "已审核"
        }
      ]
    };
  },
  methods: {
    //搜索功能,TODO:搜索情况相同，可以用同一个api，只是动态改变URL即可
    handleFilter() {
      console.log(this.searchList);
      this.$emit("channelSearch", this.searchList);
    },
    // 批量导入模态框
    piliangSubmit() {
      this.dialogTableVisible = true;
    },
    //批量下载模板
    downModle() {
      alert("批量下载模板");
      bulkImport("id").then(response => {
        console.log(response);
      });
    },
    //新增连锁商户按钮
    addChain() {
      this.$emit("addChain", "AddChain");
      console.log(222);
    },
    // 上传功能相关
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    ss() {
      this.options[0].disabled = "disabled";
      this.options1[0].disabled = "disabled";
      // this.options2[0].disabled = "disabled";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.els {
  text-align: center;
  padding-left: 80px;
  .grid-content {
    display: inline-block;
    font-size: 14px;
    margin: 30px 0 0px 20px;
    color: #666666;
    .el-input {
      display: inline-block;
    }
  }
}
.rows {
  text-align: center;
  padding-right: 140px;
  .grid-content {
    height: 30px;
    display: inline-block;
    font-size: 14px;
    margin: 10px 0 10px 20px;
    color: #666666;
    .el-input {
      display: inline-block;
    }
  }
  .bb {
    width: 150px;
  }
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 255px;
}
.searchs {
  position: relative;
  margin-left: 20px;
}
.userSearch {
  font-size: 14px;
  color: #666666;
}
.piliang {
  //   position: absolute;
  width: 140px;
  height: 40px;
  overflow: hidden;
  display: inline-block;
  background-image: linear-gradient(-180deg, #ebf1fc 0%, #d1ddf6 100%);
  border-radius: 6px;
  font-size: 16px;
  color: #1c3672;
  line-height: 40px;
  text-align: center;
  margin: 30px 10px 0px 10px;
  cursor: pointer;
}
.adds {
  background-image: linear-gradient(-137deg, #142855 0%, #4553a4 100%);
  margin-right: 30px;
  color: #ffffff;
}
.daoBox {
  text-align: right;
}

/* 模态框样式*/
#bbb {
  width: 574px;
  height: 262px;
}
.diaTilte {
  position: absolute;
  top: 20px;
  left: 37%;
  margin-left: 5px;
  font-size: 16px;
  color: #1c3672;
}
.gards1 {
  border: 1px solid #f0f0f0;
  width: 95%;
  height: 1px;
  margin-left: 10px;
}
.downLoad {
  font-size: 14px;
  color: #1c3672;
  margin: 20px 0 0 20px;
  cursor: pointer;
}
.ds {
  margin-top: 20px;
}
.upload-demo {
  display: inline-block;
}
.shuoming {
  margin-top: 10px;
  font-size: 12px;
  color: #666666;
  text-indent: 25px;
  line-height: 17px;
}
.selectBox {
  width: 120px;
  height: 35px;
  border: 1px solid #dcdfe6;
}
</style>