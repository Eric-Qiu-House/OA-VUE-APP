<template>
	<div :class="['widgets-home', customizing ? 'customizing' : '']" ref="main">
		<!-- 主容器，动态绑定 'customizing' 类，控制是否处于自定义模式 -->
		<div class="widgets-content">

			<!-- 顶部区域 -->
			<div class="widgets-top">
				<div class="widgets-top-title">
					工作台
				</div>
				<div class="widgets-top-actions">
					<!-- 自定义模式下显示完成按钮，非自定义模式下显示编辑按钮 -->
					<el-button v-if="customizing" type="primary" icon="el-icon-check" round @click="save">完成</el-button>
					<el-button v-else type="primary" icon="el-icon-edit" round @click="custom">自定义</el-button>
				</div>
			</div>

			<!-- 组件列表显示区域 -->
			<div class="widgets" ref="widgets">
				<div class="widgets-wrapper">
					<!-- 如果没有部件，显示没有部件的提示 -->
					<div v-if="nowCompsList.length <= 0" class="no-widgets">
						<el-empty image="img/no-widgets.svg" description="没有部件啦" :image-size="280"></el-empty>
					</div>

					<!-- 通过 el-row 和 el-col 来设置组件的布局 -->
					<el-row :gutter="15">
						<el-col v-for="(item, index) in grid.layout" v-bind:key="index" :md="item" :xs="24">
							<draggable v-model="grid.copmsList[index]" animation="200" handle=".customize-overlay"
								group="people" item-key="com" dragClass="aaaaa" force-fallback fallbackOnBody
								class="draggable-box">
								<!-- 组件的拖拽部分 -->
								<template #item="{ element }">
									<div class="widgets-item">
										<!-- 动态加载组件 -->
										<component :is="allComps[element]"></component>
										<!-- 自定义模式下显示删除和自定义信息 -->
										<div v-if="customizing" class="customize-overlay">
											<el-button class="close" type="danger" plain icon="el-icon-close"
												size="small" @click="remove(element)"></el-button>
											<label><el-icon>
													<component :is="allComps[element].icon" />
												</el-icon>{{ allComps[element].title }}</label>
										</div>
									</div>
								</template>
							</draggable>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>

		<!-- 自定义模式下，右侧展示添加部件的侧边栏 -->
		<div v-if="customizing" class="widgets-aside">
			<el-container>
				<!-- 侧边栏标题 -->
				<el-header>
					<div class="widgets-aside-title"><el-icon><el-icon-circle-plus-filled /></el-icon>添加部件</div>
					<!-- 关闭按钮 -->
					<div class="widgets-aside-close" @click="close()"><el-icon><el-icon-close /></el-icon></div>
				</el-header>

				<!-- 布局选择 -->
				<el-header style="height:auto">
					<div class="selectLayout">
						<!-- 布局选择项 -->
						<div class="selectLayout-item item01" :class="{ active: grid.layout.join(',') == '12,6,6' }"
							@click="setLayout([12, 6, 6])">
							<el-row :gutter="2">
								<el-col :span="12"><span></span></el-col>
								<el-col :span="6"><span></span></el-col>
								<el-col :span="6"><span></span></el-col>
							</el-row>
						</div>
						<div class="selectLayout-item item02" :class="{ active: grid.layout.join(',') == '24,16,8' }"
							@click="setLayout([24, 16, 8])">
							<el-row :gutter="2">
								<el-col :span="24"><span></span></el-col>
								<el-col :span="16"><span></span></el-col>
								<el-col :span="8"><span></span></el-col>
							</el-row>
						</div>
						<div class="selectLayout-item item03" :class="{ active: grid.layout.join(',') == '24' }"
							@click="setLayout([24])">
							<el-row :gutter="2">
								<el-col :span="24"><span></span></el-col>
								<el-col :span="24"><span></span></el-col>
								<el-col :span="24"><span></span></el-col>
							</el-row>
						</div>
					</div>
				</el-header>

				<!-- 部件列表 -->
				<el-main class="nopadding">
					<div class="widgets-list">
						<!-- 如果没有部件，显示没有部件的提示 -->
						<div v-if="myCompsList.length <= 0" class="widgets-list-nodata">
							<el-empty description="没有部件啦" :image-size="60"></el-empty>
						</div>
						<!-- 遍历 myCompsList 显示每个部件 -->
						<div v-for="item in myCompsList" :key="item.title" class="widgets-list-item">
							<div class="item-logo"><el-icon>
									<component :is="item.icon" />
								</el-icon></div>
							<div class="item-info">
								<h2>{{ item.title }}</h2>
								<p>{{ item.description }}</p>
							</div>
							<div class="item-actions">
								<!-- 点击按钮添加部件 -->
								<el-button type="primary" icon="el-icon-plus" size="small"
									@click="push(item)"></el-button>
							</div>
						</div>
					</div>
				</el-main>

				<!-- 底部恢复默认按钮 -->
				<el-footer style="height:51px;">
					<el-button size="small" @click="backDefaul()">恢复默认</el-button>
				</el-footer>
			</el-container>
		</div>
	</div>
