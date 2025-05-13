<template>
	<el-container>
		<el-aside width="200px" v-loading="showGrouploading">
			<el-container>
				<el-header>
					<el-input placeholder="输入关键字进行过滤" v-model="groupFilterText" clearable></el-input>
				</el-header>
				<el-main class="nopadding">
					<!-- <el-tree ref="group" class="menu" node-key="id_" :data="group" :current-node-key="''"
						:highlight-current="true" :expand-on-click-node="false" :filter-node-method="groupFilterNode"
						@node-click="groupClick"></el-tree> -->
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
			<el-header>
				<div class="left-panel">
					<el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
					<!-- <el-button type="danger" plain icon="el-icon-delete" :disabled="selection.length == 0"
						@click="batch_del"></el-button> -->
					<!-- <el-button type="primary" plain :disabled="selection.length == 0">分配角色</el-button> -->
					<!-- <el-button type="primary" plain :disabled="selection.length == 0"
						@click="passwordReset()">密码重置</el-button> -->
				</div>
				<div class="right-panel">
					<div class="right-panel-search">
						<el-input v-model="search.name" placeholder="登录账号 / 姓名" clearable></el-input>
						<el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
					</div>
				</div>
			</el-header>
			<el-main class="nopadding">
				<scTable ref="table" :data="formData" @selection-change="selectionChange" stripe remoteSort
					remoteFilter>
					<el-table-column type="selection" width="50"></el-table-column>
					<!-- <el-table-column label="ID" prop="id_" width="80" sortable='custom'></el-table-column> -->
					<!-- <el-table-column label="头像" width="80" column-key="filterAvatar"
						:filters="[{ text: '已上传', value: '1' }, { text: '未上传', value: '0' }]">
						<template #default="scope">
							<el-avatar :src="scope.row.avatar_" size="small"></el-avatar>
						</template>
					</el-table-column>  -->
					<el-table-column label="头像" width="100" column-key="filterAvatar"
						:filters="[{ text: '已上传', value: '1' }, { text: '未上传', value: '0' }]">
						<template #default="scope">
							<el-avatar :src="scope.row.avatar_ ? scope.row.avatar_ : ''"
								:style="{ backgroundColor: scope.row.avatar_ ? '' : '#409EFF', color: '#fff' }">
								<template #default>
									<!-- 如果 avatar_ 为空，显示 fullname_ 的后两位字符 -->
									<span v-if="!scope.row.avatar_" style="writing-mode: horizontal-tb;">
										{{ scope.row.fullname_.slice(-2) }}
									</span>
								</template>
							</el-avatar>
						</template>
					</el-table-column>


					<el-table-column label="登录账号" prop="account_" width="150" sortable='custom'
						column-key="filterUserName"
						:filters="[{ text: '系统账号', value: '1' }, { text: '普通账号', value: '0' }]"></el-table-column>
					<el-table-column label="姓名" prop="fullname_" width="150" sortable='custom'></el-table-column>
					<el-table-column label="邮箱" prop="email_" width="150" sortable='custom'></el-table-column>
					<el-table-column label="手机号码" prop="mobile_" width="150" sortable='custom'></el-table-column>
					<el-table-column label="用户类型" prop="user_type_" width="150" sortable='custom'></el-table-column>
					<el-table-column label="状态" prop="status_" width="150" sortable="custom">
						<template #default="{ row }">
							<el-tag :type="row.status_ === 1 ? 'success' : row.status_ === 0 ? 'danger' : 'warning'">
								{{ row.status_ === 1 ? "正常" : row.status_ === 0 ? "停用" : "其他" }}
							</el-tag>
						</template>
					</el-table-column>

					<el-table-column label="操作" fixed="right" align="right" width="160">
						<template #default="scope">
							<el-button-group>
								<el-button text type="primary" size="small"
									@click="table_show(scope.row, scope.$index)">查看</el-button>
								<el-button text type="primary" size="small"
									@click="table_edit(scope.row, scope.$index)">编辑</el-button>
								<el-button text type="primary" size="small"
									@click="passwordReset(scope.row, scope.$index)">重置</el-button>
								<el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)">
									<template #reference>
										<el-button text type="primary" size="small">删除</el-button>
									</template>
								</el-popconfirm>
							</el-button-group>
						</template>
					</el-table-column>

				</scTable>
			</el-main>
		</el-container>
	</el-container>




	<save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSuccess"
		@closed="dialog.save = false"></save-dialog>

	<save-password ref="savePassword" @success="handleSuccess">

	</save-password>

