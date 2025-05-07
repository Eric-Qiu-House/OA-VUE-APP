<template>
    <el-card header="项目编号">
        <el-tree
            style="max-width: 600px"
            :data="proTree"
            node-key="project_number_"
            :props="defaultProps"
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
            :filter-node-method="menuFilterNode"
            show-checkbox
            highlight-current
            default-expand-all
            ref="projectTree"
        />
    </el-card>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
    props: {
        proData: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            defaultProps: {
                label: 'project_number_',
                children: 'children',
            },
            checkedKeys: [],
            proTree: [],
        };
    },
    watch: {
        proData(val) {
            this.proTree = this.addRootNode(val);
        },
    },
    created() {
        this.proTree = this.addRootNode(this.proData);

        // 初始化防抖函数
        this.emitCheckedKeys = debounce(() => {
            this.$emit('proSend', this.checkedKeys);
        }, 300); // 可调节延迟时间（ms）
    },
    methods: {
        menuFilterNode(value, data) {
            if (!value) return true;
            return data.project_number_.indexOf(value) !== -1;
        },
        addRootNode(flatData) {
            return [
                {
                    project_number_: '选择全部',
                    children: flatData,
                },
            ];
        },
        handleNodeClick() {
            // 在使用 checkedKeys 前，确保它是一个有效的数组
            if (Array.isArray(this.checkedKeys)) {
                // 做一些必要的操作
                console.log('选中的项目:', this.checkedKeys);
            } else {
                console.error('checkedKeys 不是一个有效的数组');
            }
        },
        handleCheckChange() {
            this.checkedKeys = this.$refs.projectTree.getCheckedKeys();
            this.emitCheckedKeys(); // 使用防抖后的函数，只在停止操作一段时间后触发
        },
    },
};
</script>
