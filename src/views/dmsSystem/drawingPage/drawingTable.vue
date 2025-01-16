<template>
    <el-row :gutter="40">
        <el-col v-if="!drawingInfo">
            <el-empty description="请选择左侧菜单后操作" :image-size="100"></el-empty>
        </el-col>
        <template v-else>
            <el-col class="apilist">
                <h2>{{ menuForm.title_ }}</h2>
                <el-button v-if="menuForm.title_" v-loading="dwgloading" type="primary" size="small" icon="el-icon-plus"
                    @click="creatDwg()"
                    :disabled="!$isButtonVisible || this.$route.query.projectState == 4"></el-button>
                <el-table v-loading="dwgloading" ref="table" :data="drawingInfo" highlight-current-row :default-sort="{ prop: 'drawing_number_', order: 'ascending' }"
                    @expand-change="handleExpandChange">
                    <!-- <el-table-column type="expand" label="全部" disabled>
                        <template #default="props">
                            <el-tree :data="props.row.fileList" :props="defaultProps" node-key="id_" show-checkbox
                                highlight-current>
                                <template #default="{ data }">
                                    <span v-if="data.children">版本：V{{ data.version }}</span>
                                    <span v-else style="display: flex; justify-content: space-between;">
                                        <div>
                                            <i class="el-icon-document"></i>
                                            {{ data.file_name_ }}
                                        </div>
                                        <div>
                                            <el-button type="primary" link style="">
                                                查看
                                            </el-button>
                                            <el-button type="primary" link>
                                                下载
                                            </el-button>
                                            <el-button type="danger" link>
                                                删除
                                            </el-button>
                                        </div>
                                    </span>

                                </template>
                            </el-tree>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="drawing_number_" sortable label="图号" width="100"></el-table-column>
                    <el-table-column prop="drawing_name_" label="图名" width="180"
                        show-overflow-tooltip></el-table-column>
                    <el-table-column prop="executor_name_" label="执行" width="110"></el-table-column>
                    <el-table-column prop="verifier_name_" label="负责人" width="130"></el-table-column>
                    <el-table-column prop="start_date_" label="开始(计划时间)" width="100"></el-table-column>
                    <el-table-column prop="delivery_date_" label="交付(计划时间)" width="100"></el-table-column>
                    <el-table-column label="时间进度" width="150">
                        <template #default="{ row }">
                            <div :style="getStyle(row)">
                                <el-progress :stroke-width="10" :percentage="getProgress(row)" :color="getStyle(row)" />
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="start_date_ast_" label="开始时间" width="100"></el-table-column>
                    <el-table-column prop="end_date_aet_" label="完成时间" width="100"></el-table-column>
                    <el-table-column prop="status_" label="状态" width="70">
                        <template #default="scope">
                            <el-link class="mx-1" :type="scope.row.status_ == 1 ? 'info'
                                : scope.row.status_ == 2 ? 'success'
                                    : scope.row.status_ == 3 ? 'primary'
                                        : scope.row.status_ == 4 ? 'danger'
                                            : 'default'">
                                {{ scope.row.status_ == 1 ? '未开始'
                                    : scope.row.status_ == 2 ? '执行中'
                                        : scope.row.status_ == 3 ? '已结束'
                                            : scope.row.status_ == 4 ? '已超期'
                                                : '未知' }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="last_submission_" label="最新提交" width="100"></el-table-column>
                    <el-table-column prop="current_version_" label="当前版本" width="80">
                        <template #default="scope">
                            {{ 'V' - scope.row.current_version_ }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="status_" fixed="right" label="操作" width="250">
                        <template #default="scope">
                            <el-button text type="primary" size="small" @click="openDwgDialog(scope.row)"
                                :disabled="this.$TOOL.data.get('USER_INFO').user_type_ == 'user' ">信息编辑</el-button>
                            <el-button text type="primary" size="small" @click="openHoursDialog(scope.row)"
                                v-if="$TOOL.data.get('USER_INFO').id_ == scope.row.executor_id_ || !this.$route.query.projectState == 4">填报工时</el-button>
                            <el-button text type="primary"
                                :disabled="this.$TOOL.data.get('USER_INFO').user_type_ == 'user' " size="small"
                                @click="deleteDwg(scope.row)">删除</el-button>

                            <!-- <el-button-group>
								<el-upload class="sc-file-select__upload" multiple :show-file-list="false"
									:file-list="fileList" :on-change="uploadChange" :before-upload="uploadBefore"
									:on-error="uploadError" :http-request="uploadRequest" style="display: inline;">
									<el-button text type="primary" size="small">上传</el-button>
								</el-upload>
								<el-button text type="primary" size="small" @click="open(props.row.name)">提交</el-button>
								<router-link :to="{
									name: 'drawingCheck'
								}">
									<el-button text type="primary" size="small">审核</el-button>
								</router-link>
								<el-button text type="primary" size="small">下载</el-button>
							</el-button-group> -->
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </template>
    </el-row>
    <dialog1 ref="dwgDialog" :menu="dialogData" @getFun="getDwgData"></dialog1>
    <dialog2 ref="manhoursDialog" :menu="dialogData"></dialog2>
</template>

<script>
import dialog1 from '@/views/dmsSystem/drawingPage/dialog/drawingEdit.vue'
import dialog2 from '@/views/dmsSystem/manhourHome/dialog/manhourForm.vue'
import { ElMessageBox } from 'element-plus';

export default {
    components: {
        dialog1,
        dialog2
    },
    data() {
        return {
            dialogData: [],
            dwgloading: false,
            menuForm: [], //接受当前菜单信息
            // 图纸菜单
            defaultProps: {
                children: 'children',
                label: 'version'
            },
            drawingInfo: [],
            loading: false,
            drawingFind: {
                projec_id_: 1,
                drawing_menu_id_: 2
            },
            fileList: [],
            userState: this.$route.query.state
        }
    },
    watch: {
        menuForm() {
            this.getDwgData()
        },
    },
    mounted() {
        // this.getfileInfo()
        if (this.userState == 'user') {
            this.getaaa()
        }
    },
    methods: {
        // 计算颜色样式
        getStyle(row) {
            const newDate = new Date(); // 当前时间
            const startDate = new Date(row.start_date_);
            const endDate = new Date(row.end_date_);
            const totalTime = endDate - startDate;
            const elapsedTime = newDate - startDate;

            if (totalTime <= 0) {
                return '#909399'; // 非法日期
            }

            const progress = (elapsedTime / totalTime) * 100;
            console.log(progress, 'progressprogressprogress')
            if (progress < 60) {
                return '#409EFF';
            } else if (progress < 80) {
                return '#E6A23C';
            } else {
                return '#F56C6C';
            }
        },

        // 计算进度百分比显示
        getProgress(row) {
            const newDate = new Date(); // 当前时间
            const startDate = new Date(row.start_date_);
            const endDate = new Date(row.delivery_date_);
            const totalTime = endDate - startDate;
            const elapsedTime = newDate - startDate;

            if (totalTime <= 0) {
                return 'N/A'; // 非法日期
            }

            const progress = Math.round((elapsedTime / totalTime) * 100);
            return `${progress}`;
        },
        // 获取图纸
        async getaaa() {
            try {
                const data = {
                    project_id_: this.$route.query.projectUuid
                }
                this.drawingInfo = await this.$dmsApi.drawingInfo.readByUserId.post(data)
            } catch (error) {
                console.error
            }
        },
        async getDwgData() {
            this.dwgloading = true
            try {
                const referData = {
                    drawing_menu_id_: this.menuForm.uuid_
                }
                const receiveData = await this.$dmsApi.drawingInfo.readById.post(referData)
                if (receiveData) {
                    this.drawingInfo = receiveData
                } else {
                    console.log('Not found');
                    return null;
                }
            } catch (error) {
                console.error("Error fetching user list:", error);
            } finally {
                this.dwgloading = false
            }
        },
        // 新增图纸
        async creatDwg() {
            this.dwgloading = true
            try {
                const referData = {
                    project_id_: this.menuForm.project_uuid_,
                    drawing_menu_id_: this.menuForm.uuid_,
                    drawing_number_: this.menuForm.coding_rule_ + String(this.drawingInfo.length + 1).padStart(3, '0'),
                    drawing_name_: this.menuForm.title_
                }
                const receiveData = await this.$dmsApi.drawingInfo.create.post(referData)
                if (receiveData) {
                    this.getDwgData()
                } else {
                    console.log('Not found');
                    return null;
                }
            } catch (error) {
                console.error("Error fetching user list:", error);
            } finally {
                this.dwgloading = false
            }
        },
        // 删除图纸
        async deleteDwg(row) {
            try {
                // 弹出确认对话框
                const confirm = await ElMessageBox.confirm(
                    '此操作将永久删除该项数据，是否继续？',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                );
                if (confirm) {
                    // 执行删除逻辑
                    this.dwgloading = true
                    const referData = {
                        uuid_: row.uuid_,
                    };
                    await this.$dmsApi.drawingInfo.delete.post(referData);

                    this.getDwgData(); // 刷新数据
                }
            } catch (error) {
                // 捕获取消操作或其他错误
            }
        },
        openDwgDialog(row) {
            this.dialogData = row
            this.$refs.dwgDialog.setData(row)
            this.$refs.dwgDialog.open()
        },
        openHoursDialog(row) {
            if (row.status_ == 1) {
                this.$message({
                    message: '图纸任务暂未开始.',
                    type: 'warning',
                });
                return;
            }
            this.dialogData = row
            this.$refs.manhoursDialog.setData(row)
            this.$refs.manhoursDialog.open()
        },
        // rowContextmenu(row, column, event) {
        //     this.row = row
        //     this.$refs.table.setCurrentRow(row);
        //     this.$refs.contextmenu.openMenu(event)
        // },
        // 文件状态
        async handleExpandChange(row, expanded) {
            if (expanded) {
                if (!row.fileList) { // 检查 fileList 是否存在
                    row.loading = true; // 开始加载状态
                    try {
                        const response = await this.$dmsApi.fileInfo.readId.post()
                        // const response = await this.fetchFileList(row.id);
                        row.fileList = response; // 设置文件列表
                    } catch (error) {
                        console.error('Error fetching file list:', error);
                    } finally {
                        row.loading = false; // 结束加载状态
                    }
                }
            }
        },
        // 获取文件信息
        async getfileInfo() {
            try {
                return await this.$dmsApi.fileInfo.readId.post()
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        },
        // 调用图纸方法
        async getDrawingInfo() {
            this.drawingInfo = await this.$dmsApi.drawingInfo.inquireList.post(this.drawingFind);
        },
        //表单注入数据
        setData(data, pid) {
            this.menuForm = data
            console.log(data, pid, 'data, pid')
        }
    }
}
</script>

<style scoped>
h2 {
    font-size: 17px;
    color: #3c4a54;
    padding: 0 0 30px 0;
}

.apilist {
    border-left: 1px solid #eee;
}

[data-theme="dark"] h2 {
    color: #fff;
}

[data-theme="dark"] .apilist {
    border-color: #434343;
}
</style>
