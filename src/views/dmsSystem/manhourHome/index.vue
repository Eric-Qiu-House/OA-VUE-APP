<template>
    <el-container>
        <el-header style="height: auto;" class="header-tabs">
            <project-header @handleSend="handleSend" @proDialog="openDialogProject"></project-header>
        </el-header>
        <el-main>
            <el-row :gutter="15">
                <el-col :lg="3">
                    <proTree :proData="proData" @proSend="onProSend"></proTree>
                </el-col>
                <el-col :lg="21">
                    <el-card>
                        <formItem @formSend="onFormSend" @onExportExcel="onExportExcel"
                            @onSelectedStat="onSelectedStat"></formItem>
                        <manhourTable :manhourData="manhourData" :selectedStat="selectedStat"
                            @onPagingData="onPagingData"></manhourTable>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
    <organize-edit ref="saveDialog" />
</template>

<script>
import organizeEdit from '@/views/dmsSystem/projectOrganize/dialog/organizeEdit.vue';
import { mergeManhourData, mergeManhourDataByProject } from '@/utils/manhourUtils';
import projectHeader from '@/views/dmsSystem/components/project/header/index.vue';
import { getDetailedDateInfo } from '@/utils/holidayChecker';
import proTree from './tree';
import formItem from './form';
import manhourTable from './table';

export default {
    components: {
        organizeEdit,
        projectHeader,
        proTree,
        formItem,
        manhourTable,
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
            selectedStat: '',
            selection: [],
            projectData: [],
            manhourData: [],
            displayedData: {
            },
            proNumLoading: false,
            manhoursLoading: false,
            projectInfo: {},
            checkedKeys: [],
            submitData: {
                project_number_: [],
                start_date: null,
                end_date: null,
            },
            dialog: {
                save: false,
            },
            overtimeState: false,
            proData: [],
            formData: [],
            pageData: {},
        };
    },
    created() {
        this.getProjectInfo();
    },
    watch: {
        filterText(val) {
            this.$refs.projectTree.filter(val);
        },
        submitData: {
            handler() {
                this.handleNodeClick();
            },
            deep: true,
        },
        pageData: {
            handler() {
                this.handleNodeClick();
            },
            deep: true,
        },
        timeHorizon() {
            this.selectedStat = '';
            this.handleNodeClick();
        },
    },
    methods: {
        handleSend(data) {
            this.proData = data;
        },
        onPagingData(data) {
            this.pageData = data;
        },
        async onExportExcel() {
            try {
                // 设置 responseType: 'blob' 来接收二进制文件流
                const response = await this.$dmsApi.manHours.exportManhoursToExcelRouter.post(
                    this.submitData
                );

                // 触发下载
                this.downloadExcel(response);
            } catch (error) {
                console.error('Error exporting data:', error);
                this.$message.error('导出失败，请重试');
            }
        },
        downloadExcel(blob) {
            const fileName = '工时记录.xlsx'; // 可以根据后端动态设置
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // 清除内存中的对象 URL
        },
        onSelectedStat(data) {
            console.log('接收的统计方式:', data);
            this.selectedStat = data;
        },
        onProSend(data) {
            console.log('接收的项目数据:', data);
            this.submitData.project_number_ = data;
        },
        onFormSend(data) {
            console.log('接收的表单数据:', data);
            this.submitData.start_date = data.timeHorizon[0];
            this.submitData.end_date = data.timeHorizon[1];
        },
        menuFilterNode(value, data) {
            if (!value) return true;
            return data.project_number_.indexOf(value) !== -1;
        },
        resetFun() {
            this.selectedStat = '';
            this.overtimeState = false;
            this.handleNodeClick();
        },
        detailedDateInfo(date) {
            return getDetailedDateInfo(date);
        },
        manDay() {
            this.displayedData = mergeManhourData(this.manhourData);
        },
        manProject() {
            this.displayedData = mergeManhourDataByProject(this.manhourData);
        },
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
            this.manhoursLoading = true;
            try {
                const reqData = {
                    ...this.submitData,
                    ...this.pageData,
                };
                const data = await this.$dmsApi.manHours.readFieldConversion.post(reqData);
                this.manhourData = data
                this.displayedData = [...data];
            } catch (error) {
                console.error('Error fetching manhours data:', error);
            } finally {
                this.manhoursLoading = false;
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