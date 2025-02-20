<template>
    <el-main>
        <el-row :gutter="15">
            <el-col :lg="3">
                <el-card header="基础资料">
                    <el-input v-model="filterText" style="width: 240px" placeholder="Filter keyword" />

                    <el-tree ref="treeRef" style="max-width: 600px" class="filter-tree" :data="treeData"
                        :props="defaultProps" default-expand-all :expand-on-click-node="false" :filter-node-method="filterNode" @node-click="handleMenuClick"/>

                    <el-col :span="12">
                        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                            @close="handleClose">
                            <!-- 使用 v-for 动态渲染菜单项 -->
                            <el-menu-item :index="item.index" v-for="item in menuItems" :key="item.index"
                                @click="handleMenuClick(item.component)">
                                <span>{{ item.name }}</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-card>
            </el-col>
            <el-col :lg="21">
                <el-card>
                    <el-main class="nopadding">
                        <!-- 动态加载组件 -->
                        <component :is="currentComponent" @toggle-drawer="handleDrawerToggle"></component>
                    </el-main>
                </el-card>
            </el-col>
            <el-drawer v-model="drawer" title="I am the title" :with-header="false">
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
            menuItems: [
                { index: "1", name: "船东", component: "firm" },
                { index: "2", name: "船厂", component: "firm" },
                { index: "3", name: "罐厂", component: "firm" },
                { index: "4", name: "撬厂", component: "firm" },
                { index: "5", name: "船级社", component: "firm" },
                { index: "6", name: "设计院", component: "firm" },
                { index: "7", name: "船舶信息", component: "ships" },
                { index: "8", name: "船型设置", component: "shipType" },
                { index: "9", name: "企业类型", component: "firmType" },
            ],
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
        },
        handleDrawerToggle() {
            this.drawer = true
        }
    }
}
</script>