</template>
<script>
  import draggable from 'vuedraggable'  // 引入 vuedraggable 组件，用于支持拖拽排序
  import allComps from './components'  // 引入所有部件组件

  export default {
    components: {
      draggable  // 注册 draggable 组件
    },
    data() {
      return {
        customizing: false,  // 是否处于自定义模式
        allComps: allComps,  // 所有可用的部件组件
        selectLayout: [],  // 当前选中的布局
        defaultGrid: this.$CONFIG.DEFAULT_GRID,  // 默认的布局配置
        grid: []  // 当前使用的布局数据
      }
    },
    created() {
      // 在创建时，初始化 grid，优先从缓存获取数据，若无则使用默认布局
      this.grid = this.$TOOL.data.get("grid") || JSON.parse(JSON.stringify(this.defaultGrid))
    },
    mounted() {
      // 在组件挂载完成后，触发自定义事件并输出组件列表
      this.$emit('on-mounted')
    //   console.log(this.$emit('on-mounted'), 'allComps')  // 输出所有部件组件，帮助调试
    },
    computed: {
      // 计算所有可用部件列表
      allCompsList() {
        var allCompsList = []
        // 遍历 allComps 对象，将部件的标题、图标和描述等信息提取到数组
        for (var key in this.allComps) {
          allCompsList.push({
            key: key,
            title: allComps[key].title,
            icon: allComps[key].icon,
            description: allComps[key].description
          })
        }
        // 获取当前已添加的部件列表
        var myCopmsList = this.grid.copmsList.reduce(function(a, b) {
          return a.concat(b)
        })
        // 遍历所有部件列表，标记已添加的部件为禁用
        for (let comp of allCompsList) {
          const _item = myCopmsList.find((item) => { return item === comp.key })
          if (_item) {
            comp.disabled = true
          }
        }
        return allCompsList  // 返回所有部件列表
      },
      // 计算已添加的部件列表
      myCompsList() {
        var myGrid = this.$TOOL.data.get("DASHBOARDGRID")  // 从工具中获取已选布局的部件
        return this.allCompsList.filter(item => !item.disabled && myGrid.includes(item.key))  // 筛选出没有禁用并且在当前布局中的部件
      },
      // 获取当前所有部件的扁平化列表
      nowCompsList() {
        return this.grid.copmsList.reduce(function(a, b) {
          return a.concat(b)  // 合并所有行的部件列表
        })
      }
    },
    methods: {
      // 开启自定义模式
      custom() {
        this.customizing = true  // 设置为自定义模式
        const oldWidth = this.$refs.widgets.offsetWidth  // 获取当前部件容器的宽度
        // 在下一次 DOM 更新后，调整容器的缩放比例
        this.$nextTick(() => {
          const scale = this.$refs.widgets.offsetWidth / oldWidth
          this.$refs.widgets.style.setProperty('transform', `scale(${scale})`)  // 设置缩放
        })
      },
      // 设置布局
      setLayout(layout) {
        this.grid.layout = layout  // 更新布局
        if (layout.join(',') == '24') {
          // 如果布局为 24 列，则合并部分列的数据
          this.grid.copmsList[0] = [...this.grid.copmsList[0], ...this.grid.copmsList[1], ...this.grid.copmsList[2]]
          this.grid.copmsList[1] = []
          this.grid.copmsList[2] = []
        }
      },
      // 追加部件到当前布局
      push(item) {
        let target = this.grid.copmsList[0]  // 默认将部件添加到第一个列
        target.push(item.key)  // 将部件的 key 添加到第一个列中
      },
      // 从当前布局中移除部件
      remove(item) {
        var newCopmsList = this.grid.copmsList  // 获取当前的部件列表
        newCopmsList.forEach((obj, index) => {
          var newObj = obj.filter(o => o != item)  // 过滤掉要删除的部件
          newCopmsList[index] = newObj  // 更新对应列的部件
        })
      },
      // 保存自定义布局
      save() {
        this.customizing = false  // 关闭自定义模式
        this.$refs.widgets.style.removeProperty('transform')  // 移除缩放样式
        this.$TOOL.data.set("grid", this.grid)  // 保存当前布局到工具中
      },
      // 恢复默认布局
      backDefaul() {
        this.customizing = false  // 关闭自定义模式
        this.$refs.widgets.style.removeProperty('transform')  // 移除缩放样式
        this.grid = JSON.parse(JSON.stringify(this.defaultGrid))  // 重置为默认布局
        this.$TOOL.data.remove("grid")  // 清除保存的自定义布局
      },
      // 关闭自定义模式
      close() {
        this.customizing = false  // 关闭自定义模式
        this.$refs.widgets.style.removeProperty('transform')  // 移除缩放样式
      }
    }
  }
