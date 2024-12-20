<template>
  {{ this.$TOOL.data.get("USER_INFO") }}
  {{ userType }}
  <el-header class="header-tabs" v-if="userType == 'admin'">
    <el-tabs type="card" v-model="projectTypeValue" @tab-change="onTabChange">
      <el-tab-pane v-for="item in projectTypes" :key="item.value" :label="item.label" :name="item.value"></el-tab-pane>
    </el-tabs>
  </el-header>
  <el-container>
    <el-card>
      <div shadow="never" header="分类筛选器" v-if="userType == 'admin'">
        <sc-select-filter :data="projectState" :selected-values="selectedValues" :label-width="80"
          @on-change="onSelectChange"></sc-select-filter>
        <el-button type="primary" icon="el-icon-plus" @click="openDialogProject"></el-button>
      </div>
    </el-card>
    <el-header style="height: auto;">
      <scTable v-loading="projectLoading" ref="projectTable" :data="projectTable" row-key="uuid_"
        style="min-height: 300px;" stripe>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="项目号" prop="project_number_" width="100"></el-table-column>
        <el-table-column label="项目名称" prop="project_name_" width="150"></el-table-column>
        <el-table-column label="技术负责人" prop="project_manager_name_" width="150"></el-table-column>
        <el-table-column label="客户" prop="ship_owner_" width="150"></el-table-column>
        <el-table-column label="船厂" prop="ship_person_" width="150"></el-table-column>
        <el-table-column label="项目开始" prop="start_date_" width="120"></el-table-column>
        <el-table-column label="项目结束" prop="end_date_" width="120"></el-table-column>
        <el-table-column label="项目状态" prop="project_statu_" width="120">
          <template #default="scope">
            <router-link :to="{ name: 'dataAnalysis' }">
              <el-button text type="primary" size="small" :style="getStatusStyle(scope.row.project_statu_)">
                {{ getStatusText(scope.row.project_statu_) }}
              </el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remarks_" width="200" sortable></el-table-column>
        <el-table-column label="图纸状态" fixed="right" width="80">
          <template #default="scope">
            <el-button-group>
              <router-link :to="{ name: 'drawingInfo', query: { projectUuid: scope.row.uuid_,state: 'admin' } }" v-if="userType == 'admin'">
                <el-button text type="primary" size="small">查看</el-button>
              </router-link>
              <router-link :to="{ name: 'userDrawing', query: { projectUuid: scope.row.uuid_,state: 'user' } }" v-if="userType == 'user'">
                <el-button text type="primary" size="small">查看</el-button>
              </router-link>
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
              <el-button text type="primary" size="small" @click="openDialogProject(scope.row)">编辑</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </scTable>
    </el-header>
  </el-container>
  <project-edit ref="projectEdit" @updateProject="fetchProjects" :editData="projectForm"></project-edit>
</template>

<script>
import scSelectFilter from '@/components/scSelectFilter';
import projectEdit from './dialog/projectEdit.vue';
import { inject } from 'vue';

export default {
  components: { scSelectFilter, projectEdit },

  setup() {
    const userType = inject('userType');
    return { userType };
  },

  data() {
    return {
      projectTypeValue: 0,
      projectTypes: [
        { label: '所有', value: 0 },
        { label: '市场响应', value: 1 },
        { label: '自研项目', value: 2 },
        { label: '工程项目', value: 3 },
      ],
      projectState: [
        {
          title: '状态(单)',
          key: 'state',
          options: [
            { label: '全部', value: 0 },
            { label: '未开始', value: 1, icon: 'el-icon-flag' },
            { label: '执行中', value: 2, icon: 'el-icon-bottom-left' },
            { label: '已完成', value: 3, icon: 'el-icon-checked' },
            { label: '已关闭', value: 4, icon: 'el-icon-circle-close' },
          ],
        },
      ],
      selectedValues: { state: 0 },
      dialogVisible: false,
      projectForm: {},
      projectTable: [],
      projectLoading: false,
    };
  },

  created() {
    this.fetchProjects();
  },

  methods: {
    openDialogProject(row = {}) {
      this.projectForm = { ...row };
      this.$refs.projectEdit.open();
    },

    async fetchProjects() {
      this.projectLoading = true;
      try {
        if (this.userType == 'admin') {
          this.projectTable = await this.$dmsApi.project.readAll.get();
        }
        if (this.userType == 'user') {
          this.projectTable = await this.$dmsApi.project.readByUser.post()
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        this.projectLoading = false;
      }
    },

    async fetchFilteredProjects() {
      const filters = {};
      if (this.projectTypeValue !== 0) filters.project_type_ = this.projectTypeValue;
      if (this.selectedValues.state !== 0) filters.project_statu_ = this.selectedValues.state;

      this.projectLoading = true;
      try {
        this.projectTable = Object.keys(filters).length
          ? await this.$dmsApi.project.readById.post(filters)
          : await this.$dmsApi.project.readAll.get();
      } catch (error) {
        console.error('Error fetching filtered projects:', error);
      } finally {
        this.projectLoading = false;
      }
    },

    onTabChange() {
      this.fetchFilteredProjects();
    },

    onSelectChange(selected) {
      this.selectedValues.state = selected.state;
      this.fetchFilteredProjects();
    },

    getStatusStyle(status) {
      const styles = {
        1: '#ff8c00',
        2: '#409eff',
        3: '#67c23a',
        default: '#909399',
      };
      return { color: styles[status] || styles.default };
    },

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
