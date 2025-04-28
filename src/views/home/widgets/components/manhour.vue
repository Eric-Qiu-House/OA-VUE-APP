<template>
	<el-card shadow="hover" header="我的工时">
		<div class="app-container">
			<el-calendar v-model="value">
				<!-- 使用 dateCell 插槽来自定义每个日期单元格的内容 -->
				<template #date-cell="{ data }">
					<div :style="{
						backgroundColor: getTextColor(data.day).color,
						color: getTextColor(data.day).color2,
						padding: 0
					}" @click="handleDateClick(data.day)" class="custom-date-cell">
						<el-space direction="vertical">
							<span style="font-size: 20px;">{{ data.day.split('-')[2] }}</span>
							<span>{{ '工时：' }}{{ getTextColor(data.day).hours || 0 }}
								<el-icon
									v-if="getTextColor(data.day).hours < 8 && (getDetailedDateInfo(data.day) == '工作日' || getDetailedDateInfo(data.day) === '调休-班')">
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
				console.log(this.specialDates, 'this.specialDates');

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
			// 根据传入日期查找是否有对应的工时记录
			const matchingDates = this.specialDates.filter(item => item.record_date_ === day);

			let totalHours = 0;
			if (matchingDates.length > 0) {
				// 计算该日期的总工时
				totalHours = matchingDates.reduce((sum, item) => sum + item.hours_, 0);
			}

			// 获取日期对应的工作类型（如：工作日、休息日、调休-班等）
			const detailedInfo = getDetailedDateInfo(day);

			// 默认字体和背景颜色（未设置时为 undefined）
			let color2;
			let backgroundColor;

			// 如果该日期有工时记录，则设置背景色为蓝色、字体为白色
			if (totalHours > 0) {
				backgroundColor = '#409EFF';
				color2 = '#fff';
			}

			// 如果该日期不是工作日或调休上班，则将字体颜色设为红色
			if (detailedInfo !== '工作日' && detailedInfo !== '调休-班') {
				color2 = 'rgb(196, 86.4, 86.4)';
			}

			// 返回颜色设置和工时信息
			return {
				color: backgroundColor,  // 背景色（用于日历格）
				color2: color2,          // 字体颜色
				hours: totalHours        // 总工时
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