</template>

<script>
import saveDialog from './save'
import savePassword from './savePassword.vue'

export default {
	name: 'user',
	components: {
		saveDialog,
		savePassword
	},
	data() {
		return {
			dialog: {
				save: false
			},
			showGrouploading: false,
			groupFilterText: '',
			group: [],
			apiObj: [],
			selection: [],
			search: {
				name: null
			},
			formData: [],
			userData: []
		}
	},
	// async created() { 
	// 	try {
	// 		const list = await this.$apiIAM.user.fromList.get()
	// 		this.formData = list; // 更新组件的数据
	// 	} catch (error) {
	// 		console.error("Error fetching user list:", error);
	// 	}
	// },
	watch: {
		groupFilterText(val) {
			const result = [];

			// 内部递归函数，遍历数组中的对象
			function search(obj) {
				if (Array.isArray(obj)) {
					// 如果是数组，遍历每一项
					obj.forEach((item) => {
						if (typeof item === "object" && item !== null) {
							// 检查对象的字段是否包含目标值
							const isMatched = Object.values(item).some((value) =>
								String(value).includes(val)
							);
							if (isMatched) {
								result.push(item); // 如果匹配，存入结果数组（完整对象）
							}
						}
					});
				}
			}

			// 开始递归搜索
			search(this.userData);

			// 更新过滤后的结果
			this.formData = result;
		},
	},
	mounted() {
		this.getGroup()
	},
	methods: {
		passwordReset(row) {
			this.$refs.savePassword.dialogVisible = true;
			this.$nextTick(() => {
				this.$refs.savePassword.setData(row)
			})
		},
		//添加
		add() {
			this.dialog.save = true
			this.$nextTick(() => {
				this.$refs.saveDialog.open()
			})
		},
		//编辑
		table_edit(row) {
			this.dialog.save = true
			this.$nextTick(() => {
				this.$refs.saveDialog.open('edit').setData(row)
			})
		},
		//查看
		table_show(row) {
			this.dialog.save = true
			this.$nextTick(() => {
				this.$refs.saveDialog.open('show').setData(row)
			})
		},
		//删除
		async table_del(row, index) {
			var reqData = { id_: row.id_ }
			var res = await this.$apiIAM.user.delete.post(reqData);
			if (res.code == 200) {
				//这里选择刷新整个表格 OR 插入/编辑现有表格数据
				this.$refs.table.tableData.splice(index, 1);
				this.$message.success("删除成功")
			} else {
				this.$alert(res.message, "提示", { type: 'error' })
			}
		},
		//批量删除
		async batch_del() {
			this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？`, '提示', {
				type: 'warning'
			}).then(() => {
				const loading = this.$loading();
				this.selection.forEach(item => {
					this.$refs.table.tableData.forEach((itemI, indexI) => {
						if (item.id === itemI.id) {
							this.$refs.table.tableData.splice(indexI, 1)
						}
					})
				})
				loading.close();
				this.$message.success("操作成功")
			}).catch(() => {

			})
		},
		//表格选择后回调事件
		selectionChange(selection) {
			this.selection = selection;
		},
		//加载树数据
		async getGroup() {
			this.showGrouploading = true;
			var res = await this.$apiIAM.group.fromList.get();
			this.group = res;
			this.showGrouploading = false;
			// var allNode = { id: '', label: '所有' }
			// res.data.unshift(allNode);
		},
		//树过滤
		groupFilterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		//树点击事件
		groupClick(data) {
			// var params = {
			// 	groupId: data.id
			// }
			// this.$refs.table.reload(params)
			this.asd(data.id_)
		},
		// 部门查询用户
		async asd(i) {
			const data = { group_id_: i }
			this.userData = await this.$apiIAM.user.usersByGroup.post(data);
			if (this.groupFilterText.length == 0) {
				this.formData = this.userData
			}
		},
		//搜索
		upsearch() {
			this.$refs.table.upData(this.search)
		},
		//本地更新数据
		handleSuccess(data, mode) {
			if (mode == 'add') {
				data.id = new Date().getTime()
				// this.$refs.table.tableData.unshift(data)
			} else if (mode == 'edit') {
				this.$refs.table.tableData.filter(item => item.id === data.id).forEach(item => {
					Object.assign(item, data)
				})
			}
		}
	}
}
</script>

<style></style>
