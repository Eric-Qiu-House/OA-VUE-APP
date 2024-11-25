<template>
	<el-row :gutter="40">
		<el-col v-if="!form.id">
			<el-empty description="请选择左侧菜单后操作" :image-size="100"></el-empty>
		</el-col>
		<template v-else>
			<el-col v-if="type === '目录'">
				<h2>{{ form.title || "新增目录" }}</h2>
				<el-form :model="form" :rules="rules" ref="dialogForm" label-width="80px" label-position="left">
					<el-form-item label="显示名称" prop="title">
						<el-input v-model="form.title" clearable placeholder="菜单显示名字"></el-input>
					</el-form-item>
					<el-form-item label="上级菜单" prop="parent_id">
						<el-cascader v-model="form.parent_id" :options="menuOptions" :props="menuProps"
							:show-all-levels="false" placeholder="顶级菜单" clearable disabled></el-cascader>
					</el-form-item>
					<el-form-item label="编码规则" prop="coding_rule_">
						<el-input v-model="form.coding_rule_" clearable placeholder="编码规则"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="save" :loading="loading">保 存</el-button>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col class="apilist" v-if="type === '图纸'">
				<h2>{{ form.title || "新增图纸" }}</h2>
				<el-table ref="table" :data="drawingInfo" highlight-current-row @expand-change="handleExpandChange">
					<el-table-column type="expand" label="全部">
						<template #default="props">
							<el-tree :data="props.row.fileList" :props="defaultProps" node-key="id_" show-checkbox
								highlight-current>
								<template #default="{ data }">
									<span v-if="data.children">版本：V{{ data.version }}</span>
									<span v-else style="display: flex; justify-content: space-between;">
										<div>
											<i class="el-icon-document"></i>
											{{ data.file_name_ }}
										</div>
										<div>
											<el-button type="primary" link style="">
												查看
											</el-button>
											<el-button type="primary" link>
												下载
											</el-button>
											<el-button type="danger" link>
												删除
											</el-button>
										</div>
									</span>

								</template>
							</el-tree>
						</template>
					</el-table-column>
					<el-table-column prop="drawing_number_" label="图号" width="100"></el-table-column>
					<el-table-column prop="drawing_name_" label="图名" width="180"></el-table-column>
					<el-table-column prop="executor_name_" label="执行" width="110"></el-table-column>
					<el-table-column prop="verifier_name_" label="校验" width="130"></el-table-column>
					<el-table-column prop="start_date_" label="开始时间" width="100"></el-table-column>
					<el-table-column prop="delivery_date_" label="交付时间" width="100"></el-table-column>
					<el-table-column prop="status_" label="状态" width="70">
						<template #default="scope">
							<el-link class="mx-1" :type="scope.row.status_ == 0 ? 'info'
								: scope.row.status_ == 1 ? 'success'
									: scope.row.status_ == 2 ? 'primary'
										: scope.row.status_ == 3 ? 'danger'
											: 'default'">
								{{ scope.row.status_ == 0 ? '未开始'
									: scope.row.status_ == 1 ? '执行中'
										: scope.row.status_ == 2 ? '已结束'
											: scope.row.status_ == 3 ? '已超期'
												: '未知' }}
							</el-link>
						</template>
					</el-table-column>
					<el-table-column prop="last_submission_" label="最新提交" width="100"></el-table-column>
					<el-table-column prop="current_version_" label="当前版本" width="80">
						<template #default="scope">
							{{ 'V' + scope.row.current_version_ }}
						</template>
					</el-table-column>
					<el-table-column prop="status_" label="操作" width="120">
						<template #default="scope">
							<el-button text type="primary" size="small" @click="openHours(scope.row)">填报工时</el-button>
							<el-button text type="primary" size="small" @click="openDwg(scope.row)">信息编辑</el-button>

							<!-- <el-button-group>
								<el-upload class="sc-file-select__upload" multiple :show-file-list="false"
									:file-list="fileList" :on-change="uploadChange" :before-upload="uploadBefore"
									:on-error="uploadError" :http-request="uploadRequest" style="display: inline;">
									<el-button text type="primary" size="small">上传</el-button>
								</el-upload>
								<el-button text type="primary" size="small" @click="open(props.row.name)">提交</el-button>
								<router-link :to="{
									name: 'drawingCheck'
								}">
									<el-button text type="primary" size="small">审核</el-button>
								</router-link>
								<el-button text type="primary" size="small">下载</el-button>
							</el-button-group> -->
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</template>
	</el-row>
	<el-dialog v-model="dialogDwg" title="项目详情" width="600px">
		<el-form :model="formDwg" label-width="100px">
			<el-form-item label="图号">
				<el-input v-model="formDwg.drawing_number_" disabled></el-input>
			</el-form-item>
			<el-form-item label="图名">
				<el-input v-model="formDwg.drawing_name_"></el-input>
			</el-form-item>
			<el-form-item label="执行">
				<el-select v-model="formDwg.executor_name_" placeholder="选择执行工程师" @click="handleNodeClick(formDwg.projec_id_)">
					<el-option v-for="item in projectManagers" :key="item.id_" :label="item.fullname_" :value="item.id_" />
				</el-select>
			</el-form-item>
			<el-form-item label="校验">
				<el-select v-model="formDwg.verifier_name_" placeholder="选择校验工程师" @click="handleNodeClick(formDwg.projec_id_)">
					<el-option v-for="item in projectManagers" :key="item.id_" :label="item.fullname_" :value="item.id_" />
				</el-select>
			</el-form-item>
			<el-form-item label="项目开始">
				<el-date-picker v-model="formDwg.start_date_" type="date" placeholder="选择开始日期" style="width: 100%"
					disabled></el-date-picker>
			</el-form-item>
			<el-form-item label="项目结束">
				<el-date-picker v-model="formDwg.delivery_date_" type="date" placeholder="选择结束日期" style="width: 100%"
					disabled></el-date-picker>
			</el-form-item>
		</el-form>
		<div class="dialog-footer">
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" @click="submitForm">提交</el-button>
		</div>
	</el-dialog>
	<el-dialog v-model="dialogVisible" title="工时填报" width="500" :before-close="handleClose">
		{{ manhoursFrom }}
		<el-form :model="manhoursFrom" label-width="auto" style="max-width: 600px">
			<el-form-item label="图号">
				<el-input v-model="manhoursFrom.name" />
			</el-form-item>
			<el-form-item label="图名">
				<el-input v-model="manhoursFrom.dwgName" />
			</el-form-item>
			<el-form-item label="填报人id">
				<el-input v-model="manhoursFrom.user_id_" />
			</el-form-item>
			<el-form-item label="填报人姓名">
				<el-input v-model="manhoursFrom.user_name_" />
			</el-form-item>
			<el-form-item label="记录日期">
				<el-col :span="11">
					<el-date-picker v-model="manhoursFrom.record_data_" type="date" placeholder="Pick a date"
						style="width: 100%" />
				</el-col>
			</el-form-item>
			<el-form-item label="填报工时">
				<el-col :span="11">
					<el-input v-model="manhoursFrom.hours_" placeholder="Please input" />
				</el-col>
			</el-form-item>
			<el-form-item label="审批人">
				<el-col :span="11">
					<el-input v-model="manhoursFrom.ratify_user_name_" placeholder="Please input" />
				</el-col>
			</el-form-item>
			<el-form-item label="填报说明">
				<el-input v-model="manhoursFrom.submit_message_" type="textarea" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">Create</el-button>
				<el-button>Cancel</el-button>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogVisible = false">Cancel</el-button>
				<el-button type="primary" @click="dialogVisible = false">
					Confirm
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script>
import scIconSelect from '@/components/scIconSelect'

