<template>
	<el-header class="header-tabs">
		<el-tabs type="card" v-model="groupId" @tab-change="tabChange">
			<el-tab-pane label="主体（内部）" name="0"></el-tab-pane>
			<el-tab-pane label="船厂（外部）" name="1" disabled></el-tab-pane>
			<el-tab-pane label="外派（外部）" name="4" disabled></el-tab-pane>
		</el-tabs>
	</el-header>
	<menu-directory></menu-directory>
</template>

<script>
let newMenuIndex = 1;
// import save from '@/views/dmsSystem/drawingPage/drawingTable.vue'
import menuDirectory from '@/views/dmsSystem/directoryTemplate/directoryTree.vue'
import { provide } from 'vue';

export default {
	name: "settingMenu",
	components: {
		// save,
		menuDirectory
	},
	props: {
		projectUuid: {
			type: String,
			required: true, // 必填校验
		},
	},
	setup() {
		const dynamicStatus = 'projectCatalogue'; // 这里可以是动态的状态
		provide('status', dynamicStatus); // 提供状态
	},
	data() {
		return {
			groupId: 0,
			menuloading: false,

			menuList: [],
			menuProps: {
				label: (data) => {
					return data.title
				}
			},
			menuFilterText: "",
			displayType: '图纸'
		}
	},
	watch: {
		menuFilterText(val) {
			this.$refs.menu.filter(val);
		}
	},
	mounted() {
	},
	methods: {
		//加载树数据
		async getMenu() {
			this.menuloading = true
			const data = {
				project_id_: 1
			}
			var dataA = await this.$dmsApi.drawingMenuProject.readId.post(data);
			this.menuloading = false
			this.menuList = dataA;
		},
		//树点击
		menuClick(data, node) {
			var pid = node.level == 1 ? undefined : node.parent.data.id;
			this.$refs.save.setData(data, pid)
			this.$refs.main.$el.scrollTop = 0
			console.log(data, node)
		},
		//树过滤
		menuFilterNode(value, data) {
			if (!value) return true;
			var targetText = data.title;
			return targetText.indexOf(value) !== -1;
		},
		//树拖拽
		nodeDrop(draggingNode, dropNode, dropType) {
			this.$refs.save.setData({})
			this.$message(`拖拽对象：${draggingNode.data.title}, 释放对象：${dropNode.data.title}, 释放对象的位置：${dropType}`)
		},
		//增加
		async add(node, data) {
			var newMenuName = "未命名" + newMenuIndex++;
			var newMenuData = {
				parent_id: data ? data.id : null,
				name: newMenuName,
				path: "",
				component: "",
				title: newMenuName,
				type: "menu"
			}
			this.menuloading = true
			await this.$apiIAM.system.addRouter.post(newMenuData)
			this.getMenu();

			this.menuloading = false
		},
		//删除菜单
		async delMenu() {
			var CheckedNodes = this.$refs.menu.getCheckedNodes()
			if (CheckedNodes.length == 0) {
				this.$message.warning("请选择需要删除的项")
				return false;
			}

			var confirm = await this.$confirm('确认删除已选择的菜单吗？', '提示', {
				type: 'warning',
				confirmButtonText: '删除',
				confirmButtonClass: 'el-button--danger'
			}).catch(() => { })
			if (confirm != 'confirm') {
				return false
			}

			this.menuloading = true
			var reqData = {
				ids: CheckedNodes.map(item => item.id)
			}
			var res = await this.$API.demo.post.post(reqData)
			this.menuloading = false

			if (res.code == 200) {
				CheckedNodes.forEach(item => {
					var node = this.$refs.menu.getNode(item)
					if (node.isCurrent) {
						this.$refs.save.setData({})
					}
					this.$refs.menu.remove(item)
				})
			} else {
				this.$message.warning(res.message)
			}
		}
	}
}
</script>

<style scoped>
.menu:deep(.el-tree-node__label) {
	display: flex;
	flex: 1;
	height: 100%;
}

.custom-tree-node {
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	height: 100%;
	padding-right: 24px;
}

.custom-tree-node .label {
	display: flex;
	align-items: center;
	;
	height: 100%;
}

.custom-tree-node .label .el-tag {
	margin-left: 5px;
}

.custom-tree-node .do {
	display: none;
}

.custom-tree-node .do i {
	margin-left: 5px;
	color: #999;
}

.custom-tree-node .do i:hover {
	color: #333;
}

.custom-tree-node:hover .do {
	display: inline-block;
}
</style>
