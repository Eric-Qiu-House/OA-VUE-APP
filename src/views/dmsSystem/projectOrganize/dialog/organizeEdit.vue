<template>
  <el-dialog :title="'用户管理'" v-model="visible" destroy-on-close @closed="$emit('closed')">
    <el-text class="mx-1" type="primary">{{ prejectData.project_number_ + ' - ' + prejectData.project_name_ }}</el-text>
    <el-container>
      <el-aside>
        <el-container>
          <el-main>
            <el-tree class="menu" :data="group" @node-click="groupClick" default-expand-all>
              <template #default="{ data }">
                <span class="el-tree-node__label">{{ data.name_ }}</span>
              </template>
            </el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <el-container>
        <el-main class="nopadding">
          <el-transfer v-model="value" :data="filteredUserData" :props="{ key: 'id_', label: 'fullname_' }"
                       :titles="['用户组', '项目组']" />
        </el-main>
      </el-container>
    </el-container>
    <template #footer>
      <el-button @click="handleCancel">取 消</el-button>
      <el-button v-if="mode !== 'show'" type="primary" :loading="loading" @click="updateProUser">保 存</el-button>
    </template>
  </el-dialog>
</template>
<script>
export default {
  emits: ['success', 'closed'],
  data() {
    return {
      mode: "add",
      value: [],
      visible: false,
      group: [],
      prejectData: {},
      userData: [], // 完整用户数据
      groupUser: [], // 部门用户数据
      loading: false
    };
  },
  computed: {
    filteredUserData() {
      if (this.groupUser.length === 0) return this.userData;

      const groupUserIds = new Set(this.groupUser.map(user => user.id_));
      const selectedUsers = this.userData.filter(user => this.value.includes(user.id_));

      const combinedUsers = [
        ...this.userData.filter(user => groupUserIds.has(user.id_)),
        ...selectedUsers
      ];

      const uniqueUsers = Array.from(new Set(combinedUsers.map(user => user.id_)))
        .map(id => combinedUsers.find(user => user.id_ === id));

      return uniqueUsers;
    }
  },
  methods: {
    async updateProUser() {
      if (this.value.length === 0) {
        this.$message.warning('请至少选择一个用户');
        return;
      }

      this.loading = true;
      const data = {
        project_id_: this.prejectData.uuid_,
        users: this.value
      };

      try {
        await this.$dmsApi.projectUsershiproute.update.post(data);
        this.$message.success('更新成功');
        this.$emit('success');
      } catch (error) {
        console.error('提交失败:', error);
        this.$message.error('更新失败，请检查日志');
      } finally {
        this.loading = false;
        this.visible = false;
      }
    },

    async groupClick(data) {
      await this.loadGroupUsers(data.id_);
    },

    async loadGroupUsers(groupId) {
      const data = { group_id_: groupId };
      try {
        this.groupUser = await this.$apiIAM.user.usersByGroup.post(data);
      } catch (error) {
        console.error('加载分组用户失败:', error);
      }
    },

    async getUser() {
      try {
        this.userData = await this.$apiIAM.user.fromList.get();
      } catch (error) {
        console.error('获取所有用户失败:', error);
      }
    },

    open(mode = 'add') {
      this.mode = mode;
      this.visible = true;
      return this;
    },

    async getGroup() {
      this.loading = true;
      try {
        const res = await this.$apiIAM.group.fromList.get();
        this.group = res;
      } catch (error) {
        console.error('加载分组数据失败:', error);
      } finally {
        this.loading = false;
      }
    },

    async setData(data, prejectData) {
      this.prejectData = prejectData;

      if (!Array.isArray(data)) {
        console.error("setData 参数必须是数组");
        return;
      }

      // 等待 userData 加载完成
      if (this.userData.length === 0) {
        await this.getUser();
      }

      // 检查数据是否存在于 userData 中
      const matchedValues = data
        .filter(item => this.userData.some(user => user.id_ === item.id_))
        .map(item => item.id_);

      // 更新 value
      this.value = [...new Set([...this.value, ...matchedValues])];
      console.log("Updated value:", this.value);
    },

    handleCancel() {
      this.visible = false;
    }
  },
  mounted() {
    // 加载初始数据
    this.getGroup();
    this.getUser();
  }
};
</script>