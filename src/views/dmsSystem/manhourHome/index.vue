<template>
    <el-main>
        <el-row :gutter="15">
            <el-col :lg="3">
                <el-card header="项目编号">
                    <el-input placeholder="输入编号进行过滤" v-model="filterText" clearable></el-input>
                    <el-tree v-loading="proNumLoading" style="max-width: 600px" :data="projectData"
                        node-key="project_number_" :props="defaultProps" @node-click="handleNodeClick" highlight-current
                        default-expand-all @check-change="handleCheckChange" :filter-node-method="menuFilterNode"
                        :model="checkedKeys" show-checkbox ref="projectTree" />
                </el-card>
            </el-col>
            <el-col :lg="21">
                <el-card>
                    <!-- <button @click="oooo()">1111</button> -->
                    <!-- <el-text class="mx-1" tag="b" size="large" v-if="submitData.project_number_">
                        {{ submitData.project_number_ + ' - ' + submitData.project_name_ }}
                    </el-text> -->
                    <el-form :label-width="'100px'">
                        <!-- 第一行：查询 -->
                        <el-form-item label="查询：" style="width: 500px;">
                            <el-date-picker v-model="timeHorizon" type="daterange" range-separator="To" clearable
                                value-format="YYYY-MM-DD" start-placeholder="Start date" end-placeholder="End date" />
                        </el-form-item>

                        <!-- 第二行：统计方式 -->
                        <!-- <el-form-item label="统计方式：">
                            <el-button type="warning" @click="resetFun()">重置</el-button>
                            <el-button type="primary" @click="manDay()" style="margin-right: 10px;">
                                人/天【统计】
                            </el-button>
                            <el-button type="primary" @click="manProject()">
                                人/项目【统计】
                            </el-button>
                        </el-form-item> -->

                        <el-form-item label="统计方式：">

                            <el-link type="warning" :underline="false" @click="resetFun()"
                                style="margin-right: 20px;">重置</el-link>
                            <el-radio-group v-model="selectedStat">
                                <el-radio label="manDay" @click="manDay()">人/天【统计】</el-radio>
                                <el-radio label="manProject" @click="manProject()">人/项目【统计】</el-radio>
                            </el-radio-group>
                            <!-- <el-button type="success"  :icon="Close" circle @click="resetFun()"></el-button> -->
                            <!-- <el-button type="success" :icon="Check" circle /> -->
                            <!-- <el-icon><Close /></el-icon> -->
                        </el-form-item>

                        <!-- 第三行：操作 -->
                        <el-form-item label="操作：">
                            <el-button type="primary" icon="el-icon-plus" @click="dataExport">
                                数据导出
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <!-- {{ manhourData }} -->
                    <el-table v-loading="manhoursLoading" ref="manhourData" :data="displayedData"
                        @selection-change="selectionChange" stripe remote-sort remote-filter max-height="700px">

                        <!-- 序号列 -->
                        <el-table-column label="序号" width="60">
                            <template #default="scope">
                                {{ scope.$index + 1 }}
                            </template>
                        </el-table-column>

                        <!-- 项目编号列 -->
                        <el-table-column label="项目" prop="project_number_" width="150"
                            sortable="custom"></el-table-column>

                        <el-table-column label="项目名称" prop="projectName" width="150"
                            sortable="custom"></el-table-column>

                        <!-- 姓名列 -->
                        <el-table-column label="姓名" prop="user_name_" width="150" sortable="custom"></el-table-column>

                        <!-- 项目类型列 -->
                        <el-table-column label="项目类型" prop="project_type_label" width="150"
                            sortable="custom"></el-table-column>

                        <!-- 工作类型列 -->
                        <el-table-column label="工作类型" prop="job_type_label" width="150"
                            sortable="custom"></el-table-column>

                        <!-- 时间列 -->
                        <el-table-column v-if="selectedStat !== 'manProject'" label="时间" prop="record_date_" width="150"
                            sortable="custom"></el-table-column>

                        <!-- 工时列 -->
                        <el-table-column label="工时" prop="hours_" width="150" sortable="custom"></el-table-column>

                        <!-- 加班工时列 -->
                        <el-table-column v-if="selectedStat == 'manDay'" label="加班工时" prop="overtime" width="150"
                            sortable="custom"></el-table-column>
                        <el-table-column v-if="selectedStat == 'manDay'" label="缺失工时" prop="lacktime" width="150"
                            sortable="custom"></el-table-column>


                        <!-- 时间类型列 -->
                        <el-table-column v-if="selectedStat !== 'manProject'" label="时间类型" prop="overtime1" width="150"
                            sortable="custom">
                            <template #default="scope">
                                <span>{{ detailedDateInfo(scope.row.record_date_) }}</span>
                            </template>
                        </el-table-column>

                        <!-- 工作类型列 -->
                        <el-table-column v-if="selectedStat.length == 0" label="备注" prop="remark_" width="150"
                            sortable="custom"></el-table-column>

                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
    <organize-edit ref="saveDialog"></organize-edit>

