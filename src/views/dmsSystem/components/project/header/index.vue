<template>
    <!-- {{ userInfo }} -->
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
import config from '@/utils/projectBasicstInfo'
import { inject } from 'vue';

export default {
    components: { scSelectFilter },
    inject: ['powerContext'],
    setup() {
        const powerContext = inject('powerContext');
        return { powerContext };
    },

    data() {
        return {
            userInfo: {},
            projectTypeValue: 0,
            selectedValues: { state: 0 },
            projectTypes: config.proType,
            projectState: config.proState,
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
            // this.applyFilter()
        },
        reqData: {
            handler(val) {
                this.reqData == val
                this.applyFilter(val)
            },
            deep: true
        },
        selectedValues: {
            handler(val) {
                this.reqData.project_statu_ = val.state
                // this.applyFilter()
            },
            deep: true
        },
        filterText() {
            this.transferData(this.projectTable)
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
    async mounted() {
        this.userInfo = this.$TOOL.data.get("USER_INFO");
    },
    created() {
        this.fetchProjects()
    },
    methods: {
        // 清空输入框内容
        clearInput() {
            this.filterText = ''
        },

        async userPro() {
            const data = {
                userId: this.userInfo.id_,
            }
            try {
                return await this.$dmsApi.project.readByUser.post(data);
            } catch (error) {
                console.error(error);
            }
        },
        async adminPro() {
            try {
                return await this.$dmsApi.project.readAll.get()
            } catch (error) {
                console.log(error)
            }
        },
        async fetchProjects() {
            this.userInfo = this.$TOOL.data.get("USER_INFO");

            this.clearInput();
            this.projectLoading = true;

            try {
                let projects = [];

                if (this.userInfo.user_type_ === 'admin') {
                    projects = await this.adminPro(); // 等待获取真实数据
                } else if (this.userInfo.user_type_ === 'user') {
                    projects = await this.userPro(); // 等待获取真实数据
                }

                this.projectTable = projects; // 确保是数组
                this.transferData(this.projectTable);
            } catch (error) {
                console.error('Error fetching projects:', error);
                this.projectTable = []; // 出错时设置为空数组防止后续出错
                this.transferData([]);
            } finally {
                this.projectLoading = false;
            }
        },

        // 应用筛选器 - 根据选择的项目类型和状态进行筛选 数据
        applyFilter(val) {

            let filteredProjects = [];

            if (val.project_type_ == 0 && val.project_statu_ == 0) {
                this.fetchProjects()
                return
            }

            if (val.project_type_ != 0 && val.project_statu_ != 0) {
                filteredProjects = this.projectTable.filter(item => (item.project_statu_ == val.project_statu_ && item.project_type_ == val.project_type_));
                this.transferData(filteredProjects);
                return
            }

            // 根据项目类型过滤
            if (val.project_type_ == 0 && val.project_statu_ != 0) {
                filteredProjects = this.projectTable.filter(item => item.project_statu_ == val.project_statu_);
                this.transferData(filteredProjects);
                return
            }

            // 根据项目状态过滤
            if (val.project_type_ != 0 && val.project_statu_ == 0) {
                filteredProjects = this.projectTable.filter(item => item.project_type_ == val.project_type_);
                this.transferData(filteredProjects);
                return
            }
        },

        // 发送数据到父组件
        transferData(table) {
            this.$emit('handleSend', table)
        },

        // 处理选项卡切换事件
        onTabChange(newVal) {
            this.reqData.project_type_ = newVal; // 更新当前选中的项目类型
        },

        // // 处理选择器变化事件
        onSelectChange(selected) {
            this.selectedValues.state = selected.state;
            this.reqData.project_statu_ = selected.state; // 更新当前选中的项目状态
        }
    }
}
</script>