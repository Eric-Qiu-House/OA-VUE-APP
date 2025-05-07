<template>
  <el-dialog :title="用户管理" v-model="visible" destroy-on-close @closed="$emit('closed')">
    <el-container>
      <el-aside>
        <el-container>
          <el-main>
            <el-tree class="menu" :data="group" @node-click="groupClick" default-expand-all>
              <template #default="{ data }">
                <span class="el-tree-node__label">
                  {{ data.name_ }}
                </span>
              </template>
            </el-tree>
          </el-main>
        </el-container>
      </el-aside>
      <el-container>
        <el-main class="nopadding">
          <el-transfer v-model="value" :data="filteredUserData" :props="{ key: 'id_', label: 'fullname_' }"
            :titles="['用户组', '项目组']" /></el-main>
      </el-container>
    </el-container>
    <template #footer>
      <el-button @click="visible = false" :loading="loading">取 消</el-button>
      <el-button v-if="mode != 'show'" type="primary" :loading="loading" @click="updeteProUser()">保 存</el-button>
      <!-- <el-button v-if="mode != 'show'" type="primary" :loading="loading" @click="updeteProUser()">确 认</el-button> -->
    </template>
  </el-dialog>
</template>

<script>
export default {
  emits: ['success', 'closed'],
  data() {
    return {
      mode: "add",
      data: [],
      value: [],
      visible: false,
      group: [],
      projectId: '',
      userData: [], // 完整用户数据
      groupUser: [], // 部门用户数据
      loading: false
    };
  },
  computed: {
    // 过滤后的用户数据，保留已选中的用户
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
    async updeteProUser() {
      this.loading = true
      const data = {
        project_id_: this.projectId,
        users: this.value
      }

      if (this.value == 0) {
        this.$message.warning('请至少选择一个用户');  // 警告消息
        this.loading = false
        return
      }
      try {
        await this.$dmsApi.projectUsershiproute.update.post(data);
      } catch (error) {
        console.error('提交失败:', error);  // 记录错误详情
      } finally {
        this.$emit('success')
        this.loading = false
        this.visible = false
      }
    },
    // 树点击事件
    async groupClick(data) {
      this.asd(data.id_);
    },
    // 加载分组用户
    async asd(groupId) {
      const data = { group_id_: groupId };
      this.groupUser = await this.$apiIAM.user.usersByGroup.post(data);
    },
    // 获取所有用户
    async getUser() {
      this.userData = await this.$apiIAM.user.fromList.get();
    },
    // 打开弹窗
    open(mode = 'add') {
      this.mode = mode;
      this.visible = true;
      return this;
    },
    open1() {
      this.visible = true;
    },
    // 加载分组数据
    async getGroup() {
      this.loading = true
      try {
        const res = await this.$apiIAM.group.fromList.get();
        this.group = res;
      } catch (error) {
        console.error
      } finally {
        this.loading = false
      }

    },
    // 设置选中数据
    async setData(data, projectId) {

      this.projectId = projectId

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
    }
  },
  mounted() {
    // 加载初始数据
    this.getGroup();
    this.getUser();
  }
};
</script>
