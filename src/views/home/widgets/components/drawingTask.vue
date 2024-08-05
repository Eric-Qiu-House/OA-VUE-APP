<template>
	<el-card shadow="hover" header="欢迎">
		<div class="welcome">
			<div class="logo">
				<img src="img/logo.png">
				<h2>欢迎进入UPRO OA系统</h2>
			</div>
			<!-- <div class="tips">
				<div class="tips-item">
					<div class="tips-item-icon"><el-icon><el-icon-menu/></el-icon></div>
					<div class="tips-item-message">这里是项目控制台，你可以点击右上方的“自定义”按钮来添加移除或者移动部件。</div>
				</div>
				<div class="tips-item">
					<div class="tips-item-icon"><el-icon><el-icon-promotion/></el-icon></div>
					<div class="tips-item-message">在提高前端算力、减少带宽请求和代码执行力上多次优化，并且持续着。</div>
				</div>
				<div class="tips-item">
					<div class="tips-item-icon"><el-icon><el-icon-milk-tea/></el-icon></div>
					<div class="tips-item-message">项目目的：让前端工作更快乐</div>
				</div>
			</div>
			<div class="actions">
				<el-button type="primary" icon="el-icon-check" size="large" @click="godoc">文档</el-button>
			</div> -->
		</div>
	</el-card>
	<el-card header="图纸任务">
		<el-header class="header-tabs">
			<el-tabs type="card" v-model="groupId" @tab-change="tabChange">
				<el-tab-pane label="所有" name="0"></el-tab-pane>
				<el-tab-pane label="未完成" name="1"></el-tab-pane>
				<el-tab-pane label="已完成" name="4"></el-tab-pane>
				<el-tab-pane label="已关闭" name="3"></el-tab-pane>
				<el-tab-pane label="待审核" name="5"></el-tab-pane>
			</el-tabs>
		</el-header>
		<el-card shadow="never">
			<el-table ref="table" :data="tableData" highlight-current-row @row-contextmenu="rowContextmenu">
				<el-table-column type="expand">
					<template #default="props">
						<div class="file-list">
							<!-- 静态文件列表 -->
							<el-link style="text-align: center; line-height: 50px;margin: 0 auto;display: block;"
								type="success">{{ props.row.id + ' - ' + props.row.state5 }}</el-link>

							<div class="file-card">
								<img src="https://via.placeholder.com/24x24?text=PDF" alt="file-icon"
									class="file-icon" />
								<div class="file-info">
									<div class="file-name">Document.pdf</div>
									<div class="file-type">pdf</div>
								</div>
								<div class="file-actions">
									<el-link type="primary">查看</el-link>
									<el-link type="primary">下载</el-link>
									<el-link type="danger">删除</el-link>
								</div>
							</div>

							<div class="file-card">
								<img src="https://via.placeholder.com/24x24?text=CAD" alt="file-icon"
									class="file-icon" />
								<div class="file-info">
									<div class="file-name">Drawing.dwg</div>
									<div class="file-type">cad</div>
								</div>
								<div class="file-actions">
									<el-link type="primary">查看</el-link>
									<el-link type="primary">下载</el-link>
									<el-link type="danger">删除</el-link>
								</div>
							</div>

							<div class="file-card">
								<img src="https://via.placeholder.com/24x24?text=Word" alt="file-icon"
									class="file-icon" />
								<div class="file-info">
									<div class="file-name">Report.docx</div>
									<div class="file-type">word</div>
								</div>
								<div class="file-actions">
									<el-link type="primary">查看</el-link>
									<el-link type="primary">下载</el-link>
									<el-link type="danger">删除</el-link>
								</div>
							</div>

							<div class="file-card">
								<img src="https://via.placeholder.com/24x24?text=Excel" alt="file-icon"
									class="file-icon" />
								<div class="file-info">
									<div class="file-name">Spreadsheet.xlsx</div>
									<div class="file-type">excel</div>
								</div>
								<div class="file-actions">
									<el-link type="primary">查看</el-link>
									<el-link type="primary">下载</el-link>
									<el-link type="danger">删除</el-link>
								</div>
							</div>
						</div>


						<div class="file-list">
							<!-- 静态文件列表 -->
							<el-link style="text-align: center; line-height: 50px;margin: 0 auto;display: block;"
								type="warning">
								历史版本 - V0
							</el-link>

							<div class="file-card">
								<img src="https://via.placeholder.com/24x24?text=PDF" alt="file-icon"
									class="file-icon" />
								<div class="file-info">
									<div class="file-name">Document.pdf</div>
									<div class="file-type">pdf</div>
								</div>
								<div class="file-actions">
									<el-link type="primary">查看</el-link>
									<el-link type="primary">下载</el-link>
								</div>
							</div>

							<div class="file-card">
								<img src="https://via.placeholder.com/24x24?text=CAD" alt="file-icon"
									class="file-icon" />
								<div class="file-info">
									<div class="file-name">Drawing.dwg</div>
									<div class="file-type">cad</div>
								</div>
								<div class="file-actions">
									<el-link type="primary">查看</el-link>
									<el-link type="primary">下载</el-link>
								</div>
							</div>
						</div>

					</template>
				</el-table-column>
				<el-table-column prop="id" label="图号" width="100"></el-table-column>
				<!-- <el-table-column prop="name" label="图名" width="180"></el-table-column> -->
				<!-- <el-table-column prop="date" label="执行" width="60"></el-table-column> -->
				<el-table-column prop="state" label="校验" width="60"></el-table-column>
				<!-- <el-table-column prop="state1" label="开始时间" width="100"></el-table-column> -->
				<el-table-column prop="state2" label="交付时间" width="100"></el-table-column>
				<el-table-column prop="state3" label="状态" width="70">
					<template #default="scope">
						<el-link class="mx-1" :type="scope.row.state3 == 0 ? 'info'
							: scope.row.state3 == 1 ? 'success'
								: scope.row.state3 == 2 ? 'primary'
									: scope.row.state3 == 3 ? 'danger'
										: 'default'">
							{{ scope.row.state3 == 0 ? '未开始'
								: scope.row.state3 == 1 ? '执行中'
									: scope.row.state3 == 2 ? '已结束'
										: scope.row.state3 == 3 ? '已超期'
											: '未知' }}
						</el-link>
					</template>
				</el-table-column>
				<el-table-column prop="state7" label="进度">
					<template #default="props">
						<el-progress :percentage="props.row.state7" :stroke-width="10" />
					</template>
				</el-table-column>
				<!-- <el-table-column prop="state4" label="最新提交" width="100"></el-table-column> -->
				<!-- <el-table-column prop="state5" label="当前版本" width="80"></el-table-column> -->
				<el-table-column prop="state6" label="操作">
					<template #default>
						<el-button-group>
							<el-button text type="primary" size="small">上传</el-button>
							<el-button text type="primary" size="small">提交</el-button>
							<el-button text type="primary" size="small">审核</el-button>
							<el-button text type="primary" size="small">下载</el-button>
						</el-button-group>
					</template>
				</el-table-column>

			</el-table>
		</el-card>
	</el-card>

	<el-caed header="项目状态">
		<el-header class="header-tabs">
			<el-card shadow="never">
				<scEcharts height="300px" :option="option"></scEcharts>
			</el-card>
		</el-header>
	</el-caed>
