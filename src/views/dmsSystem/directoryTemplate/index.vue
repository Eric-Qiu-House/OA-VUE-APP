<template>
	<el-container>
		<menu-directory></menu-directory>
	</el-container>
</template>

<script>
import { provide } from 'vue';
import menuDirectory from '@/views/dmsSystem/directoryTemplate/directoryTree.vue'
export default {
	name: "settingMenu",
	components: {
		// save
		menuDirectory
	},
	setup() {
		const dynamicStatus = 'typeCatalogue'; // 这里可以是动态的状态
		provide('status', dynamicStatus); // 提供状态
	},
}
</script>


