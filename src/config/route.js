// 静态路由配置
// 书写格式与动态路由格式一致，全部经由框架统一转换
// 比较动态路由在meta中多加入了role角色权限，为数组类型。一个菜单是否有权限显示，取决于它以及后代菜单是否有权限。
// routes 显示在左侧菜单中的路由(显示顺序在动态路由之前)
// 示例如下

// const routes = [
//     {
//         name: "home",
//         path: "/home",
//         meta: {
//             title: "首页",
//             icon: "el-icon-eleme-filled",
//             type: "menu"
//         },
//         children: [
//             {
//                 name: "dashboard",
//                 path: "/dashboard",
//                 meta: {
//                     title: "工作台",
//                     icon: "el-icon-menu",
//                     affix: true
//                 },
//                 component: "home"
//             },
//             {
//                 name: "userCenter",
//                 path: "/usercenter",
//                 meta: {
//                     title: "帐号信息",
//                     icon: "el-icon-user",
//                     tag: "NEW"
//                 },
//                 component: "userCenter"
//             }
//         ]
//     },
//     {
//         name: "cmsSystem",
//         path: "/cmsSystem",
//         meta: {
//             title: "CMS",
//             icon: "el-icon-eleme-filled",
//             type: "menu"
//         },
//         children: [
//             {
//                 name: "articleList",
//                 path: "/cmsSystem/portalWeb/articleList",
//                 meta: {
//                     title: "门户网站",
//                     icon: "el-icon-menu",
//                 },
//                 component: "cmsSystem/portalWeb/articleList"
//             },
//             {
//                 name: "articleEdit",
//                 path: "/cmsSystem/portalWeb/articleEdit",
//                 meta: {
//                     title: "编辑文章",
//                     icon: "el-icon-menu",
//                     type: "menu",
//                     hidden: true
//                 },
//                 component: "cmsSystem/portalWeb/articleEdit"
//             },
//             {
//                 name: "articleRead",
//                 path: "/cmsSystem/portalWeb/articleRead",
//                 meta: {
//                     title: "文章详情",
//                     icon: "el-icon-menu",
//                     type: "menu",
//                     hidden: true

//                 },
//                 component: "cmsSystem/portalWeb/articleRead"
//             },
//             {
//                 name: "adminNotice",
//                 path: "/cmsSystem/adminNotice",
//                 meta: {
//                     title: "行政通知",
//                     icon: "el-icon-menu",
//                 },
//             },
//             {
//                 name: "deptNotice",
//                 path: "/cmsSystem/deptNotice",
//                 meta: {
//                     title: "部门通知",
//                     icon: "el-icon-menu",
//                 },
//             },
//         ]
//     },
//     {
//         name: "drawingManage",
//         path: "/drawingManage",
//         meta: {
//             title: "图纸管理",
//             icon: "el-icon-takeaway-box",
//             type: "menu"
//         },
//         children: [
//             {
//                 path: '/drawingSystem/proCenter',
//                 name: 'proCenter',
//                 meta: {
//                     title: '项目中心',
//                     icon: "el-icon-magic-stick",
//                     type: "menu"
//                 },
//                 component: "drawingSystem/proCenter"
//             },
//             {
//                 path: '/drawingSystem/proOrganize',
//                 name: 'proOrganize',
//                 meta: {
//                     title: '项目组织',
//                     icon: "sc-icon-organization",
//                     type: "menu"
//                 },
//                 component: "drawingSystem/proOrganize"
//             },
//             {
//                 path: '/drawingSystem/drawingInfo',
//                 name: 'drawingInfo',
//                 meta: {
//                     title: '图纸信息',
//                     icon: "el-icon-magic-stick",
//                     type: "menu",
//                     hidden: true
//                 },
//                 component: "drawingSystem/drawingInfo"
//             },
//             {
//                 path: '/drawingSystem/dataAnalysis',
//                 name: 'dataAnalysis',
//                 meta: {
//                     title: '图纸进展',
//                     icon: "el-icon-magic-stick",
//                     type: "menu",
//                     hidden: true
//                 },
//                 component: "drawingSystem/dataAnalysis"
//             },
//             {
//                 path: '/drawingSystem/drawingCheck',
//                 name: 'drawingCheck',
//                 meta: {
//                     title: '图纸进展',
//                     icon: "el-icon-magic-stick",
//                     type: "menu",
//                     hidden: true
//                 },
//                 component: "drawingSystem/drawingCheck"
//             }
//         ]
//     },
//     {
//         name: "performanceReview",
//         path: "/performanceReview",
//         meta: {
//             title: "绩效考核",
//             icon: "el-icon-takeaway-box",
//             type: "menu"
//         },
//         children: [
//             {
//                 path: '/performanceReview/myPerformance',
//                 name: 'myPerformance',
//                 meta: {
//                     title: '我的考核',
//                     icon: "el-icon-magic-stick",
//                     type: "menu"
//                 },
//             },
//             {
//                 path: '/performanceReview/indicatorManage',
//                 name: 'indicatorManage',
//                 meta: {
//                     title: '指标管理',
//                     icon: "el-icon-magic-stick",
//                     type: "menu"
//                 },
//             },
//             {
//                 path: '/performanceReview/schemeManage',
//                 name: 'schemeManage',
//                 meta: {
//                     title: '方案管理',
//                     icon: "el-icon-magic-stick",
//                     type: "menu"
//                 }
//             },
//             {
//                 path: '/performanceReview/performanceManage',
//                 name: 'performanceManage',
//                 meta: {
//                     title: '考核管理',
//                     icon: "el-icon-magic-stick",
//                     type: "menu"
//                 }
//             },
//             {
//                 path: '/performanceReview/statementManage',
//                 name: 'statementManage',
//                 meta: {
//                     title: '报表管理',
//                     icon: "el-icon-magic-stick",
//                     type: "menu"
//                 }
//             },
//             {
//                 path: '/performanceReview/performanceMember',
//                 name: 'performanceMember',
//                 meta: {
//                     title: '考核成员',
//                     icon: "el-icon-magic-stick",
//                     type: "menu"
//                 }
//             },
            
