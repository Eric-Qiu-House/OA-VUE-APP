<template>
    <!-- {{ powerContext }}powerContext -->
    <scTable ref="projectTable" :data="proData" row-key="uuid_" style="width: 100%"
        :default-sort="{ prop: 'project_number_', order: 'descending' }" stripe>
        <!-- 表格列定义 -->
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column sortable label="主体" prop="firm_" width="100"></el-table-column>
        <el-table-column sortable label="项目号" prop="project_number_" width="100"></el-table-column>
        <el-table-column label="项目名称" prop="project_name_" width="150"></el-table-column>
        <el-table-column label="阶段负责人" prop="project_manager_name_" width="150"></el-table-column>
        <el-table-column label="项目状态" prop="project_statu_" width="120">
            <template #default="scope">
                <router-link :to="{ name: 'dataAnalysis' }">
                    <el-button text type="primary" size="small" :style="getStatusStyle(scope.row.project_statu_)">
                        {{ getStatusText(scope.row.project_statu_) }}
                    </el-button>
                </router-link>
            </template>
        </el-table-column>
        <el-table-column label="项目阶段" prop="pro_stage_" width="120">
            <template #default="scope">
                <router-link :to="{ name: 'dataAnalysis' }">
                    <el-button text type="primary" size="small">
                        {{ getStatu(scope.row.pro_stage_) }}
                    </el-button>
                </router-link>
            </template>
        </el-table-column>
        <el-table-column label="开始(计划时间)" prop="start_date_" width="120"></el-table-column>
        <el-table-column label="结束(计划时间)" prop="end_date_" width="120"></el-table-column>
        <el-table-column label="时间进度" width="150">
            <template #default="{ row }">
                <div :style="getStyle(row)">
                    <el-progress :stroke-width="10" :percentage="getProgress(row)" :color="getStyle(row)" />
                </div>
            </template>
        </el-table-column>
        <el-table-column label="开始时间" prop="start_date_ast_" width="120"></el-table-column>
        <el-table-column label="结束时间" prop="end_date_aet_" width="120"></el-table-column>

        <el-table-column label="客户" prop="ship_owner_" width="150"></el-table-column>
        <el-table-column label="船厂" prop="ship_person_" width="150"></el-table-column>
        <el-table-column label="备注" prop="remarks_" width="200" sortable></el-table-column>
        <el-table-column label="图纸状态" fixed="right" width="80">
            <template #default="scope">
                <el-button-group>
                    <router-link
                        :to="{ name: 'drawingInfo', query: { projectUuid: scope.row.uuid_, state: 'admin', projectState: scope.row.project_statu_ } }" >
                        <el-button text type="primary" size="small">查看</el-button>
                    </router-link>
                    <!-- <router-link
                        :to="{ name: 'userDrawing', query: { projectUuid: scope.row.uuid_, state: 'user', projectState: scope.row.project_statu_ } }"
                        v-if="userType === 'user'">
                        <el-button text type="primary" size="small">查看</el-button>
                    </router-link> -->
                </el-button-group>
            </template>
        </el-table-column>
        <el-table-column label="送审状态" fixed="right" width="80">
            <template #default>
                <el-button-group>
                    <router-link :to="{ name: 'submissionPlan' }">
                        <el-button text type="primary" size="small">查看</el-button>
                    </router-link>
                </el-button-group>
            </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
            <template #default="scope">
                <el-button-group>
                    <el-button text type="primary" size="small" :disabled="userType === 'user'"
                        @click="openDialogProject(scope.row)">
                        编辑
                    </el-button>
                </el-button-group>
            </template>
        </el-table-column>
    </scTable>
</template>

<script>
import { inject } from 'vue';
import config from '@/utils/projectBasicstInfo'

export default {
    inject: ['powerContext'],
    setup() {
        const powerContext = inject('powerContext');
        return { powerContext };
    },

    props: {
        proData: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            projectForm: {},
        };
    },

    methods: {

        // 打开编辑项目对话框
        openDialogProject(row) {
            this.$emit('proDialog', row);
        },

        // 计算颜色样式
        getStyle(row) {
            const newDate = new Date(); // 当前时间
            const startDate = new Date(row.start_date_);
            const endDate = new Date(row.end_date_);
            const totalTime = endDate - startDate;
            const elapsedTime = newDate - startDate;

            if (totalTime <= 0) return '#909399'; // 非法日期

            const progress = (elapsedTime / totalTime) * 100;
            if (progress < 60) return '#409EFF';
            else if (progress < 80) return '#E6A23C';
            else return '#F56C6C';
        },

        // 计算进度百分比显示
        getProgress(row) {
            const newDate = new Date(); // 当前时间
            const startDate = new Date(row.start_date_);
            const endDate = new Date(row.end_date_);
            const totalTime = endDate - startDate;
            const elapsedTime = newDate - startDate;

            if (totalTime <= 0) return 'N/A'; // 非法日期

            const progress = Math.round((elapsedTime / totalTime) * 100);
            return `${progress}`;
        },

        // 获取项目状态的样式和文本
        getStatusStyle(status) {
            const styles = {
                1: '#ff8c00',
                2: '#409eff',
                3: '#67c23a',
                default: '#909399',
            };
            return { color: styles[status] || styles.default };
        },

        getStatu(status) {
            const resData = config.proStage.find(item => item.value == status)
            return resData.label || 'NULL'
        },
        // 获取项目状态的文本描述
        getStatusText(status) {
            const texts = {
                1: '未开始',
                2: '执行中',
                3: '已完成',
                default: '已关闭',
            };
            return texts[status] || texts.default;
        },
    },

};
</script>