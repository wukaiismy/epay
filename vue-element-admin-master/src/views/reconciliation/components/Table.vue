<template>
    <div>
      <Search  @channelSearch='channelSearch' />
      <!-- 我是表格组件 -->
      <el-row :gutter="20">
        <el-col :span="16"> 
          <div class="bigBoxs">
            <el-table class="tableBox" v-loading="listLoading" :key="tableKey" :data="gridData" border fit @selection-change="handleSelectionChange" highlight-current-row style="width:100%;">
              <el-table-column align="center" type="selection" width="55"></el-table-column>
              <el-table-column property="channelNum" label="渠道编号"  align="center" ></el-table-column>
              <el-table-column property="tardNum" label="交易订单号"  align="center"></el-table-column>
              <el-table-column label="信条对账金额"  align="center">
                 <template slot-scope="scope">
                  <span type="text" size="small" class="xiaz">￥{{scope.row.money1| toThousandFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column  label="第三方对账金额"  align="center">
                <template slot-scope="scope">
                  <span type="text" size="small" class="xiaz">￥{{scope.row.money2| toThousandFilter}}</span>
                </template>
              </el-table-column>
              <el-table-column  label="异常类型"  align="center" width="95%">
                <template slot-scope="scope">
                  <span type="text" size="small" class="shanchu"  v-if="scope.row.statuss==1" >数据错误</span>
                  <span type="text" size="small" class="noppss" v-if="scope.row.statuss==2">多账</span>
                  <span type="text" size="small" class="noppss" v-if="scope.row.statuss==3">短账</span>
                </template>
              </el-table-column>
              <el-table-column  label="处理状态"  align="center" width="95%" >
                <template slot-scope="scope">
                  <span type="text" size="small" class="noppss"  v-if="scope.row.statu1==1" >等待处理</span>
                  <span type="text" size="small" class="ppss" v-if="scope.row.statu1==2">已调账</span>
                  <span type="text" size="small" class="tiaoz" v-if="scope.row.statu1==3">已处理</span>
                </template>
              </el-table-column>
              <el-table-column property="handing" label="处理方式"  align="center"  width="95%"></el-table-column>
              <el-table-column  label="操作"   align="center" width="80%" >
                <template slot-scope="scope" >
                  <el-button @click="passsubmit(scope.row)" type="text" size="small" class="xiaz">查看</el-button>            
                </template>
              </el-table-column>               
          </el-table>
          <!-- 下面的选择按钮 -->
          <div class="allChose">
            <el-button v-waves class="searchs" type="primary"  @click="cainaJump">采纳平台</el-button>
            <el-button v-waves class="searchs" type="primary"  @click="sanfangJump">采纳第三方</el-button>          
            <el-button v-waves class="searchs" type="primary"  icon="el-icon-download"  @click="daochuJump">导出</el-button>
          </div> 
        </div>
        <!-- 分页功能 -->
        <div class="pagination-container">
          <el-pagination v-show="total>0" :current-page="pages.page" :page-sizes="[10,20,30, 50]" :page-size="10" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
        </div>
     </el-col>
      <el-col :span="8">    
          <!-- 下面是每个渠道商信息显示部门 -->
          <div class="rightMenu" v-show="isShow">
            <Details ref='detailShow' />
          </div>
      </el-col>
    </el-row>
 </div>
</template>

<script>
import Search from "./search.vue";
import Details from "./Details.vue";
import waves from "@/directive/waves"; // 水波纹指令
import {
  merchantMsg,
  adoptPlatform,
  adoptThird,
  merchantDownload
} from "@/api/reconciliation";

export default {
  name: "Table",
  directives: {
    waves
  },
  data() {
    return {
      pages: {
        page: 1,
        size: 10
      },
      isShow: false,
      multipleSelection: [],
      value1: "",
      tableKey: 0,
      list: null,
      total: 1,
      listLoading: true,
      gridData: [
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "3",
          handing: "采纳第三方",
          statu1: "2"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "2",
          handing: "采纳第三方",
          statu1: "3"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "2",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        },
        {
          channelNum: "125451251152",
          tardNum: "300025451251152",
          money1: "2000.00",
          money2: "2000.00",
          statuss: "1",
          handing: "采纳第三方",
          statu1: "1"
        }
      ]
    };
  },
  components: {
    Search,
    Details
  },
  created() {
    this.getList();
  },
  methods: {
    // 搜索按钮传值回来
    channelSearch(data) {
      console.log(data);
      this.pages.page = 1;
      this.pages.size = 10;

      var datas = {
        name: data.channels,
        id: data.channelsNum,
        min_time: data.value1[0],
        max_time: data.value1[1],
        status: data.channelsStatus,
        review: data.channelsStatus1
      };
      console.log(datas);
      this.getList(datas);
    },
    //获取对账异常基本列表信息
    getList(data) {
      this.listLoading = true;
      console.log("对账异常表格基本信息");
      var channelURL =
        "/backend/api/v1/incoming/channellist/?page=" +
        this.pages.page +
        "&size=" +
        this.pages.size;
      this.isshow = false;
      // merchantMsg(channelURL,data).then(res => {
      //   console.log(res);
      // });
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    // 查看按钮
    passsubmit(data) {
      console.log("你点击了查看按钮");
      console.log(data.tardNum);
      this.isShow = true;
      this.$refs.detailShow.getMsg(data.tardNum);
    },

    // 采纳平台按钮
    cainaJump() {
      console.log("你点击了采纳平台按钮");
      // adoptPlatform(this.multipleSelection).then(res => {
      //   console.log(res);
      // });;
    },
    // 采纳第三方按钮
    sanfangJump() {
      console.log("你点击了采纳第三方按钮");
      // adoptThird(this.multipleSelection).then(res => {
      //   console.log(res);
      // });;
    },

    // 导出按钮
    daochuJump() {
      console.log("导出按钮");
      // merchantDownload(this.multipleSelection).then(res => {
      //   console.log(res);
      // this.msg=data
      // });
    },

    //分页功能选择
    handleSizeChange(val) {
      this.pages.size = val;
      this.pages.page = 1;
      this.getList();
    },
    //分页功能选择
    handleCurrentChange(val) {
      console.log("选择分页");
      this.pages.page = val;
      this.getList();
    }
  }
};
</script>

<style scoped>
.userSearch {
  font-size: 14px;
  color: #666666;
  margin-left: 4.4%;
}
.searchHandle {
  margin-left: 30px;
  margin-top: 5px;
}
.xiaz {
  color: #1c3672;
}
.tiaoz {
  color: #88acff;
}
.shanchu {
  color: #d0011b;
}
.bigBoxs {
  width: 100%;
  margin-left: 1%;
  background-color: #fff;
  padding-bottom: 20px;
  display: inline-block;
}
.tableBox {
  margin-bottom: 10px;
}
.pagination-container {
  margin: 22px 0 60px 100px;
}
.allChose {
  width: 100%;
  min-height: 34px;
  text-align: right;
}
.searchs {
  width: 110px;
  font-size: 14px;
  text-align: center;
  margin-right: 1%;
  padding-left: 0;
  padding-right: 0;
}
.ppss {
  color: #333333;
  font-size: 14px;
}
.noppss {
  color: #f6a623;
  font-size: 14px;
}
.rightMenu {
  width: 96%;
  padding-bottom: 50px;
  background-color: #fff;
  display: inline-block;
  margin-bottom: 40px;
}
</style>