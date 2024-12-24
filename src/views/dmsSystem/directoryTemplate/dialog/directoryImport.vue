<template>
	<el-dialog v-model="dialogFormVisible" title="目录导入" width="500">
		<el-tree ref="menu" class="menu" node-key="uuid_" :data="treeData" :props="menuProps" highlight-current
			:expand-on-click-node="false" show-checkbox :filter-node-method="menuFilterNode" @node-click="menuClick"
			@node-drop="nodeDrop" style="max-width: 600px">
			<template #default="{ node, data }">
				<span class="custom-tree-node">
					<span class="label">
						{{ node.label }}
					</span>
					<span class="do">
						<el-button icon="el-icon-plus" size="small"
							@click.stop="createMenuButton(node, data)"></el-button>
					</span>
				</span>
			</template>
		</el-tree>

		<template #footer>
			<div class="dialog-footer">
				<el-button :loading="loading" @click="dialogFormVisible = false">取消</el-button>
				<el-button :loading="loading" type="primary" @click="save">
					提交导入
				</el-button>
			</div>
		</template>

	</el-dialog>
</template>

<script>
// import { Loading } from '@element-plus/icons-vue';
// import { provide, getCurrentInstance } from 'vue';
import { inject } from "vue";

export default {
	// name: "settingMenu",
	setup() {
        const refreshData = inject("refreshData");
		return {
            refreshData // 导出供 methods 中使用
        };
		// const { proxy } = getCurrentInstance(); // 获取组件实例

		// const refreshData = () => {
		// 	proxy.getMenu(); // 调用 methods 中的 getMenu 方法
		// 	console.log("父组件数据已刷新");
		// };

		// provide("refreshData", refreshData);
	},
	props: {
		type: {
			type: String, // 根据实际数据类型调整
			required: true
		}
	},
	data() {
		return {
			menuloading: false,
			menuTreeData: [],
			treeData: [],
			menuProps: {
				label: (data) => {
					return data.title_
				}
			},
			dialogFormVisible: true,
			selectedNodes: [],
			loading: false
		}
	},
	mounted() {
		this.getMenu();
	},
	methods: {
		async save() {
			// this.selectedNodes = this.$refs.menu.getHalfCheckedNodes(true);
				this.loading = false
			const data = {
				project_uuid_: this.type,
				menus: [
					...this.$refs.menu.getCheckedKeys(),
					...this.$refs.menu.getHalfCheckedKeys()
				]
			}
			try {
				await this.$dmsApi.drawingMenuProject.createBatch.post(data)
			} finally {
				this.loading = false
                this.refreshData()
				this.dialogFormVisible = false
			}
		},
		//加载树数据
		async getMenu() {
			this.menuloading = true
			// var data = await this.$apiIAM.system.routerTree.get();
			let data = []
			data = await this.$dmsApi.drawingMenu.readAll.get();

			this.menuloading = false
			this.treeData = data;
		},
		//树点击
		menuClick(data, node) {
			// var pid = node.level == 1 ? undefined : node.parent.data.menu_id_;
			// this.$refs.save.setData(data, pid)
			// this.$refs.main.$el.scrollTop = 0
			console.log(node, data, 'pidpidpid')
		},
		//树过滤
		menuFilterNode(value, data) {
			if (!value) return true;
			var targetText = data.title;
			return targetText.indexOf(value) !== -1;
		},
		//树拖拽
		// nodeDrop(draggingNode, dropNode, dropType) {
		// 	this.$refs.save.setData({})
		// 	this.$message(`拖拽对象：${draggingNode.data.title}, 释放对象：${dropNode.data.title}, 释放对象的位置：${dropType}`)
		// },
		createMenuButton(node, data) {
			console.log(node, data, 'node, data')
		}
	}
}
</script>

<style>
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