</script>

<style scoped lang="scss">
.widgets-home {
	display: flex;
	flex-direction: row;
	flex: 1;
	height: 100%;
}

.widgets-content {
	flex: 1;
	overflow: auto;
	overflow-x: hidden;
	padding: 15px;
}

.widgets-aside {
	width: 360px;
	background: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, .1);
	position: relative;
	overflow: auto;
}

.widgets-aside-title {
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.widgets-aside-title i {
	margin-right: 10px;
	font-size: 18px;
}

.widgets-aside-close {
	font-size: 18px;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;
	cursor: pointer;
}

.widgets-aside-close:hover {
	background: rgba(180, 180, 180, 0.1);
}

.widgets-top {
	margin-bottom: 15px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.widgets-top-title {
	font-size: 18px;
	font-weight: bold;
}

.widgets {
	transform-origin: top left;
	transition: transform .15s;
}

.draggable-box {
	height: 100%;
}

.customizing .widgets-wrapper {
	margin-right: -360px
}

.customizing .widgets-wrapper .el-col {
	padding-bottom: 15px;
}

.customizing .widgets-wrapper .draggable-box {
	border: 1px dashed var(--el-color-primary);
	padding: 15px;
}

.customizing .widgets-wrapper .no-widgets {
	display: none;
}

.customizing .widgets-item {
	position: relative;
	margin-bottom: 15px;
}

.customize-overlay {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: rgba(255, 255, 255, 0.9);
	cursor: move;
}

.customize-overlay label {
	background: var(--el-color-primary);
	color: #fff;
	height: 40px;
	padding: 0 30px;
	border-radius: 40px;
	font-size: 18px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: move;
}

.customize-overlay label i {
	margin-right: 15px;
	font-size: 24px;
}

.customize-overlay .close {
	position: absolute;
	top: 15px;
	right: 15px;
}

.customize-overlay .close:focus,
.customize-overlay .close:hover {
	background: var(--el-button-hover-color);
}

.widgets-list {}

.widgets-list-item {
	display: flex;
	flex-direction: row;
	padding: 15px;
	align-items: center;
}

.widgets-list-item .item-logo {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: rgba(180, 180, 180, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	margin-right: 15px;
	color: #6a8bad;
}

.widgets-list-item .item-info {
	flex: 1;
}

.widgets-list-item .item-info h2 {
	font-size: 16px;
	font-weight: normal;
	cursor: default;
}

.widgets-list-item .item-info p {
	font-size: 12px;
	color: #999;
	cursor: default;
}

.widgets-list-item:hover {
	background: rgba(180, 180, 180, 0.1);
}

.widgets-wrapper .sortable-ghost {
	opacity: 0.5;
}

.selectLayout {
	width: 100%;
	display: flex;
}

.selectLayout-item {
	width: 60px;
	height: 60px;
	border: 2px solid var(--el-border-color-light);
	padding: 5px;
	cursor: pointer;
	margin-right: 15px;
}

.selectLayout-item span {
	display: block;
	background: var(--el-border-color-light);
	height: 46px;
}

.selectLayout-item.item02 span {
	height: 30px;
}

.selectLayout-item.item02 .el-col:nth-child(1) span {
	height: 14px;
	margin-bottom: 2px;
}

.selectLayout-item.item03 span {
	height: 14px;
	margin-bottom: 2px;
}

.selectLayout-item:hover {
	border-color: var(--el-color-primary);
}

.selectLayout-item.active {
	border-color: var(--el-color-primary);
}

.selectLayout-item.active span {
	background: var(--el-color-primary);
}


.dark {
	.widgets-aside {
		background: #2b2b2b;
	}

	.customize-overlay {
		background: rgba(43, 43, 43, 0.9);
	}
}

@media (max-width: 992px) {
	.customizing .widgets {
		transform: scale(1) !important;
	}

	.customizing .widgets-aside {
		width: 100%;
		position: absolute;
		top: 50%;
		right: 0;
		bottom: 0;
	}

	.customizing .widgets-wrapper {
		margin-right: 0;
	}
}
</style>
