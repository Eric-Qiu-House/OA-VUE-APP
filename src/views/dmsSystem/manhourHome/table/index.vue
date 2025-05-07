<template>
    <scTable v-loading="manhoursLoading" ref="manhourData" :data="manhourData" :total="myTotal" @dataChange="dataChange"
        @selection-change="selectionChange" stripe remote-sort remote-filter>
        <el-table-column label="序号" width="60">
            <template #default="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="项目号" prop="project_number_" width="120" sortable="custom" />
        <el-table-column label="项目名称" prop="projectName" width="150" sortable="custom" />
        <el-table-column label="姓名" prop="user_name_" width="100" sortable="custom" />
        <el-table-column label="项目类型" prop="project_type_label" width="100" sortable="custom" />
        <el-table-column label="项目阶段" prop="pro_stage_" width="100" sortable="custom" />
        <el-table-column label="工作类型" prop="job_type_label" width="100" sortable="custom" />
        <el-table-column label="时间" prop="record_date_" width="120"
            sortable="custom" />
        <el-table-column label="工时" prop="hours_" width="80" sortable="custom" />
        <el-table-column v-if="selectedStat == 'manDay'" label="加班工时" prop="overtime" width="150" sortable="custom" />
        <el-table-column v-if="selectedStat == 'manDay'" label="缺失工时" prop="lacktime" width="150" sortable="custom" />
        <el-table-column v-if="selectedStat !== 'manProject'" label="时间类型" prop="overtime1" width="150"
            sortable="custom">
            <template #default="scope">
                <span>{{ detailedDateInfo(scope.row.record_date_) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark_" width="150" sortable="custom" />
    </scTable>
</template>
<script>
import {convertToCSV } from '@/utils/manhourUtils';
import { getDetailedDateInfo } from '@/utils/holidayChecker';

export default {
    props: {
        manhourData: {
            type: Array,
        },
        selectedStat: {
            type: String,
            default: 'manOnce',
        },
    },
    data() {
        return {
            myTotal: '',
            projectType: {},
            flterText: '',
            filteredData: [],
            defaultProps: {
                label: 'project_number_',
                children: 'children',
            },
            projectId: '',
            filterText: '',
            timeHorizon: [],
            // selectedStat: '',
            selection: [],
            projectData: [],
            // manhourData: [],
            // displayedData: {
            //     "data": [
            //         {
            //             "uuid_": "0069f4ca-803e-4c6d-94fc-6f3a790ea9f4",
            //             "project_number_": "23010",
            //             "drawing_uuid_": null,
            //             "drawing_number_": null,
            //             "drawing_name_": null,
            //             "user_id_": "ca04169a-7a62-4e5c-9e7c-96c25500d82b",
            //             "user_name_": "张惠达",
            //             "hours_": 2,
            //             "submit_message_": null,
            //             "remark_": "应力报告",
            //             "record_date_": "2025-01-03",
            //             "verifier_id_": null,
            //             "verifier_name_": null,
            //             "ratify_type_": 2,
            //             "ratify_message_": null,
            //             "ratify_date_": null,
            //             "job_type_": 4,
            //             "project_type_": 2,
            //             "delete_date_": null,
            //             "job_type_label": "三维设计",
            //             "project_type_label": "工程项目"
            //         },
            //         {
            //             "uuid_": "02ca4e43-bfa7-4dbe-895a-5eedf0beaede",
            //             "project_number_": "23029",
            //             "drawing_uuid_": null,
            //             "drawing_number_": null,
            //             "drawing_name_": null,
            //             "user_id_": "e832c690-2652-4c2d-9c65-05c41dddd2f5",
            //             "user_name_": "王晓伟",
            //             "hours_": 5,
            //             "submit_message_": null,
            //             "remark_": "调试程序编制",
            //             "record_date_": "2025-01-02",
            //             "verifier_id_": null,
            //             "verifier_name_": null,
            //             "ratify_type_": 2,
            //             "ratify_message_": null,
            //             "ratify_date_": null,
            //             "job_type_": 2,
            //             "project_type_": 3,
            //             "delete_date_": null,
            //             "job_type_label": "详细设计",
            //             "project_type_label": "研发+工程"
            //         },
            //         {
            //             "uuid_": "03aaef8d-b382-4346-a609-45c792eba91b",
            //             "project_number_": "24073",
            //             "drawing_uuid_": null,
            //             "drawing_number_": null,
            //             "drawing_name_": null,
            //             "user_id_": "2912fd2a-6ae5-4a97-b1b1-361fd2518bb6",
            //             "user_name_": "范亚华",
            //             "hours_": 8,
            //             "submit_message_": null,
            //             "remark_": null,
            //             "record_date_": "2025-01-06",
            //             "verifier_id_": null,
            //             "verifier_name_": null,
            //             "ratify_type_": 2,
            //             "ratify_message_": null,
            //             "ratify_date_": null,
            //             "job_type_": 1,
            //             "project_type_": 5,
            //             "delete_date_": null,
            //             "job_type_label": "基本设计",
            //             "project_type_label": "市场响应"
            //         },
            //         {
            //             "uuid_": "0471c40f-71d9-4d2e-97ab-1bb87e5e034d",
            //             "project_number_": "24002YS",
            //             "drawing_uuid_": null,
            //             "drawing_number_": null,
            //             "drawing_name_": null,
            //             "user_id_": "857ed5d9-ebc4-4a8f-844f-369f036c230a",
            //             "user_name_": "系统管理员",
            //             "hours_": 1,
            //             "submit_message_": null,
            //             "remark_": null,
            //             "record_date_": "2025-02-28",
            //             "verifier_id_": null,
            //             "verifier_name_": null,
            //             "ratify_type_": 2,
            //             "ratify_message_": null,
            //             "ratify_date_": null,
            //             "job_type_": 7,
            //             "project_type_": 5,
            //             "delete_date_": null,
            //             "job_type_label": "技术支持",
            //             "project_type_label": "市场响应"
            //         },
            //         {
            //             "uuid_": "05a74dc9-f400-46f0-9ac4-283ee61a077a",
            //             "project_number_": "24073",
            //             "drawing_uuid_": null,
            //             "drawing_number_": null,
            //             "drawing_name_": null,
            //             "user_id_": "0095d9fa-a6f2-4ee0-b5c0-d51e13993e0d",
            //             "user_name_": "李涵",
            //             "hours_": 2,
            //             "submit_message_": null,
            //             "remark_": "BOR / 技术方案核实 ",
            //             "record_date_": "2025-01-06",
            //             "verifier_id_": null,
            //             "verifier_name_": null,
            //             "ratify_type_": 2,
            //             "ratify_message_": null,
            //             "ratify_date_": null,
            //             "job_type_": 3,
            //             "project_type_": 1,
            //             "delete_date_": null,
            //             "job_type_label": "研究设计",
            //             "project_type_label": "研发项目"
            //         },
            //         {
            //             "uuid_": "061f0540-c922-45ca-a692-f11f0655d23c",
            //             "project_number_": "24073",
            //             "drawing_uuid_": null,
            //             "drawing_number_": null,
            //             "drawing_name_": null,
            //             "user_id_": "2912fd2a-6ae5-4a97-b1b1-361fd2518bb6",
            //             "user_name_": "范亚华",
            //             "hours_": 6,
            //             "submit_message_": null,
            //             "remark_": null,
            //             "record_date_": "2025-01-09",
            //             "verifier_id_": null,
            //             "verifier_name_": null,
            //             "ratify_type_": 2,
            //             "ratify_message_": null,
            //             "ratify_date_": null,
            //             "job_type_": 1,
            //             "project_type_": 5,
            //             "delete_date_": null,
            //             "job_type_label": "基本设计",
            //             "project_type_label": "市场响应"
            //         },
            //         {
            //             "uuid_": "08c2310e-a6e2-49f9-ad80-1eada88e7ab7",
            //             "project_number_": "23010",
            //             "drawing_uuid_": null,
            //             "drawing_number_": null,
            //             "drawing_name_": null,
            //             "user_id_": "8c56d9f7-70bf-4bb9-abbc-d0464beb262e",
            //             "user_name_": "朱文广",
            //             "hours_": 8,
            //             "submit_message_": null,
            //             "remark_": null,
            //             "record_date_": "2025-01-06",
            //             "verifier_id_": null,
            //             "verifier_name_": null,
            //             "ratify_type_": 2,
            //             "ratify_message_": null,
            //             "ratify_date_": null,
            //             "job_type_": 2,
            //             "project_type_": 2,
            //             "delete_date_": null,
            //             "job_type_label": "详细设计",
            //             "project_type_label": "工程项目"
            //         },
            //         {
            //             "uuid_": "0a4ff413-d5fe-4ea4-97e5-76a6a94256b5",
            //             "project_number_": "Other",
            //             "drawing_uuid_": null,
            //             "drawing_number_": null,
            //             "drawing_name_": null,
            //             "user_id_": "857ed5d9-ebc4-4a8f-844f-369f036c230a",
            //             "user_name_": "系统管理员",
            //             "hours_": 1,
            //             "submit_message_": null,
            //             "remark_": "21",
            //             "record_date_": "2025-01-22",
            //             "verifier_id_": null,
            //             "verifier_name_": null,
            //             "ratify_type_": 2,
            //             "ratify_message_": null,
            //             "ratify_date_": null,
            //             "job_type_": 1,
            //             "project_type_": 1,
            //             "delete_date_": null,
            //             "job_type_label": "基本设计",
            //             "project_type_label": "研发项目"
            //         },
            //         {
            //             "uuid_": "0ac40fdd-3647-4bbf-af02-f0b39e744630",
            //             "project_number_": "24002YS",
            //             "drawing_uuid_": null,
            //             "drawing_number_": null,
            //             "drawing_name_": null,
            //             "user_id_": "4ba2cab1-c1a4-4bc7-8fbe-4ac78f08544c",
            //             "user_name_": "程宏",
            //             "hours_": 8,
            //             "submit_message_": null,
            //             "remark_": null,
            //             "record_date_": "2025-01-02",
            //             "verifier_id_": null,
            //             "verifier_name_": null,
            //             "ratify_type_": 2,
            //             "ratify_message_": null,
            //             "ratify_date_": null,
            //             "job_type_": 2,
            //             "project_type_": 1,
            //             "delete_date_": null,
            //             "job_type_label": "详细设计",
            //             "project_type_label": "研发项目"
            //         },
            //         {
            //             "uuid_": "0acd36bf-eb11-4ae1-900b-adfb0de345db",
            //             "project_number_": "23029",
            //             "drawing_uuid_": null,
            //             "drawing_number_": null,
            //             "drawing_name_": null,
            //             "user_id_": "b2dbaa5f-4d60-4f6b-8a41-dcf5610c5c8e",
            //             "user_name_": "李容",
            //             "hours_": 2,
            //             "submit_message_": null,
            //             "remark_": "整理vdd资料",
            //             "record_date_": "2025-01-03",
            //             "verifier_id_": null,
            //             "verifier_name_": null,
            //             "ratify_type_": 2,
            //             "ratify_message_": null,
            //             "ratify_date_": null,
            //             "job_type_": 1,
            //             "project_type_": 2,
            //             "delete_date_": null,
            //             "job_type_label": "基本设计",
            //             "project_type_label": "工程项目"
            //         }
            //     ],
            //     "total": 336,
            //     "currentPage": 1,
            //     "pageSize": 10,
            //     "totalPages": 34
            // },
            proNumLoading: false,
            manhoursLoading: false,
            submitData: {},
            projectInfo: {},
            checkedKeys: [],
            dialog: {
                save: false,
            },
            overtimeState: false,
            proData: [],
            formData: [],
            pagingData: {
                pageSize: 20,
                currentPage: 1,
            },

        };
    },
    created() {
        this.getProjectInfo();
    },
    watch: {
        filterText(val) {
            this.$refs.projectTree.filter(val);
        },
        // pagingData: {
        //     handler() {
        //         this.$emit('onPagingData', this.pagingData);
        //     },
        //     deep: true,
        // },
        // checkedKeys() {
        //     this.selectedStat = '';
        //     this.handleNodeClick();
        // },
        // timeHorizon() {
        //     this.selectedStat = '';
        //     this.handleNodeClick();
        // },
    },
    methods: {
        // 分页数据
        dataChange(scPageSize,currentPage) {
            this.pagingData = {
                page: currentPage,
                pageSize: scPageSize,
            };
            console.log('分页数据:', this.pagingData);
            this.$emit('onPagingData', this.pagingData);

        },
        handleSend(data) {
            this.proData = data;
        },
        // manhourSend(data) {
        //     this.manhourData = data;
        // },
        onFormSend(data) {
            this.formData = data
        },
        menuFilterNode(value, data) {
            if (!value) return true;
            return data.project_number_.indexOf(value) !== -1;
        },
        resetFun() {
            // this.selectedStat = '';
            this.overtimeState = false;
            this.handleNodeClick();
        },
        detailedDateInfo(date) {
            return getDetailedDateInfo(date);
        },
        // manDay() {
        //     this.displayedData = mergeManhourData(this.manhourData);
        // },
        // manProject() {
        //     this.displayedData = mergeManhourDataByProject(this.manhourData);
        // },
        async getProjectInfo() {
            this.proNumLoading = true;
            try {
                const flatData = await this.$dmsApi.project.readAll.get();
                this.projectInfo = flatData;
                this.projectData = this.addRootNode(flatData);
            } catch (error) {
                console.error('Error fetching project data:', error);
            } finally {
                this.proNumLoading = false;
            }
        },
        addRootNode(flatData) {
            return [
                {
                    project_number_: '选择全部',
                    children: flatData,
                },
            ];
        },
        async handleNodeClick() {
            this.submitData = {
                project_number_: this.checkedKeys,
                ...(this.timeHorizon.length
                    ? {
                        start_date: this.timeHorizon[0],
                        end_date: this.timeHorizon[1],
                    }
                    : {}),
            };
            this.manhoursLoading = true;
            try {
                const data = await this.$dmsApi.manHours.readFieldConversion.post(this.submitData);
                // const data = dataA.data
                console.log('获取的工时数据:', data);
                data.forEach((row) => {
                    const project = this.projectData[0].children.find(
                        (project) => project.project_number_ === row.project_number_
                    );
                    row.projectName = project ? project.project_name_ : '';
                });
                // this.manhourData = data;
                this.displayedData = [...data];
            } catch (error) {
                console.error('Error fetching manhours data:', error);
            } finally {
                this.manhoursLoading = false;
            }
        },
        handleCheckChange() {
            this.checkedKeys = this.$refs.projectTree.getCheckedKeys(); // 获取选中的节点
            console.log('当前选中的节点:', this.checkedKeys);
        },
        async dataExport() {
            try {
                const csvData = convertToCSV(this.displayedData, this.selectedStat);
                const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', 'displayedData.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error exporting data:', error);
            }
        },
        selectionChange(selection) {
            this.selection = selection;
        },
        updateProjectType(event) {
            this.projectType = event;
        },
    },
};
</script>