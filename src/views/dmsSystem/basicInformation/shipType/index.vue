<template>
    <scTable ref="table" v-loading="userLoading" :data="shipConfig.shipType" @selection-change="selectionChange" stripe remoteSort
        remoteFilter>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="船型" prop="value" width="150" sortable='custom'></el-table-column>
    </scTable>
</template>
<script>
import shipConfig from '@/config/ship'
export default {
    components: {
    },
    data() {
        return {
            data:[],
            shipConfig
        }
    },

}
</script>
