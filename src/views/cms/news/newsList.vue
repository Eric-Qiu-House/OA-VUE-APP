<template>
	<el-container>
		<el-header>
			<router-link :to="{ name: 'newsAdd', query: { type: '新增内容' } }">
				<el-button type="primary" icon="el-icon-plus">添加文章</el-button>
			</router-link>
		</el-header>
		<el-main class="nopadding">
			<el-card>
				<p>
					主菜单：
					<el-button round @click="article()">全部</el-button>
					<el-button round v-for="(item, index) in menu" :key="index" @click="cutMenu(item.file_path_)">{{
						item.folder_name_ }}</el-button>
				</p>
				<p style="padding: 10px 0;height: 52px;display: flex;align-items: center;">
					子菜单：
					<el-button round v-for="(item, index) in menuChild" :key="index"
						v-show="item.form_ == this.paths && this.paths != 0 && this.paths != 5"
						@click="cutMenuChild(item.id_)">{{ item.menu_name_ch_ }}</el-button>
				</p>
				<el-select v-model="value" placeholder="Select" size="large" style="width: 240px"
					@change="language(value)">
					<el-option v-for="item in selectedLanguage" :key="item.value" :label="item.label"
						:value="item.value" />
				</el-select>
			</el-card>
			<scTable ref="table" :data="newsList" row-key="id_" stripe :row-class-name="getRowClassName">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="标题" prop="title_" width="150"></el-table-column>
				<el-table-column label="访问数量" prop="visit_num_" width="150" sortable></el-table-column>
				<el-table-column label="发布时间" prop="release_time_" width="150" sortable>
					<template #default="scope">
						<!-- {{ scope.row.release_time_ }} -->
						{{ formatDate(scope.row.release_time_) }}
					</template>
				</el-table-column>
				<el-table-column label="语言" prop="language_" width="150" sortable></el-table-column>
				<el-table-column label="发布人" prop="release_name_" width="150" sortable></el-table-column>
				<el-table-column label="文档状态" prop="status_" width="150" sortable>
					<template #default="scope">
						<el-tag v-if="scope.row.status_ == '0'">未发布</el-tag>
						<el-tag v-if="scope.row.status_ == '1'" type="success">发布</el-tag>
						<el-tag v-if="scope.row.status_ == '2'" type="danger">下架</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="更新时间" prop="update_time_" width="150" sortable>
					<template #default="scope">
						{{ formatDate(scope.row.update_time_) }}
					</template>
				</el-table-column>
				<el-table-column label="更新人" prop="updater_" width="150" sortable></el-table-column>
				<el-table-column label="操作" prop="progress" width="280" sortable>
					<template v-slot:default="scope">
						<router-link :to="{
							name: 'newsParticular',
							query: { id: scope.row.id_, form: true, type: 'NewsList' },
						}">
							<el-button text type="primary">详情</el-button>
						</router-link>

						<router-link v-if="scope.row.status_ === 0 || scope.row.status_ === 2"
							:to="{ name: 'newsAdd', query: { id: scope.row.id_ } }">
							<el-button text type="primary">编辑</el-button>
						</router-link>

						<!-- <el-button v-if="scope.row.status_ === 0 || scope.row.status_ === 2" text type="primary" @click="
							sendAction(
								cmsApi.news.removeNewsUrl + scope.row.id,
								`确定删除${scope.row.title}吗?`
							)
							">
							删除
						</el-button> -->

						<el-popconfirm :title="`确定发布${scope.row.title_}吗?`" @confirm="table_up(scope.row, scope.$index)"
							v-if="scope.row.status_ === 0 || scope.row.status_ === 2">
							<template #reference>
								<el-button text type="primary">发布</el-button>
							</template>
						</el-popconfirm>
						<el-popconfirm :title="`确定下架${scope.row.title_}吗?`" @confirm="table_up(scope.row, scope.$index)"
							v-if="scope.row.status_ === 1">
							<template #reference>
								<el-button text type="primary">下架</el-button>
							</template>
						</el-popconfirm>
						<el-popconfirm :title="`确定删除${scope.row.title_}吗?`" @confirm="table_up(scope.row, scope.$index)"
							v-if="scope.row.status_ === 0 || scope.row.status_ === 2">
							<template #reference>
								<el-button text type="primary">删除</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</scTable>
		</el-main>
	</el-container>
	<!-- <div v-html="this.list.apiObj[0].content_"></div> -->

	<!-- <el-card shadow="never">
		<sc-editor v-model="this.list.apiObj[0].content_" placeholder="请输入" :templates="templates"
			:height="400"></sc-editor>
	</el-card> -->
</template>

<script>
// import { number } from 'echarts';
import config from "@/config/fileSelect"
import { defineAsyncComponent } from 'vue';
const scEditor = defineAsyncComponent(() => import('@/components/scEditor'));
// import api from '@/api/cms/news-api'
export default {
	name: 'tableBase',
	// name: "editor",
	components: {
		scEditor,
	},
	data() {
		return {
			newsList: [],
			menu: [],
			menuChild: [],
			paths: '',
			value: 'all',
			selectedLanguage: [
				{
					value: 'all',
					label: '全部',
				},
				{
					value: '0',
					label: '中文',
				},
				{
					value: '1',
					label: '英文',
				},
			],
			filteredTableData: [],
			cacheNewsList: []
		}
	},
	created() {
		this.article()
	},
	mounted() {
		this.getMenu()
		this.getMenuChild()

	},
	methods: {
		// 语言筛选
		language(i) {
			if (i === 'all') {
				this.newsList = this.cacheNewsList
			} else {
				this.newsList = this.cacheNewsList.filter(row => row.language_ === i)
			}
		},
		// 获取 - 全部文章
		async article() {
			this.value = 'all'
			try {
				const info = await this.$API.news.inquire.get();
			this.cacheNewsList = info
			this.newsList = info; // 更新组件的数据
			} catch (error) {
				console.error("Error fetching user list:", error);
			}
		},
		// 主菜单 - 文章内容
		async cutMenu(i) {
			this.value = 'all'
			this.paths = i
			const data = {
				menu_class_: i
			}
			var res = await this.$API.news.inquireType.post(data);
			this.cacheNewsList = res
			this.newsList = res
		},
		// 子菜单 - 文章内容
		async cutMenuChild(i) {
			this.value = 'all'
			const data = {
				belong_to_: i
			}
			var res = await this.$API.news.inquireType.post(data);
			this.cacheNewsList = res
			this.newsList = res
		},
		// 获取 - 主菜单
		async getMenu() {
			var res = await config.menuApiObj.get()
			this.cacheNewsList = res
			this.menu = res
		},
		// 获取 - 子菜单
		async getMenuChild() {
			var res = await this.$API.news.inquireMenu.get();
			this.menuChild = res
		},
		// 语音选项
		change(selected) {
			this.filterData = selected
		},
		// 时间格式化
		formatDate(i) {
			if (i) {
				return i.split('T')[0];
			}
			return i
		},
		// filterHandler(value, row, column) {
		// 	const property = column['property']
		// 	return row[property] === value
		// },
		// 发布、下架、删除
		async table_up(info, i) {
			let newStatus
			if (info.status_ == 1) {
				newStatus = 2
			} else {
				newStatus = 1
			}
			const data = {
				id_: info.id_,
				status_: newStatus
			}

			try {
				// 更新且重新赋值
				this.newsList[i] = await this.$API.news.updata.post(data);
			} catch (error) {
				console.error('Error updating data:', error);
			}
		}
	}
}
</script>

<style scoped>
.hidden-row {
	display: none;
}
</style>
