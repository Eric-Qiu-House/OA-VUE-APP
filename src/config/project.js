export default {
    projectTypes: [
        { 
            label: '所有', 
            value: 0 
        },
        {
            value: 1,
            label: '研发项目',
        },
        {
            value: 2,
            label: '工程项目',
            proStage: [
                {
                    value: 1,
                    label: '市场响应'
                },
                {
                    value: 2,
                    label: '项目执行'
                },
                {
                    value: 3,
                    label: '售后维保'
                },
                {
                    value: 4,
                    label: '其他'
                }
            ]
        }
    ],
    projectState: [
        {
            title: '状态(单)',
            key: 'state',
            options: [
                { label: '全部', value: 0 },
                { label: '未开始', value: 1, icon: 'el-icon-flag' },
                { label: '执行中', value: 2, icon: 'el-icon-bottom-left' },
                { label: '已完成', value: 3, icon: 'el-icon-checked' },
                { label: '已关闭', value: 4, icon: 'el-icon-circle-close' }
            ]
        }
    ],
    jobType: [
        { label: "其他事项", value: 9 },
        { label: "基本设计", value: 1 },
        { label: "详细设计", value: 2 },
        { label: "研究设计", value: 3 },
        { label: "三维设计", value: 4 },
        { label: "设备订货", value: 5 },
        { label: "更改设计", value: 6 },
        { label: "技术支持", value: 7 },
        { label: "部门管理", value: 8 },
        { label: "项目管理", value: 10 },
        { label: "现场服务", value: 11 },
    ],
}