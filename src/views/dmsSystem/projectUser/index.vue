<template>
    <project></project>
</template>

<script>
import project from "@/views/dmsSystem/components/project/index.vue";
import { provide } from 'vue';

export default {
    name: 'ParentComponent',
    components: {
        project
    },
    setup() {
        // 使用 provide 提供 userType 数据
        provide('userType', 'user');
        return {}; // 如果没有其他内容需要返回，可以保留空对象
    },
};
</script>