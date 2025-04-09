<template>
    <el-main>
        <el-row :gutter="15">
            <el-col :lg="3">
                <el-card header="基础资料">

                    <el-input v-model="filterText" style="width: 240px" placeholder="Filter keyword" />

                    <el-tree ref="treeRef" style="max-width: 600px" class="filter-tree" :data="treeData"
                        :props="defaultProps" default-expand-all :expand-on-click-node="false" :filter-node-method="filterNode" @node-click="handleMenuClick"/>

                </el-card>
            </el-col>
            <el-col :lg="21">
                <el-card>
                    <el-main class="nopadding">
                        <!-- 动态加载组件 -->
                        <component :is="currentComponent" :message="firmTypeMessage" @toggle-drawer="handleDrawerToggle"></component>
                    </el-main>
                </el-card>
            </el-col>
            <el-drawer v-model="drawer" title="I am the title" :with-header="false">
                <!-- 侧边栏-联系人信息 -->
                <contacts></contacts>
            </el-drawer>
        </el-row>
    </el-main>
</template>

<script>
import firm from '@/views/dmsSystem/basicInformation/firm'
import ships from '@/views/dmsSystem/basicInformation/ships'
import shipType from '@/views/dmsSystem/basicInformation/shipType'
import firmType from '@/views/dmsSystem/basicInformation/firmType'
import contacts from '@/views/dmsSystem/basicInformation/contacts'

export default {
    components: {
        firm,
        ships,
        shipType,
        firmType,
        contacts
    },
    data() {
        return {
            treeData: [
                {
                    id: 1,
                    label: '企业通讯录',
                    children: [
                        {
                            id: 4,
                            label: '船东',
                            component: "firm"
                        },
                        {
                            id: 4,
                            label: '船厂',
                            component: "firm"
                        },
                        {
                            id: 4,
                            label: '罐厂',
                            component: "firm"
                        },
                        {
                            id: 4,
                            label: '撬厂',
                            component: "firm"
                        },
                        {
                            id: 4,
                            label: '船级社',
                            component: "firm"
                        },
                        {
                            id: 4,
                            label: '设计院',
                            component: "firm"
                        },
                    ],
                },
                {
                    id: 2,
                    label: '类型配置',
                    children: [
                        {
                            id: 5,
                            label: '船舶类型',
                            component: "shipType"
                        },
                        {
                            id: 6,
                            label: '企业类型',
                            component: "firmType"
                        },
                    ],
                },
                {
                    id: 3,
                    label: '船舶资料',
                    component: "ships"
                },
            ],
            defaultProps: {
                children: 'children',
                label: 'label',
            },
            drawer: false,
            firmTypeMessage:'22',
            currentComponent: 'firm'  // 默认显示船东信息组件
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log('open', key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log('close', key, keyPath);
        },
        handleMenuClick(node) {
            console.log('当前点击的节点的 component:', node);
            this.currentComponent = node.component;  // 根据点击项更新当前显示的组件
            this.firmTypeMessage = node.label
        },
        handleDrawerToggle() {
            this.drawer = true
        }
    }
}
</script>
