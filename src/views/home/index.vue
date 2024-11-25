<template>
	<!-- 页面加载时，显示加载中的骨架屏 -->
	<div v-if="pageLoading">
	  <el-main>
		<!-- 第一个骨架屏，用于加载某个模块的内容 -->
		<el-card shadow="never">
		  <el-skeleton :rows="1"></el-skeleton>
		</el-card>
		
		<!-- 第二个骨架屏，显示更复杂的内容 -->
		<el-card shadow="never" style="margin-top: 15px;">
		  <el-skeleton></el-skeleton>
		</el-card>
	  </el-main>
	</div>
  
	<!-- 如果 dashboard 值为 '1'，加载 work 组件 -->
	<work v-if="dashboard=='1'" @on-mounted="onMounted"></work>
	
	<!-- 如果 dashboard 值不为 '1'，加载 widgets 组件 -->
	<widgets v-else @on-mounted="onMounted"></widgets>

  </template>
  
  <script>
	// 引入 vue 的 defineAsyncComponent 来动态加载组件
	import { defineAsyncComponent } from 'vue';
	
	// 定义异步组件，work 和 widgets 在需要时才会加载
	const work = defineAsyncComponent(() => import('./work'));
	const widgets = defineAsyncComponent(() => import('./widgets'));
  
	export default {
	  name: "dashboard",  // 组件名称为 dashboard
	  components: {
		work,  // 注册异步加载的 work 组件
		widgets  // 注册异步加载的 widgets 组件
	  },
	  data() {
		return {
		  pageLoading: true,  // 初始状态为加载中
		  dashboard: '0'  // 默认 dashboard 值为 '0'
		}
	  },
	  created() {
		// 从工具方法中获取用户信息，并设置 dashboard 值
		this.dashboard = this.$TOOL.data.get("USER_INFO").dashboard || '0';
	  },
	  mounted() {
		// 在 mounted 生命周期钩子中可以执行额外的操作（这里没有实现）
	  },
	  methods: {
		// 当组件加载完成后，触发 onMounted 方法
		onMounted() {
		  // 将 pageLoading 状态设置为 false，表示页面加载完成
		  this.pageLoading = false;
		}
	  }
	}
  </script>
  
  <style>
	/* 样式部分，可以添加自定义样式 */
  </style>
  