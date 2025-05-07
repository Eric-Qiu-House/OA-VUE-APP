<template>
  <el-form :label-width="'100px'">
    <el-form-item label="查询：" style="width: 500px;">
      <el-date-picker v-model="formData.timeHorizon" type="daterange" range-separator="To" clearable
        value-format="YYYY-MM-DD" start-placeholder="Start date" end-placeholder="End date" />
    </el-form-item>

    <el-form-item label="月度：">
      <el-button type="default" @click="setLastMonth">上一月</el-button>
      <el-button type="default" @click="setCurrentMonth">本月</el-button>
      <el-button type="default" @click="setNextMonth">下一月</el-button>
    </el-form-item>
    <el-form-item label="操作：">
      <el-button type="primary" icon="el-icon-plus" @click="dataExport">数据导出</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mergeManhourDataByProject } from '@/utils/manhourUtils';

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
    this.setCurrentMonth(); // 默认设置为本月
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
    // 获取某个月的第一天和最后一天
    getMonthRange(year, month) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      return [
        this.formatDate(firstDay),
        this.formatDate(lastDay)
      ];
    },

    // 格式化日期为 YYYY-MM-DD
    formatDate(date) {
      const y = date.getFullYear();
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const d = date.getDate().toString().padStart(2, '0');
      return `${y}-${m}-${d}`;
    },

    // 设置当前月
    setCurrentMonth() {
      const now = new Date();
      this.formData.timeHorizon = this.getMonthRange(now.getFullYear(), now.getMonth());
      this.handleNodeClick(); // 自动查询
    },

    // 设置上一个月
    setLastMonth() {
      if (!this.formData.timeHorizon.length) {
        this.setCurrentMonth();
      } else {
        const [start] = this.formData.timeHorizon.map(d => new Date(d));
        let year = start.getFullYear();
        let month = start.getMonth() - 1;
        if (month < 0) {
          year -= 1;
          month = 11;
        }
        this.formData.timeHorizon = this.getMonthRange(year, month);
      }
      this.handleNodeClick(); // 自动查询
    },

    // 设置下一个月
    setNextMonth() {
      if (!this.formData.timeHorizon.length) {
        this.setCurrentMonth();
      } else {
        const [start] = this.formData.timeHorizon.map(d => new Date(d));
        let year = start.getFullYear();
        let month = start.getMonth() + 1;
        if (month > 11) {
          year += 1;
          month = 0;
        }
        this.formData.timeHorizon = this.getMonthRange(year, month);
      }
      this.handleNodeClick(); // 自动查询
    },

    // 其他方法保持不变...
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