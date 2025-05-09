import config from "@/config"
import http from "@/utils/request"

export default {
    file: {
        readFileByFolderIdRouter: {
            url: `${config.PRO_FILE_URL}/proFile/file/readFileByFolderIdRouter`,
            name: "文件夹下的文件",
            post: async function () {
                return await http.post(this.url);
            }
        },
    },
    folder: {
        createUploadExcelRouter: {
            url: `${config.PRO_FILE_URL}/proFile/folder/createUploadExcelRouter`,
            name: "上传文件夹 批量新增",
            post: async function () {
                return await http.post(this.url);
            }
        },
        readFoldersByProjectNumberRouter: {
            url: `${config.PRO_FILE_URL}/proFile/folder/readFoldersByProjectNumberRouter`,
            name: "项目号 查询项目结构",
            post: async function () {
                return await http.post(this.url);
            }
        },
    }
}
