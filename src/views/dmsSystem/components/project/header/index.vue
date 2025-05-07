<template>
    <el-tabs type="card" v-model="projectTypeValue" @tab-change="onTabChange">
        <el-tab-pane v-for="item in projectTypes" :key="item.value" :label="item.label" :name="item.value" />
    </el-tabs>
    <el-card>
        <div shadow="never" header="分类筛选器">
            <sc-select-filter :data="projectState" :selected-values="selectedValues" :label-width="80"
                @on-change="onSelectChange" />
        </div>

        <el-input placeholder="输入 项目号 项目名称 进行过滤" v-model="filterText" clearable style="height: 40px; width: 250px;" />
    </el-card>
</template>

<script>
import scSelectFilter from '@/components/scSelectFilter'
import config from '@/config/project'
import { inject } from 'vue';

export default {
    components: { scSelectFilter },

    setup() { 
        const userType = inject('userType');
        return { userType };
    },

    data() {
        return {
            projectTypeValue: 0,
            selectedValues: { state: 0 },
            projectTypes: config.projectTypes,
            projectState: config.projectState,
            reqData: {
                project_type_: 0,
                project_statu_: 0
            },
            filterText: '',
            projectTable: [],
            filteredData: [],
            projectLoading: false,
        }
    },
    watch: {
        projectTypeValue(val) {
            this.reqData.project_type_ = val
            this.applyFilter()
        },
        selectedValues: {
            handler(val) {
                this.reqData.project_statu_ = val.state
                this.applyFilter()
            },
            deep: true
        },
        filterText() {
            this.transferData()
        },
    },
    computed: {
        tableData() {
            // 过滤器 - 根据输入框内容进行筛选
            const keyword = this.filterText.trim().toLowerCase()

            let data = this.projectTable
            if (keyword) {
                data = data.filter(row => {
                    return (
                        // 根据项目编号、名称 进行模糊匹配
                        (row.project_number_ || '').toLowerCase().includes(keyword) ||
                        (row.project_name_ || '').toLowerCase().includes(keyword) ||
                        String(row.project_type_ || '').toLowerCase().includes(keyword) ||
                        String(row.project_statu_ || '').toLowerCase().includes(keyword)
                    )
                })
            }
            return data
        },
    },
    created() {
        this.fetchProjects()
    },
    methods: {
        // 清空输入框内容
        clearInput() {
            this.filterText = ''
        },
        async fetchProjects() {
            this.projectLoading = true
            try {
                this.clearInput()
                if (this.userType === 'admin') {
                    this.projectTable = await this.$dmsApi.project.readAll.get()
                } else if (this.userType === 'user') {
                    this.projectTable = await this.$dmsApi.project.readByUser.post()
                }
                this.projectTable = await this.$dmsApi.project.readAll.get()

                this.transferData()
            } catch (error) {
                console.error('Error fetching projects:', error)
            } finally {
                this.projectLoading = false
            }
        },
        // 应用筛选器 - 根据选择的项目类型和状态进行筛选 api
        async applyFilter() {
            try {
                const data = {
                    project_type_: this.reqData.project_type_,
                    project_statu_: this.reqData.project_statu_,
                }
                if (data.project_type_ == 0 && data.project_statu_ == 0) {
                    this.fetchProjects()
                    return
                }
                if (data.project_type_ == 0) {
                    delete data.project_type_
                }
                if (data.project_statu_ == 0) {
                    delete data.project_statu_
                }
                this.projectTable = await this.$dmsApi.project.readById.post(data);
                this.transferData()
            } catch (error) {
                console.error('Error applying filter:', error)
            } finally {
                this.projectLoading = false
            }
        },

        // 发送数据到父组件
        transferData() {
            this.$emit('handleSend', this.tableData)
        },

        // 处理选项卡切换事件
        onTabChange() {

        },

        // 处理选择器变化事件
        onSelectChange(selected) {
            this.selectedValues.state = selected.state
        }
    }
}
</script>