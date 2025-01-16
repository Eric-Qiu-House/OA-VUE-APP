"use strict";(self["webpackChunkscui"]=self["webpackChunkscui"]||[]).push([[2342],{31296:function(e,t,o){o.r(t),o.d(t,{default:function(){return u}});var a=o(51464),r=o(51681);function l(e,t,o,l,n,s){const i=(0,a.g2)("el-input"),d=(0,a.g2)("el-tree"),c=(0,a.g2)("el-card"),u=(0,a.g2)("el-col"),h=(0,a.g2)("el-date-picker"),_=(0,a.g2)("el-form-item"),p=(0,a.g2)("el-link"),m=(0,a.g2)("el-radio"),b=(0,a.g2)("el-radio-group"),g=(0,a.g2)("el-button"),y=(0,a.g2)("el-form"),f=(0,a.g2)("el-table-column"),j=(0,a.g2)("el-table"),k=(0,a.g2)("el-row"),v=(0,a.g2)("el-main"),D=(0,a.g2)("organize-edit"),C=(0,a.gN)("loading");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bF)(v,null,{default:(0,a.k6)((()=>[(0,a.bF)(k,{gutter:15},{default:(0,a.k6)((()=>[(0,a.bF)(u,{lg:3},{default:(0,a.k6)((()=>[(0,a.bF)(c,{header:"项目编号"},{default:(0,a.k6)((()=>[(0,a.bF)(i,{placeholder:"输入编号进行过滤",modelValue:n.filterText,"onUpdate:modelValue":t[0]||(t[0]=e=>n.filterText=e),clearable:""},null,8,["modelValue"]),(0,a.bo)((0,a.bF)(d,{style:{"max-width":"600px"},data:n.projectData,"node-key":"project_number_",props:n.defaultProps,onNodeClick:s.handleNodeClick,"default-expand-all":"",onCheckChange:s.handleCheckChange,"filter-node-method":s.menuFilterNode,model:n.checkedKeys,"show-checkbox":"",ref:"projectTree"},null,8,["data","props","onNodeClick","onCheckChange","filter-node-method","model"]),[[C,n.proNumLoading]])])),_:1})])),_:1}),(0,a.bF)(u,{lg:21},{default:(0,a.k6)((()=>[(0,a.bF)(c,null,{default:(0,a.k6)((()=>[(0,a.bF)(y,{"label-width":"100px"},{default:(0,a.k6)((()=>[(0,a.bF)(_,{label:"查询：",style:{width:"500px"}},{default:(0,a.k6)((()=>[(0,a.bF)(h,{modelValue:n.timeHorizon,"onUpdate:modelValue":t[1]||(t[1]=e=>n.timeHorizon=e),type:"daterange","range-separator":"To",clearable:"","value-format":"YYYY-MM-DD","start-placeholder":"Start date","end-placeholder":"End date",size:e.size},null,8,["modelValue","size"])])),_:1}),(0,a.bF)(_,{label:"统计方式："},{default:(0,a.k6)((()=>[(0,a.bF)(p,{type:"warning",underline:!1,onClick:t[2]||(t[2]=e=>s.resetFun()),style:{"margin-right":"20px"}},{default:(0,a.k6)((()=>t[6]||(t[6]=[(0,a.eW)("重置")]))),_:1}),(0,a.bF)(b,{modelValue:n.selectedStat,"onUpdate:modelValue":t[5]||(t[5]=e=>n.selectedStat=e)},{default:(0,a.k6)((()=>[(0,a.bF)(m,{label:"manDay",onClick:t[3]||(t[3]=e=>s.manDay())},{default:(0,a.k6)((()=>t[7]||(t[7]=[(0,a.eW)("人/天【统计】")]))),_:1}),(0,a.bF)(m,{label:"manProject",onClick:t[4]||(t[4]=e=>s.manProject())},{default:(0,a.k6)((()=>t[8]||(t[8]=[(0,a.eW)("人/项目【统计】")]))),_:1})])),_:1},8,["modelValue"])])),_:1}),(0,a.bF)(_,{label:"操作："},{default:(0,a.k6)((()=>[(0,a.bF)(g,{type:"primary",icon:"el-icon-plus",onClick:s.dataExport},{default:(0,a.k6)((()=>t[9]||(t[9]=[(0,a.eW)(" 数据导出 ")]))),_:1},8,["onClick"])])),_:1})])),_:1}),(0,a.bo)(((0,a.uX)(),(0,a.Wv)(j,{ref:"manhourData",data:n.displayedData,onSelectionChange:s.selectionChange,stripe:"","remote-sort":"","remote-filter":"","max-height":"700px"},{default:(0,a.k6)((()=>[(0,a.bF)(f,{label:"序号",width:"60"},{default:(0,a.k6)((e=>[(0,a.eW)((0,r.v_)(e.$index+1),1)])),_:1}),(0,a.bF)(f,{label:"项目",prop:"project_number_",width:"150",sortable:"custom"}),(0,a.bF)(f,{label:"姓名",prop:"user_name_",width:"150",sortable:"custom"}),(0,a.bF)(f,{label:"项目类型",prop:"project_type_label",width:"150",sortable:"custom"}),(0,a.bF)(f,{label:"工作类型",prop:"job_type_label",width:"150",sortable:"custom"}),"manProject"!==n.selectedStat?((0,a.uX)(),(0,a.Wv)(f,{key:0,label:"时间",prop:"record_date_",width:"150",sortable:"custom"})):(0,a.Q3)("",!0),(0,a.bF)(f,{label:"工时",prop:"hours_",width:"150",sortable:"custom"}),"manDay"==n.selectedStat?((0,a.uX)(),(0,a.Wv)(f,{key:1,label:"加班工时",prop:"overtime",width:"150",sortable:"custom"})):(0,a.Q3)("",!0),"manProject"!==n.selectedStat?((0,a.uX)(),(0,a.Wv)(f,{key:2,label:"时间类型",prop:"overtime1",width:"150",sortable:"custom"},{default:(0,a.k6)((e=>[(0,a.Lk)("span",null,(0,r.v_)(s.detailedDateInfo(e.row.record_date_)),1)])),_:1})):(0,a.Q3)("",!0),0==n.selectedStat.length?((0,a.uX)(),(0,a.Wv)(f,{key:3,label:"备注",prop:"remark_",width:"150",sortable:"custom"})):(0,a.Q3)("",!0)])),_:1},8,["data","onSelectionChange"])),[[C,n.manhoursLoading]])])),_:1})])),_:1})])),_:1})])),_:1}),(0,a.bF)(D,{ref:"saveDialog"},null,512)],64)}o(78982),o(64660),o(40772),o(89593),o(70426),o(84535),o(91554),o(325);var n=o(59123),s=o(74738),i={data(){return{defaultProps:{label:"project_number_",children:"children"},projectId:"",filterText:"",timeHorizon:[],selectedStat:"",selection:[],projectData:[],manhourData:[],displayedData:[],proNumLoading:!1,manhoursLoading:!1,submitData:{},checkedKeys:[],dialog:{save:!1},overtimeState:!1}},components:{organizeEdit:n["default"]},created(){this.getProjectInfo()},watch:{filterText(e){this.$refs.projectTree.filter(e)},checkedKeys(e,t){console.log("选中节点变化了:"),console.log("新的值:",e),console.log("旧的值:",t),this.selectedStat="",this.handleNodeClick()},timeHorizon(){this.selectedStat="",this.handleNodeClick()}},methods:{menuFilterNode(e,t){if(!e)return!0;var o=t.project_number_;return-1!==o.indexOf(e)},resetFun(){this.selectedStat="",this.overtimeState=!1,this.handleNodeClick()},handleDateChange(e){e&&Array.isArray(e)&&(this.value1=this.value.map((e=>e?e.split("T")[0]:"")))},detailedDateInfo(e){return(0,s.nS)(e)},manDay(){this.overtimeState=!0,this.displayedData=this.mergeManhourData()},mergeManhourData(){const e=new Map;return this.manhourData.forEach((t=>{const o=`${t.user_id_}-${t.record_date_}`;if(e.has(o)){const a=e.get(o);a.hours_+=Number(t.hours_),a.project_number_=`${a.project_number_}%${t.project_number_}`,a.project_type_=`${a.project_type_}%${t.project_type_}`,a.job_type_=`${a.job_type_}%${t.job_type_}`,a.overtime=(0,s.B1)(t.record_date_)?a.hours_:Math.max(0,a.hours_-8)}else e.set(o,{...t,hours_:Number(t.hours_),overtime:(0,s.B1)(t.record_date_)?Number(t.hours_):Math.max(0,Number(t.hours_)-8)})})),Array.from(e.values())},manPeriod(){const e=new Map;this.mergeManhourData.forEach((t=>{const o=`${t.user_id_}`;e.has(o)?(e.get(o).hours_+=Number(t.hours_),e.get(o).overtime+=Number(t.overtime),e.get(o).project_type_=`${e.get(o).project_type_}%${t.project_type_}`,e.get(o).job_type_=`${e.get(o).job_type_}%${t.job_type_}`):e.set(o,{...t,hours_:Number(t.hours_)})})),this.overtimeState=!0,this.displayedData=[...Array.from(e.values())]},manProject(){const e=new Map;this.manhourData.forEach((t=>{const o=`${t.user_id_}-${t.project_number_}`;e.has(o)?(e.get(o).hours_+=Number(t.hours_),e.get(o).overtime+=Number(t.overtime),e.get(o).project_type_=`${e.get(o).project_type_}%${t.project_type_}`,e.get(o).job_type_=`${e.get(o).job_type_}%${t.job_type_}`):e.set(o,{...t,hours_:Number(t.hours_)})})),this.overtimeState=!0,this.displayedData=[...Array.from(e.values())]},isRestDay(e){return(0,s.B1)(e)},oooo(){console.log((0,s.B1)("2024-01-01"),"2024-01-01"),this.$refs.saveDialog.open1()},handleCheckChange(e,t,o){console.log("当前变化的节点:",e),console.log("是否被选中:",t),console.log("是否半选中:",o);const a=this.$refs.projectTree.getCheckedNodes();console.log("选中的完整节点:",a),this.checkedKeys=this.$refs.projectTree.getCheckedKeys(),console.log("选中的节点 ID:",this.checkedKeys)},async getProjectInfo(){this.proNumLoading=!0;try{const e=await this.$dmsApi.project.readAll.get();this.projectData=this.addRootNode(e)}catch(e){console.error("Error fetching project data:",e)}finally{this.proNumLoading=!1}},addRootNode(e){return[{project_number_:"所有项目",children:e}]},buildTree(e){const t={},o=[];return e.forEach((e=>{t[e.id_]={...e,children:[]}})),e.forEach((e=>{const a=t[e.parent_id];a?a.children.push(t[e.id_]):o.push(t[e.id_])})),o},async handleNodeClick(){this.submitData={project_number_:this.checkedKeys,...null!=this.timeHorizon?{start_date:this.timeHorizon[0],end_date:this.timeHorizon[1]}:{}},this.manhoursLoading=!0;try{const e=await this.$dmsApi.manHours.readFieldConversion.post(this.submitData);this.manhourData=e,this.displayedData=[...e],this.$nextTick((()=>{console.log(this.manhourData,"this.manhourData")}))}catch(e){console.error("Error fetching manhours data:",e)}finally{this.manhoursLoading=!1}},async dataExport(){try{const e=this.convertToCSV(this.displayedData),t=new Blob([e],{type:"text/csv;charset=utf-8;"}),o=document.createElement("a");o.href=URL.createObjectURL(t),o.setAttribute("download","displayedData.csv"),document.body.appendChild(o),o.click(),document.body.removeChild(o)}catch(e){console.error("Error exporting data:",e)}},convertToCSV(e){const t=this.selectedStat,o="manDay"===t?{"项目编号":"project_number_","姓名":"user_name_","项目类型":"project_type_label","工作类型":"job_type_label","时间":"record_date_","单日工时":"hours_","加班工时":"overtime","时间类型":"detailedDateInfo"}:"manProject"===t?{"项目编号":"project_number_","姓名":"user_name_","项目类型":"project_type_label","工作类型":"job_type_label","总工时":"hours_"}:{"项目编号":"project_number_","姓名":"user_name_","项目类型":"project_type_label","工作类型":"job_type_label","时间":"record_date_","工时":"hours_","时间类型":"detailedDateInfo"},a=Object.keys(o),r=e.map((e=>a.map((t=>{const a=o[t];return"function"===typeof this[a]?this[a](e.record_date_):e[a]})))),l=[a.join(","),...r.map((e=>e.join(",")))].join("\n");return l},selectionChange(e){this.selection=e}}},d=o(51456);const c=(0,d.A)(i,[["render",l]]);var u=c}}]);