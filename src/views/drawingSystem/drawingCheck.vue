<template>
    <el-main>
        <el-row :gutter="15">
            <el-col :lg="12">
                <el-card header="审核清单 - PE01PID_001">
                    <div class="file-list">
                        <!-- 静态文件列表 -->
                        <!-- <el-link style="text-align: center; line-height: 50px;margin: 0 auto;display: block;" type="success">{{
            props.row.id + ' - ' + props.row.state5 }}</el-link> -->

                        <div class="file-card">
                            <img src="https://via.placeholder.com/24x24?text=PDF" alt="file-icon" class="file-icon" />
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
                            <img src="https://via.placeholder.com/24x24?text=CAD" alt="file-icon" class="file-icon" />
                            <div class="file-info">
                                <div class="file-name">Drawing.dwg</div>
                                <div class="file-type">cad</div>
                            </div>
                            <div class="file-actions">
                                <el-link type="primary">查看</el-link>
                                <el-link type="primary">下载</el-link>
                            </div>
                        </div>

                        <div class="file-card">
                            <img src="https://via.placeholder.com/24x24?text=Word" alt="file-icon" class="file-icon" />
                            <div class="file-info">
                                <div class="file-name">Report.docx</div>
                                <div class="file-type">word</div>
                            </div>
                            <div class="file-actions">
                                <el-link type="primary">查看</el-link>
                                <el-link type="primary">下载</el-link>
                            </div>
                        </div>

                        <div class="file-card">
                            <img src="https://via.placeholder.com/24x24?text=Excel" alt="file-icon" class="file-icon" />
                            <div class="file-info">
                                <div class="file-name">Spreadsheet.xlsx</div>
                                <div class="file-type">excel</div>
                            </div>
                            <div class="file-actions">
                                <el-link type="primary">查看</el-link>
                                <el-link type="primary">下载</el-link>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="12">
                <el-card header="分步表单">
                    <el-steps :active="active" align-center style="margin-bottom: 20px;">
                        <el-step title="批注信息"></el-step>
                        <el-step title="审核信息"></el-step>
                        <el-step title="完成"></el-step>
                    </el-steps>
                    <el-row>
                        <el-col :lg="{ span: 8, offset: 8 }">
                            <el-form v-if="active == 0" ref="stepForm_0" :model="form" :rules="rules"
                                label-position="top">
                                <el-form-item label="文件名称" prop="paymentAccount">
                                    <el-select v-model="form.paymentAccount" clearable>
                                        <el-option label="sakuya@scui.com" value="sakuya@scui.com"></el-option>
                                        <el-option label="lolicode@scui.com" value="lolicode@scui.com"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="批注" prop="collectionAccount">
                                    <el-input v-model="form.collectionAccount" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="审核人" prop="collectionName">
                                    <el-input v-model="form.collectionName" clearable></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="转账金额" prop="amount">
                                    <el-input v-model="form.amount"></el-input>
                                </el-form-item> -->
                            </el-form>
                            <el-form v-if="active == 1" ref="stepForm_1" :model="form" :rules="rules"
                                label-position="top">
                                <!-- <el-alert title="确认转账后，资金将直接打入对方账户，无法退回。" type="warning" show-icon
                                    style="margin-bottom: 15px;" /> -->
                                <el-descriptions :column="1" border>
                                    <el-descriptions-item label="文件名称">{{ form.paymentAccount }}</el-descriptions-item>
                                    <el-descriptions-item label="批注">{{ form.collectionAccount
                                        }}</el-descriptions-item>
                                    <el-descriptions-item label="审核人">{{ form.collectionName }}</el-descriptions-item>
                                </el-descriptions>
                                <el-divider></el-divider>
                                <el-form-item label="请输入“确认”" prop="payPassword">
                                    <el-input v-model="form.payPassword" placeholder="请输入"></el-input>
                                </el-form-item>
                            </el-form>
                            <div v-if="active == 2">
                                <el-result icon="success" title="操作成功" sub-title="。">
                                    <template #extra>
                                        <el-button>查看</el-button>
                                    </template>
                                </el-result>
                            </div>
                            <el-button v-if="active > 0 && active < 2" @click="pre"
                                :disabled="submitLoading">上一步</el-button>
                            <el-button v-if="active < 1" type="primary" @click="next">下一步</el-button>
                            <el-button v-if="active == 1" type="primary" @click="submit"
                                :loading="submitLoading">提交</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </el-main>



</template>
<script>
export default {
    name: 'stepform',
    data() {
        return {
            active: 0,
            submitLoading: false,
            form: {
                paymentAccount: 'PE01PID_001 V-001',
                collectionAccount: '文件已校验，本次设计通过，文件进行升版',
                collectionName: 'Lolowan',
                amount: '100',
                payPassword: ''
            },
            rules: {
                paymentAccount: [
                    {
                        required: true,
                        message: '请选择',
                    }
                ],
                collectionAccount: [
                    {
                        required: true,
                        message: '请输入',
                    }
                ],
                collectionName: [
                    {
                        required: true,
                        message: '请输入',
                    }
                ],
                amount: [
                    {
                        required: true,
                        message: '请输入',
                    }
                ],
                payPassword: [
                    {
                        required: true,
                        message: '需要确认',
                    }
                ]
            }
        }
    },
    mounted() {

    },
    methods: {
        //下一步
        next() {
            const formName = `stepForm_${this.active}`
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.active += 1
                } else {
                    return false
                }
            })
        },
        //上一步
        pre() {
            this.active -= 1
        },
        //提交
        submit() {
            const formName = `stepForm_${this.active}`
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.submitLoading = true
                    setTimeout(() => {
                        this.submitLoading = false
                        this.active += 1
                    }, 1000)
                } else {
                    return false
                }
            })
        },
        //再来一次
        again() {
            this.active = 0
        }
    }
}
</script>

<style scoped>
.el-steps:deep(.is-finish) .el-step__line {
    background: var(--el-color-primary);
}
</style>

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