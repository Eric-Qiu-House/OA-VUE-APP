<template>
    <el-select 
        v-model="userInfo" 
        placeholder="选择负责人" 
        filterable 
        remote 
        :remote-method="searchUsers"
                @change="handleManagerChange">
        
        <el-option
            v-for="item in projectUserInfos"
            :key="item.id_"
            :label="item.fullname_"
            :value="item.id_" /> <!-- 关键：直接传整个 item 对象 -->
    </el-select>
</template>
<script>
import { ref } from 'vue';
import { getCurrentInstance } from 'vue';

export default {
    setup() {
        const userInfo = ref(null); // 改为 null 更合适，表示未选择
        const { proxy } = getCurrentInstance();
        const projectUserInfos = ref([]);

        // 搜索用户的函数
        const searchUsers = async (query) => {
            if (query !== '') {
                try {
                    const response = await proxy.$apiIAM.user.readDim.post({ userText: query });
                    if (response && Array.isArray(response)) {
                        projectUserInfos.value = response;
                    } else {
                        projectUserInfos.value = [];
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                    projectUserInfos.value = [];
                }
            } else {
                projectUserInfos.value = [];
            }
        };

        // 处理选择变化
        const handleManagerChange = (selectedValue) => {
            if (selectedValue) {
                // selectedValue 就是完整的 item 对象
                console.log('Selected User:', selectedValue);

                // 可以单独提取 id 和 name
                // const { id_, fullname_ } = selectedValue;

                // 触发事件并传递整个对象或需要的字段
                proxy.$emit('onUserInput', selectedValue);

                // 如果只想传部分数据
                // proxy.$emit('onUserInput', { id: id_, name: fullname_ });
            }
        };

        return {
            userInfo,
            projectUserInfos,
            searchUsers,
            handleManagerChange
        };
    },
};
</script>