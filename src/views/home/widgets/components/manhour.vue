<template>
	<el-card shadow="hover" header="我的工时">


		<div class="app-container">
			<el-calendar v-model="value">
				<!-- 使用 dateCell 插槽来自定义每个日期单元格的内容 -->
				<template #dateCell="{ data }">
					<div :style="{
						backgroundColor: getTextColor(data.day).color,
						color: getTextColor(data.day).color2,
						padding: 0
					}" @click="handleDateClick(data.day)" class="custom-date-cell">
						<el-space direction="vertical">
							<span style="font-size: 20px;">{{ data.day.split('-')[2] }}</span>
							<span>{{ '工时：' }}{{ getTextColor(data.day).hours || 0 }}
								<el-icon
									v-if="getTextColor(data.day).hours < 9 && (getDetailedDateInfo(data.day) == '工作日' || getDetailedDateInfo(data.day) === '调休')">
									<Warning color="#E6A23C" type="warning" />
								</el-icon></span>
							<span>{{ getDetailedDateInfo(data.day) }}</span>

						</el-space>
						<br>
					</div>
				</template>
			</el-calendar>
		</div>
	</el-card>
	<dialog2 ref="manhoursDialog" :receiveParams="inputParams" @invoke-parent-method="getaData"></dialog2>

</template>

<script>
import dialog2 from '@/views/dmsSystem/manhourHome/dialog/manhourDialog.vue'
import { getDetailedDateInfo } from '@/utils/holidayChecker';

export default {
	data() {
		return {
			value: new Date(),  // 初始日期，显示的日期
			specialDates: [],
			inputParams: {
				day: String,
				dayHours: null
			}
		};
	},
	components: {
		dialog2
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
		getDetailedDateInfo(date) {
			return getDetailedDateInfo(date);
		},
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
			// 获取当前日期并格式化为 'YYYY-MM-DD'
			const today = new Date();
			const year = today.getFullYear();
			const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
			const date = String(today.getDate()).padStart(2, '0');
			const formattedToday = `${year}-${month}-${date}`;

			// 比较选中的日期和当前日期
			if (day > formattedToday) {
				// 如果选中的日期是未来日期，显示提示信息并阻止后续操作
				this.$message.warning('不能选择未来的日期');
				return;
			}

			// 如果选中的日期不是未来日期，执行后续操作
			this.value = day;  // 更新 value
			this.getaData();   // 获取点击日期的工时数据
			this.inputParams = {
				day: day,
				dayHours: this.getTextColor(day).hours
			};
			this.$refs.manhoursDialog.open();
		},
		getTextColor(day) {
			// 获取点击的日期格式化为 YYYY-MM-DD 进行比较
			const matchingDates = this.specialDates.filter(item => item.record_date_ === day);
			let totalHours = 0;

			if (matchingDates.length > 0) {
				totalHours = matchingDates.reduce((sum, item) => sum + item.hours_, 0);
			}

			// 获取详细日期信息
			const detailedInfo = getDetailedDateInfo(day);

			// 判断是否为工作日或调休
			let color2; // 默认字体颜
			let backgroundColor; // 默认背景颜色

			// 只有当有工时数据时，才显示蓝色背景
			if (totalHours > 0) {
				color2 = '#fff'; // 字体颜色
				// backgroundColor = '#409EFF'; // 背景色
				backgroundColor = '#409EFF'; // 背景色
			}

			// 如果日期不是工作日或调休，字体颜色变红
			if (detailedInfo !== '工作日' && detailedInfo !== '调休') {
				color2 = 'rgb(196, 86.4, 86.4)'; // 字体颜色为红色
			}

			return {
				color: backgroundColor, // 背景色
				color2: color2, // 字体颜色
				hours: totalHours // 累计工时
			};
		}
	}
};
</script>

<style scoped>
::v-deep .el-calendar-day {
	padding: 0px;
}

.custom-date-cell {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}
</style>
