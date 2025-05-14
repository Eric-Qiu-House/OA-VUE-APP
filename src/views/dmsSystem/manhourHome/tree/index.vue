<template>
    <el-card header="项目编号">
        <el-tree style="max-width: 600px" :data="proTree" node-key="project_number_" :props="defaultProps" :expand-on-click-node="false"
            @node-click="handleNodeClick" @check-change="handleCheckChange" :filter-node-method="menuFilterNode"
            :show-checkbox="isMultipleSelection" highlight-current default-expand-all ref="projectTree" />
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
        isMultipleSelection: {
            type: Boolean,
            default: true, // 默认支持多选
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
            return data.project_number_.includes(value);
        },
        addRootNode(flatData) {
            return [
                {
                    project_number_: '选择全部',
                    children: flatData,
                },
            ];
        },
        handleNodeClick(data) {
            if (this.isMultipleSelection) {
                const checkedKeys = this.$refs.projectTree.getCheckedKeys();
                if (!checkedKeys.includes(data.project_number_)) {
                    this.$refs.projectTree.setCheckedKeys([data.project_number_]);
                }
            } else {
                this.$emit('proSend', data);
                console.log('选中的项目:', data.project_number_);
            }
        },
        handleCheckChange() {
            if (this.isMultipleSelection) {
                this.checkedKeys = this.$refs.projectTree.getCheckedKeys();
                this.emitCheckedKeys(); // 使用防抖后的函数，只在停止操作一段时间后触发
            }
        },
    },
};
</script>