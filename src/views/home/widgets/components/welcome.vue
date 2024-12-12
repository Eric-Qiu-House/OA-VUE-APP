<template>
	<el-card shadow="hover" header="">
		<div class="welcome">
			<div class="logo">
				<img src="img/logo.png">
				<h2>欢迎进入UPRO</h2>
			</div>
		</div>
	</el-card>
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
	/* width: 100px;
	height: 100px; */
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