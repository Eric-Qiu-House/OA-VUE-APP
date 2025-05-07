<template>
    <el-form :label-width="'100px'">
      <el-form-item label="查询：" style="width: 500px;">
        <el-date-picker
          v-model="formData.timeHorizon"
          type="daterange"
          range-separator="To"
          clearable
          value-format="YYYY-MM-DD"
          start-placeholder="Start date"
          end-placeholder="End date"
        />
      </el-form-item>
  
      <!-- 保留功能 -->
      <!-- <el-form-item label="统计方式：">
        <el-link type="warning" :underline="false" @click="resetFun" style="margin-right: 20px;">
          重置
        </el-link>
        <el-radio-group v-model="selectedStat">
          <el-radio label="manOnce" value="manOnce" @click="manDay('manOnce')">人/次【统计】</el-radio>
          <el-radio label="manDay" value="manDay" @click="manDay(manDay)">人/天【统计】</el-radio>
          <el-radio label="manProject" value="manProject" @click="manDay('manProject')">人/项目【统计】</el-radio>
        </el-radio-group>
      </el-form-item> -->
  
      <el-form-item label="操作：">
        <el-button type="primary" icon="el-icon-plus" @click="dataExport">数据导出</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  import { mergeManhourDataByProject } from '@/utils/manhourUtils';
//   import { getDetailedDateInfo } from '@/utils/holidayChecker';
  
  export default {
    data() {
      return {
        formData: {
          timeHorizon: [],
        },
        selectedStat: '',
        projectData: [],
        manhourData: [],
        displayedData: [],
        checkedKeys: [],
        projectInfo: {},
        manhoursLoading: false,
        proNumLoading: false,
      };
    },
    created() {
      this.getProjectInfo();
    },
    watch: {
      formData: {
        handler() {
          this.$emit('formSend', this.formData);
        },
        deep: true,
      },
    },
    methods: {
      resetFun() {
        this.selectedStat = '';
        this.handleNodeClick();
      },
      manDay(data) {
        this.$emit('onSelectedStat', data);
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
        const { timeHorizon } = this.formData;
        const submitData = {
          project_number_: this.checkedKeys,
          ...(timeHorizon.length && {
            start_date: timeHorizon[0],
            end_date: timeHorizon[1],
          }),
        };
        this.manhoursLoading = true;
        try {
          const data = await this.$dmsApi.manHours.readFieldConversion.post(submitData);
          data.forEach((row) => {
            const project = this.projectData[0].children.find(
              (p) => p.project_number_ === row.project_number_
            );
            row.projectName = project ? project.project_name_ : '';
          });
          this.manhourData = data;
          this.displayedData = [...data];
        } catch (error) {
          console.error('Error fetching manhours data:', error);
        } finally {
          this.manhoursLoading = false;
        }
      },
      dataExport() {
        this.$emit('onExportExcel')
      },
    },
  };
  </script>
  