<!--
 * @Descripttion: 右键简单组件演示文件
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年7月22日16:31:14
 * @LastEditors:
 * @LastEditTime:
-->

<template>

    <el-main>
        <el-card shadow="never">
            <el-table ref="tableData" :data="tableData" highlight-current-row @row-contextmenu="rowContextmenu">
                <el-table-column type="expand">
                    <template #default>
                        <div class="file-list">
                            <!-- 静态文件列表 -->
                            <div class="file-card">
                                <img src="https://via.placeholder.com/24x24?text=PDF" alt="file-icon"
                                    class="file-icon" />
                                <div class="file-info">
                                    <div class="file-name">补卡申请</div>
                                </div>
                                <div style="width: 25%;">
                                    全部可见
                                    <el-link type="primary">修改</el-link>
                                </div>
                                <div class="file-actions">
                                    <router-link :to="{
                                name: 'newProcess'
                            }">
                                    <el-link type="primary">编辑</el-link>
                                </router-link>
                                    <el-link type="primary">导出</el-link>
                                    <el-link type="danger">更多</el-link>
                                </div>
                            </div>

                            <div class="file-card">
                                <img src="https://via.placeholder.com/24x24?text=CAD" alt="file-icon"
                                    class="file-icon" />
                                <div class="file-info">
                                    <div class="file-name">请假</div>
                                </div>
                                <div style="width: 25%;">
                                    全部可见
                                    <el-link type="primary">修改</el-link>
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
                                    <div class="file-name">出差</div>
                                </div>
                                <div style="width: 25%;">
                                    全部可见
                                    <el-link type="primary">修改</el-link>
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
                                    <div class="file-name">外出</div>
                                </div>
                                <div style="width: 25%;">
                                    全部可见
                                    <el-link type="primary">修改</el-link>
                                </div>
                                <div class="file-actions">
                                    <el-link type="primary">查看</el-link>
                                    <el-link type="primary">下载</el-link>
                                    <el-link type="danger">删除</el-link>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="name" label="流程分类" width="1000"></el-table-column>
                <el-table-column prop="state6" label="操作" width="120">
                    <template #default="">
                        <el-button-group>
                                <el-button text type="primary" size="small">重命名</el-button>
                            <el-button text type="primary" size="small">删除</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>
    </el-main>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    name: 'contextmenu',
    data() {
        return {
            row: null,
            tableData: [
                {
                    id: '001',
                    name: '假勤管理',
                },
                {
                    id: '002',
                    name: '人事管理',
                },
                {
                    id: '003',
                    name: '智能财务',
                },
                {
                    id: '004',
                    name: '业务管理',
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
    width: 35%;
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
