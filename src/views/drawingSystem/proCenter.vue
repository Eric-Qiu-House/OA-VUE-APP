<template>
  <!-- tab切换标签 -->
  <el-header class="header-tabs">
    <el-tabs type="card" v-model="projectTypeValue" @tab-change="tabChange">
      <el-tab-pane v-for="(item) in projectTypes" :key="item.value" :label="item.label" :name="item.value">
      </el-tab-pane>
    </el-tabs>
  </el-header>

  <el-container>
    <el-card>
      <div shadow="never" header="分类筛选器">
        <sc-select-filter :data="projectState" :selected-values="selectedValues" :label-width="80"
          @on-change="selectChange">
        </sc-select-filter>
        <!-- 添加项目按钮 -->
        <el-button type="primary" icon="el-icon-plus" disabled></el-button>
      </div>
    </el-card>

    <el-header style="height: auto;">
      <scTable ref="projectTable" :data="projectTable" row-key="uuid_" stripe>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="项目号" prop="project_number_" width="100"></el-table-column>
        <el-table-column label="项目名称" prop="project_name_" width="150"></el-table-column>
        <el-table-column label="项目经理" prop="project_manager_name_" width="150">
        </el-table-column>
        <el-table-column label="客户" prop="ship_owner_" width="150"></el-table-column>
        <el-table-column label="船厂" prop="ship_person_" width="150"></el-table-column>
        <el-table-column label="项目开始" prop="start_date_" width="120"></el-table-column>
        <el-table-column label="项目结束" prop="end_date_" width="120"></el-table-column>
        <el-table-column label="项目状态" prop="project_statu_" width="120" sortable>
          <template #default="scope">
            <router-link :to="{
              name: 'dataAnalysis',
            }">
              <el-button text type="primary" size="small" :style="{
                color: scope.row.project_statu_ === 1 ? '#ff8c00' :
                  scope.row.project_statu_ === 2 ? '#409eff' :
                    scope.row.project_statu_ === 3 ? '#67c23a' :
                      '#909399'  // 默认颜色：已关闭
              }">
                {{ scope.row.project_statu_ === 1 ? '未开始' :
                  scope.row.project_statu_ === 2 ? '执行中' :
                    scope.row.project_statu_ === 3 ? '已完成' :
                      '已关闭' }}
              </el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remarks_" width="200" sortable></el-table-column>
        <el-table-column label="图纸状态" fixed="right" width="80">
          <template #default="scope">
            <el-button-group>
              <router-link :to="{
                name: 'drawingInfo',
                query: { projectUuid: scope.row.uuid_ }
              }">
                <el-button text type="primary" size="small">查看</el-button>
              </router-link>
            </el-button-group>
          </template>
        </el-table-column>
        <el-table-column label="送审状态" fixed="right" width="80">
          <template #default>
            <el-button-group>
              <router-link :to="{
                name: 'submissionPlan',
              }">
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

  <el-dialog v-model="dialogVisible" title="项目详情" width="600px">
    <el-form :model="projectForm" label-width="100px">
      <el-form-item label="项目号">
        <el-input v-model="projectForm.project_number_" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select v-model="projectForm.project_type_" placeholder="选择项目状态">
          <el-option v-for="item in projectTypes.filter(option => option.value !== 0)" :key="item.value"
            :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目状态">
        <el-select v-model="projectForm.project_statu_" placeholder="选择项目状态">
          <el-option v-for="item in projectState[0].options.filter(option => option.value !== 0)" :key="item.value"
            :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="projectForm.project_name_"></el-input>
      </el-form-item>
      <el-form-item label="项目经理">
        <el-select v-model="projectForm.project_manager_name_" placeholder="选择项目经理"
          @click="handleNodeClick(projectForm.uuid_)" @change="handleManagerChange">
          <el-option v-for="item in projectUserInfos" :key="item.id_" :label="item.fullname_" :value="item.fullname_" />
        </el-select>
      </el-form-item>
      <el-form-item label="客户">
        <el-input v-model="projectForm.ship_owner_"></el-input>
      </el-form-item>
      <el-form-item label="船厂">
        <el-input v-model="projectForm.ship_person_"></el-input>
      </el-form-item>
      <el-form-item label="项目开始">
        <el-date-picker v-model="projectForm.start_date_" type="date" placeholder="选择开始日期"
          style="width: 100%"></el-date-picker>
      </el-form-item>
      <el-form-item label="项目结束">
        <el-date-picker v-model="projectForm.end_date_" type="date" placeholder="选择结束日期"
          style="width: 100%"></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submitFormProject">提交</el-button>
    </div>
  </el-dialog>