export default {
	components: {
		scIconSelect
	},
	props: {
		menu: { type: Object, default: () => { } },
		type: {
			type: String,
			default: '图纸' // 默认显示“图纸”
		}
	},
	data() {
		return {
			dialogDwg: false,
			expands: [1],//只展开一行放入当前行id
			dialogVisible: false,
			getRowKeys: (row) => {
				// console.log(row)
				return row.eqId   //这里看这一行中需要根据哪个属性值是id
			},

			defaultProps: {
				children: 'children',
				label: 'version'
			},
			form: {
				parentId: "",
				apiList: []
			},
			projectManagers:[],
			formDwg:{
				drawing_number_:'',
				drawing_name_: '',
				executor_name_: '',
				verifier_name_: '',
				start_date_: '',
				delivery_date_: ''
			},
			menuOptions: [],
			menuProps: {
				value: 'id',
				label: 'title',
				checkStrictly: true
			},
			predefineColors: [
				'#ff4500',
				'#ff8c00',
				'#ffd700',
				'#67C23A',
				'#00ced1',
				'#409EFF',
				'#c71585'
			],
			rules: [],
			drawingInfo: [],
			loading: false,
			drawingFind: {
				projec_id_: 1,
				drawing_menu_id_: 2
			},
			fileList: [],
			manhoursFrom: {
				dwg_info_id_: '',
				dwgName: '',
				user_id_: '',
				user_name_: '',
				hours_: '',
				record_data_: '',
				submit_message_: '',
				ratify_user_id_: '',
				ratify_user_name_: ''
			}
		}
	},
	watch: {
		dialogVisible(val) {
			if (val) {
				// 弹出框显示时执行逻辑
				const userInfo = this.$TOOL.data.get("USER_INFO");
				if (userInfo) {
					this.manhoursFrom.user_id_ = userInfo.id_;
					this.manhoursFrom.user_name_ = userInfo.fullname_;
					console.log(this.manhoursFrom, '填报人信息已加载');
				} else {
					console.error("USER_INFO is undefined");
				}
			}
		},
		// 监听 drawingFind 对象的变化
		drawingFind: {
			handler() {
				this.getDrawingInfo(); // 当 drawingFind 变化时调用 getDrawingInfo 方法
			},
			deep: true // 监听对象内部的变化
		},
		menu: {
			handler() {
				this.menuOptions = this.treeToMap(this.menu)
			},
			deep: true
		}

	},
	mounted() {
		const userInfo = this.$TOOL.data.get("USER_INFO");
		if (userInfo) {
			this.manhoursFrom.user_id_ = userInfo.id_;
			this.manhoursFrom.user_name_ = userInfo.fullname_;
			// console.log(this.manhoursFrom, 'manhoursFrommanhoursFrom')
		} else {
			console.error("USER_INFO is undefined");
		}
		// this.manhoursFrom = {
		// 	user_id_: this.$TOOL.data.get("USER_INFO").id_,
		// 	user_name_: this.$TOOL.data.get("USER_INFO").fullname_,
		// }
		this.getDrawingInfo();
		this.getfileInfo()

	},

	methods: {
		async handleNodeClick(nodeData) {
		console.log(nodeData,'sssss')
		const postData = {
			project_id_: nodeData
		}
		try {
			const userIds = await this.$dmsApi.projectUsershiproute.readId.post(postData)
			if (userIds) {
				this.projectManagers = await this.$apiIAM.user.usersByUserIds.post(userIds)
			} else {
				console.log('User not found');
				return null;
			}
		} catch (error) {
			console.error("Error fetching user list:", error);
		}
	},
		openHours(row) {
			this.dialogVisible = true
			console.log(row, 'row')
			this.manhoursFrom = {
				dwgName: row.drawing_name_,
				dwg_info_id_: row.id_,
				ratify_user_id_: row.verifier_id_,
				ratify_user_name_: row.verifier_name_
			}
		},
		openDwg(row) {
			console.log(row,'lllll')
			this.formDwg = {
				projec_id_: row.projec_id_,
				drawing_number_: row.drawing_number_,
				drawing_name_: row.drawing_name_,
				executor_name_: row.executor_name_,
				verifier_name_: row.verifier_name_,
				start_date_: row.start_date_,
				delivery_date_: row.delivery_date_
			}
			this.dialogDwg = true
		},
		rowContextmenu(row, column, event) {
			this.row = row
			this.$refs.table.setCurrentRow(row);
			this.$refs.contextmenu.openMenu(event)
		},
		// exChange(row, rowList) {
		async handleExpandChange(row, expanded) {
			if (expanded) {
				if (!row.fileList) { // 检查 fileList 是否存在
					row.loading = true; // 开始加载状态
					try {
						const response = await this.$dmsApi.fileInfo.readId.post()
						// const response = await this.fetchFileList(row.id);
						row.fileList = response; // 设置文件列表
					} catch (error) {
						console.error('Error fetching file list:', error);
					} finally {
						row.loading = false; // 结束加载状态
					}
				}
			}

		},
		async getfileInfo() {
			try {
				// this.fileList = await this.$dmsApi.fileInfo.readId.post()
				return await this.$dmsApi.fileInfo.readId.post()
				// this.fileList = await this.$dmsApi.fileInfo.readId.post()
			} catch (error) {
				console.error('Error fetching details:', error);
			}
		},
		handleExpand() {
			this.getfileInfo()
			// 检查是否已经获取过详细数据
			// this.$dmsApi.fileInfo.readId.post()

			// console.log('1')
			// if (!row.id_) {
			// console.log('2')
			// 		// 假设这里调用接口获取数据
			// 		 this.getfileInfo(row.id_);
			// 		// row.details = response.data; // 将获取到的数据存储在当前行

			// }
		},
		fetchDetails(id) {
			// 示例接口调用
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve({ data: `Details for ID: ${id}` });
				}, 1000); // 模拟网络延迟
			});
		},

		// 调用图纸方法
		async getDrawingInfo() {
			this.drawingInfo = await this.$dmsApi.drawingInfo.inquireList.post(this.drawingFind);
		},
		//简单化菜单
		treeToMap(tree) {
			const map = []
			tree.forEach(item => {
				var obj = {
					id: item.id,
					parentId: item.parentId,
					title: item.title,
					children: item.children && item.children.length > 0 ? this.treeToMap(item.children) : null
				}
				map.push(obj)
			})
			return map
		},
		//保存
		async save() {
			this.loading = true
			const formData = {
				id: this.form.id,
				// parentId: this.form.parentId,
				name: this.form.name,
				path: this.form.path,
				component: this.form.component,
				title: this.form.title,
				icon: this.form.icon,
				type: this.form.type,
			}
			console.log(formData)
			var res = await this.$apiIAM.system.updetaRoute.post(formData)
			this.loading = false
			if (res.code == 200) {
				this.$message.success("保存成功")
			} else {
				this.$message.warning(res.message)
			}
		},
		//表单注入数据
		setData(data, pid) {
			this.form = data
			this.form.apiList = data.apiList || []
			this.form.parentId = pid
			this.drawingFind.drawing_menu_id_ = data.id
		}
	}
}
</script>

<style scoped>
h2 {
	font-size: 17px;
	color: #3c4a54;
	padding: 0 0 30px 0;
}

.apilist {
	border-left: 1px solid #eee;
}

[data-theme="dark"] h2 {
	color: #fff;
}

[data-theme="dark"] .apilist {
	border-color: #434343;
}
</style>