//         ]
//     },
//     {
//         name: "fileSystem",
//         path: "/fileSystem",
//         meta: {
//             title: "文件库",
//             icon: "el-icon-takeaway-box",
//             type: "menu"
//         },
//         children: [
//             {
//                 path: '/fileSystem/imageLibrary',
//                 name: 'imageLibrary',
//                 meta: {
//                     title: '图片中心',
//                     icon: "el-icon-magic-stick",
//                     type: "menu"
//                 },
//                 component: "fileSystem/imageLibrary"
//             },
//             {
//                 path: '/fileSystem/projectFile',
//                 name: 'projectFile',
//                 meta: {
//                     title: '项目档案',
//                     icon: "el-icon-magic-stick",
//                     type: "menu"
//                 }
//             },
            
//         ]
//     },
//     {
//         name: "emailSystem",
//         path: "/emailSystem",
//         meta: {
//             title: "Email",
//             icon: "el-icon-takeaway-box",
//             type: "menu"
//         },
//         children: [
//             {
//                 path: '/emailSystem/personalMail',
//                 name: 'personalMail',
//                 meta: {
//                     title: '个人邮箱',
//                     icon: "sc-icon-bug-line",
//                     type: "menu"
//                 },
//             },
//             {
//                 path: '/emailSystem/publicMail',
//                 name: 'publicMail',
//                 meta: {
//                     title: '公共邮箱',
//                     icon: "sc-icon-bug-line",
//                     type: "menu"
//                 },
//             },
//             {
//                 path: '/emailSystem/mailTemplate',
//                 name: 'mailTemplate',
//                 meta: {
//                     title: '邮件模板',
//                     icon: "sc-icon-bug-line",
//                     type: "menu"
//                 },
//             },
//             {
//                 path: '/emailSystem/emailConfig',
//                 name: 'emailConfig',
//                 meta: {
//                     title: '邮箱配置',
//                     icon: "sc-icon-bug-line",
//                     type: "menu"
//                 },
//             },
//             {
//                 path: '/emailSystem/mailMember',
//                 name: 'mailMember',
//                 meta: {
//                     title: '邮箱成员',
//                     icon: "sc-icon-bug-line",
//                     type: "menu"
//                 },
//             }
//         ]
//     },
//     {
//         name: "fixedAsset",
//         path: "/fixedAsset",
//         meta: {
//             title: "固定资产",
//             icon: "el-icon-takeaway-box",
//             type: "menu"
//         },
//         children: [
//             {
//                 path: '/fixedAssets/assetManage',
//                 name: 'assetManage',
//                 meta: {
//                     title: '资产管理',
//                     icon: "sc-icon-bug-line",
//                     type: "menu"
//                 },
//             },
//             {
//                 path: '/fixedAsset/assetAnalyse',
//                 name: 'assetAnalyse',
//                 meta: {
//                     title: '分析报表',
//                     icon: "sc-icon-bug-line",
//                     type: "menu"
//                 },
//             },
//             {
//                 path: '/fixedAsset/assetSet',
//                 name: 'assetSet',
//                 meta: {
//                     title: '资产设置',
//                     icon: "sc-icon-bug-line",
//                     type: "menu"
//                 },
//             },
//         ]
//     },
//     {
//         name: "approvalProcess",
//         path: "/approvalProcess",
//         meta: {
//             title: "流程管理",
//             icon: "sc-icon-file-excel",
//             type: "menu"
//         },
//         children: [
//             {
//                 path: '/fixedAssets/approvalOA',
//                 name: 'approvalOA',
//                 meta: {
//                     title: 'OA审批',
//                     icon: "el-icon-magic-stick",
//                     type: "menu"
//                 },
//                 component: 'processSystem/oaExamine'
//             },
//             {
//                 path: '/fixedAssets/processManage',
//                 name: 'processManage',
//                 meta: {
//                     title: '流程表单',
//                     icon: "el-icon-magic-stick",
//                     type: "menu"
//                 },
//                 component: 'processSystem/processManage'
//             },
//             {
//                 path: '/fixedAssets/newProcess',
//                 name: 'newProcess',
//                 meta: {
//                     title: '新建流程',
//                     icon: "el-icon-magic-stick",
//                     type: "menu"
//                 },
//                 component: "processSystem/newProcess"