</template>

<script>
import scSelectFilter from '@/components/scSelectFilter'

export default {
  name: 'listTab',
  components: {
    scSelectFilter
  },
  data() {
    return {
      projectTypeValue: 0, // 默认选中的tab
      projectTypes: [
        { label: '所有', value: 0 },
        { label: '市场响应', value: 1 },
        { label: '自研项目', value: 2 },
      ],
      projectState: [
        {
          title: "状态(单)",
          key: "state",
          options: [
            {
              label: "全部",
              value: 0
            },
            {
              label: "未开始",
              value: 1,
              icon: "el-icon-flag"
            },
            {
              label: "执行中",
              value: 2,
              icon: "el-icon-bottom-left"
            },
            {
              label: "已完成",
              value: 3,
              icon: "el-icon-checked"
            },
            {
              label: "已关闭",
              value: 4,
              icon: "el-icon-circle-close"
            }
          ]
        }
      ],
      selectedValues: {
        state: 0,
        // type: [""]
      },
      dialogVisible: false,
      projectForm: {},
      projectTable: [],
      projectUserInfos: []
    }
  },
  created() {
    this.getProjectInfo()
  },
  methods: {
    async handleNodeClick(projectUuid) {
      const submitData = {
        project_id_: projectUuid
      }
      try {
        const projectUserIds = await this.$dmsApi.projectUsershiproute.readId.post(submitData)
        if (projectUserIds) {
          this.projectUserInfos = await this.$apiIAM.user.usersByUserIds.post(projectUserIds)
        } else {
          console.log('User not found');
          return null;
        }
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    },
    handleManagerChange(value) {
      // 通过 fullname_ 查找完整的项目经理对象
      const selectedManager = this.projectUserInfos.find(item => item.fullname_ === value);
      if (selectedManager) {
        this.projectForm.project_manager_user_id_ = selectedManager.id_;  // 将 id_ 存储到 project_form 中
      } else {
        console.log('未找到对应的项目经理');
      }
    },
    openDialogProject(row) {
      this.projectForm = row
      this.dialogVisible = true
    },
    userInfo(id) {
      const postData = {
        id_: id
      }
      return this.$apiIAM.user.userIdReadUserInfo.post(postData)
    },
    async submitFormProject() {
      console.log('提交表单数据:', this.projectForm);
      try {
        await this.$dmsApi.project.update.post(this.projectForm)

      } catch (error) {
        console.error("Error fetching user list:", error);
      }
      this.dialogVisible = false; // 提交后关闭弹框
    },
    // async userInfo(id) {
    //   try {
    //     const postData = {
    //       id_: id
    //     }
    //     const user = await this.$apiIAM.user.userIdReadUserInfo.post(postData)
    //     return'1111' + user
    //   }catch (error) {
    //     console.error("Error fetching user list:", error);
    //   }
    // },
    async getProjectInfo() {
      try {
        this.projectTable = await this.$dmsApi.project.readAll.get()
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    },
    async postReadByIdProject() {
      const submitData = {
        project_type_: this.projectTypeValue,
        project_statu_: this.selectedValues.state || 0
      }
      try {
        if (submitData.project_type_ > 0 && submitData.project_statu_ > 0) {
          this.projectTable = await this.$dmsApi.project.readById.post(submitData)
        }
      } catch (error) {
        console.error("Error fetching user list:", error);
      }

    },
    // 标签切换
    tabChange() {
      this.postReadByIdProject()
    },
    //状态切换
    selectChange(selected) {
      this.selectedValues.state = selected.state
      this.postReadByIdProject()
    },
  }
}
</script>

<style></style>
