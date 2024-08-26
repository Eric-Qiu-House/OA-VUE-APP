"use strict";(self["webpackChunkscui"]=self["webpackChunkscui"]||[]).push([[8241],{21468:function(e,l,a){a.r(l),a.d(l,{default:function(){return k}});var t=a(20641),o=a(90033);const u=(0,t.Lk)("div",{class:"el-form-item-msg","data-v-b33b3cf8":""},"关闭后普通用户无法登录，仅允许管理员角色登录",-1),d=(0,t.Lk)("div",{class:"el-form-item-msg","data-v-b33b3cf8":""},"关闭后用户无法收到短信，但日志中将记录",-1),r={key:1},s={key:1},n={key:1},i={key:1};function m(e,l,a,m,p,b){const y=(0,t.g2)("el-input"),k=(0,t.g2)("el-form-item"),f=(0,t.g2)("el-switch"),c=(0,t.g2)("el-button"),g=(0,t.g2)("el-form"),V=(0,t.g2)("el-tab-pane"),_=(0,t.g2)("el-alert"),w=(0,t.g2)("el-table-column"),F=(0,t.g2)("el-popconfirm"),v=(0,t.g2)("el-button-group"),h=(0,t.g2)("el-table"),U=(0,t.g2)("el-tabs"),C=(0,t.g2)("el-card"),S=(0,t.g2)("el-main");return(0,t.uX)(),(0,t.Wv)(S,null,{default:(0,t.k6)((()=>[(0,t.bF)(C,{shadow:"never"},{default:(0,t.k6)((()=>[(0,t.bF)(U,{"tab-position":"top"},{default:(0,t.k6)((()=>[(0,t.bF)(V,{label:"系统设置"},{default:(0,t.k6)((()=>[(0,t.bF)(g,{ref:"form",model:p.sys,"label-width":"100px",style:{"margin-top":"20px"}},{default:(0,t.k6)((()=>[(0,t.bF)(k,{label:"系统名称"},{default:(0,t.k6)((()=>[(0,t.bF)(y,{modelValue:p.sys.name,"onUpdate:modelValue":l[0]||(l[0]=e=>p.sys.name=e)},null,8,["modelValue"])])),_:1}),(0,t.bF)(k,{label:"LogoUrl"},{default:(0,t.k6)((()=>[(0,t.bF)(y,{modelValue:p.sys.logoUrl,"onUpdate:modelValue":l[1]||(l[1]=e=>p.sys.logoUrl=e)},null,8,["modelValue"])])),_:1}),(0,t.bF)(k,{label:"登录开关"},{default:(0,t.k6)((()=>[(0,t.bF)(f,{modelValue:p.sys.login,"onUpdate:modelValue":l[2]||(l[2]=e=>p.sys.login=e)},null,8,["modelValue"]),u])),_:1}),(0,t.bF)(k,{label:"密码验证规则"},{default:(0,t.k6)((()=>[(0,t.bF)(y,{modelValue:p.sys.passwordRules,"onUpdate:modelValue":l[3]||(l[3]=e=>p.sys.passwordRules=e)},null,8,["modelValue"])])),_:1}),(0,t.bF)(k,{label:"版权信息"},{default:(0,t.k6)((()=>[(0,t.bF)(y,{type:"textarea",autosize:{minRows:4},modelValue:p.sys.copyright,"onUpdate:modelValue":l[4]||(l[4]=e=>p.sys.copyright=e)},null,8,["modelValue"])])),_:1}),(0,t.bF)(k,null,{default:(0,t.k6)((()=>[(0,t.bF)(c,{type:"primary"},{default:(0,t.k6)((()=>[(0,t.eW)("保存")])),_:1})])),_:1})])),_:1},8,["model"])])),_:1}),(0,t.bF)(V,{label:"短信配置"},{default:(0,t.k6)((()=>[(0,t.bF)(g,{ref:"form",model:p.msg,"label-width":"100px",style:{"margin-top":"20px"}},{default:(0,t.k6)((()=>[(0,t.bF)(k,{label:"短信开关"},{default:(0,t.k6)((()=>[(0,t.bF)(f,{modelValue:p.msg.open,"onUpdate:modelValue":l[5]||(l[5]=e=>p.msg.open=e)},null,8,["modelValue"]),d])),_:1}),(0,t.bF)(k,{label:"appKey"},{default:(0,t.k6)((()=>[(0,t.bF)(y,{modelValue:p.msg.appKey,"onUpdate:modelValue":l[6]||(l[6]=e=>p.msg.appKey=e)},null,8,["modelValue"])])),_:1}),(0,t.bF)(k,{label:"secretKey"},{default:(0,t.k6)((()=>[(0,t.bF)(y,{modelValue:p.msg.secretKey,"onUpdate:modelValue":l[7]||(l[7]=e=>p.msg.secretKey=e)},null,8,["modelValue"])])),_:1}),(0,t.bF)(k,null,{default:(0,t.k6)((()=>[(0,t.bF)(c,{type:"primary"},{default:(0,t.k6)((()=>[(0,t.eW)("保存")])),_:1})])),_:1})])),_:1},8,["model"])])),_:1}),(0,t.bF)(V,{label:"扩展配置"},{default:(0,t.k6)((()=>[(0,t.bF)(_,{title:"扩展配置为系统业务所有的配置，应该由系统管理员操作，如需用户配置应另起业务配置页面。",type:"warning",style:{"margin-bottom":"15px"}}),(0,t.bF)(h,{data:p.setting,stripe:""},{default:(0,t.k6)((()=>[(0,t.bF)(w,{label:"#",type:"index",width:"50"}),(0,t.bF)(w,{label:"KEY",prop:"key",width:"150"},{default:(0,t.k6)((e=>[e.row.isSet?((0,t.uX)(),(0,t.Wv)(y,{key:0,modelValue:e.row.key,"onUpdate:modelValue":l=>e.row.key=l,placeholder:"请输入内容"},null,8,["modelValue","onUpdate:modelValue"])):((0,t.uX)(),(0,t.CE)("span",r,(0,o.v_)(e.row.key),1))])),_:1}),(0,t.bF)(w,{label:"VALUE",prop:"value",width:"350"},{default:(0,t.k6)((e=>[e.row.isSet?((0,t.uX)(),(0,t.CE)(t.FK,{key:0},["boolean"===typeof e.row.value?((0,t.uX)(),(0,t.Wv)(f,{key:0,modelValue:e.row.value,"onUpdate:modelValue":l=>e.row.value=l},null,8,["modelValue","onUpdate:modelValue"])):((0,t.uX)(),(0,t.Wv)(y,{key:1,modelValue:e.row.value,"onUpdate:modelValue":l=>e.row.value=l,placeholder:"请输入内容"},null,8,["modelValue","onUpdate:modelValue"]))],64)):((0,t.uX)(),(0,t.CE)("span",s,(0,o.v_)(e.row.value),1))])),_:1}),(0,t.bF)(w,{label:"CATEGORY",prop:"category",width:"150"},{default:(0,t.k6)((e=>[e.row.isSet?((0,t.uX)(),(0,t.Wv)(y,{key:0,modelValue:e.row.category,"onUpdate:modelValue":l=>e.row.category=l,placeholder:"请输入内容"},null,8,["modelValue","onUpdate:modelValue"])):((0,t.uX)(),(0,t.CE)("span",n,(0,o.v_)(e.row.category),1))])),_:1}),(0,t.bF)(w,{label:"TITLE",prop:"title",width:"350"},{default:(0,t.k6)((e=>[e.row.isSet?((0,t.uX)(),(0,t.Wv)(y,{key:0,modelValue:e.row.title,"onUpdate:modelValue":l=>e.row.title=l,placeholder:"请输入内容"},null,8,["modelValue","onUpdate:modelValue"])):((0,t.uX)(),(0,t.CE)("span",i,(0,o.v_)(e.row.title),1))])),_:1}),(0,t.bF)(w,{"min-width":"1"}),(0,t.bF)(w,{label:"操作",fixed:"right",width:"120"},{default:(0,t.k6)((e=>[(0,t.bF)(v,null,{default:(0,t.k6)((()=>[(0,t.bF)(c,{onClick:l=>b.table_edit(e.row,e.$index),text:"",type:"primary",size:"small"},{default:(0,t.k6)((()=>[(0,t.eW)((0,o.v_)(e.row.isSet?"保存":"修改"),1)])),_:2},1032,["onClick"]),e.row.isSet?((0,t.uX)(),(0,t.Wv)(c,{key:0,onClick:l=>e.row.isSet=!1,text:"",type:"primary",size:"small"},{default:(0,t.k6)((()=>[(0,t.eW)("取消")])),_:2},1032,["onClick"])):(0,t.Q3)("",!0),e.row.isSet?(0,t.Q3)("",!0):((0,t.uX)(),(0,t.Wv)(F,{key:1,title:"确定删除吗？",onConfirm:l=>b.table_del(e.row,e.$index)},{reference:(0,t.k6)((()=>[(0,t.bF)(c,{text:"",type:"primary",size:"small"},{default:(0,t.k6)((()=>[(0,t.eW)("删除")])),_:1})])),_:2},1032,["onConfirm"]))])),_:2},1024)])),_:1})])),_:1},8,["data"]),(0,t.bF)(c,{type:"primary",icon:"el-icon-plus",onClick:b.table_add,style:{"margin-top":"20px"}},null,8,["onClick"])])),_:1})])),_:1})])),_:1})])),_:1})}a(28743);var p={name:"system",data(){return{sys:{name:"SCUI",logoUrl:"",login:!0,passwordRules:"^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$",copyright:"@SCUI"},msg:{open:!0,appKey:"",secretKey:""},setting:[{key:"file_serve",value:"https://file.scui.com",category:"url",title:"文件服务器地址"},{key:"cloud_url",value:"-",category:"url",title:"客户端地址"},{key:"crm_url",value:"-",category:"url",title:"CRM地址"},{key:"autoSwitch",value:!0,category:"user",title:"自动判断boolean类型"}]}},methods:{table_add(){var e={key:"",value:"",title:"",isSet:!0};this.setting.push(e)},table_edit(e){e.isSet?e.isSet=!1:e.isSet=!0},table_del(e,l){this.setting.splice(l,1)}}},b=a(66262);const y=(0,b.A)(p,[["render",m]]);var k=y}}]);