</template>

<script>
import scEcharts from '@/components/scEcharts';
export default {
	components: {
		scEcharts
	},
	title: "欢迎",
	icon: "el-icon-present",
	description: "项目特色以及文档链接",
	data() {
		return {
			option: {
				title: {
					text: '图纸完成数量',
					subtext: '基础柱状图',
				},
				grid: {
					top: '80px'
				},
				tooltip: {
					trigger: 'axis'
				},
				xAxis: {
					type: 'category',
					data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: [10, 20, 30, 40, 50, 60, 70],
					type: 'bar',
					barWidth: '15px',
				},
					// {
					// 	data: [12, 22, 34, 45, 56, 66, 77],
					// 	type: 'bar',
					// 	barWidth: '15px',
					// }
				]
			},
			tableData: [
				{
					id: 'PE01PID_001',
					name: 'P&I Diagram Identification System系统图仪表图例符号',
					date: '赵琦',
					state: '朱文广',
					state1: '2021-10-10',
					state2: '2021-10-18',
					state3: 0,
					state4: '2024-04-15',
					state5: 'V1',
					state7: '60'
				},
				{
					id: 'PE01PID_001',
					name: 'P&I Diagram Identification System系统图仪表图例符号',
					date: '赵琦',
					state: '朱文广',
					state1: '2022-09-11',
					state2: '2023-04-23',
					state3: 1,
					state4: '2024-07-25',
					state5: 'V2',
					state7: '70'

				},
				{
					id: 'PE01PID_001',
					name: 'P&I Diagram Identification System系统图仪表图例符号',
					date: '赵琦',
					state: '朱文广',
					state1: '2023-05-12',
					state2: '2021-07-18',
					state3: 2,
					state4: '2024-08-24',
					state5: 'V3',
					state7: '30'

				},
				{
					id: 'PE01PID_001',
					name: 'P&I Diagram Identification System系统图仪表图例符号',
					date: '赵琦',
					state: '朱文广',
					state1: '2023-05-12',
					state2: '2021-07-18',
					state3: 3,
					state4: '2024-08-24',
					state5: 'V4',
					state7: '40'

				},
			]
		}
	},
	methods: {
		godoc() {
			window.open("https://python-abc.xyz/scui-doc/")
		}
	}
}
</script>

<style scoped>
.welcome {}

.welcome .logo {
	text-align: center;
}

.welcome .logo img {
	vertical-align: bottom;
	width: 100px;
	height: 100px;
	margin-bottom: 20px;
}

.welcome .logo h2 {
	font-size: 30px;
	font-weight: normal;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tips {
	margin-top: 20px;
	padding: 0 40px;
}

.tips-item {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 7.5px 0;
}

.tips-item-icon {
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	font-size: 18px;
	margin-right: 20px;
	color: var(--el-color-primary);
	background: rgba(180, 180, 180, 0.1);
}

.tips-item-message {
	flex: 1;
	font-size: 14px;
}

.actions {
	text-align: center;
	margin: 40px 0 20px 0;
}
</style>

<style scoped>
.file-list {
	padding: 10px;
	width: 100%;
}

.file-card {
	width: 95%;
	display: flex;
	align-items: center;
	border: 1px solid #dcdfe6;
	border-radius: 4px;
	padding: 10px;
	margin-bottom: 10px;
}

.file-icon {
	width: 24px;
	height: 24px;
	margin-right: 10px;
}

.file-info {
	display: flex;
	flex-direction: column;
}

.file-name {
	font-weight: bold;
}

.file-type {
	color: #909399;
}

.file-actions {
	display: flex;
	justify-content: flex-end;
	width: 100%;
}

.file-actions a {
	padding: 0 10px;
}
</style>