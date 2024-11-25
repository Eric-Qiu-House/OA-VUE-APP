<template>
    <el-row :gutter="40">
        <el-col v-if="!drawingInfo">
            <el-empty description="请选择左侧菜单后操作" :image-size="100"></el-empty>
        </el-col>
        <template v-else>
            <el-col class="apilist">
                <h2>{{ menuForm.title_ }}</h2>
                <el-button type="primary" size="small" icon="el-icon-plus" @click="creatDwg()"></el-button>
                <el-table ref="table" :data="drawingInfo" highlight-current-row @expand-change="handleExpandChange">
                    <el-table-column type="expand" label="全部">
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
                    </el-table-column>
                    <el-table-column prop="drawing_number_" label="图号" width="100"></el-table-column>
                    <el-table-column prop="drawing_name_" label="图名" width="180"></el-table-column>
                    <el-table-column prop="executor_name_" label="执行" width="110"></el-table-column>
                    <el-table-column prop="verifier_name_" label="校验" width="130"></el-table-column>
                    <el-table-column prop="start_date_" label="开始时间" width="100"></el-table-column>
                    <el-table-column prop="delivery_date_" label="交付时间" width="100"></el-table-column>
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
                    <el-table-column prop="status_" label="操作" width="220">
                        <template #default="scope">
                            <el-button text type="primary" size="small" @click="openDwgDialog(scope.row)">信息编辑</el-button>
                            <el-button text type="primary" size="small" @click="openHoursDialog(scope.row)">填报工时</el-button>
                            <el-button text type="primary" size="small" @click="deleteDwg(scope.row)">删除</el-button>

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
    <dialog1 ref="dwgDialog" :menu="dialogData"></dialog1>
    <dialog2 ref="manhoursDialog" :menu="dialogData"></dialog2>
</template>

<script>
import dialog1 from '@/components/views/drawingSystem/dialog/dialog1.vue'
import dialog2 from '@/components/views/drawingSystem/dialog/dialog2.vue'

export default {
    components: {
        dialog1,
        dialog2
    },
    data() {
        return {
            dialogData: [],
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
        }
    },
    watch: {
        menuForm() {
            this.getDwgData()
        },
    },
    mounted() {
        // this.getfileInfo()
    },
    methods: {
        // 获取图纸
        async getDwgData() {
            try {
                const referData = {
                    drawing_menu_id_: this.menuForm.menu_id_
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
            }
        },
        // 新增图纸
        async creatDwg() {
            try {
                const referData = {
                    projec_id_: this.menuForm.project_uuid_,
                    drawing_menu_id_: this.menuForm.uuid_,
                    drawing_number_: this.menuForm.coding_rule_ + String(this.drawingInfo.length + 1).padStart(3, '0'),
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
            }
        },
        // 删除图纸
        async deleteDwg(row) {
            try {
                const referData = {
                    uuid_: row.uuid_
                }
                const receiveData = await this.$dmsApi.drawingInfo.delete.post(referData)
                if (receiveData) {
                    this.getDwgData()
                } else {
                    console.log('Not found');
                    return null;
                }
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        },
        openDwgDialog(row) {
            this.dialogData = row
            console.log(row,'wwwwww')
            this.$refs.dwgDialog.setData(row)
            this.$refs.dwgDialog.open()
        },
        openHoursDialog(row) {
            this.dialogData = row
            console.log(row,'wwwwww')
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
