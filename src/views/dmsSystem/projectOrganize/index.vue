<template>

    <el-container>
        <el-header style="height: auto" class="header-tabs">
            <project-header @handleSend="handleSend" @proDialog="openDialogProject" />
        </el-header>

        <el-main>
            <el-row :gutter="15">
                <el-col :lg="3">
                    <pro-tree :proData="proData.data" @proSend="handleProSend" :isMultipleSelection="isMultipleSelection" />
                </el-col>
                <el-col :lg="21">
                    <el-card>
                        <user-table :prejectData="selectedProject" />
                    </el-card>
                </el-col>
            </el-row>
        </el-main>

    </el-container>

    <organize-edit v-if="dialogVisible" ref="saveDialog" @success="fetchUsers" @closed="dialogVisible = false" />

</template>

<script>
import OrganizeEdit from '@/views/dmsSystem/projectOrganize/dialog/organizeEdit.vue'
import UserTable from './userTable/index.vue'
import ProjectHeader from '@/views/dmsSystem/components/project/header/index.vue'
import ProTree from '@/views/dmsSystem/manhourHome/tree/index.vue'

export default {
    name: 'UserManagement',
    components: {
        OrganizeEdit,
        UserTable,
        ProjectHeader,
        ProTree
    },
    data() {
        return {
            dialogVisible: false,
            proData: [],
            selectedProject: {},
            isMultipleSelection: false,
            filterText: '',
            projectLoading: false,
            userLoading: false,
            usersData: [],
            postData: {}
        }
    },
    created() {
        // this.fetchProjectInfo()
    },
    watch: {
        filterText(val) {
            this.$refs.tree?.filter(val)
        }
    },
    methods: {
        handleSend(data) {
            this.proData = data
        },
        handleProSend(data) {
            console.log('接收的项目数据:', data)
            this.selectedProject = data
            this.postData = { project_id_: data.uuid_ }
            this.fetchUsers()
        },
        openDialogProject() {
            this.dialogVisible = true
        },
        // async fetchProjectInfo() {
        //     this.projectLoading = true
        //     try {
        //         this.proData = await this.$dmsApi.project.readAll.get()
        //     } catch (error) {
        //         console.error('获取项目信息失败：', error)
        //     } finally {
        //         this.projectLoading = false
        //     }
        // },
        async fetchUsers() {
            if (!this.selectedProject.uuid_) return

            this.userLoading = true
            try {
                // const userIds = await this.$dmsApi.projectUsershiproute.readId.post(this.postData)
                // // console.log(userIds,'userIdsuserIdsuserIdsuserIdsuserIdsuserIdsuserIdsuserIdsuserIdsuserIdsuserIds')
                // if (userIds && userIds.length > 0) {
                //     const reqData = userIds.data
                //     this.usersData = await this.$apiIAM.user.usersByUserIds.post(reqData)
                //     console.log(this.usersData,'this.usersData')
                // } else {
                //     this.usersData = []
                // }
            } catch (error) {
                console.error('获取用户列表失败：', error)
                this.usersData = []
            } finally {
                this.userLoading = false
            }
        },
        add() {
            this.dialogVisible = true
            this.$nextTick(() => {
                this.$refs.saveDialog.open().setData(this.usersData, this.selectedProject.uuid_)
            })
        },
        showDetail(row) {
            this.dialogVisible = true
            console.log('查看详情：', row)
        }
    }
}
</script>