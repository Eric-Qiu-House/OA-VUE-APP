<template>
    <div class="project-header">
        <el-tabs type="card" v-model="reqData.project_type_" @tab-change="onTabChange">
            <el-tab-pane v-for="item in projectTypes" :key="item.value" :label="item.label" :name="item.value" />
        </el-tabs>

        <el-card class="filter-card">
            <div class="filter-header" shadow="never">
                <sc-select-filter :data="projectState" :selected-values="selectedValues" :label-width="80"
                    @on-change="onSelectChange" />
            </div>

            <el-input v-model="filterText" placeholder="输入 项目号 项目名称 进行过滤" clearable class="search-input"
                @clear="onClearFilter" />
        </el-card>
    </div>
</template>

<script>
import scSelectFilter from '@/components/scSelectFilter'
import config from '@/utils/projectBasicstInfo'
import { inject } from 'vue'

export default {
    name: 'ProjectHeader',

    components: {
        scSelectFilter
    },

    inject: ['powerContext'],

    setup() {
        const powerContext = inject('powerContext')
        return { powerContext }
    },

    data() {
        return {
            userInfo: {},
            selectedValues: {
                firm: String,
                stage: Number,
                state: Number,
            },
            projectTypes: config.proType,
            projectState: config.proState,
            reqData: {
                project_type_: Number,
                project_statu_: Number,
                firm_: String,
                pro_stage_: Number
            },
            filterText: '',
            projectTable: [],
            projectLoading: false,
        }
    },

    watch: {
        filterText() {
            this.transferData(this.tableData)
        },
        // 监听 reqData 的变化，统一处理数据更新
        reqData: {
            handler(newVal) {
                this.applyFilter(newVal)
            },
            deep: true
        }
    },

    computed: {
        tableData() {
            const keyword = this.filterText.trim().toLowerCase()
            if (!keyword) return this.projectTable

            const searchFields = [
                'project_number_',
                'project_name_',
                'project_type_',
                'project_statu_',
                'project_firm_',
                'project_stage_'
            ]

            return this.projectTable.filter(row =>
                searchFields.some(field =>
                    String(row[field] || '').toLowerCase().includes(keyword)
                )
            )
        },
    },

    created() {
        this.initData()
        this.fetchProjects()
    },

    methods: {
        // 初始化数据
        async initData() {
            this.userInfo = this.$TOOL.data.get("USER_INFO")
        },

        // 更新请求数据
        updateReqData(data) {
            Object.assign(this.reqData, data)
        },

        // 处理选项卡切换事件
        onTabChange(val) {
            this.updateReqData({ project_type_: val })
        },

        // 处理选择器变化事件
        onSelectChange(selected) {
            this.selectedValues = selected
            this.updateReqData({
                project_statu_: selected.state,
                firm_: selected.firm,
                pro_stage_: selected.stage
            })
        },

        // 清空筛选条件
        onClearFilter() {
            this.filterText = ''
            this.resetFilters()
            this.fetchProjects()
        },

        // 重置所有筛选条件
        resetFilters() {
            this.selectedValues = {
                firm: String,
                stage: Number,
                state: Number,
            }
            this.updateReqData({
                project_type_: Number,
                project_statu_: Number,
                firm_: String,
                pro_stage_: Number
            })
        },

        // 检查对象是否所有字段都为空值
        isAllFieldsEmpty(obj) {
            return Object.values(obj).every(value =>
                value === null ||
                value === undefined ||
                value === '' ||
                (typeof value === 'number' && (isNaN(value) || value === 0))
            )
        },

        // 检查值是否为空
        isEmptyValue(value) {
            return value === null ||
                value === undefined ||
                value === '' ||
                (typeof value === 'number' && (isNaN(value) || value === 0))
        },

        // 获取项目数据
        async fetchProjects() {
            const params = {
                role: this.userInfo.user_type_
            }

            try {
                const filteredProjects = await this.$dmsApi.converge.readUserProjectRouter.post(params)
                this.transferData(filteredProjects)
            } catch (error) {
                console.error('Error fetching projects:', error)
                this.projectTable = []
                this.transferData([])
            }
        },

        // 清理对象中的空值字段
        cleanEmptyFields(obj) {
            const cleanedObj = {}
            // let hasValidData = false
            
            for (const [key, value] of Object.entries(obj)) {
                if (this.isEmptyValue(value)) continue
                cleanedObj[key] = value
                // hasValidData = true
            }
            
            return cleanedObj
        },

        // 应用过滤条件 
        async applyFilter(val) {
            try {
                if (this.isAllFieldsEmpty(val)) {
                    await this.fetchProjects()
                    return
                }
                
                const cleanedData = this.cleanEmptyFields(val)
                const params = {
                    role: this.userInfo.user_type_
                }

                if (Object.keys(cleanedData).length > 0) {
                    params.data = cleanedData
                }

                const filteredProjects = await this.$dmsApi.converge.readUserProjectRouter.post(params)
                this.transferData(filteredProjects)
            } catch (error) {
                console.error(error)
            }
        },

        // 发送数据到父组件
        transferData(data) {
            this.$emit('handleSend', data)
        },
    }
}
</script>

<style lang="scss" scoped>
.project-header {
    .filter-card {
        margin-top: 16px;
    }

    .filter-header {
        margin-bottom: 16px;
    }

    .search-input {
        height: 40px;
        width: 250px;
    }
}
</style>