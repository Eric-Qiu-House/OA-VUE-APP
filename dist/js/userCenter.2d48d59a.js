"use strict";(self["webpackChunkscui"]=self["webpackChunkscui"]||[]).push([[869],{29501:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var l=n(20641),u=n(90033);const a={class:"user-info-top"},o={key:0,style:{"writing-mode":"horizontal-tb"}};function s(e,t,n,s,i,c){const r=(0,l.g2)("el-avatar"),p=(0,l.g2)("el-header"),d=(0,l.g2)("el-icon"),m=(0,l.g2)("el-menu-item"),g=(0,l.g2)("el-menu-item-group"),k=(0,l.g2)("el-menu"),f=(0,l.g2)("el-main"),h=(0,l.g2)("el-container"),b=(0,l.g2)("el-aside"),v=(0,l.g2)("el-skeleton");return(0,l.uX)(),(0,l.Wv)(h,{class:"page-user"},{default:(0,l.k6)((()=>[(0,l.bF)(b,{style:{width:"240px"}},{default:(0,l.k6)((()=>[(0,l.bF)(h,null,{default:(0,l.k6)((()=>[(0,l.bF)(p,{style:{height:"auto",display:"block"}},{default:(0,l.k6)((()=>[(0,l.Lk)("div",a,[(0,l.bF)(r,{size:70,src:i.user.userNameF?i.user.userNameF:"",style:(0,u.Tr)({backgroundColor:i.user.userNameF?"":"#409EFF",color:"#fff"})},{default:(0,l.k6)((()=>[i.user.userNameF?(0,l.Q3)("",!0):((0,l.uX)(),(0,l.CE)("span",o,(0,u.v_)(i.user.userName.slice(-2)),1))])),_:1},8,["src","style"]),(0,l.Lk)("h2",null,(0,u.v_)(i.user.userName),1)])])),_:1}),(0,l.bF)(f,{class:"nopadding"},{default:(0,l.k6)((()=>[(0,l.bF)(k,{class:"menu","default-active":i.page},{default:(0,l.k6)((()=>[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(i.menu,(e=>((0,l.uX)(),(0,l.Wv)(g,{key:e.groupName,title:e.groupName},{default:(0,l.k6)((()=>[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(e.list,(e=>((0,l.uX)(),(0,l.Wv)(m,{key:e.component,index:e.component,onClick:c.openPage},{title:(0,l.k6)((()=>[(0,l.Lk)("span",null,(0,u.v_)(e.title),1)])),default:(0,l.k6)((()=>[e.icon?((0,l.uX)(),(0,l.Wv)(d,{key:0},{default:(0,l.k6)((()=>[((0,l.uX)(),(0,l.Wv)((0,l.$y)(e.icon)))])),_:2},1024)):(0,l.Q3)("",!0)])),_:2},1032,["index","onClick"])))),128))])),_:2},1032,["title"])))),128))])),_:1},8,["default-active"])])),_:1})])),_:1})])),_:1}),(0,l.bF)(f,null,{default:(0,l.k6)((()=>[((0,l.uX)(),(0,l.Wv)(l.tY,null,{default:(0,l.k6)((()=>[((0,l.uX)(),(0,l.Wv)((0,l.$y)(i.page)))])),fallback:(0,l.k6)((()=>[(0,l.bF)(v,{rows:3})])),_:1}))])),_:1})])),_:1})}var i={name:"userCenter",components:{account:(0,l.$V)((()=>n.e(7841).then(n.bind(n,58950)))),seting:(0,l.$V)((()=>n.e(7636).then(n.bind(n,21098)))),pushSettings:(0,l.$V)((()=>n.e(9383).then(n.bind(n,75083)))),password:(0,l.$V)((()=>Promise.all([n.e(8749),n.e(4655)]).then(n.bind(n,17926)))),space:(0,l.$V)((()=>Promise.all([n.e(8749),n.e(4078)]).then(n.bind(n,92825)))),logs:(0,l.$V)((()=>n.e(2701).then(n.bind(n,98368)))),upToEnterprise:(0,l.$V)((()=>n.e(237).then(n.bind(n,16662))))},data(){return{menu:[{groupName:"基本设置",list:[{icon:"el-icon-postcard",title:"账号信息",component:"account"},{icon:"el-icon-lock",title:"密码",component:"password"},{icon:"el-icon-operation",title:"个人设置",component:"seting"},{icon:"el-icon-bell",title:"通知设置",component:"pushSettings"}]},{groupName:"数据管理",list:[{icon:"el-icon-coin",title:"存储空间信息",component:"space"},{icon:"el-icon-clock",title:"操作日志",component:"logs"}]},{groupName:"账号升级",list:[{icon:"el-icon-office-building",title:"升级为企业账号",component:"upToEnterprise"}]}],user:{userName:"Sakuya",userNameF:"",role:"超级管理员"},page:"account"}},created(){var e=this.$TOOL.data.get("USER_INFO");this.user.userName=e.fullname_,this.user.userNameF=this.userName.avatar_},beforeRouteEnter(e,t,n){n((e=>{t.is&&(delete t.is,e.$alert("路由跳转过来后含有特殊标识，做特殊处理","提示",{type:"success",center:!0}).then((()=>{})).catch((()=>{})))}))},methods:{openPage(e){this.page=e.index}}},c=n(66262);const r=(0,c.A)(i,[["render",s]]);var p=r}}]);