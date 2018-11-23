<template>
    <div class="msgBox">
       <!-- 信息选择查看部分 --> 
       <template  v-if="roles=='admin'||roles=='bankadmin'">
         <h2 class="showmsg">信条平台和银行无进件信息</h2> 
       </template>
       <template v-if="roles=='merchantadmin'" >        
           <el-row>
                <el-col :span="8"><div class="grid-content" @click="chosed(1)" :class="isShow1?'selected':''">基本信息</div></el-col>
                <el-col :span="8"><div class="grid-content " @click="chosed(2)" :class="isShow2?'selected':''">运营信息</div></el-col>
                <el-col :span="8"><div class="grid-content "  @click="chosed(3)" :class="isShow3?'selected':''">结算信息</div></el-col>
            </el-row>
            <img class="lines" :src="lines" alt="">
           <!-- 下面是展示部分 -->
           <div class="showBoxs" v-show="isShow1">
               <div class="items"><div class="titles">所属渠道商：</div><span>{{userInfo.channel.name}}</span></div>
               <div class="items"><div class="titles">所属渠道商编号：</div><span>{{userInfo.channel.id}}</span></div>
               <div class="items"><div class="titles">商户名称：</div><span>{{userInfo.name}}</span></div>
               <div class="items"><div class="titles">营业期限：</div><span>{{userInfo.merchantfile.business_begin}}~{{userInfo.merchantfile.business_end}}</span></div>
               <div class="items"><div class="titles">公司地址：</div><span>{{userInfo.merchantfile.city}}</span></div>
               <div class="items"><div class="titles">详细地址：</div><span>{{userInfo.location}}</span></div>
               <div class="items"><div class="titles">营业范围：</div><span>{{userInfo.merchantfile.business_type}}</span></div>
               <div class="items"><div class="titles">营业执照：</div><span>{{userInfo.merchantfile.license_no}}</span></div>
               
               <div class="items"><div class="titles">运营协议：</div><span><img class="photos" :src="'/backend/media/'+userInfo.merchantfile.operator_agreement" alt=""></span></div>
               <div class="items"><div class="titles">法人姓名：</div><span>{{userInfo.merchantfile.legal_name}}</span></div>
               <div class="items"><div class="titles">法人身份证号码：</div><span>{{userInfo.merchantfile.legal_id_card}}</span></div>
               <div class="items"><div class="titles">法人身份证扫描件：</div><span><img class="photos" :src="'/backend/media/'+userInfo.merchantfile.legal_id_card_backend" alt=""><img class="photos" :src="'/backend/media/'+userInfo.merchantfile.legal_id_card_front" alt=""></span></div>
           </div>

           <div class="showBoxs" v-show="isShow2">
               <div class="items"><div class="titles">运营者名字：</div><span>{{userInfo.merchantfile.operator_name}}</span></div>
               <div class="items"><div class="titles">联系电话：</div><span>{{userInfo.merchantfile.operator_mobile}}</span></div>
               <div class="items"><div class="titles">电子邮箱：</div><span>{{userInfo.merchantfile.operator_email}}</span></div>
               <div class="items"><div class="titles">客服电话：</div><span>{{userInfo.merchantfile.service_tel}}</span></div>
               <div class="items"><div class="titles">商户类型：</div><span>{{userInfo.merchantfile.operator_type}}</span></div>
               <div class="items"><div class="titles">经营范围：</div><span>{{userInfo.merchantfile.business_scope}}</span></div>
               <div class="items"><div class="titles">补充材料：</div><span><img class="photos"  v-for="(item, index) in userInfo.merchantfile.supplement.split(',')" :key="index" :src="'/backend/media/'+item"></span></div>
           </div>
            <div class="showBoxs" v-show="isShow3">
               <div class="items"><div class="titles">结算类型：</div>
               <template>
                  <span v-if="userInfo.merchantfile.clear_type=='1'">企业</span>
                  <span v-if="userInfo.merchantfile.clear_type=='2'">个人</span>            
                </template>
               </div>
               <div class="items"><div class="titles">结算户名：</div><span>{{userInfo.merchantfile.bankcard_name}}</span>
               </div>
               <div class="items"><div class="titles">结算银行：</div><span>{{userInfo.merchantfile.set_bank_name}}</span></div>
               <div class="items"><div class="titles">结算账户：</div><span>{{userInfo.merchantfile.bank_credit}}</span></div>              
           </div>
        </template>  
        <!-- 渠道信息 -->
         <template v-if="roles=='channeladmin'" >        
           <el-row>
                <el-col :span="8"><div class="grid-content" @click="chosed(1)" :class="isShow1?'selected':''">基本信息</div></el-col>
                <el-col :span="8"><div class="grid-content " @click="chosed(2)" :class="isShow2?'selected':''">运营信息</div></el-col>
                <el-col :span="8"><div class="grid-content "  @click="chosed(3)" :class="isShow3?'selected':''">结算信息</div></el-col>
            </el-row>
            <img class="lines" :src="lines" alt="">
           <!-- 下面是展示部分 -->
           <div class="showBoxs" v-show="isShow1">
               <div class="items"><div class="titles">渠道商名称：</div><span>{{userInfo.name}}</span></div>
               <div class="items"><div class="titles">渠道商编号：</div><span>{{userInfo.id}}</span></div>
               <!-- <div class="items"><div class="titles">商户名称：</div><span>{{userInfo.name}}</span></div> -->
               <div class="items"><div class="titles">营业期限：</div><span>{{userInfo.channelfromfiles.business_begin}}~{{userInfo.channelfromfiles.business_end}}</span></div>
               <div class="items"><div class="titles">公司地址：</div><span>{{userInfo.channelfromfiles.city}}</span></div>
               <div class="items"><div class="titles">详细地址：</div><span>{{userInfo.location}}</span></div>
               <div class="items"><div class="titles">营业范围：</div><span>{{userInfo.channelfromfiles.business_type}}</span></div>
               <div class="items"><div class="titles">营业执照：</div><span>{{userInfo.channelfromfiles.license_no}}</span></div>
               
               <div class="items"><div class="titles">运营协议：</div><span><img class="photos" :src="'/backend/media/'+userInfo.channelfromfiles.operator_agreement" alt=""></span></div>
               <div class="items"><div class="titles">法人姓名：</div><span>{{userInfo.channelfromfiles.legal_name}}</span></div>
               <div class="items"><div class="titles">法人身份证号码：</div><span>{{userInfo.channelfromfiles.legal_id_card}}</span></div>
               <div class="items"><div class="titles">法人身份证扫描件：</div><span><img class="photos" :src="'/backend/media/'+userInfo.channelfromfiles.legal_id_card_backend" alt=""><img class="photos" :src="'/backend/media/'+userInfo.channelfromfiles.legal_id_card_front" alt=""></span></div>
           </div>

           <div class="showBoxs" v-show="isShow2">
               <div class="items"><div class="titles">运营者名字：</div><span>{{userInfo.channelfromfiles.operator_name}}</span></div>
               <div class="items"><div class="titles">联系电话：</div><span>{{userInfo.channelfromfiles.operator_mobile}}</span></div>
               <div class="items"><div class="titles">电子邮箱：</div><span>{{userInfo.channelfromfiles.operator_email}}</span></div>
               <div class="items"><div class="titles">客服电话：</div><span>{{userInfo.channelfromfiles.service_tel}}</span></div>
               <div class="items"><div class="titles">商户类型：</div><span>{{userInfo.channelfromfiles.operator_type}}</span></div>
               <div class="items"><div class="titles">经营范围：</div><span>{{userInfo.channelfromfiles.business_scope}}</span></div>
               <div class="items"><div class="titles">补充材料：</div><span><img class="photos"  v-for="(item, index) in userInfo.channelfromfiles.supplement.split(',')" :key="index" :src="'/backend/media/'+item"></span></div>
           </div>
            <div class="showBoxs" v-show="isShow3">
               <div class="items"><div class="titles">结算类型：</div>
               <template>
                  <span v-if="userInfo.channelfromfiles.clear_type=='1'">企业</span>
                  <span v-if="userInfo.channelfromfiles.clear_type=='2'">个人</span>            
                </template>
               </div>
               <div class="items"><div class="titles">结算户名：</div><span>{{userInfo.channelfromfiles.bankcard_name}}</span>
               </div>
               <div class="items"><div class="titles">结算银行：</div><span>{{userInfo.channelfromfiles.bank_name}}</span></div>
               <div class="items"><div class="titles">结算账户：</div><span>{{userInfo.channelfromfiles.bank_credit}}</span></div>              
           </div>
        </template>  
    </div>
</template>

<script>
import { navbarUserInfo } from "@/api/navbarMsg";
import { mapGetters } from "vuex";
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
      userInfo: {}
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
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
      navbarUserInfo().then(res => {
        console.log(res);
        //   if (res.code == 200) {
        this.userInfo = res.data[0];
        //   }
      });
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
.showmsg {
  text-align: center;

  position: relative;
  top: 100px;
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