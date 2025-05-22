const config = {
    proFirm: [
        {
            value: 1,
            label: '友奇',
        },
        {
            value: 2,
            label: '星际',
        },
    ],
    proType: [
        {
            value: Number,
            label: '全部',
        },
        {
            value: 2,
            label: '自研项目',
        },
        {
            value: 3,
            label: '工程项目',
        }
    ],
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
        // {
        //     value: 4,
        //     label: '其他'
        // }
    ],
    proState: [
        {
            title: '合同主体',
            key: 'firm',
            options: [
                { label: '全部', value: '' },
                { label: '友奇', value: '友奇' },
                { label: '星际', value: '星际' },
            ]
        },
        {
            title: '项目阶段',
            key: 'stage',
            options: [
                {
                    value: Number,
                    label: '全部'
                },
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
            ]
        },
        {
            title: '项目状态',
            key: 'state',
            options: [
                { label: '全部', value: Number },
                { label: '未开始', value: 1, icon: 'el-icon-flag' },
                { label: '执行中', value: 2, icon: 'el-icon-bottom-left' },
                { label: '已完成', value: 3, icon: 'el-icon-checked' },
                { label: '已关闭', value: 4, icon: 'el-icon-circle-close' }
            ]
        },
    ],
    jobType: [
        { label: "基本设计", value: 1, text: '如原理图，计算类等相关需要送审的文件' },
        { label: "详细设计", value: 2, text: '调试手册，操作手册，厂家认可图确认等' },
        { label: "研究设计", value: 3, text: '在遇到某个问题暂时处理不了，需要花时间查阅资料或者研究规范标准等属于研究工时；或者规范更新后消化研究于' },
        { label: "三维设计", value: 4, text: '三维模型设计涉及到的所有的工作，包括出ISO图，MTO，布置图等节点图' },
        { label: "更改设计", value: 6, text: '修改设计花费的工时' },
        { label: "技术支持", value: 7, text: '参与现场调试，或者HAZID,HAZOP等第三方会议，以及意见澄清，作为技术支持产生的工时' },
        { label: "设备订货", value: 5, text: '设备技术协议阶段的产生的工时' },
        { label: "部门管理", value: 8, text: '部门人员及项目工作计划梳理及规划，专业间协调；与客户之间的协调会等' },
        { label: "项目管理", value: 10, text: '【项目部】项目过程管理工作' },
        { label: "现场服务", value: 11, text: '客户现场工作服务' },
        { label: "出差工时", value: 12, text: '出差通勤工时，无任务' },
        { label: "休假工时", value: 13, text: '请假补填工时，以保证【月度填报工时>8*工作天数】' },
        { label: "其他工时", value: 9, text: '无相关类型时，则填其他，具体内容可补充备注中' },
    ]
}

export default config