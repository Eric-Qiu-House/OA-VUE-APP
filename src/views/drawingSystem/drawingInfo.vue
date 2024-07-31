<!--
 * @Descripttion: 右键简单组件演示文件
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年7月22日16:31:14
 * @LastEditors:
 * @LastEditTime:
-->

<template>
    <el-header class="header-tabs">
        <el-tabs type="card" v-model="groupId" @tab-change="tabChange">
            <el-tab-pane label="友奇（内部）" name="0"></el-tab-pane>
            <el-tab-pane label="船厂（外部）" name="1"></el-tab-pane>
            <el-tab-pane label="外派（外部）" name="4"></el-tab-pane>
        </el-tabs>
    </el-header>
    <el-main>
        <el-row :gutter="15">
            <el-col :lg="4">
                <el-card>
                    <el-tree style="max-width: 600px" :data="data" node-key="id" :default-expanded-keys="[1, 2, 3]"
                        :default-checked-keys="[42]" :props="defaultProps" />
                </el-card>
            </el-col>
            <el-col :lg="20">
                <el-card shadow="never">
                    <el-table ref="tableData" :data="tableData" highlight-current-row @row-contextmenu="rowContextmenu">
                        <el-table-column type="expand">
                            <template #default="props">
                                <div class="file-list">
                                    <!-- 静态文件列表 -->
                                    <el-link
                                        style="text-align: center; line-height: 50px;margin: 0 auto;display: block;"
                                        type="success">{{ props.row.id + ' - ' + props.row.state5 }}</el-link>

                                    <div class="file-card">
                                        <img src="https://via.placeholder.com/24x24?text=PDF" alt="file-icon"
                                            class="file-icon" />
                                        <div class="file-info">
                                            <div class="file-name">Document.pdf</div>
                                            <div class="file-type">pdf</div>
                                        </div>
                                        <div class="file-actions">
                                            <el-link type="primary">查看</el-link>
                                            <el-link type="primary">下载</el-link>
                                            <el-link type="danger">删除</el-link>
                                        </div>
                                    </div>

                                    <div class="file-card">
                                        <img src="https://via.placeholder.com/24x24?text=CAD" alt="file-icon"
                                            class="file-icon" />
                                        <div class="file-info">
                                            <div class="file-name">Drawing.dwg</div>
                                            <div class="file-type">cad</div>
                                        </div>
                                        <div class="file-actions">
                                            <el-link type="primary">查看</el-link>
                                            <el-link type="primary">下载</el-link>
                                            <el-link type="danger">删除</el-link>
                                        </div>
                                    </div>

                                    <div class="file-card">
                                        <img src="https://via.placeholder.com/24x24?text=Word" alt="file-icon"
                                            class="file-icon" />
                                        <div class="file-info">
                                            <div class="file-name">Report.docx</div>
                                            <div class="file-type">word</div>
                                        </div>
                                        <div class="file-actions">
                                            <el-link type="primary">查看</el-link>
                                            <el-link type="primary">下载</el-link>
                                            <el-link type="danger">删除</el-link>
                                        </div>
                                    </div>

                                    <div class="file-card">
                                        <img src="https://via.placeholder.com/24x24?text=Excel" alt="file-icon"
                                            class="file-icon" />
                                        <div class="file-info">
                                            <div class="file-name">Spreadsheet.xlsx</div>
                                            <div class="file-type">excel</div>
                                        </div>
                                        <div class="file-actions">
                                            <el-link type="primary">查看</el-link>
                                            <el-link type="primary">下载</el-link>
                                            <el-link type="danger">删除</el-link>
                                        </div>
                                    </div>
                                </div>


                                <div class="file-list">
                                    <!-- 静态文件列表 -->
                                    <el-link
                                        style="text-align: center; line-height: 50px;margin: 0 auto;display: block;"
                                        type="warning">
                                        历史版本 - V0
                                    </el-link>

                                    <div class="file-card">
                                        <img src="https://via.placeholder.com/24x24?text=PDF" alt="file-icon"
                                            class="file-icon" />
                                        <div class="file-info">
                                            <div class="file-name">Document.pdf</div>
                                            <div class="file-type">pdf</div>
                                        </div>
                                        <div class="file-actions">
                                            <el-link type="primary">查看</el-link>
                                            <el-link type="primary">下载</el-link>
                                        </div>
                                    </div>

                                    <div class="file-card">
                                        <img src="https://via.placeholder.com/24x24?text=CAD" alt="file-icon"
                                            class="file-icon" />
                                        <div class="file-info">
                                            <div class="file-name">Drawing.dwg</div>
                                            <div class="file-type">cad</div>
                                        </div>
                                        <div class="file-actions">
                                            <el-link type="primary">查看</el-link>
                                            <el-link type="primary">下载</el-link>
                                        </div>
                                    </div>
                                </div>

                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="图号" width="100"></el-table-column>
                        <el-table-column prop="name" label="图名" width="180"></el-table-column>
                        <el-table-column prop="date" label="执行" width="110">
                            <template #default>
                                <el-select v-model="tableData.date" placeholder="Select" style="width: 90px">
                                    <el-option v-for="item in language" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state" label="校验" width="130">
                            <template #default>
                                <el-select v-model="tableData.state" placeholder="Select" style="width: 90px">
                                    <el-option v-for="item in language" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state1" label="开始时间" width="100"></el-table-column>
                        <el-table-column prop="state2" label="交付时间" width="100"></el-table-column>
                        <el-table-column prop="state3" label="状态" width="70">
                            <template #default="scope">
                                <el-link class="mx-1" :type="scope.row.state3 == 0 ? 'info'
                                    : scope.row.state3 == 1 ? 'success'
                                        : scope.row.state3 == 2 ? 'primary'
                                            : scope.row.state3 == 3 ? 'danger'
                                                : 'default'">
                                    {{ scope.row.state3 == 0 ? '未开始'
                                        : scope.row.state3 == 1 ? '执行中'
                                            : scope.row.state3 == 2 ? '已结束'
                                                : scope.row.state3 == 3 ? '已超期'
                                                    : '未知' }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state4" label="最新提交" width="100"></el-table-column>
                        <el-table-column prop="state5" label="当前版本" width="80"></el-table-column>
                        <el-table-column prop="state7" label="进度" width="150">
                            <template #default="props">
                                <el-progress :percentage="props.row.state7" :stroke-width="10" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="state6" label="操作" width="120">
                            <template #default="props">
                                <el-button-group>
                                    <el-upload class="sc-file-select__upload" multiple :show-file-list="false"
                                        :file-list="fileList" :on-change="uploadChange" :before-upload="uploadBefore"
                                        :on-error="uploadError" :http-request="uploadRequest" style="display: inline;">
                                        <el-button text type="primary" size="small">上传</el-button>
                                    </el-upload>
                                    <el-button text type="primary" size="small"
                                        @click="open(props.row.name)">提交</el-button>
                                    <router-link :to="{
                                        name: 'drawingCheck'
                                    }">
                                        <el-button text type="primary" size="small">审核</el-button>
                                    </router-link>
                                    <el-button text type="primary" size="small">下载</el-button>
                                </el-button-group>
                            </template>
                        </el-table-column>

                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    name: 'contextmenu',
    data() {
        return {
            row: null,
            data: [
                {
                    id: 1,
                    label: '友奇*内部',
                    children: [
                        {
                            id: 42,
                            label: 'Electric 电气图',
                        },
                        {
                            id: 43,
                            label: 'Hook-up 连接图',
                        },
                        {
                            id: 44,
                            label: 'LIST 清单文件',
                        },
                        {
                            id: 45,
                            label: 'ISO 管系轴测图',
                        },
                        {
                            id: 46,
                            label: 'MTO 材料清单',
                        },
                        {
                            id: 47,
                            label: 'Certificates 证书',
                        },
                    ],
                },
                {
                    id: 2,
                    label: '船厂*外部',
                    children: [
                        {
                            id: 5,
                            label: 'LIST 清单文件',
                        },
                        {
                            id: 6,
                            label: 'Calculation 计算文件',
                        },
                        {
                            id: 7,
                            label: 'LIST 清单文件',
                        },
                        {
                            id: 8,
                            label: 'ISO 管系轴测图',
                        },
                        {
                            id: 9,
                            label: 'MTO 材料清单',
                        },
                        {
                            id: 10,
                            label: 'Certificates 证书',
                        },
                    ],
                },
            ],
            language: [
                {
                    value: '0',
                    label: '朱文广',
                },
                {
                    value: '1',
                    label: '王晓伟',
                },
            ],
            tableData: [
                {
                    id: 'PE01PID_001',
                    name: 'P&I Diagram Identification System系统图仪表图例符号',
                    date: '赵琦',
                    state: '朱文广',
                    state1: '2021-10-10',
                    state2: '2021-10-18',
                    state3: 0,
                    state4: '2024-04-15',
                    state5: 'V1',
                    state7: '60'
                },
                {
                    id: 'PE01PID_001',
                    name: 'P&I Diagram Identification System系统图仪表图例符号',
                    date: '赵琦',
                    state: '朱文广',
                    state1: '2022-09-11',
                    state2: '2023-04-23',
                    state3: 1,
                    state4: '2024-07-25',
                    state5: 'V2',
                    state7: '70'

                },
                {
                    id: 'PE01PID_001',
                    name: 'P&I Diagram Identification System系统图仪表图例符号',
                    date: '赵琦',
                    state: '朱文广',
                    state1: '2023-05-12',
                    state2: '2021-07-18',
                    state3: 2,
                    state4: '2024-08-24',
                    state5: 'V3',
                    state7: '30'

                },
                {
                    id: 'PE01PID_001',
                    name: 'P&I Diagram Identification System系统图仪表图例符号',
                    date: '赵琦',
                    state: '朱文广',
                    state1: '2023-05-12',
                    state2: '2021-07-18',
                    state3: 3,
                    state4: '2024-08-24',
                    state5: 'V4',
                    state7: '40'

                },
            ],
        }
    },
    mounted() {

    },
    methods: {
        open(name) {
            ElMessageBox.alert(`是否提交 ${name} 审批`, '提交', {
                // 如果你想禁用其自动聚焦
                // autofocus: false,
                confirmButtonText: 'OK',
                callback: (action) => {
                    ElMessage({
                        type: 'info',
                        message: `action: ${action}`,
                    })
                },
            })
        },
        triggerFileUpload() {
            this.fileInput.value.click();
        },
        rowContextmenu(row, column, event) {
            this.row = row
            this.$refs.table.setCurrentRow(row);
            this.$refs.contextmenu.openMenu(event)
        },
        openMenu(e) {
            this.row = null
            this.$refs.contextmenu.openMenu(e)
        },
        handleCommand(command) {
            this.$message('click on item ' + command)
            if (command == 'e') {
                this.row.state = 1
            }
        },
        visibleChange(visible) {
            if (!visible) {
                this.$refs.table.setCurrentRow();
            }
        }
    }
}
</script>

<style scoped>
.file-list {
    padding: 10px;
    width: 100%;
}

.file-card {
    width: 95%;
    display: flex;
    align-items: center;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
}

.file-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}

.file-info {
    display: flex;
    flex-direction: column;
}

.file-name {
    font-weight: bold;
}

.file-type {
    color: #909399;
}

.file-actions {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.file-actions a {
    padding: 0 10px;
}
</style>
