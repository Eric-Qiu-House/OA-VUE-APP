<template>
	<el-card shadow="hover" header="审批中心">
		<el-header class="header-tabs">
			<el-tabs type="card" v-model="projectTypeValue" @tab-change="handleClickType">
				<el-tab-pane v-for="(item) in projectTypes" :key="item.value" :label="item.label" :name="item.value">
				</el-tab-pane>
			</el-tabs>
		</el-header>
		<el-card>
			<scTable v-loading="loading" ref="tableData" :data="tableData" row-key="uuid_" stripe>
				<el-table-column label="审批单号" prop="uuid_" width="100" show-overflow-tooltip>
					<template #default="scope">
						<div class="clickable" @click="handleClick(scope.row)">
							{{ scope.row.uuid_ }}
						</div>
					</template>
				</el-table-column>
				<el-table-column label="审批状态" prop="ratify_type_" width="100">
					<template #default="scope">
						<el-button text type="primary" size="small" :style="{
							color: scope.row.ratify_type_ === 0 ? '#ff8c00' :
								scope.row.ratify_type_ === 1 ? '#409eff' : '#909399'  // 默认颜色：已关闭
						}">
							{{ scope.row.ratify_type_ === 0 ? '未审批' :
								scope.row.ratify_type_ === 1 ? '已审批' : '未通过' }}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column label="申请人" prop="user_name_" width="100"></el-table-column>
				<el-table-column label="审批人" prop="verifier_name_" width="100"></el-table-column>
				<el-table-column label="工时日期" prop="record_date_" width="100"></el-table-column>
				<el-table-column label="工时" prop="hours_" width="100"></el-table-column>
			</scTable>
		</el-card>
	</el-card>
	<dialog2 ref="manhoursDialog" :menu="dialogData" :state="state"></dialog2>
</template>
<script>
import dialog2 from '@/views/dmsSystem/manhourHome/dialog/manhourForm.vue'
export default {
	components: {
		dialog2
	},
	data() {
		return {
			dialogData: [],
			state:'审核',
			tableData: [],
			projectTypeValue: 0, // 默认选中的tab
			projectTypes: [
				{ label: '待处理', value: 0 },
				{ label: '已发起', value: 1 },
				{ label: '我收到的', value: 2 },
			],
			userInfo: {},
			submitData: {},
			loading: false
		}
	},
	mounted() {
		this.userInfo = this.$TOOL.data.get("USER_INFO");
		this.submitData = {
			verifier_id_: this.userInfo.id_,
			ratify_type_: 0
		};
		setTimeout(() => {
			this.getManhours();
		}, 0);
	},
	methods: {
		openHoursDialog(row) {
			this.dialogData = row
			this.$refs.manhoursDialog.setData(row)
			this.$refs.manhoursDialog.open()
		},
		// godoc() {
		// 	window.open("https://python-abc.xyz/scui-doc/")
		// },
		handleClickType(value) {
			if (value == 0) {
				this.submitData = {
					verifier_id_: this.userInfo.id_,
					ratify_type_: 0
				}
			} else if (value == 1) {
				this.submitData = {
					user_id_: this.userInfo.id_,
				}
			} else if (value == 2) {
				this.submitData = {
					user_id_: this.userInfo.id_,
				}
			}
			this.getManhours()
		},
		handleClick(row) {
			this.dialogData = row
			this.$refs.manhoursDialog.setData(row)
			this.$refs.manhoursDialog.open()
			// 可以根据业务需求执行更多操作
		},
		async getManhours() {
			this.loading = true
			try {
				this.tableData = await this.$dmsApi.manHours.readById.post(this.submitData)
			} catch (error) {
				console.log(error, 'error')
			} finally {
				this.loading = false
			}
		}
	}
}
</script>

<style scoped>
.clickable {
	white-space: nowrap;
	/* 不换行 */
	overflow: hidden;
	/* 超出隐藏 */
	text-overflow: ellipsis;
	/* 超出显示省略号 */
	cursor: pointer;
	/* 鼠标变成手指形状 */
	color: #409eff;
	/* 可选：给内容添加链接样式 */
}

.clickable:hover {
	text-decoration: underline;
	/* 可选：鼠标悬浮下划线 */
}
</style>
