"use strict";(self["webpackChunkscui"]=self["webpackChunkscui"]||[]).push([[5072],{38031:function(e,l,a){a.r(l),a.d(l,{default:function(){return p}});var t=a(20641);const b={class:"left-panel"},i={class:"right-panel"},n={class:"right-panel-search"};function r(e,l,a,r,u,s){const d=(0,t.g2)("el-tab-pane"),o=(0,t.g2)("el-tabs"),p=(0,t.g2)("el-header"),c=(0,t.g2)("sc-select-filter"),h=(0,t.g2)("el-button"),g=(0,t.g2)("el-input"),m=(0,t.g2)("el-table-column"),f=(0,t.g2)("el-button-group"),F=(0,t.g2)("scTable"),k=(0,t.g2)("el-main"),v=(0,t.g2)("el-container");return(0,t.uX)(),(0,t.Wv)(v,null,{default:(0,t.k6)((()=>[(0,t.bF)(p,{class:"header-tabs"},{default:(0,t.k6)((()=>[(0,t.bF)(o,{type:"card",modelValue:u.groupId,"onUpdate:modelValue":l[0]||(l[0]=e=>u.groupId=e),onTabChange:s.tabChange},{default:(0,t.k6)((()=>[(0,t.bF)(d,{label:"所有",name:"0"}),(0,t.bF)(d,{label:"未完成",name:"1"}),(0,t.bF)(d,{label:"已退回",name:"2"}),(0,t.bF)(d,{label:"已关闭",name:"3"}),(0,t.bF)(d,{label:"已完成",name:"4"})])),_:1},8,["modelValue","onTabChange"])])),_:1}),(0,t.bF)(p,{style:{height:"auto"}},{default:(0,t.k6)((()=>[(0,t.bF)(c,{data:u.filterData,"label-width":80,onOnChange:s.filterChange},null,8,["data","onOnChange"])])),_:1}),(0,t.bF)(p,null,{default:(0,t.k6)((()=>[(0,t.Lk)("div",b,[(0,t.bF)(h,{type:"primary",icon:"el-icon-plus"}),(0,t.bF)(h,{type:"danger",plain:"",icon:"el-icon-delete"})]),(0,t.Lk)("div",i,[(0,t.Lk)("div",n,[(0,t.bF)(g,{modelValue:u.search.keyword,"onUpdate:modelValue":l[1]||(l[1]=e=>u.search.keyword=e),placeholder:"关键词",clearable:""},null,8,["modelValue"]),(0,t.bF)(h,{type:"primary",icon:"el-icon-search",onClick:s.upsearch},null,8,["onClick"])])])])),_:1}),(0,t.bF)(k,{class:"nopadding"},{default:(0,t.k6)((()=>[(0,t.bF)(F,{ref:"table",apiObj:u.list.apiObj,"row-key":"id",stripe:""},{default:(0,t.k6)((()=>[(0,t.bF)(m,{type:"selection",width:"50"}),(0,t.bF)(m,{label:"姓名",prop:"name",width:"150"}),(0,t.bF)(m,{label:"性别",prop:"sex",width:"150"}),(0,t.bF)(m,{label:"邮箱",prop:"email",width:"250"}),(0,t.bF)(m,{label:"评分",prop:"num",width:"150"}),(0,t.bF)(m,{label:"注册时间",prop:"datetime",width:"150",sortable:""}),(0,t.bF)(m,{label:"操作",fixed:"right",align:"right",width:"160"},{default:(0,t.k6)((()=>[(0,t.bF)(f,null,{default:(0,t.k6)((()=>[(0,t.bF)(h,{text:"",type:"primary",size:"small"},{default:(0,t.k6)((()=>[(0,t.eW)("查看")])),_:1}),(0,t.bF)(h,{text:"",type:"primary",size:"small"},{default:(0,t.k6)((()=>[(0,t.eW)("编辑")])),_:1}),(0,t.bF)(h,{text:"",type:"primary",size:"small"},{default:(0,t.k6)((()=>[(0,t.eW)("删除")])),_:1})])),_:1})])),_:1})])),_:1},8,["apiObj"])])),_:1})])),_:1})}var u=a(81561),s={name:"listTab",components:{scSelectFilter:u.A},data(){return{groupId:"0",filterData:[{title:"所属行业",key:"type",multiple:!0,options:[{label:"全部",value:""},{label:"汽车",value:"1"},{label:"大健康",value:"2"},{label:"节能环保",value:"3"},{label:"智能信息",value:"4"},{label:"文化旅游",value:"5"},{label:"新材料",value:"6"},{label:"高端装备",value:"7"},{label:"其他行业",value:"99"}]},{title:"所属区域",key:"area",options:[{label:"全部",value:""},{label:"华东",value:"HD"},{label:"华北",value:"HB"},{label:"华南",value:"HN"},{label:"华中",value:"HZ"},{label:"华西南",value:"HXN"},{label:"东北",value:"DB"}]}],list:{apiObj:this.$API.demo.list},search:{keyword:""}}},methods:{upsearch(){this.$refs.table.upData(this.search)},tabChange(e){var l={groupId:e};this.$refs.table.reload(l)},filterChange(e){this.$refs.table.upData(e)}}},d=a(66262);const o=(0,d.A)(s,[["render",r]]);var p=o}}]);