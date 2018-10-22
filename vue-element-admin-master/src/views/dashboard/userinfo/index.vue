<template>
    <div class="msgBox">
       <!-- 信息选择查看部分 -->   
           <el-row>
                <el-col :span="8"><div class="grid-content" @click="chosed(1)" :class="isShow1?'selected':''">基本信息</div></el-col>
                <el-col :span="8"><div class="grid-content " @click="chosed(2)" :class="isShow2?'selected':''">运营信息</div></el-col>
                <el-col :span="8"><div class="grid-content "  @click="chosed(3)" :class="isShow3?'selected':''">结算信息</div></el-col>
            </el-row>
            <img class="lines" :src="lines" alt="">
           <!-- 下面是展示部分 -->
           <div class="showBoxs" v-show="isShow1">
               <div class="items" v-for="(us, index) in userInfo" :key="index"><div class="titles">{{us.title}}：</div><span>{{us.msg}}</span></div>
               <div class="items"><div class="titles">营业执照：</div><span><img class="photos" :src="photo" alt=""></span></div>
               <div class="items"><div class="titles">运营协议：</div><span><img class="photos" :src="photo" alt=""></span></div>
               <div class="items"><div class="titles">法人姓名：</div><span>大老二</span></div>
               <div class="items"><div class="titles">法人身份证号码：</div><span>522021325457895566</span></div>
               <div class="items"><div class="titles">法人身份证扫描件：</div><span><img class="photos" :src="photo" alt=""><img class="photos" :src="photo" alt=""></span></div>
           </div>

           <div class="showBoxs" v-show="isShow2">
               <div class="items"><div class="titles">运营者名字：</div><span>成都张学友</span></div>
               <div class="items"><div class="titles">联系电话：</div><span>15788458455</span></div>
               <div class="items"><div class="titles">电子邮箱：</div><span>255419@qq.com</span></div>
               <div class="items"><div class="titles">客服电话：</div><span>028-2210-220</span></div>
               <div class="items"><div class="titles">商户类型：</div><span>企业</span></div>
               <div class="items"><div class="titles">经营范围：</div><span>零食批发，消费服务，就这些了</span></div>
               <div class="items"><div class="titles">补充材料：</div><span><img class="photos" :src="photo" alt=""><img class="photos" :src="photo" alt=""></span></div>
           </div>
            <div class="showBoxs" v-show="isShow3">
               <div class="items"><div class="titles">结算类型：</div><span>企业</span></div>
               <div class="items"><div class="titles">结算户名：</div><span>成都张学友</span></div>
               <div class="items"><div class="titles">结算银行：</div><span>534 1111 2236 1111 000</span></div>
               <div class="items"><div class="titles">结算账户：</div><span>1000034525588.mch</span></div>              
           </div>
           
    </div>
</template>

<script>
import { navbarUserInfo } from "@/api/navbarMsg";
import lines1 from "../../../assets/login/line.png";
import lines2 from "../../../assets/login/line2.png";
import lines3 from "../../../assets/login/line3.png";
import photos from "../../../assets/wukai.jpg";
export default {
  name: "userinfo",
  data() {
    return {
      lines: lines1,
      photo: photos,
      isShow1: true,
      isShow2: false,
      isShow3: false,
      userInfo: [
        { title: "所属渠道商", msg: "成都易付云金融科技中心" },
        { title: "所属渠道商编号", msg: "5698512654236423641" },
        { title: "商户名称", msg: "成都易付云金融科技中心" },
        { title: "营业执照编号", msg: "1008512654236423641" },
        { title: "营业期限", msg: "2011-12-21~2099-12-21" },
        { title: "公司地址", msg: "成都天府新区" },
        { title: "详细地址", msg: "天府新谷2栋" },
        { title: "营业范围", msg: "洗浴、休息" }
      ]
    };
  },
  mounted() {
    this.getMsg();
  },
  methods: {
    //选择查看的信息
    chosed(index) {
      if (index == 1) {
        this.isShow1 = true;
        this.isShow2 = false;
        this.isShow2 = false;
        this.lines = lines1;
      } else if (index == 2) {
        this.isShow1 = false;
        this.isShow2 = true;
        this.isShow3 = false;
        this.lines = lines2;
      } else if (index == 3) {
        this.isShow1 = false;
        this.isShow2 = false;
        this.isShow3 = true;
        this.lines = lines3;
      }
    },
    //获取用户详细信息
    getMsg() {
      // 进行ajax请求、
      // navbarUserInfo().then(res => {
      //   console.log(res);
      //   if (res.code == 200) {
      // this.userInfo=res.data
      //   }
      // });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.msgBox {
  width: 56%;
  // height: 857px;
  min-height: 270px;
  background-color: #fff;
  margin: 20px auto 200px;
  position: relative;
  padding: 0 3.12% 20px;
}
.el-col {
  font-size: 18px;
  color: #999999;
  margin: 23px auto;
  text-align: center;
  cursor: pointer;
}
.selected {
  color: #1c3672;
}
.lines {
  width: 100%;
  height: 16px;
}
.showBoxs {
  width: 100%;
  margin: 30px auto;
  font-size: 14px;
  color: #666666;
  padding: 1px;
  .items {
    margin-top: 10px;
    position: relative;
    span {
      color: #333333;
      margin-left: 38%;
    }
  }
  .titles {
    display: inline-block;
    position: absolute;
    right: 61.9%;
  }
  .photos {
    height: 140px;
    margin-right: 20px;
  }
}
</style>