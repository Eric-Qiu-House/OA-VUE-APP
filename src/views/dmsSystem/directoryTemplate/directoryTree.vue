<template>
	<el-container>
		<el-aside width="300px" v-loading="menuloading">
			<el-container>
				<el-header v-if="status == 'projectCatalogue'">
					<el-col>
						<el-button @click="switchComponent('save1')"
							:type="displayComponent === 'save1' ? 'primary' : ''">图纸管理</el-button>
						<el-button @click="switchComponent('save')"
							:type="displayComponent === 'save' ? 'primary' : ''">目录管理</el-button>
					</el-col>
				</el-header>
				<el-card v-else header="图纸目录 -【标准模板】"></el-card>
				<el-input placeholder="输入关键字进行过滤" v-model="menuFilterText" clearable></el-input>
				<el-main class="nopadding">
					<el-tree ref="menu" class="menu" node-key="id" :data="menuTreeData" :props="menuProps" draggable
						highlight-current :expand-on-click-node="false" check-strictly show-checkbox
						:filter-node-method="menuFilterNode" @node-click="menuClick" @node-drop="nodeDrop">
						<template #default="{ node, data }">
							<span class="custom-tree-node">

								<el-text style="width: 180px;" truncated>
									{{ node.label }}

								</el-text>
								<!-- <el-text class="label" truncated>
								</el-text> -->

								<span class="do" v-if="displayComponent === 'save' || drawingCategory">
									<el-button icon="el-icon-plus" size="small"
										:disabled="!$isButtonVisible || this.$route.query.projectState == 4"
										@click.stop="createMenuButton(node, data)"></el-button>
								</span>
							</span>
						</template>
					</el-tree>
				</el-main>
				<el-footer style="height:51px;" v-if="displayComponent === 'save' || drawingCategory">
					<el-button type="primary" size="small" icon="el-icon-plus" @click="createMenuButton()"
						:disabled="!$isButtonVisible || this.$route.query.projectState == 4"></el-button>
					<el-button type="danger" size="small" plain icon="el-icon-delete" @click="delMenu"
						disabled></el-button>
					<el-button :disabled="!$isButtonVisible || this.$route.query.projectState == 4"
						v-if="status == 'projectCatalogue'" @click="importButton">导入模板</el-button>
				</el-footer>
			</el-container>
		</el-aside>
		<el-container>
			<el-main class="nopadding" style="padding:20px;" ref="main">
				<menu-params v-if="displayComponent === 'save' || status == 'typeCatalogue'" ref="save"
					:menu="menuTreeData"></menu-params>
				<dwg-form v-if="displayComponent === 'save1' && status == 'projectCatalogue'" ref="save"
					:menu="menuTreeData"></dwg-form>
				<el-crd v-if="dialogMenu">
					<import-menu :type="projectUuid"></import-menu>
				</el-crd>
				<!-- <save2 v-if="displayComponent === 'save2'" ref="save" :menu="menuTreeData" :type="displayType"></save2> -->
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
let newMenuIndex = 1;
import menuParams from '@/views/dmsSystem/directoryTemplate/directoryEdit.vue'
import dwgForm from '@/views/dmsSystem/drawingPage/drawingTable.vue'
import importMenu from '@/views/dmsSystem/directoryTemplate/dialog/directoryImport.vue'
// import save2 from '@/views/drawingSystem/drawingCategory.vue' 
import { provide, getCurrentInstance } from 'vue';
import { inject } from 'vue';


// @param {} projectCatalogue 项目目录
// @param {} typeCatalogue 类型目录


export default {
	name: "settingMenu",
	setup() {
		const { proxy } = getCurrentInstance(); // 获取组件实例

		const refreshData = () => {
			proxy.getMenu(); // 调用 methods 中的 getMenu 方法
			console.log("父组件数据已刷新");
		};

		provide("refreshData", refreshData);

		//控制menu接收的是“项目目录”，还是“类别目录”
		const status = inject('status'); // 接收父组件提供的状态
		const userType = inject('userType'); // 接收父组件提供的状态
		return { status, userType };

	},
	components: {
		menuParams,
		dwgForm,
		// save2,
		importMenu
	},
	data() {
		return {
			menuloading: false,
			displayType: '目录',
			menuTreeData: [],
			projectUuid: '',
			menuProps: {
				label: (data) => {
					return data.title_
				}
			},
			menuFilterText: "",
			dialogMenu: false,
			displayComponent: 'save1'  // 默认显示 save 组件
		}
	},
	computed: {
		drawingCategory() {
			return this.$route.name === 'drawingCategory';  // Replace with your actual route name
		},
		drawingInfo() {
			return this.$route.name === 'drawingInfo';  // Replace with your actual route name
		}
	},
	watch: {
		menuFilterText(val) {
			this.$refs.menu.filter(val);
		}
	},
	mounted() {
		this.getMenu();
	},
	methods: {
		importButton() {
			this.dialogMenu = true
		},
		//加载树数据
		async getMenu() {
			this.menuloading = true
			// var data = await this.$apiIAM.system.routerTree.get();
			let data = []
			if (this.drawingCategory) {
				data = await this.$dmsApi.drawingMenu.readAll.get();
			} else if (this.drawingInfo) {
				let createData = {
					project_uuid_: this.$route.query.projectUuid
				}
				this.projectUuid = this.$route.query.projectUuid
				data = await this.$dmsApi.drawingMenuProject.readById.post(createData);
			}
			this.menuloading = false
			this.menuTreeData = data;
		},
		//树点击
		menuClick(data, node) {
			var pid = node.level == 1 ? undefined : node.parent.data.menu_id_;
			this.$refs.save.setData(data, pid)
			this.$refs.main.$el.scrollTop = 0
			// console.log(node, 'pidpidpid')
		},
		//树过滤
		menuFilterNode(value, data) {
			if (!value) return true;
			var targetText = data.title_;
			return targetText.indexOf(value) !== -1;
		},
		//树拖拽
		nodeDrop(draggingNode, dropNode, dropType) {
			this.$refs.save.setData({})
			this.$message(`拖拽对象：${draggingNode.data.title}, 释放对象：${dropNode.data.title}, 释放对象的位置：${dropType}`)
		},
		//增加
		async createMenuButton(node, data) {
			var newMenuName = "未命名" + newMenuIndex++;
			var newMenuData = {
				parent_id_: data ? data.menu_id_ : null,
				title_: newMenuName,
			}
			this.menuloading = true
			if (this.drawingCategory) {
				await this.$dmsApi.drawingMenu.create.post(newMenuData)
			} else if (this.drawingInfo) {
				newMenuData.project_uuid_ = this.$route.query.projectUuid
				await this.$dmsApi.drawingMenuProject.create.post(newMenuData)
			}

			this.getMenu();
			this.menuloading = false
			// newMenuData.id = res.data

			// this.$refs.menu.append(newMenuData, node)
			// this.$refs.menu.setCurrentKey(newMenuData.id)
			// var pid = node ? node.data.id : ""
			// this.$refs.save.setData(newMenuData, pid)
		},
		// 切换显示的组件
		switchComponent(component) {
			this.displayComponent = component;
		},
		//删除菜单-- 功能未开发
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
