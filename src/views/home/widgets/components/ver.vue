<template>
	<el-card shadow="hover" header="版本信息">
		<div style="min-height: 210px; text-align: center;">
			<img src="img/ver.svg" style="height:140px;" alt="版本图标" />
			<h2 style="margin-top: 5px;text-align: left;">版本: {{ ver.version_number_ }}</h2>
			<h2 style="margin-top: 5px;text-align: left;">发布时间: {{ formatDate(ver.creation_date_) }}</h2>
			<div v-html="ver.version_information_" style="text-align: left; margin-top: 10px;font-size: 15px;padding: 10px;"></div>
		</div>
	</el-card>
</template>

<script>
export default {
	title: "版本信息",
	icon: "el-icon-monitor",
	description: "当前项目版本信息",
	data() {
		return {
			ver: {}, // 存储版本信息
		};
	},
	mounted() {
		this.getVer();
	},
	methods: {
		// 获取最新版本信息
		async getVer() {
			try {
				const ver = await this.$iamApi.versions.readLast.get();
				this.ver = ver;
			} catch (error) {
				console.error("获取版本信息失败:", error);
			}
		},
		// 格式化日期为 "YYYY-MM-DD"
		formatDate(date) {
			if (!date) return "-";
			const d = new Date(date);
			return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
		},
	},
};
</script>
