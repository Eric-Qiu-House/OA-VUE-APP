<template>
    <el-container>
        <el-header class="header-tabs">
            <el-tabs type="card" v-model="groupId" @tab-change="tabChange">
                <el-tab-pane label="项目成员" name="0"></el-tab-pane>
                <el-tab-pane label="外部通讯录" name="1" disabled></el-tab-pane>
            </el-tabs>
        </el-header>

        <el-card shadow="never" header="">
            <el-text class="mx-1" tag="b" size="large" v-if="prejectData.project_number_">
                {{ prejectData.project_number_ + ' - ' + prejectData.project_name_ }}
            </el-text>
            <el-header>
                <el-button type="primary" icon="el-icon-plus" @click="add" :disabled="!$isButtonVisible"
                    v-if="!prejectData[0]"></el-button>

            </el-header>
            <el-main class="nopadding" v-if="groupId == 0">
                <scTable ref="table" v-loading="userLoading" :data="usersData" @selection-change="selectionChange"
                    stripe remoteSort remoteFilter>
                    <el-table-column type="selection" width="50"></el-table-column>

                    <el-table-column label="头像" width="100" column-key="filterAvatar"
                        :filters="[{ text: '已上传', value: '1' }, { text: '未上传', value: '0' }]">
                        <template #default="scope">
                            <el-avatar :src="scope.row.avatar_ ? scope.row.avatar_ : ''"
                                :style="{ backgroundColor: scope.row.avatar_ ? '' : '#409EFF', color: '#fff' }">
                                <template #default>
                                    <!-- 如果 avatar_ 为空，显示 fullname_ 的后两位字符 -->
                                    <span v-if="!scope.row.avatar_" style="writing-mode: horizontal-tb;">
                                        {{ scope.row.fullname_.slice(-2) }}
                                    </span>
                                </template>
                            </el-avatar>
                        </template>
                    </el-table-column>

                    <el-table-column label="登录账号" prop="account_" width="150" sortable='custom'
                        column-key="filterUserName"
                        :filters="[{ text: '系统账号', value: '1' }, { text: '普通账号', value: '0' }]"></el-table-column>
                    <el-table-column label="姓名" prop="fullname_" width="150" sortable='custom'></el-table-column>
                    <el-table-column label="邮箱" prop="email_" width="150" sortable='custom'></el-table-column>
                    <el-table-column label="手机号码" prop="mobile_" width="150" sortable='custom'></el-table-column>
                    <el-table-column label="状态" prop="status_" width="150" sortable='custom'></el-table-column>

                </scTable>
            </el-main>

            <el-main class="nopadding" v-if="groupId == 1">

                <scTable ref="table" :data="contactList" @selection-change="selectionChange1" stripe remoteSort
                    remoteFilter>
                    <el-table-column type="selection" width="0"></el-table-column>

                    <!-- 公司名称 -->
                    <el-table-column prop="companyName" label="公司名称" width="180"></el-table-column>

                    <!-- 联系人姓名 -->
                    <el-table-column prop="contactName" label="联系人" width="150"></el-table-column>

                    <!-- 类型（供应商、设计院等） -->
                    <el-table-column prop="type" label="类型" width="150">
                        <template #default="{ row }">
                            <el-tag :type="getTagType(row.type)">{{ row.type }}</el-tag>
                        </template>
                    </el-table-column>

                    <!-- 联系电话 -->
                    <el-table-column prop="phone" label="联系电话" width="150"></el-table-column>

                    <!-- 电子邮件 -->
                    <el-table-column prop="email" label="电子邮件" width="200"></el-table-column>

                </scTable>
            </el-main>
        </el-card>

    </el-container>

    <organize-edit v-if="dialog.save" ref="saveDialog" @success="getFun" @closed="dialog.save = false"></organize-edit>

</template>

<script>
import organizeEdit from '@/views/dmsSystem/projectOrganize/dialog/organizeEdit.vue'

export default {
    components: {
        organizeEdit
    },
    props: {
        prejectData: {
            type: Object,
            default: () => { },
        }
    },
    data() {
        return {
            defaultProps: {
                label: 'project_number_',  // 将 `label` 字段映射为 `project_number_`
            },
            filterText: '',
            proNumLoading: false,
            userLoading: false,
            groupId: "0",
            contactList: [
            ],
            dialog: {
                save: false
            },
            showGrouploading: false,
            groupFilterText: '',
            group: [],
            apiObj: [
            ],
            selection: [],
            search: {
                name: null
            },
            projectData: [],
            projectId: '',
            activeProject: {},
            usersData: [],
            postData: {
                project_id_: ''
            }
        }
    },
    created() {
        this.getProjectInfo()
    },
    watch: {
        prejectData: {
            handler(newVal, oldVal) {
                console.log('New value:', newVal);
                console.log('Old value:', oldVal);
                // this.projectId = newVal
                this.getFun();
            },
            deep: true,
        },
    },
    methods: {

        async getFun() {
            try {
                const postData = {
                    project_id_: this.prejectData.uuid_
                }
                const userIds = await this.$dmsApi.projectUsershiproute.readId.post(postData)
                if (userIds) {
                    console.log(userIds,'userIds')
                    this.usersData = await this.$apiIAM.user.usersByUserIds.post(userIds)
                } else {
                    return null;
                }
            } catch (error) {
                this.usersData = []
            } finally {
                this.userLoading = false
            }
        },

        async getProjectInfo() {
            this.proNumLoading = true
            try {
                this.projectData = await this.$dmsApi.project.readAll.get()
            } catch (error) {
                console.error("Error fetching user list:", error);
            } finally {
                this.proNumLoading = false
            }
        },

        selectionChange1(val) {
            console.log('选中的行：', val);
        },


        tabChange(name) {
            var params = {
                groupId: name
            }
            this.$refs.table.reload(params)
        },
        // filterChange(data) {
        //     this.$refs.table.upData(data)
        // },
        //添加
        add() {
            this.dialog.save = true
            this.$nextTick(() => {
                this.$refs.saveDialog.open().setData(this.usersData, this.prejectData)
            })
        },
        //编辑
        table_edit(row) {
            this.dialog.save = true
            console.log(row)

        },
        //查看
        table_show(row) {
            this.dialog.save = true
            console.log(row)
            // this.$nextTick(() => {
            //     // this.$refs.saveDialog.open('show').setData(row)
            // })
        },

        //批量删除
        async batch_del() {
            this.$confirm(`确定删除选中的 ${this.selection.length} 项吗？`, '提示', {
                type: 'warning'
            }).then(() => {
                const loading = this.$loading();
                this.selection.forEach(item => {
                    this.$refs.table.tableData.forEach((itemI, indexI) => {
                        if (item.id === itemI.id) {
                            this.$refs.table.tableData.splice(indexI, 1)
                        }
                    })
                })
                loading.close();
            }).catch(() => {

            })
        },
        //表格选择后回调事件
        selectionChange(selection) {
            this.selection = selection;
        },

        //本地更新数据
        handleSuccess(data, mode) {
            if (mode == 'add') {
                data.id = new Date().getTime()
                this.$refs.table.tableData.unshift(data)
            } else if (mode == 'edit') {
                this.$refs.table.tableData.filter(item => item.id === data.id).forEach(item => {
                    Object.assign(item, data)
                })
            }
        }
    }
}
</script>
