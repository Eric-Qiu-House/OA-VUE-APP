<template>
    <el-drawer v-model="drawer" :title="drawerData.drawing_number_ + drawerData.drawing_name_" direction="ttb"
        :before-close="handleClose" :close-on-click-modal="false" size="auto">
        <span>文件上传!</span>
        {{ drawerData }}
        <el-form :model="fileData" label-width="auto" >
            <el-form-item label="上传人姓名">
                <el-input v-model="fileData.name" />
            </el-form-item>
            <el-form-item label="文件编号">
                <el-input v-model="fileData.name" />
            </el-form-item>
            <el-form-item label="文件名称">
                <el-input v-model="fileData.name" />
            </el-form-item>
            <el-form-item label="版号">
                <el-input v-model="input" style="width: 240px" placeholder="版本" />
                <div style="margin-top: 20px">
                    <el-radio-group v-model="radio2">
                        <el-radio-button label="升级小版本" value="0.1" />
                        <el-radio-button label="升级大版本" value="1" />
                    </el-radio-group>
                </div>
            </el-form-item>
            <el-form-item label="附件" prop="file4">
                <sc-upload-file v-model="fileData.file4" :limit="5" drag style="width: 100%">
                    <el-icon class="el-icon--upload"><el-icon-upload-filled /></el-icon>
                    <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                    </div>
                </sc-upload-file>
            </el-form-item>
        </el-form>
    </el-drawer>

</template>
<script>
export default {
    props: {
        drawerData: Object
    },
    data() {
        return {
            drawer: false,
            drawerTitle: '',
            radio2: '',
            fileData: {

            }
        }
    },
    methods: {
        open() {
            this.drawer = true
        }
    }
}
</script>