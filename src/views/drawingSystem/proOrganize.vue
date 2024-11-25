<template>
    <el-main>
        <el-row :gutter="15">
            <el-col :lg="3">
                <el-card header="项目编号">
                    <el-tree style="max-width: 600px" :data="projectData" node-key="id_" :props="defaultProps"
                        @node-click="handleNodeClick" />
                </el-card>
            </el-col>
            <el-col :lg="21">
                <el-card shadow="never" header="">

                    <el-header class="header-tabs">
                        <el-tabs type="card" v-model="groupId" @tab-change="tabChange">
                            <el-tab-pane label="项目成员 - 23010" name="0"></el-tab-pane>
                            <el-tab-pane label="外部通讯录" name="1" disabled ></el-tab-pane>
                        </el-tabs>
                    </el-header>

                    <el-card shadow="never" header="">
                        <el-header>
                            <div class="left-panel">
                                <el-button type="primary" icon="el-icon-plus" @click="add"></el-button>
                            </div>
                            <div class="right-panel">
                                <div class="right-panel-search">
                                    <el-input v-model="search.name" placeholder="查询" clearable></el-input>
                                    <el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
                                </div>
                            </div>
                        </el-header>
                        <!-- {{ this.apiObj }} -->
                        <el-main class="nopadding" v-if="groupId == 0">
                            <scTable ref="table" :data="usersData" @selection-change="selectionChange" stripe remoteSort
                                remoteFilter>
                                <el-table-column type="selection" width="50"></el-table-column>
                                <el-table-column label="ID" prop="id_" width="80" sortable='custom'></el-table-column>
                                <!-- <el-table-column label="头像" width="80" column-key="filterAvatar"
						:filters="[{ text: '已上传', value: '1' }, { text: '未上传', value: '0' }]">
						<template #default="scope">
							<el-avatar :src="scope.row.avatar_" size="small"></el-avatar>
						</template>
</el-table-column> -->
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
                                <el-table-column label="姓名" prop="fullname_" width="150"
                                    sortable='custom'></el-table-column>
                                <el-table-column label="邮箱" prop="email_" width="150"
                                    sortable='custom'></el-table-column>
                                <el-table-column label="手机号码" prop="mobile_" width="150"
                                    sortable='custom'></el-table-column>
                                <el-table-column label="状态" prop="status_" width="150"
                                    sortable='custom'></el-table-column>
                                <el-table-column label="操作" fixed="right" align="right" width="160">
                                    <template #default="scope">
                                        <el-button-group>
                                            <el-popconfirm title="确定删除吗？" @confirm="table_del(scope.row, scope.$index)">
                                                <template #reference>
                                                    <el-button text type="primary" size="small">删除</el-button>
                                                </template>
                                            </el-popconfirm>
                                        </el-button-group>
                                    </template>
                                </el-table-column>

                            </scTable>
                        </el-main>
                        <el-main class="nopadding" v-if="groupId == 1" >

                            <scTable ref="table" :data="contactList" @selection-change="selectionChange1" stripe
                                remoteSort remoteFilter>
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

                </el-card>

            </el-col>
        </el-row>
    </el-main>
    <save-dialog v-if="dialog.save" ref="saveDialog" @success="handleSuccess"
        @closed="dialog.save = false"></save-dialog>

</template>

<script>
import saveDialog from './save'

