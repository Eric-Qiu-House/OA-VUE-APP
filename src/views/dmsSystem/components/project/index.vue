<template>
  {{ $isButtonVisible }}
  <el-container>
    <el-header style="height: auto;" class="header-tabs">
      <project-header ref="proHeader" @handleSend="handleSend" @proDialog="openDialogProject"></project-header>
    </el-header>
    <el-header>
      <el-button type="primary" :disabled="!$isButtonVisible" icon="el-icon-plus" @click="openDialogProject" />
    </el-header>
    <proTable  :proData="proData" @proDialog="openDialogProject"></proTable>
  </el-container>

  <project-edit ref="projectEdit" @onProjectUpdate="onProjectUpdate" :editData="projectForm"></project-edit>
</template>

<script>
import projectEdit from './dialog/projectEdit.vue';
import projectHeader from './header';
import proTable from './table/index.vue';

export default {
  components: { projectEdit, proTable, projectHeader },

  data() {
    return {
      proData: [],
      projectForm: {}
    };
  },

  methods: {
    handleSend(data) {
      this.proData = data;
    },
    // 更新数据
    onProjectUpdate() {
      // console.log('onProjectUpdate', this.proData = []);
      this.$refs.proHeader.fetchProjects();
    },
    openDialogProject(row = {}) {
      this.projectForm = { ...row };
      this.$refs.projectEdit.open();
    },
  },
};
</script>
