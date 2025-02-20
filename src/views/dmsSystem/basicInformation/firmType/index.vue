<template>
    <scTable ref="table" v-loading="userLoading" :data="firmConfig.firmType" @selection-change="selectionChange" stripe remoteSort
        remoteFilter>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="企业类型" prop="value" width="150" sortable='custom'></el-table-column>
    </scTable>
</template>
<script>
import firmConfig from '@/config/firm'
export default {
    components: {
    },
    data() {
        return {
            data:[],
            firmConfig
        }
    },

}
</script>
