<template>
	<el-card shadow="hover" header="我的工时">
		<div class="app-container">
			{{ specialDates }}
			<el-calendar v-model="value">
				<!-- 使用 dateCell 插槽来自定义每个日期单元格的内容 -->
				<template #dateCell="{ data }">
					<div :style="{ backgroundColor: getTextColor(data.day).color }" @click="handleDateClick(data.day)"
						class="custom-date-cell">
						{{ data.day.split('-')[2] }}
						<br>
						<!-- 显示工时 -->
						{{ '总工时：' }}{{ getTextColor(data.day).hours || 0 }}
					</div>
				</template>
			</el-calendar>
		</div>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			value: '2024-12-02',  // 初始日期，显示的日期
			specialDates: []
		};
	},
	watch: {
		value() {
			this.getaData();
		},
	},
	mounted() {
		this.getaData();
	},
	methods: {
		async getaData() {
			try {
				// 提交的数据格式
				const date = new Date(this.value);
				const submitData = {
					user_id_: this.$TOOL.data.get("USER_INFO").id_,
					yearMonth: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}` // 提取年-月格式
				};
				console.log(submitData, 'submitData')
				// 获取工时数据
				this.specialDates = await this.$dmsApi.manHours.readByUserId.post(submitData);
			} catch (error) {
				console.log(error);
			}
		},
		handleDateClick(day) {
			// 处理日期点击事件
			this.value = day;  // 更新 value
			this.getaData();   // 获取点击日期的工时数据
		},
		getTextColor(day) {
			// 获取点击的日期格式化为 YYYY-MM-DD 进行比较
			const matchingDates = this.specialDates.filter(item => item.record_date_ === day);
			let totalHours = 0;

			if (matchingDates.length > 0) {
				totalHours = matchingDates.reduce((sum, item) => sum + item.hours_, 0);
				return {
					color: '#409EFF', // 设置背景色
					hours: totalHours // 累计工时
				};
			}
			return {
				color: '#fff', // 默认背景色
				hours: 0 // 如果没有工时，显示为 0
			};
		}
	}
};
</script>

<style scoped>
.custom-date-cell {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}
</style>