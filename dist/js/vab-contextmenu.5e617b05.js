"use strict";(self["webpackChunkscui"]=self["webpackChunkscui"]||[]).push([[8165],{49231:function(e,t,n){n.r(t),n.d(t,{default:function(){return F}});var i=n(20641),l=n(53751);const o=(0,i.Lk)("div",{style:{height:"500px",display:"flex","flex-direction":"column","align-items":"center","justify-content":"center",color:"#999"}}," 试试看在上下左右四个角落右键，看看边缘位置修正效果 ",-1);function s(e,t,n,s,a,u){const c=(0,i.g2)("el-alert"),d=(0,i.g2)("el-empty"),r=(0,i.g2)("el-table-column"),m=(0,i.g2)("el-table"),f=(0,i.g2)("el-card"),b=(0,i.g2)("el-col"),h=(0,i.g2)("el-row"),p=(0,i.g2)("el-main"),k=(0,i.g2)("sc-contextmenu-item"),v=(0,i.g2)("sc-contextmenu");return(0,i.uX)(),(0,i.CE)(i.FK,null,[(0,i.bF)(p,null,{default:(0,i.k6)((()=>[(0,i.bF)(h,{gutter:15},{default:(0,i.k6)((()=>[(0,i.bF)(b,{lg:12},{default:(0,i.k6)((()=>[(0,i.bF)(f,{shadow:"never"},{default:(0,i.k6)((()=>[(0,i.bF)(c,{title:"试试右键表格行看看. 支持多级菜单, 动态菜单等等等...",type:"success",style:{"margin-bottom":"20px"}}),(0,i.bF)(m,{ref:"table",data:a.tableData,"highlight-current-row":"",onRowContextmenu:u.rowContextmenu},{default:(0,i.k6)((()=>[(0,i.bF)(r,{type:"expand"},{default:(0,i.k6)((e=>[(0,i.bF)(d,{description:e.row.id+" 自定义扩展行","image-size":60},null,8,["description"])])),_:1}),(0,i.bF)(r,{prop:"id",label:"ID",width:"50"}),(0,i.bF)(r,{prop:"name",label:"NAME",width:"220"}),(0,i.bF)(r,{prop:"date",label:"DATE"}),(0,i.bF)(r,{prop:"state",label:"STATE"})])),_:1},8,["data","onRowContextmenu"])])),_:1})])),_:1}),(0,i.bF)(b,{lg:12},{default:(0,i.k6)((()=>[(0,i.bF)(f,{shadow:"never",onContextmenu:(0,l.D$)(u.openMenu,["prevent"])},{default:(0,i.k6)((()=>[o])),_:1},8,["onContextmenu"])])),_:1})])),_:1})])),_:1}),(0,i.bF)(v,{ref:"contextmenu",onCommand:u.handleCommand,onVisibleChange:u.visibleChange},{default:(0,i.k6)((()=>[(0,i.bF)(k,{command:"a",title:"返回(B)",suffix:"Alt+←"}),(0,i.bF)(k,{command:"b",title:"重新加载(R)",suffix:"Ctrl+R",icon:"el-icon-refresh"}),(0,i.bF)(k,{title:"切换兼容性模式",divided:""},{default:(0,i.k6)((()=>[(0,i.bF)(k,{command:"c1",title:"二级菜单1"}),(0,i.bF)(k,{title:"二级菜单2"},{default:(0,i.k6)((()=>[(0,i.bF)(k,{command:"c2-1",title:"三级菜单1"}),(0,i.bF)(k,{command:"c2-2",title:"三级菜单2"}),(0,i.bF)(k,{command:"c2-3",title:"三级菜单3"})])),_:1}),(0,i.bF)(k,{command:"c3",title:"二级菜单3"})])),_:1}),(0,i.bF)(k,{command:"d",title:"属性(P)",divided:"",disabled:a.row&&0==a.row.state},null,8,["disabled"]),a.row&&0==a.row.state?((0,i.uX)(),(0,i.Wv)(k,{key:0,command:"e",title:"设置state=1"})):(0,i.Q3)("",!0)])),_:1},8,["onCommand","onVisibleChange"])],64)}var a=n(90033);const u={class:"sc-contextmenu__menu"};function c(e,t,n,o,s,c){return(0,i.uX)(),(0,i.Wv)(l.eB,{name:"el-zoom-in-top"},{default:(0,i.k6)((()=>[s.visible?((0,i.uX)(),(0,i.CE)("div",{key:0,ref:"contextmenu",class:"sc-contextmenu",style:(0,a.Tr)({left:s.left+"px",top:s.top+"px"}),onContextmenu:t[0]||(t[0]=(0,l.D$)(((...e)=>c.fun&&c.fun(...e)),["prevent"]))},[(0,i.Lk)("ul",u,[(0,i.RG)(e.$slots,"default")])],36)):(0,i.Q3)("",!0)])),_:3})}var d={provide(){return{menuClick:this.menuClick}},data(){return{visible:!1,top:0,left:0}},watch:{visible(e){e?document.body.addEventListener("click",this.cm,!0):document.body.removeEventListener("click",this.cm,!0)}},mounted(){},methods:{cm(e){let t=this.$refs.contextmenu;t&&!t.contains(e.target)&&this.closeMenu()},menuClick(e){this.closeMenu(),this.$emit("command",e)},openMenu(e){e.preventDefault(),this.visible=!0,this.left=e.clientX+1,this.top=e.clientY+1,this.$nextTick((()=>{var t=e.clientX+1,n=e.clientY+1,i=window.innerWidth,l=window.innerHeight,o=this.$refs.contextmenu.offsetHeight,s=this.$refs.contextmenu.offsetWidth;this.left=t+s>i?i-s:t,this.top=n+o>l?n-o:n})),this.$emit("visibleChange",!0)},closeMenu(){this.visible=!1,this.$emit("visibleChange",!1)},fun(){return!1}}},r=n(66262);const m=(0,r.A)(d,[["render",c]]);var f=m;const b={key:0},h={class:"title"},p={class:"sc-contextmenu__suffix"},k={key:0,class:"sc-contextmenu__menu"};function v(e,t,n,o,s,u){const c=(0,i.g2)("el-icon"),d=(0,i.g2)("el-icon-arrow-right");return(0,i.uX)(),(0,i.CE)(i.FK,null,[n.divided?((0,i.uX)(),(0,i.CE)("hr",b)):(0,i.Q3)("",!0),(0,i.Lk)("li",{class:(0,a.C4)(n.disabled?"disabled":""),onClick:t[0]||(t[0]=(0,l.D$)(((...e)=>u.liClick&&u.liClick(...e)),["stop"])),onMouseenter:t[1]||(t[1]=e=>u.openSubmenu(e)),onMouseleave:t[2]||(t[2]=e=>u.closeSubmenu(e))},[(0,i.Lk)("span",h,[(0,i.bF)(c,{class:"sc-contextmenu__icon"},{default:(0,i.k6)((()=>[n.icon?((0,i.uX)(),(0,i.Wv)((0,i.$y)(n.icon),{key:0})):(0,i.Q3)("",!0)])),_:1}),(0,i.eW)(" "+(0,a.v_)(n.title),1)]),(0,i.Lk)("span",p,[e.$slots.default?((0,i.uX)(),(0,i.Wv)(c,{key:0},{default:(0,i.k6)((()=>[(0,i.bF)(d)])),_:1})):((0,i.uX)(),(0,i.CE)(i.FK,{key:1},[(0,i.eW)((0,a.v_)(n.suffix),1)],64))]),e.$slots.default?((0,i.uX)(),(0,i.CE)("ul",k,[(0,i.RG)(e.$slots,"default")])):(0,i.Q3)("",!0)],34)],64)}var g={props:{command:{type:String,default:""},title:{type:String,default:""},suffix:{type:String,default:""},icon:{type:String,default:""},divided:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1}},inject:["menuClick"],methods:{liClick(){return!this.$slots.default&&(!this.disabled&&void this.menuClick(this.command))},openSubmenu(e){var t=e.target.querySelector("ul");if(!t)return!1;if(this.disabled)return!1;t.style.display="inline-block";var n=t.getBoundingClientRect(),i=n.left,l=n.top,o=window.innerWidth,s=window.innerHeight,a=t.offsetHeight,u=t.offsetWidth;i+u>o&&(t.style.left="auto",t.style.right="100%"),l+a>s&&(t.style.top="auto",t.style.bottom="0")},closeSubmenu(e){var t=e.target.querySelector("ul");if(!t)return!1;t.removeAttribute("style"),t.style.display="none"}}};const C=(0,r.A)(g,[["render",v]]);var x=C,y={name:"contextmenu",components:{scContextmenu:f,scContextmenuItem:x},data(){return{row:null,tableData:[{id:"1",name:"Sakuya",date:"2021-10-10",state:1},{id:"2",name:"Lolowan(此行右键属性禁用)",date:"2021-10-09",state:0},{id:"3",name:"Ali",date:"2021-10-08",state:1}]}},mounted(){},methods:{rowContextmenu(e,t,n){this.row=e,this.$refs.table.setCurrentRow(e),this.$refs.contextmenu.openMenu(n)},openMenu(e){this.row=null,this.$refs.contextmenu.openMenu(e)},handleCommand(e){this.$message("click on item "+e),"e"==e&&(this.row.state=1)},visibleChange(e){e||this.$refs.table.setCurrentRow()}}};const w=(0,r.A)(y,[["render",s]]);var F=w}}]);