</template>

<script>
import organizeEdit from '@/views/dmsSystem/projectOrganize/dialog/organizeEdit.vue'
import { mergeManhourData, mergeManhourDataByProject, convertToCSV } from '@/utils/manhourUtils';

import { isRestDay, getDetailedDateInfo } from '@/utils/holidayChecker';
export default {
    data() {
        return {
            defaultProps: {
                label: 'project_number_', // 显示字段为 `project_number_`
                children: 'children', // 子节点字段为 `children`
            },
            projectId: '',
            filterText: '',
            timeHorizon: [],
            selectedStat: '',
            selection: [],
            projectData: [], // 树形结构的项目数据
            manhourData: [], // 原始数据
            displayedData: [], // 表格显示数据
            proNumLoading: false,
            manhoursLoading: false,
            submitData: {},
            projectInfo: {},
            checkedKeys: [],
            dialog: {
                save: false
            },
            overtimeState: false

        };
    },
    components: {
        organizeEdit
    },
    created() {
        this.getProjectInfo();
    },
    watch: {
        filterText(val) {
            this.$refs.projectTree.filter(val);
        },
        checkedKeys() {
            // console.log('选中节点变化了:');
            // console.log('新的值:', newVal);
            // console.log('旧的值:', oldVal);
            this.selectedStat = ''; // 清空选中的统计方式
            this.handleNodeClick()
            // 可以在这里执行其他逻辑
        },
        timeHorizon() {
            this.selectedStat = ''; // 清空选中的统计方式
            this.handleNodeClick()
        }
    },
    methods: {
        //树过滤
        menuFilterNode(value, data) {
            if (!value) return true;
            var targetText = data.project_number_;
            return targetText.indexOf(value) !== -1;
        },
        resetFun() {
            // this.timeHorizon = [];
            this.selectedStat = ''; // 清空选中的统计方式
            this.overtimeState = false
            this.handleNodeClick()
        },
        handleDateChange(value) {
            if (value && Array.isArray(value)) {
                // 只保留年月日部分
                this.value1 = this.value.map(date => date ? date.split('T')[0] : '');
            }
        },
        detailedDateInfo(date) {
            return getDetailedDateInfo(date);
        },
        manDay() {
            // 调用合并方法并更新显示数据
            // this.overtimeState = true
            // this.displayedData = this.mergeManhourData();
            this.displayedData = mergeManhourData(this.manhourData);
        },

        // 合并工时数据的方法
        // mergeManhourData() {
        //     const mergedMap = new Map();

        //     this.manhourData.forEach(item => {
        //         const key = `${item.user_id_}-${item.record_date_}`;

        //         if (mergedMap.has(key)) {
        //             const existing = mergedMap.get(key);
        //             existing.hours_ += Number(item.hours_); // 累加工时
        //             existing.project_number_ = `${existing.project_number_}%${item.project_number_}`;
        //             existing.project_type_ = `${existing.project_type_}%${item.project_type_}`;
        //             existing.job_type_ = `${existing.job_type_}%${item.job_type_}`;

        //             // 更新加班工时，基于累加后的 hours_
        //             existing.overtime = isRestDay(item.record_date_)
        //                 ? existing.hours_
        //                 : Math.max(0, existing.hours_ - 8);
        //         } else {
        //             // 初始化并设置加班工时
        //             mergedMap.set(key, {
        //                 ...item,
        //                 hours_: Number(item.hours_),
        //                 overtime: isRestDay(item.record_date_)
        //                     ? Number(item.hours_)
        //                     : Math.max(0, Number(item.hours_) - 8),
        //             });
        //         }
        //     });

        //     // 返回合并后的数据
        //     return Array.from(mergedMap.values());
        // },


        manPeriod() {
            const mergedMap = new Map();
            this.mergeManhourData.forEach(item => {
                const key = `${item.user_id_}`;
                if (mergedMap.has(key)) {
                    mergedMap.get(key).hours_ += Number(item.hours_);
                    mergedMap.get(key).overtime += Number(item.overtime);
                    mergedMap.get(key).project_type_ = `${mergedMap.get(key).project_type_}%${item.project_type_}`;
                    mergedMap.get(key).job_type_ = `${mergedMap.get(key).job_type_}%${item.job_type_}`;
                } else {
                    mergedMap.set(key, { ...item, hours_: Number(item.hours_) });
                }
            });
            this.overtimeState = true
            this.displayedData = [...Array.from(mergedMap.values())]; // 更新显示数据
        },

        manProject() {
            this.displayedData = mergeManhourDataByProject(this.manhourData);
            // const mergedMap = new Map();
            // this.manhourData.forEach(item => {
            //     const key = `${item.user_id_}-${item.project_number_}`;
            //     if (mergedMap.has(key)) {
            //         mergedMap.get(key).hours_ += Number(item.hours_);
            //         mergedMap.get(key).overtime += Number(item.overtime);
            //         mergedMap.get(key).project_type_ = `${mergedMap.get(key).project_type_}%${item.project_type_}`;
            //         mergedMap.get(key).job_type_ = `${mergedMap.get(key).job_type_}%${item.job_type_}`;
            //     } else {
            //         mergedMap.set(key, { ...item, hours_: Number(item.hours_) });
            //     }
            // });
            // this.overtimeState = true
            // this.displayedData = [...Array.from(mergedMap.values())]; // 更新显示数据
        },
        isRestDay(date) {
            return isRestDay(date); // 使用插件中的方法判断是否为休息日
        },
        oooo() {
            this.$refs.saveDialog.open1()
        },
        handleCheckChange() {
            // console.log('当前变化的节点:', checkedNode);
            // console.log('是否被选中:', checked);
            // console.log('是否半选中:', indeterminate);

            // 获取所有选中的节点
            // const checkedNodes = this.$refs.projectTree.getCheckedNodes();
            // console.log('选中的完整节点:', checkedNodes);

            // 获取所有选中节点的 key
            this.checkedKeys = this.$refs.projectTree.getCheckedKeys();
            // console.log('选中的节点 ID:', this.checkedKeys);
        },
        /**
         * 获取项目编号数据，并添加虚拟根节点
         */
        async getProjectInfo() {
            this.proNumLoading = true;
            try {
                const flatData = await this.$dmsApi.project.readAll.get();
                this.projectInfo = await this.$dmsApi.project.readAll.get();
                // 添加虚拟根节点
                this.projectData = this.addRootNode(flatData);
            } catch (error) {
                console.error("Error fetching project data:", error);
            } finally {
                this.proNumLoading = false;
            }
        },

        /**
         * 为平铺数据添加根节点
         * @param {Array} flatData - 平铺数据
         * @returns {Array} 树形结构数据
         */
        addRootNode(flatData) {
            // 构建树形结构
            // const treeData = this.buildTree(flatData);

            // 添加根节点
            return [
                {
                    // project_number_: 0,
                    project_number_: '所有项目',
                    children: flatData,
                },
            ];
        },

        /**
         * 构造树形结构
         * @param {Array} flatData - 平铺数据
         * @returns {Array} 树形结构数据
         */
        buildTree(flatData) {
            const idMap = {};
            const tree = [];

            // 创建节点引用
            flatData.forEach((item) => {
                idMap[item.id_] = { ...item, children: [] };
            });

            // 构造父子关系
            flatData.forEach((item) => {
                const parent = idMap[item.parent_id];
                if (parent) {
                    parent.children.push(idMap[item.id_]);
                } else {
                    tree.push(idMap[item.id_]);
                }
            });

            return tree;
        },

        /**
         * 点击树节点：项目编号 - 生成工时数据
         */
        async handleNodeClick() {
            console.log(this.projectData[0].children,'this.projectData.children.this.projectData.children.')
            // this.projectId = nodeData.uuid_;
            this.submitData = {
                project_number_: this.checkedKeys,
                ...(this.timeHorizon != null ? {
                    start_date: this.timeHorizon[0],
                    end_date: this.timeHorizon[1]
                } : {})
            };
            this.manhoursLoading = true;
            try {
                const data = await this.$dmsApi.manHours.readFieldConversion.post(this.submitData);
                data.forEach(row => {
                    // 找到对应的项目数据
                    const project = this.projectData[0].children.find(project => project.project_number_ === row.project_number_);

                    // 如果找到了对应的项目，就添加 projectName 字段
                    if (project) {
                        row.projectName = project.project_name_;  // 添加 projectName 字段
                    } else {
                        row.projectName = '';  // 如果没有找到匹配的项目，则给项目名称赋值为空
                    }
                });
                this.manhourData = data;
                this.displayedData = [...data]; // 初始化表格数据为原始数据
                this.$nextTick(() => {
                    // console.log(this.manhourData, 'this.manhourData');
                });
            } catch (error) {
                console.error("Error fetching manhours data:", error);
            } finally {
                this.manhoursLoading = false;
            }
        },

        /**
         * 导出工时数据
         */
        async dataExport() {
            try {
                const csvData = convertToCSV(this.displayedData, this.selectedStat);
                // console.log(csvData,'csvDatacsvDatacsvDatacsvDatacsvDatacsvData')
                const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.setAttribute('download', 'displayedData.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error("Error exporting data:", error);
            }
        },

        // 将 displayedData 转换为 CSV 格式的字符串
        // convertToCSV(data) {
        //     const selectedStat = this.selectedStat;

        //     // 定义表头及其对应的字段映射
        //     const headersMap = selectedStat === 'manDay'
        //         ? { '项目编号': 'project_number_', '姓名': 'user_name_', '项目类型': 'project_type_label', '工作类型': 'job_type_label', '时间': 'record_date_', '单日工时': 'hours_', '加班工时': 'overtime', '时间类型': 'detailedDateInfo' }
        //         : selectedStat === 'manProject'
        //             ? { '项目编号': 'project_number_', '姓名': 'user_name_', '项目类型': 'project_type_label', '工作类型': 'job_type_label', '总工时': 'hours_' }
        //             : { '项目编号': 'project_number_', '姓名': 'user_name_', '项目类型': 'project_type_label', '工作类型': 'job_type_label', '时间': 'record_date_', '工时': 'hours_', '时间类型': 'detailedDateInfo' };

        //     // 提取表头
        //     const headers = Object.keys(headersMap);

        //     // 根据字段映射生成行数据
        //     const rows = data.map(item =>
        //         headers.map(header => {
        //             const field = headersMap[header];
        //             // 如果字段是函数 (如时间类型 detailedDateInfo)，调用函数生成数据
        //             return typeof this[field] === 'function' ? this[field](item.record_date_) : item[field];
        //         })
        //     );

        //     // 拼接表头和数据
        //     const csvContent = [
        //         headers.join(','), // 表头
        //         ...rows.map(row => row.join(',')) // 数据行
        //     ].join('\n');

        //     return csvContent;
        // },

        // async dataExport() {
        //     try {
        //         this.submitData = {
        //             project_uuid_: this.projectId,
        //         };
        //         const response = await this.$dmsApi.manHours.readByProjectManhoursCsv.post(this.submitData);
        //         const url = window.URL.createObjectURL(new Blob([response]));
        //         const link = document.createElement('a');
        //         link.href = url;
        //         link.setAttribute('download', 'project_manhours.csv');
        //         document.body.appendChild(link);
        //         link.click();
        //     } catch (error) {
        //         console.error("Error exporting manhours data:", error);
        //     }
        // },

        /**
         * 表格选择后回调事件
         */
        selectionChange(selection) {
            this.selection = selection;
        },
    },
};
</script>
