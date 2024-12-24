<template>
	<el-main>
		<el-card shadow="never" header="分步表单">
			<el-steps :active="active" align-center style="margin-bottom: 20px;">
				<el-step title="基础设计"></el-step>
				<el-step title="表单设置"></el-step>
				<el-step title="流程设计"></el-step>
			</el-steps>
			<el-row>
				<el-col style="display: flex; justify-content: center;">
					<el-form v-if="active==0" ref="stepForm_0" :model="form" :rules="rules" label-position="top">
						<el-form-item label="表单名称" prop="paymentAccount">
							<el-select v-model="form.paymentAccount" clearable>
								<el-option label="sakuya@scui.com" value="sakuya@scui.com"></el-option>
								<el-option label="lolicode@scui.com" value="lolicode@scui.com"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所在分组" prop="collectionAccount">
							<el-input v-model="form.collectionAccount" clearable></el-input>
						</el-form-item>
						<el-form-item label="表单说明" prop="collectionName">
							<el-input v-model="form.collectionName" clearable></el-input>
						</el-form-item>
						<el-form-item label="谁可以发起" prop="amount">
							<el-input v-model="form.amount"></el-input>
						</el-form-item>
					</el-form>
					<el-form v-if="active==1" ref="stepForm_1" :model="form" :rules="rules" label-position="top">
						<!-- <el-alert title="确认转账后，资金将直接打入对方账户，无法退回。" type="warning" show-icon style="margin-bottom: 15px;"/> -->
						<!-- <el-descriptions :column="1" border>
							<el-descriptions-item label="付款账户">{{form.paymentAccount}}</el-descriptions-item>
							<el-descriptions-item label="收款账户">{{form.collectionAccount}}</el-descriptions-item>
							<el-descriptions-item label="收款人姓名">{{form.collectionName}}</el-descriptions-item>
							<el-descriptions-item label="转账金额">{{form.amount}} 元</el-descriptions-item>
						</el-descriptions> -->
						<!-- <el-divider></el-divider> -->
						<el-form-item label="表单设计" prop="payPassword">
							<el-input v-model="form.payPassword" show-password placeholder="请输入"></el-input>
						</el-form-item>
					</el-form>
					<div v-if="active==2">
                            <sc-workflow v-model="data.nodeConfig"></sc-workflow>

						<el-result icon="success" title="操作成功" sub-title="">
							<template #extra>
								<el-button type="primary" @click="again">确认提交</el-button>
								<el-button>查看</el-button>
							</template>
						</el-result>
					</div>
				</el-col>
                    <div style="display: flex;justify-content: center;width: 100%;">
                        
					<el-button v-if="active>0 && active<2" @click="pre" :disabled="submitLoading">上一步</el-button>
					<el-button v-if="active<1" type="primary" @click="next">下一步</el-button>
					<el-button v-if="active==1" type="primary" @click="submit" :loading="submitLoading">提交</el-button>
                    </div>
			</el-row>
		</el-card>
	</el-main>
</template>

<script>
	import scWorkflow from '@/components/scWorkflow'

	export default {
		name: 'stepform',
        components: {
			scWorkflow
		},
		data() {
			return {
                data: {
					"id": 1,
					"name": "请假审批",
					"nodeConfig": {
						"nodeName": "发起人",
						"type": 0,
						"nodeRoleList": [],
						"childNode": {
							"nodeName": "条件路由",
							"type": 4,
							"conditionNodes": [{
									"nodeName": "长期",
									"type": 3,
									"priorityLevel": 1,
									"conditionMode": 1,
									"conditionList": [{
										"label": "请假天数",
										"field": "day",
										"operator": ">",
										"value": "7"
									}],
									"childNode": {
										"nodeName": "领导审批",
										"type": 1,
										"setType": 1,
										"nodeUserList": [{
											"id": "360000197302144442",
											"name": "何敏"
										}],
										"nodeRoleList": [],
										"examineLevel": 1,
										"directorLevel": 1,
										"selectMode": 1,
										"termAuto": false,
										"term": 0,
										"termMode": 1,
										"examineMode": 1,
										"directorMode": 0
									}
								},
								{
									"nodeName": "短期",
									"type": 3,
									"priorityLevel": 2,
									"conditionMode": 1,
									"conditionList": [],
									"childNode": {
										"nodeName": "直接主管审批",
										"type": 1,
										"setType": 2,
										"nodeUserList": [],
										"nodeRoleList": [],
										"examineLevel": 1,
										"directorLevel": 1,
										"selectMode": 1,
										"termAuto": false,
										"term": 0,
										"termMode": 1,
										"examineMode": 1,
										"directorMode": 0
									}
								}
							],
							"childNode": {
								"nodeName": "抄送人",
								"type": 2,
								"userSelectFlag": true,
								"nodeUserList": [{
									"id": "220000200908305857",
									"name": "何秀英"
								}]
							}
						}
					}
				},
				active: 0,
				submitLoading: false,
				form: {
					paymentAccount: '请假申请',
					collectionAccount: '行政组',
					collectionName: '企业通用请假申请',
					amount: '全部',
					payPassword: ''
				},
				rules: {
					paymentAccount: [
						{
							required: true,
							message: '请输入...',
						}
					],
					collectionAccount: [
						{
							required: true,
							message: '请输入',
						}
					],
					collectionName: [
						{
							required: true,
							message: '请输入',
						}
					],
					amount: [
						{
							required: true,
							message: '请输入',
						}
					],
					payPassword: [
						{
							required: true,
							message: '请输入',
						}
					]
				}
			}
		},
		mounted() {

		},
		methods: {
            exportJson() {
				this.$message("返回值请查看F12控制台console.log()")
				console.log(this.data)
			},
			//下一步
			next(){
				const formName = `stepForm_${this.active}`
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.active += 1
					}else{
						return false
					}
				})
			},
			//上一步
			pre(){
				this.active -= 1
			},
			//提交
			submit(){
				const formName = `stepForm_${this.active}`
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.submitLoading = true
						setTimeout(()=>{
							this.submitLoading = false
							this.active += 1
						},1000)
					}else{
						return false
					}
				})
			},
			//再来一次
			again(){
				this.active = 0
			}
		}
	}
</script>

<style scoped>
	.el-steps:deep(.is-finish) .el-step__line {background: var(--el-color-primary);}
</style>
