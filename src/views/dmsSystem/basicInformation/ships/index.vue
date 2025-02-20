<template>
    <scTable ref="table" v-loading="userLoading" :data="data" @selection-change="selectionChange" stripe remoteSort
        remoteFilter>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="船名" prop="fullname_" width="150" sortable='custom'></el-table-column>
        <el-table-column label="船号" prop="fullname_" width="150" sortable='custom'></el-table-column>
        <el-table-column label="船籍" prop="fullname_" width="150" sortable='custom'></el-table-column>
        <el-table-column label="船型" prop="email_" width="150" sortable='custom'></el-table-column>
        <el-table-column label="建造年份" prop="mobile_" width="150" sortable='custom'></el-table-column>
        <el-table-column label="备注" prop="status_" width="150" sortable='custom'></el-table-column>
    </scTable>
</template>
<script>

export default {
    components: {
    },
    data() {
        return {
            data:[]
        }
    },

}
</script>
