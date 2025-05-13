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
        const projectPower = 'user';
        const rolePower = 'user';

        // 将多个值合并为一个对象提供出去
        provide('powerContext', {
            projectPower,
            rolePower
        });

        return {};
    }
};
</script>