export default {
    name: 'user',
    components: {
        saveDialog
    },
    data() {
        return {
            defaultProps: {
                label: 'project_number_',  // 将 `label` 字段映射为 `project_number_`
            },
            groupId: "0",
            contactList: [
                {
                    companyName: 'ABC 供应商有限公司',
                    contactName: '张三',
                    type: '供应商',
                    phone: '13800000001',
                    email: 'zhangsan@abc.com',
                },
                {
                    companyName: 'XYZ 设计院',
                    contactName: '李四',
                    type: '设计院',
                    phone: '13900000002',
                    email: 'lisi@xyz.com',
                },
                {
                    companyName: 'DEF 建筑公司',
                    contactName: '王五',
                    type: '承包商',
                    phone: '13700000003',
                    email: 'wangwu@def.com',
                },
                // 更多联系人信息
            ],
            dialog: {
                save: false
            },
            showGrouploading: false,
            groupFilterText: '',
            group: [],
            apiObj: [
                {
                    id_: 1,
                    account_: "user1",
                    fullname_: "DC管理员",
                    email_: "john.doe@example.com",
                    mobile_: "1234567890",
                    create_org_id_: "友奇",
                    expire_date_: "长期",
                    status_: "启用",
                    juese_: 'DC'
                },
                {
                    id_: 2,
                    account_: "user2",
                    fullname_: "赵琦",
                    email_: "jane.smith@example.com",
                    mobile_: "2345678901",
                    create_org_id_: "友奇",
                    expire_date_: "长期",
                    status_: "停用",
                    juese_: '二维设计'
                },
                {
                    id_: 3,
                    account_: "user3",
                    fullname_: "黄义",
                    email_: "alice.johnson@example.com",
                    mobile_: "3456789012",
                    create_org_id_: "友奇",
                    expire_date_: "长期",
                    status_: "启用",
                    juese_: '三维设计'
                },
                {
                    id_: 4,
                    account_: "user4",
                    fullname_: "陈维原",
                    email_: "bob.brown@example.com",
                    mobile_: "4567890123",
                    create_org_id_: "友奇",
                    expire_date_: "长期",
                    status_: "启用",
                    juese_: '电气'
                },
                {
                    id_: 5,
                    account_: "user5",
                    fullname_: "朱文广",
                    email_: "charlie.davis@example.com",
                    mobile_: "5678901234",
                    create_org_id_: "友奇",
                    expire_date_: "长期",
                    status_: "停用",
                    juese_: '工艺'
                },
                {
                    id_: 6,
                    account_: "user6",
                    fullname_: "袁永航",
                    email_: "diana.evans@example.com",
                    mobile_: "6789012345",
                    create_org_id_: "外部",
                    expire_date_: "2024-07-31",
                    status_: "启用",
                    juese_: '电气'
                },
                {
                    id_: 7,
                    account_: "user7",
                    fullname_: "陈相羽",
                    email_: "edward.franklin@example.com",
                    mobile_: "7890123456",
                    create_org_id_: "外部",
                    expire_date_: "2024-06-30",
                    status_: "启用",
                    juese_: '工艺'
                },
                {
                    id_: 8,
                    account_: "user8",
                    fullname_: "陈硕",
                    email_: "fiona.green@example.com",
                    mobile_: "8901234567",
                    create_org_id_: "外部",
                    expire_date_: "2024-05-31",
                    status_: "停用",
                    juese_: '自动化'
                },
                {
                    id_: 9,
                    account_: "user9",
                    fullname_: "陆智杰",
                    email_: "george.harris@example.com",
                    mobile_: "9012345678",
                    create_org_id_: "友奇",
                    expire_date_: "长期",
                    status_: "启用",
                    juese_: '计算'
                },
                {
                    id_: 10,
                    account_: "user10",
                    fullname_: "郑昊",
                    email_: "hannah.irving@example.com",
                    mobile_: "0123456789",
                    create_org_id_: "友奇",
                    expire_date_: "长期",
                    status_: "停用",
                    juese_: '计算'
                }
            ],
            selection: [],
            search: {
                name: null
            },
            projectData: [],
            usersData: []
        }
    },
    // async created() {
    //     // try {
    //     //     const list = await this.$API.news.list.get();
    //     //     this.apiObj = list; // 更新组件的数据
    //     // } catch (error) {
    //     //     console.error("Error fetching user list:", error);
    //     // }
    // },
    watch: {
        // groupFilterText(val) {
        //     this.$refs.group.filter(val);
        // }
    },
    created() {
        this.getProjectInfo()
    },
    methods: {
        // 点击：项目编号
        async handleNodeClick(nodeData) {
            const postData = {
                project_id_: nodeData.uuid_
            }
            try {
                const userIds = await this.$dmsApi.projectUsershiproute.readId.post(postData)
                if (userIds) {
                    this.usersData = await this.$apiIAM.user.usersByUserIds.post(userIds)
                } else {
                    console.log('User not found');
                    return null;
                }
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        },
        async getProjectInfo() {
            try {
                this.projectData = await this.$dmsApi.project.readAll.get()
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        },
        selectionChange1(val) {
            console.log('选中的行：', val);
        },
        getTagType(type) {
            switch (type) {
                case '供应商':
                    return 'success';
                case '设计院':
                    return 'warning';
                case '承包商':
                    return 'info';
                default:
                    return 'primary';
            }
        },
        tabChange(name) {
            var params = {
                groupId: name
            }
            this.$refs.table.reload(params)
        },
        filterChange(data) {
            this.$refs.table.upData(data)
        },
        //添加
        add() {
            this.dialog.save = true
            this.$nextTick(() => {
                this.$refs.saveDialog.open()
            })
        },
        //编辑
        table_edit(row) {
            this.dialog.save = true
            console.log(row)
            // this.$nextTick(() => {
            //     // this.$refs.saveDialog.open('edit').setData(row)
            // })
        },
        //查看
        table_show(row) {
            this.dialog.save = true
            console.log(row)
            // this.$nextTick(() => {
            //     // this.$refs.saveDialog.open('show').setData(row)
            // })
        },
        //删除
        async table_del(row, index) {
            var reqData = { id: row.id }
            var res = await this.$API.demo.post.post(reqData);
            if (res.code == 200) {
                //这里选择刷新整个表格 OR 插入/编辑现有表格数据
                this.$refs.table.tableData.splice(index, 1);
                this.$message.success("删除成功")
            } else {
                this.$alert(res.message, "提示", { type: 'error' })
            }
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
                this.$message.success("操作成功")
            }).catch(() => {

            })
        },
        //表格选择后回调事件
        selectionChange(selection) {
            this.selection = selection;
        },
        //加载树数据
        // async getGroup() {
        //     this.showGrouploading = true;
        //     var res = await this.$API.system.dept.list.get();
        //     this.showGrouploading = false;
        //     var allNode = { id: '', label: '所有' }
        //     res.data.unshift(allNode);
        //     this.group = res.data;
        // },
        //树过滤
        groupFilterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        //树点击事件
        groupClick(data) {
            var params = {
                groupId: data.id
            }
            this.$refs.table.reload(params)
        },
        //搜索
        upsearch() {
            this.$refs.table.upData(this.search)
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

<style></style>
