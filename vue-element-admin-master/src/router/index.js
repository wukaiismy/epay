import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/views/layout/Layout";

/* Router Modules */
// import componentsRouter from "./modules/components";
// import chartsRouter from "./modules/charts";
// import tableRouter from "./modules/table";
// import nestedRouter from "./modules/nested";

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/authredirect"),
    hidden: true
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "系统首页",
        meta: { title: "系统首页", icon: "dashboard", noCache: true }
      }
    ]
  }
];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: "/intomanagement",
    component: Layout,
    redirect: "noredirect",
    name: "进件管理",
    meta: { title: "进件管理", icon: "list", roles: ["admin", "super_editor"] },
    // roles: ['admin','super_editor'] 这是权限管理需要的东西，之后要加上
    // alwaysShow: true, // will always show the root menu
    children: [
      {
        path: "channels",
        component: () => import("@/views/intomanagement/channels"),
        name: "渠道进件",
        meta: { title: "渠道进件", noCache: true }
      },
      {
        path: "chainbus",
        component: () => import("@/views/intomanagement/chainbus"),
        name: "连锁商户进件",
        meta: { title: "连锁商户进件", noCache: true }
      },
      {
        path: "chainSonbus",
        component: () => import("@/views/intomanagement/chainSonbus"),
        name: "连锁子商户进件",
        meta: { title: "连锁子商户进件", noCache: true }
      },
      {
        path: "retailbus",
        component: () => import("@/views/intomanagement/retailbus"),
        name: "直营商户进件",
        meta: { title: "直营商户进件", noCache: true }
      }
    ]
  },

  {
    path: "/vi",
    component: Layout,
    name: "信条账户",
    redirect: "noredirect",
    meta: { title: "信条账户", icon: "intoabai", noCache: true },
    // alwaysShow: true, // will always show the root menu
    children: [
      {
        path: "merchantsTrad",
        component: () => import("@/views/vi/merchantsTrad"),
        name: "商户交易账户",
        meta: { title: "商户交易账户", noCache: true }
      },
      {
        path: "userTransaction",
        component: () => import("@/views/vi/userTransaction"),
        name: "用户交易账户",
        meta: { title: "用户交易账户", noCache: true }
      },
      {
        path: "merchantsDeposit",
        component: () => import("@/views/vi/merchantsDeposit"),
        name: "商户押金账户",
        meta: { title: "商户押金账户", noCache: true }
      },
      {
        path: "userDeposit",
        component: () => import("@/views/vi/userDeposit"),
        name: "用户押金账户",
        meta: { title: "用户押金账户", noCache: true }
      }
    ]
  },

  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  {
    path: "/trade",
    component: Layout,
    redirect: "noredirect",
    name: "交易管理",
    meta: { title: "交易管理", icon: "chart" },
    children: [
      {
        path: "merchantTrad",
        component: () => import("@/views/trade/merchantTrad"),
        name: "商户交易",
        meta: { title: "商户交易", noCache: true }
      },
      {
        path: "userRefund",
        component: () => import("@/views/trade/userRefund"),
        name: "用户退款",
        meta: { title: "用户退款", noCache: true }
      },
      {
        path: "abOrder",
        component: () => import("@/views/trade/abOrder"),
        name: "异常订单",
        meta: { title: "异常订单", noCache: true }
      }
    ]
  },

  {
    path: "/cleared",
    component: Layout,
    name: "结算管理",
    redirect: "noredirect",
    meta: { title: "结算管理", icon: "example" },
    children: [
      {
        path: "merchantSet",
        component: () => import("@/views/cleared/merchantSet"),
        name: "商户结算",
        meta: { title: "商户结算", noCache: true }
      },
      {
        path: "channelSet",
        component: () => import("@/views/cleared/channelSet"),
        name: "渠道结算",
        meta: { title: "渠道结算", noCache: true }
      }
    ]
  },

  {
    path: "/reconciliation",
    component: Layout,
    redirect: "noredirect",
    name: "对账管理",
    meta: { title: "对账管理", icon: "international" },
    children: [
      {
        path: "AbCheck",
        component: () => import("@/views/reconciliation/AbCheck"),
        name: "交易对账异常",
        meta: { title: "交易对账异常", noCache: true }
      },
      {
        path: "MerchantStatement",
        component: () => import("@/views/reconciliation/MerchantStatement"),
        name: "商户对账单",
        meta: { title: "商户对账单", noCache: true }
      }
    ]
  },

  {
    path: "/datastatis",
    component: Layout,
    name: "数据统计",
    meta: { title: "数据统计", icon: "chart", roles: ["admin"] },
    children: [
      {
        path: "PlatformTrad",
        component: () => import("@/views/datastatis/PlatformTrad"),
        name: "平台交易统计",
        meta: { title: "平台交易统计", noCache: true, roles: ["admin"] }
      },
      {
        path: "ChanelTrad",
        component: () => import("@/views/datastatis/ChanelTrad"),
        name: "渠道交易统计",
        meta: { title: "渠道交易统计", noCache: true, roles: ["admin"] }
      },
      {
        path: "StoreTrad",
        component: () => import("@/views/datastatis/StoreTrad"),
        name: "商户交易统计",
        meta: { title: "商户交易统计", noCache: true, roles: ["admin"] }
      }
    ]
  },
  {
    path: "/operation",
    component: Layout,
    redirect: "noredirect",
    name: "运营管理",
    meta: { title: "运营管理", icon: "nested" },
    children: [
      {
        path: "SMSPush",
        component: () => import("@/views/operation/SMSPush"),
        name: "短信推送",
        meta: { title: "短信推送", noCache: true }
      },
      {
        path: "AgreementManagment",
        component: () => import("@/views/operation/AgreementManagment"),
        name: "协议管理",
        meta: { title: "协议管理", noCache: true }
      }
    ]
  },
  {
    path: "/monitorCenter",
    component: Layout,
    redirect: "noredirect",
    name: "监控中心",
    meta: { title: "监控中心", icon: "star" },
    children: [
      {
        path: "MerchantRisk",
        component: () => import("@/views/monitorCenter/MerchantRisk"),
        name: "商户风险信息",
        meta: { title: "商户风险信息", noCache: true }
      },
      {
        path: "MerchantTradRisk",
        component: () => import("@/views/monitorCenter/MerchantTradRisk"),
        name: "商户交易风险",
        meta: { title: "商户交易风险", noCache: true }
      },
      {
        path: "UserTradRisk",
        component: () => import("@/views/monitorCenter/UserTradRisk"),
        name: "用户交易风险",
        meta: { title: "用户交易风险", noCache: true }
      }
    ]
  },
  {
    path: "/systemsetings",
    component: Layout,
    name: "系统设置",
    redirect: "/systemsetings/RoleAuthorization",
    meta: { title: "系统设置", icon: "peoples" },
    children: [
      {
        path: "RoleAuthorization",
        component: () => import("@/views/systemsetings/RoleAuthorization"),
        name: "角色权限",
        meta: { title: "角色权限", noCache: true }
      },
      {
        path: "UserAuthorization",
        component: () => import("@/views/systemsetings/UserAuthorization"),
        name: "用户权限管理",
        meta: { title: "用户权限管理", noCache: true }
      }
    ]
  },

  { path: "*", redirect: "/404", hidden: true }
];
