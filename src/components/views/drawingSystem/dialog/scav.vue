<template>
	<el-dialog :title="用户管理" v-model="visible" :width="1800" destroy-on-close @closed="$emit('closed')">
		<el-main>
			<el-row :gutter="5">
				<el-col :lg="7">
					<el-tree class="menu" :data="group" @node-click="groupClick">
						<template #default="{ data }">
							<span class="el-tree-node__label">
								{{ data.name_ }}
							</span>
						</template>
					</el-tree>
				</el-col>
				<el-col :lg="14">
					<el-transfer v-model="value" :data="filteredUserData" :props="{ key: 'id_', label: 'fullname_' }" :titles="['列表1', '列表2']"/>
				</el-col>
			</el-row>
		</el-main>
		<template #footer>
			<el-button @click="visible = false">取 消</el-button>
			<el-button v-if="mode != 'show'" type="primary" :loading="isSaveing" @click="submit()">保 存</el-button>
		</template>
	</el-dialog>
</template>

<script>
// import { create } from 'sortablejs';
export default {
  emits: ['success', 'closed'],
  data() {
    return {
      mode: "add",
      data: [],
      value: [],
      visible: false,
      isSaveing: false,
      group: [],
      userData: [], // 完整用户数据
      groupUser: [] // 部门用户数据
    };
  },
  computed: {
  // 计算属性：过滤后的用户数据，确保保留已选中的用户
  filteredUserData() {
    if (this.groupUser.length === 0) return this.userData; // 如果没有分组用户，则显示所有数据

    const groupUserIds = new Set(this.groupUser.map(user => user.id_)); // 分组用户的 ID 集合
    const selectedUsers = this.userData.filter(user => this.value.includes(user.id_)); // 当前选中的用户

    // 合并：分组用户和选中用户，去重
    const combinedUsers = [
      ...this.userData.filter(user => groupUserIds.has(user.id_)), // 分组用户
      ...selectedUsers // 保留选中用户
    ];

    // 去重后返回
    const uniqueUsers = Array.from(new Set(combinedUsers.map(user => user.id_)))
      .map(id => combinedUsers.find(user => user.id_ === id));

    return uniqueUsers;
  }
  },
  methods: {
    // 树点击事件
    async groupClick(data) {
      this.asd(data.id_); // 根据组ID加载用户
    },
    // 部门查询用户
    async asd(groupId) {
      const data = { group_id_: groupId };
      this.groupUser = await this.$apiIAM.user.usersByGroup.post(data);
    },
    // 获取所有用户
    async getUser() {
      this.userData = await this.$apiIAM.user.fromList.get();
    },
    // 显示
    open(mode = 'add') {
      this.mode = mode;
      this.visible = true;
      return this;
    },
    // 加载树数据
    async getGroup() {
      this.showGrouploading = true;
      var res = await this.$apiIAM.group.fromList.get();
      this.group = res;
      this.showGrouploading = false;
    },
    // 表单注入数据
    setData(data) {
      if (!Array.isArray(data)) {
        console.error("setData 参数必须是数组");
        return;
      }
      // 遍历传入的数据，检查是否在 userData 中
      const matchedValues = data
        .filter(item => this.userData.some(user => user.id_ === item.id_))
        .map(item => item.id_); // 获取 id_
      // 更新 value，仅保留匹配到的值
      this.value = [...new Set([...this.value, ...matchedValues])]; // 去重并合并
      console.log("Updated value:", this.value);
    }
  },
  mounted() {
    this.getGroup();
    this.getUser();
  }
};
</script>