//             },
//         ]
//     },
//     {
//         name: "organize",
//         path: "/organize",
//         meta: {
//             title: "组织管理",
//             icon: "sc-icon-organization",
//             type: "menu"
//         },
//         children: [
//             {
//                 path: "/organize/user",
//                 name: "user",
//                 meta: {
//                     title: "用户管理",
//                     icon: "el-icon-user-filled",
//                     type: "menu"
//                 },
//                 component: "organize/user"
//             },
//             {
//                 path: "/organize/role",
//                 name: "role",
//                 meta: {
//                     title: "角色管理",
//                     icon: "el-icon-notebook",
//                     type: "menu"
//                 },
//                 component: "organize/role"
//             },
//             {
//                 path: "/organize/dept",
//                 name: "dept",
//                 meta: {
//                     title: "部门管理",
//                     icon: "sc-icon-organization",
//                     type: "menu"
//                 },
//                 component: "organize/dept"
//             },
//         ]
//     },
//     {
//         name: "setting",
//         path: "/setting",
//         meta: {
//             title: "系统配置",
//             icon: "el-icon-setting",
//             type: "menu"
//         },
//         children: [
//             {
//                 path: "/setting/system",
//                 name: "system",
//                 meta: {
//                     title: "系统设置",
//                     icon: "el-icon-tools",
//                     type: "menu"
//                 },
//                 component: "setting/system"
//             },
//             {
//                 path: "/setting/menu",
//                 name: "settingMenu",
//                 meta: {
//                     title: "菜单管理",
//                     icon: "el-icon-fold",
//                     type: "menu"
//                 },
//                 component: "setting/menu"
//             },
//             {
//                 path: "/setting/dic",
//                 name: "dic",
//                 meta: {
//                     title: "字典管理",
//                     icon: "el-icon-document",
//                     type: "menu"
//                 },
//                 component: "setting/dic"
//             },
//             {
//                 path: "/setting/table",
//                 name: "tableSetting",
//                 meta: {
//                     title: "表格列管理",
//                     icon: "el-icon-scale-to-original",
//                     type: "menu"
//                 },
//                 component: "setting/table"
//             },
//             {
//                 path: "/setting/task",
//                 name: "task",
//                 meta: {
//                     title: "计划任务",
//                     icon: "el-icon-alarm-clock",
//                     type: "menu"
//                 },
//                 component: "setting/task"
//             },
//             {
//                 path: "/setting/client",
//                 name: "client",
//                 meta: {
//                     title: "应用管理",
//                     icon: "el-icon-help-filled",
//                     type: "menu"
//                 },
//                 component: "setting/client"
//             },
//             {
//                 path: "/setting/log",
//                 name: "log",
//                 meta: {
//                     title: "系统日志",
//                     icon: "el-icon-warning",
//                     type: "menu"
//                 },
//                 component: "setting/log"
//             }
//         ]
//     },
//         // {
//     //     name: "vab",
//     //     path: "/vab",
//     //     meta: {
//     //         title: "组件",
//     //         icon: "el-icon-takeaway-box",
//     //         type: "menu"
//     //     },
//     //     children: [
//     //         {
//     //             path: "/vab/mini",
//     //             name: "minivab",
//     //             meta: {
//     //                 title: "原子组件",
//     //                 icon: "el-icon-magic-stick",
//     //                 type: "menu"
//     //             },
//     //             component: "vab/mini"
//     //         },
//     //         {
//     //             path: "/vab/iconfont",
//     //             name: "iconfont",
//     //             meta: {
//     //                 title: "扩展图标",
//     //                 icon: "el-icon-orange",
//     //                 type: "menu"
//     //             },
//     //             component: "vab/iconfont"
//     //         },
//     //         {
//     //             path: "/vab/data",
//     //             name: "vabdata",
//     //             meta: {
//     //                 title: "Data 数据展示",
//     //                 icon: "el-icon-histogram",
//     //                 type: "menu"
//     //             },
//     //             children: [
//     //                 {
//     //                     path: "/vab/chart",
//     //                     name: "chart",
//     //                     meta: {
//     //                         title: "图表 Echarts",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/chart"
//     //                 },
//     //                 {
//     //                     path: "/vab/statistic",
//     //                     name: "statistic",
//     //                     meta: {
//     //                         title: "统计数值",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/statistic"
//     //                 },
//     //                 {
//     //                     path: "/vab/video",
//     //                     name: "scvideo",
//     //                     meta: {
//     //                         title: "视频播放器",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/video"
//     //                 },
//     //                 {
//     //                     path: "/vab/qrcode",
//     //                     name: "qrcode",
//     //                     meta: {
//     //                         title: "二维码",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/qrcode"
//     //                 }
//     //             ]
//     //         },
//     //         {
//     //             path: "/vab/form",
//     //             name: "vabform",
//     //             meta: {
//     //                 title: "Form 数据录入",
//     //                 icon: "el-icon-edit",
//     //                 type: "menu"
//     //             },
//     //             children: [
//     //                 {
//     //                     path: "/vab/tableselect",
//     //                     name: "tableselect",
//     //                     meta: {
//     //                         title: "表格选择器",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/tableselect"
//     //                 },
//     //                 {
//     //                     path: "/vab/formtable",
//     //                     name: "formtable",
//     //                     meta: {
//     //                         title: "表单表格",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/formtable"
//     //                 },
//     //                 {
//     //                     path: "/vab/selectFilter",
//     //                     name: "selectFilter",
//     //                     meta: {
//     //                         title: "分类筛选器",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/selectFilter"
//     //                 },
//     //                 {
//     //                     path: "/vab/filterbar",
//     //                     name: "filterBar",
//     //                     meta: {
//     //                         title: "过滤器v2",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/filterBar"
//     //                 },
//     //                 {
//     //                     path: "/vab/upload",
//     //                     name: "upload",
//     //                     meta: {
//     //                         title: "上传",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/upload"
//     //                 },
//     //                 {
//     //                     path: "/vab/select",
//     //                     name: "scselect",
//     //                     meta: {
//     //                         title: "异步选择器",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/select"
//     //                 },
//     //                 {
//     //                     path: "/vab/iconselect",
//     //                     name: "iconSelect",
//     //                     meta: {
//     //                         title: "图标选择器",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/iconselect"
//     //                 },
//     //                 {
//     //                     path: "/vab/cron",
//     //                     name: "cron",
//     //                     meta: {
//     //                         title: "Cron规则生成器",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/cron"
//     //                 },
//     //                 {
//     //                     path: "/vab/editor",
//     //                     name: "editor",
//     //                     meta: {
//     //                         title: "富文本编辑器",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/editor"
//     //                 },
//     //                 {
//     //                     path: "/vab/codeeditor",
//     //                     name: "codeeditor",
//     //                     meta: {
//     //                         title: "代码编辑器",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/codeeditor"
//     //                 }
//     //             ]
//     //         },
//     //         {
//     //             path: "/vab/feedback",
//     //             name: "vabfeedback",
//     //             meta: {
//     //                 title: "Feedback 反馈",
//     //                 icon: "el-icon-mouse",
//     //                 type: "menu"
//     //             },
//     //             children: [
//     //                 {
//     //                     path: "/vab/drag",
//     //                     name: "drag",
//     //                     meta: {
//     //                         title: "拖拽排序",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/drag"
//     //                 },
//     //                 {
//     //                     path: "/vab/contextmenu",
//     //                     name: "contextmenu",
//     //                     meta: {
//     //                         title: "右键菜单",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/contextmenu"
//     //                 },
//     //                 {
//     //                     path: "/vab/cropper",
//     //                     name: "cropper",
//     //                     meta: {
//     //                         title: "图像剪裁",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/cropper"
//     //                 },
//     //                 {
//     //                     path: "/vab/fileselect",
//     //                     name: "fileselect",
//     //                     meta: {
//     //                         title: "资源库选择器(弃用)",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/fileselect"
//     //                 },
//     //                 {
//     //                     path: "/vab/dialog",
//     //                     name: "dialogExtend",
//     //                     meta: {
//     //                         title: "弹窗扩展",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/dialog"
//     //                 }
//     //             ]
//     //         },
//     //         {
//     //             path: "/vab/others",
//     //             name: "vabothers",
//     //             meta: {
//     //                 title: "Others 其他",
//     //                 icon: "el-icon-more-filled",
//     //                 type: "menu"
//     //             },
//     //             children: [
//     //                 {
//     //                     path: "/vab/print",
//     //                     name: "print",
//     //                     meta: {
//     //                         title: "打印",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/print"
//     //                 },
//     //                 {
//     //                     path: "/vab/watermark",
//     //                     name: "watermark",
//     //                     meta: {
//     //                         title: "水印",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/watermark"
//     //                 },
//     //                 {
//     //                     path: "/vab/importexport",
//     //                     name: "importexport",
//     //                     meta: {
//     //                         title: "文件导出导入",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/importexport"
//     //                 }
//     //             ]
//     //         },
//     //         {
//     //             path: "/vab/list",
//     //             name: "list",
//     //             meta: {
//     //                 title: "Table 数据列表",
//     //                 icon: "el-icon-fold",
//     //                 type: "menu"
//     //             },
//     //             children: [
//     //                 {
//     //                     path: "/vab/table/base",
//     //                     name: "tableBase",
//     //                     meta: {
//     //                         title: "基础数据列表",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/table/base"
//     //                 },
//     //                 {
//     //                     path: "/vab/table/thead",
//     //                     name: "tableThead",
//     //                     meta: {
//     //                         title: "多级表头",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/table/thead"
//     //                 },
//     //                 {
//     //                     path: "/vab/table/column",
//     //                     name: "tableCustomColumn",
//     //                     meta: {
//     //                         title: "动态列",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/table/column"
//     //                 },
//     //                 {
//     //                     path: "/vab/table/remote",
//     //                     name: "tableRemote",
//     //                     meta: {
//     //                         title: "远程排序过滤",
//     //                         type: "menu"
//     //                     },
//     //                     component: "vab/table/remote"
//     //                 }
//     //             ]
//     //         },
//     //         {
//     //             path: "/vab/workflow",
//     //             name: "workflow",
//     //             meta: {
//     //                 title: "工作流设计器",
//     //                 icon: "el-icon-share",
//     //                 type: "menu"
//     //             },
//     //             component: "vab/workflow"
//     //         },
//     //         {
//     //             path: "/vab/formrender",
//     //             name: "formRender",
//     //             meta: {
//     //                 title: "动态表单(Beta)",
//     //                 icon: "el-icon-message-box",
//     //                 type: "menu"
//     //             },
//     //             component: "vab/form"
//     //         }
//     //     ]
//     // },
//     // {
//     //     name: "template",
//     //     path: "/template",
//     //     meta: {
//     //         title: "模板",
//     //         icon: "el-icon-files",
//     //         type: "menu"
//     //     },
//     //     children: [
//     //         {
//     //             path: "/template/layout",
//     //             name: "layoutTemplate",
//     //             meta: {
//     //                 title: "布局",
//     //                 icon: "el-icon-grid",
//     //                 type: "menu"
//     //             },
//     //             children: [
//     //                 {
//     //                     path: "/template/layout/blank",
//     //                     name: "blank",
//     //                     meta: {
//     //                         title: "空白模板",
//     //                         type: "menu"
//     //                     },
//     //                     component: "template/layout/blank"
//     //                 },
//     //                 {
//     //                     path: "/template/layout/layoutTCB",
//     //                     name: "layoutTCB",
//     //                     meta: {
//     //                         title: "上中下布局",
//     //                         type: "menu"
//     //                     },
//     //                     component: "template/layout/layoutTCB"
//     //                 },
//     //                 {
//     //                     path: "/template/layout/layoutLCR",
//     //                     name: "layoutLCR",
//     //                     meta: {
//     //                         title: "左中右布局",
//     //                         type: "menu"
//     //                     },
//     //                     component: "template/layout/layoutLCR"
//     //                 }
//     //             ]
//     //         },
//     //         {
//     //             path: "/template/list",
//     //             name: "list",
//     //             meta: {
//     //                 title: "列表",
//     //                 icon: "el-icon-document",
//     //                 type: "menu"
//     //             },
//     //             children: [
//     //                 {
//     //                     path: "/template/list/crud",
//     //                     name: "listCrud",
//     //                     meta: {
//     //                         title: "CRUD",
//     //                         type: "menu"
//     //                     },
//     //                     component: "template/list/crud",
//     //                     children: [
//     //                         {
//     //                             path: "/template/list/crud/detail/:id?",
//     //                             name: "listCrud-detail",
//     //                             meta: {
//     //                                 title: "新增/编辑",
//     //                                 hidden: true,
//     //                                 active: "/template/list/crud",
//     //                                 type: "menu"
//     //                             },
//     //                             component: "template/list/crud/detail"
//     //                         }
//     //                     ]
//     //                 },
//     //                 {
//     //                     path: "/template/list/tree",
//     //                     name: "listTree",
//     //                     meta: {
//     //                         title: "左树右表",
//     //                         type: "menu"
//     //                     },
//     //                     component: "template/list/tree"
//     //                 },
//     //                 {
//     //                     path: "/template/list/tab",
//     //                     name: "listTab",
//     //                     meta: {
//     //                         title: "分类表格",
//     //                         type: "menu"
//     //                     },
//     //                     component: "template/list/tab"
//     //                 },
//     //                 {
//     //                     path: "/template/list/son",
//     //                     name: "listSon",
//     //                     meta: {
//     //                         title: "子母表",
//     //                         type: "menu"
//     //                     },
//     //                     component: "template/list/son"
//     //                 },
//     //                 {
//     //                     path: "/template/list/widthlist",
//     //                     name: "widthlist",
//     //                     meta: {
//     //                         title: "定宽列表",
//     //                         type: "menu"
//     //                     },
//     //                     component: "template/list/width"
//     //                 }
//     //             ]
//     //         },
//     //         {
//     //             path: "/template/other",
//     //             name: "other",
//     //             meta: {
//     //                 title: "其他",
//     //                 icon: "el-icon-folder",
//     //                 type: "menu"
//     //             },
//     //             children: [
//     //                 {
//     //                     path: "/template/other/stepform",
//     //                     name: "stepform",
//     //                     meta: {
//     //                         title: "分步表单",
//     //                         type: "menu"
//     //                     },
//     //                     component: "template/other/stepform"
//     //                 }
//     //             ]
//     //         }
//     //     ]
//     // },
//     // {
//     //     name: "other",
//     //     path: "/other",
//     //     meta: {
//     //         title: "其他",
//     //         icon: "el-icon-more-filled",
//     //         type: "menu"
//     //     },
//     //     children: [
//     //         {
//     //             path: "/other/directive",
//     //             name: "directive",
//     //             meta: {
//     //                 title: "指令",
//     //                 icon: "el-icon-price-tag",
//     //                 type: "menu"
//     //             },
//     //             component: "other/directive"
//     //         },
//     //         {
//     //             path: "/other/viewTags",
//     //             name: "viewTags",
//     //             meta: {
//     //                 title: "标签操作",
//     //                 icon: "el-icon-files",
//     //                 type: "menu"
//     //             },
//     //             component: "other/viewTags",
//     //             children: [
//     //                 {
//     //                     path: "/other/fullpage",
//     //                     name: "fullpage",
//     //                     meta: {
//     //                         title: "整页路由",
//     //                         icon: "el-icon-monitor",
//     //                         fullpage: true,
//     //                         hidden: true,
//     //                         type: "menu"
//     //                     },
//     //                     component: "other/fullpage"
//     //                 }
//     //             ]
//     //         },
//     //         {
//     //             path: "/other/verificate",
//     //             name: "verificate",
//     //             meta: {
//     //                 title: "表单验证",
//     //                 icon: "el-icon-open",
//     //                 type: "menu"
//     //             },
//     //             component: "other/verificate"
//     //         },
//     //         {
//     //             path: "/other/loadJS",
//     //             name: "loadJS",
//     //             meta: {
//     //                 title: "异步加载JS",
//     //                 icon: "el-icon-location-information",
//     //                 type: "menu"
//     //             },
//     //             component: "other/loadJS"
//     //         },
//     //         {
//     //             path: "/link",
//     //             name: "link",
//     //             meta: {
//     //                 title: "外部链接",
//     //                 icon: "el-icon-link",
//     //                 type: "menu"
//     //             },
//     //             children: [
//     //                 {
//     //                     path: "https://baidu.com",
//     //                     name: "百度",
//     //                     meta: {
//     //                         title: "百度",
//     //                         type: "link"
//     //                     }
//     //                 },
//     //                 {
//     //                     path: "https://www.google.cn",
//     //                     name: "谷歌",
//     //                     meta: {
//     //                         title: "谷歌",
//     //                         type: "link"
//     //                     }
//     //                 }
//     //             ]
//     //         },
//     //         {
//     //             path: "/iframe",
//     //             name: "Iframe",
//     //             meta: {
//     //                 title: "Iframe",
//     //                 icon: "el-icon-position",
//     //                 type: "menu"
//     //             },
//     //             children: [
//     //                 {
//     //                     path: "https://v3.cn.vuejs.org",
//     //                     name: "vue3",
//     //                     meta: {
//     //                         title: "VUE 3",
//     //                         type: "iframe"
//     //                     }
//     //                 },
//     //                 {
//     //                     path: "https://element-plus.gitee.io",
//     //                     name: "elementplus",
//     //                     meta: {
//     //                         title: "Element Plus",
//     //                         type: "iframe"
//     //                     }
//     //                 },
//     //                 {
//     //                     path: "https://lolicode.gitee.io/scui-doc",
//     //                     name: "scuidoc",
//     //                     meta: {
//     //                         title: "SCUI文档",
//     //                         type: "iframe"
//     //                     }
//     //                 }
//     //             ]
//     //         }
//     //     ]
//     // },
//     // {
//     //     name: "test",
//     //     path: "/test",
//     //     meta: {
//     //         title: "实验室",
//     //         icon: "el-icon-mouse",
//     //         type: "menu"
//     //     },
//     //     children: [
//     //         {
//     //             path: "/test/autocode",
//     //             name: "autocode",
//     //             meta: {
//     //                 title: "代码生成器",
//     //                 icon: "sc-icon-code",
//     //                 type: "menu"
//     //             },
//     //             component: "test/autocode/index",
//     //             children: [
//     //                 {
//     //                     path: "/test/autocode/table",
//     //                     name: "autocode-table",
//     //                     meta: {
//     //                         title: "CRUD代码生成",
//     //                         hidden: true,
//     //                         active: "/test/autocode",
//     //                         type: "menu"
//     //                     },
//     //                     component: "test/autocode/table"
//     //                 }
//     //             ]
//     //         },
//     //         {
//     //             path: "/test/codebug",
//     //             name: "codebug",
//     //             meta: {
//     //                 title: "异常处理",
//     //                 icon: "sc-icon-bug-line",
//     //                 type: "menu"
//     //             },
//     //             component: "test/codebug"
//     //         }
//     //     ]
//     // },
//     // {
//     //     path: "/other/about",
//     //     name: "about",
//     //     meta: {
//     //         title: "关于",
//     //         icon: "el-icon-info-filled",
//     //         type: "menu"
//     //     },
//     //     component: "other/about"
//     // },
//     // {
//     //     name: "demo",
//     //     path: "/demo",
//     //     meta: {
//     //         icon: "el-icon-eleme-filled",
//     //         title: "演示",
//     //         role: ["SA"]
//     //     },
//     //     children: [{
//     //         name: "demopage",
//     //         path: "/demopage",
//     //         component: "test/autocode/index",
//     //         meta: {
//     //             icon: "el-icon-menu",
//     //             title: "演示页面",
//     //             role: ["SA"]
//     //         }
//     //     }]
//     // },
// ]
const routes = []
export default routes;
