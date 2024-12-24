<template>
    <el-row :gutter="40">
        <el-col v-if="!form.menu_id_">
            <el-empty description="请选择左侧菜单后操作" :image-size="100"></el-empty>
        </el-col>
        <template v-else>
            <el-col v-if="type == '目录'">
                <h2>{{ form.title || "目录详情" }}</h2>
                <el-form v-loading="loading" :model="form" :rules="rules" ref="dialogForm" label-width="80px"
                    label-position="left">
                    <el-form-item label="显示名称" prop="title_">
                        <el-input v-model="form.title_" clearable placeholder="菜单显示名字"></el-input>
                    </el-form-item>
                    <el-form-item label="上级菜单" prop="parent_id_">
                        <el-cascader v-model="form.parent_id_" :options="menuOptions" :props="menuProps"
                            :show-all-levels="false" placeholder="顶级菜单" clearable disabled>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="编码规则" prop="coding_rule_">
                        <el-input v-model="form.coding_rule_" clearable placeholder="编码规则"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :disabled="!$isButtonVisible" @click="save" :loading="loading">保 存</el-button>
                        <el-button type="primary" :disabled="!$isButtonVisible" @click="deleteButton" :loading="loading">删 除</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </template>
    </el-row>
</template>

<script>
import scIconSelect from '@/components/scIconSelect'
import { inject } from "vue";

export default {
    components: {
        scIconSelect
    },
    setup() {
        const refreshData = inject("refreshData");

        return {
            refreshData // 导出供 methods 中使用
        };
    },
    props: {
        menu: { type: Object, default: () => { } },
        type: {
            type: String,
            default: '目录' // 默认显示“图纸”
        }
    },
    data() {
        return {
            expands: [1],//只展开一行放入当前行id
            getRowKeys: (row) => {
                return row.eqId   //这里看这一行中需要根据哪个属性值是id
            },
            form: {
            },
            menuOptions: [],
            menuProps: {
                value: 'id',
                label: 'title',
                checkStrictly: true
            },
            rules: [],
            // drawingInfo: [],
            loading: false,
            drawingFind: {
                projec_id_: 1,
                drawing_menu_id_: 2
            },
            userInfo:[]
        }
    },
    watch: {
        menu: {
            handler() {
                this.menuOptions = this.treeToMap(this.menu)
            },
            deep: true
        }
    },
    computed: {
        drawingCategory() {
            return this.$route.name === 'drawingCategory';  // Replace with your actual route name
        },
        drawingInfo() {
            return this.$route.name === 'drawingInfo';  // Replace with your actual route name
        }
    },
    mounted () {
        this.userInfo = this.$TOOL.data.get("USER_INFO")
    },
    methods: {
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
        async deleteButton() {
            try {
                this.loading = true
                const subData = {
                    uuid_: this.form.uuid_
                }
                // let response = []
                if (this.drawingCategory) {
                    const res = await this.$dmsApi.drawingMenu.delete.post(subData)
                    if (res !== undefined) {
                        this.$message.success("删除成功")
                    } else {
                        this.$message.warning(res.message)
                    }
                } else if (this.drawingInfo) {
                   const res =  await this.$dmsApi.drawingMenuProject.delete.post(subData)
                    if (res !== undefined) {
                        this.$message.success("删除成功")
                    } else {
                        this.$message.warning(res.message)
                    }
                }
            } catch (error) {
                console.error('Error fetching file list:', error);
            } finally {
                this.refreshData()
                this.form = {}
                this.loading = false
            }
        },
        treeToMap(tree) {
            const map = []
            tree.forEach(item => {
                var obj = {
                    id: item.id,
                    parentId: item.parentId,
                    title: item.title,
                    // children: item.children && item.children.length > 0 ? this.treeToMap(item.children) : null
                }
                map.push(obj)
            })
            return map
        },
        //保存
        async save() {
            this.loading = true
            var res = []
            if (this.drawingCategory) {
                res = await this.$dmsApi.drawingMenu.update.post(this.form)
            } else if (this.drawingInfo) {
                res = await this.$dmsApi.drawingMenuProject.update.post(this.form)
            }

            this.loading = false
            if (res !== undefined) {
                this.refreshData()
            }
        },
        //表单注入数据
        setData(data, pid) {
            this.form = { ...data }
            console.log(data, pid, 'pid')
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
