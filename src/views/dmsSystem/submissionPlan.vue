<!-- 
 * @Descripttion: 右键简单组件演示文件
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年7月22日16:31:14
 * @LastEditors:   
 * @LastEditTime: -->


<template>
    <el-header class="header-tabs">
        <el-tabs type="card" v-model="groupId" @tab-change="tabChange">
            <el-tab-pane label="友奇（内部）" name="0"></el-tab-pane>
            <el-tab-pane label="船厂（外部）" name="1"></el-tab-pane>
            <el-tab-pane label="外派（外部）" name="4"></el-tab-pane>
        </el-tabs>
    </el-header>
    <el-main>
        <el-row :gutter="15">
            <el-col :lg="4">
                <el-card>
                    <el-tree style="max-width: 600px" :data="data" node-key="id" :default-expanded-keys="[1, 2, 3]"
                        :default-checked-keys="[42]" :props="defaultProps" />
                </el-card>
            </el-col>
            <el-col :lg="20">
                <el-card shadow="never">
                    <el-table ref="tableData" :data="tableData" highlight-current-row @row-contextmenu="rowContextmenu">
                        <el-table-column type="selection" width="50"></el-table-column>
                        <el-table-column prop="id" label="图号" width="100"></el-table-column>
                        <!-- <el-table-column prop="state2" label="送审交期" width="100"></el-table-column> -->
                        <!-- <el-table-column prop="stateA" label="文件状态" width="80">
                            <template #default="scope">
                                <el-link class="mx-1" :type="scope.row.stateA == 0 ? 'info'
                                    : scope.row.stateA == 1 ? 'success'
                                        : scope.row.stateA == 2 ? 'primary'
                                                : 'default'">
                                    {{ scope.row.stateA == 0 ? '未上传'
                                        : scope.row.stateA == 1 ? '已上传' : '未知' }}
                                </el-link>
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="state5" label="当前版本" width="80"></el-table-column>
                        <el-table-column prop="state4" label="上传时间" width="100"></el-table-column>
                        <el-table-column prop="state3" label="客户" width="80">
                            <template #default="scope">
                                <el-link class="mx-1" :type="scope.row.state3 == 0 ? 'info'
                                    : scope.row.state3 == 1 ? 'success'
                                        : scope.row.state3 == 2 ? 'primary'
                                            : scope.row.state3 == 3 ? 'danger'
                                                : 'default'">
                                    {{ scope.row.state3 == 0 ? '未送审'
                                        : scope.row.state3 == 1 ? '已送审'
                                            : scope.row.state3 == 2 ? '已退审'
                                                : scope.row.state3 == 3 ? '已通过'
                                                    : '未知' }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state3" label="船级社" width="80">
                            <template #default="scope">
                                <el-link class="mx-1" :type="scope.row.state3 == 0 ? 'info'
                                    : scope.row.state3 == 1 ? 'success'
                                        : scope.row.state3 == 2 ? 'primary'
                                            : scope.row.state3 == 3 ? 'danger'
                                                : 'default'">
                                    {{ scope.row.state3 == 0 ? '未送审'
                                        : scope.row.state3 == 1 ? '已送审'
                                            : scope.row.state3 == 2 ? '已退审'
                                                : scope.row.state3 == 3 ? '已通过'
                                                    : '不送审' }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state3" label="罐厂" width="80">
                            <template #default="scope">
                                <el-link class="mx-1" :type="scope.row.state3 == 0 ? 'info'
                                    : scope.row.state3 == 1 ? 'success'
                                        : scope.row.state3 == 2 ? 'primary'
                                            : scope.row.state3 == 3 ? 'danger'
                                                : 'default'">
                                    {{ scope.row.state3 == 0 ? '未送审'
                                        : scope.row.state3 == 1 ? '已送审'
                                            : scope.row.state3 == 2 ? '已退审'
                                                : scope.row.state3 == 3 ? '已通过'
                                                    : '不送审' }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state3" label="撬块厂" width="80">
                            <template #default="scope">
                                <el-link class="mx-1" :type="scope.row.state3 == 0 ? 'info'
                                    : scope.row.state3 == 1 ? 'success'
                                        : scope.row.state3 == 2 ? 'primary'
                                            : scope.row.state3 == 3 ? 'danger'
                                                : 'default'">
                                    {{ scope.row.state3 == 0 ? '未送审'
                                        : scope.row.state3 == 1 ? '已送审'
                                            : scope.row.state3 == 2 ? '已退审'
                                                : scope.row.state3 == 3 ? '已通过'
                                                    : '不送审' }}
                                </el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="图名" width="180"></el-table-column>

                    </el-table>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
    name: 'contextmenu',
    data() {
        return {
            row: null,
            data: [
                {
                    id: 1,
                    label: '总体部分',
                    children: [
                        { id: 1.1, label: 'General arrangement plan 总布置图（改造）' },
                        { id: 1.2, label: 'Tonnage Cal. 吨位计算书' },
                        { id: 1.3, label: 'Loading Manual 装载手册' },
                        { id: 1.4, label: 'Damage Stability Cal. 破舱稳性计算书' },
                        { id: 1.5, label: 'Damage Control Manual 破损控制手册' },
                        { id: 1.6, label: 'Damage Control Plan 破损控制图' },
                        { id: 1.7, label: 'Capacity Table 舱容表（改造）' },
                        { id: 1.8, label: 'Capacity Plan 舱容图（改造）' },
                        { id: 1.9, label: 'Fire Control & Safety Plan 防火控制安全图（改造）' },
                        { id: 1.10, label: 'GAS DANGEROUS ZONE 危险区域划分图（改造）' },
                        { id: 1.11, label: 'Visibility Plan 视线图' },
                        { id: 1.12, label: 'Inclining Experiment or Light Weight Measurement Procedure 倾斜试验或载重量测定规程（根据船级社要求）' },
                        { id: 1.13, label: 'Inclining Experiment or Light Weight Measurement Report 倾斜试验或称重试验报告（根据船级社要求）' },
                        { id: 1.14, label: 'Retrofit Gravity and Gravity Center Cal & Stability Evaluation Report 改装重量重心计算及稳性评估报告（根据船级社要求）' }
                    ]
                },
                {
                    id: 2,
                    label: '结构部分',
                    children: [
                        { id: 2.1, label: 'LPG tank saddle and reinforcement structure 液罐鞍座结构及加强结构图' },
                        { id: 2.2, label: 'LFSS room structure LFSS房间结构图' },
                        { id: 2.3, label: 'Reinforcement structure under main deck 反面加强结构图' },
                        { id: 2.4, label: 'FEM calculation of LPG tank saddle and reinforcement 液罐鞍座结构及加强结构有限元分析' }
                    ]
                },
                {
                    id: 3,
                    label: '舾装部分',
                    children: [
                        { id: 3.1, label: 'Equipment Number Cal 舾装数计算书（改造）' },
                        { id: 3.2, label: 'Fire Division Plan 防火结构划分图（改造）' }
                    ]
                },
                {
                    id: 4,
                    label: '轮机部分',
                    children: [
                        { id: 4.1, label: 'Engine Room Arrangement 机舱布置图（改造）' },
                        { id: 4.2, label: 'Sea water Cooling sys. 海水冷却管系原理图（改造）' },
                        { id: 4.3, label: 'Deck Spray sys 甲板喷淋系统原理图（改造）' },
                        { id: 4.4, label: 'Engine Room Compress Air sys 压缩空气管系原理图(改造)' },
                        { id: 4.5, label: 'Steam & Condensation Sys 蒸汽、凝水管系原理图（改造）' }
                    ]
                },
                {
                    id: 5,
                    label: '电气部分',
                    children: [
                        { id: 5.1, label: 'POWER EQUIPMENT ARRANGEMENT DIAGRAM 电力设备布置图（改造）' },
                        { id: 5.2, label: 'M/E REMOTE CONTROL SYSTEM DIAGRAM 主机遥控系统图（改造）' },
                        { id: 5.3, label: 'POWER LOADS ESTIMATING TABLE 电力负荷估算书（改造）' },
                        { id: 5.4, label: 'MAIN POWER SYSTEM DIAGRAM 电力一次系统图（改造）' },
                        { id: 5.5, label: 'SECONDARY POWER SYSTEM DIAGRAM 电力二次系统图（改造）' },
                        { id: 5.6, label: 'FIRE DETECTION & ALARM SYSTEM DIAGRAM 火警系统图（改造）' },
                        { id: 5.7, label: 'FIRE DETECTING & ALARM EQUIPMENT ARRANGEMENT DIAGRAM 火警系统设备布置图（改造）' },
                        { id: 5.8, label: 'INTERIOR COMMUNICATION SYSTEM DIAGRAM 内部通讯系统图（改造）' },
                        { id: 5.9, label: 'INTERCOMMUNICATION EQUIPMENT ARRANGEMENT DIAGRAM 内部通讯系统布置图（改造）' },
                        { id: 5.10, label: 'NORMAL LIGHTING SYSTEM DIAGRAM 正常照明系统图（改造）' },
                        { id: 5.11, label: 'EMERGENCY LIGHTING SYSTEM DIAGRAM 应急照明系统图（改造）' },
                        { id: 5.12, label: 'LIGHTING EQUIPMENT ARRANGEMENT DIAGRAM 照明系统设备布置图（改造）' },
                        { id: 5.13, label: 'MAIN CABLE WAY DIAGRAM 主干电缆走向图（改造）' },
                        { id: 5.14, label: 'ELECTRIC EQUIPMENT ARRANGEMENT DIAGRAM IN ECR 集控室电气设备布置图（改造）' },
                        { id: 5.15, label: 'ELECTRIC EQUIPMENT ARRANGEMENT DIAGRAM IN WHEEL HOUSE 驾驶室电气设备布置图（改造）' }
                    ]
                },
                {
                    id: 6,
                    label: 'P & I DIAGRAMS 管系仪表系统图',
                    children: [
                        { id: 6.1, label: 'Process and instrumentation symbols 流程及仪表符号图例' },
                        { id: 6.2, label: 'Electrical and instrumentation symbols 电气及仪表符号图例' },
                        { id: 6.3, label: 'P & I diagram, LPG Fuel Supply System, Deck Tank NO.1 LPG供气系统图,1号甲板罐' },
                        { id: 6.4, label: 'P & I diagram, LPG Fuel Supply System, Deck Tank NO.2 LPG供气系统图,2号甲板罐' },
                        { id: 6.5, label: 'P & I diagram, LPG Fuel Supply System, High Pressure Pump Skid LPG供气系统图，高压泵撬块' },
                        { id: 6.6, label: 'P & I diagram, LPG Fuel Supply System, FVT & Vent LPG供气系统图，燃气阀组&透气' },
                        { id: 6.7, label: 'P & I diagram, Auxiliary system, Fresh water (FW)/ glycol system 辅助系统-淡水/乙二醇系统图' },
                        { id: 6.8, label: 'P & I diagram, Auxiliary system, N2 Purging System 辅助系统-氮气系统图' },
                        { id: 6.9, label: 'P & I diagram, Auxiliary system, Instrument Air System 辅助系统-仪表空气系统图' },
                        { id: 6.10, label: 'P & I diagram, Safety system, ESD System 安全系统-应急切断系统图' },
                        { id: 6.11, label: 'P & I Diagram - Ventilation, Dual Fuel Ventilation System 双壁管通风系统图' },
                        { id: 6.12, label: 'P&I Diagram Cargo System Deck - Cargo Tank 2 液货系统甲板-2号货舱' }
                    ]
                },
                {
                    id: 7,
                    label: "PROCESS FLOW DIAGRAMS 流程图",
                    children: [
                        {
                            id: 7.1,
                            label: "LPG Fuel Supply System LPG供气系统流程图"
                        }
                    ]
                },
                {
                    id: 8,
                    label: "LIST 清单",
                    children: [
                        {
                            id: 8.1,
                            label: "Signal List 信号清单"
                        },
                        {
                            id: 8.2,
                            label: "List of Electrical Equipment in Hazardous Area 危险区域电气设备清单"
                        },
                        {
                            id: 8.3,
                            label: "List of Alarm, Shut down & Control Functions 报警切断及控制功能清单"
                        },
                        {
                            id: 8.4,
                            label: "Line List 管路清单"
                        },
                        {
                            id: 8.5,
                            label: "Equipment List 设备清单"
                        },
                        {
                            id: 8.6,
                            label: "Valve List 阀件清单"
                        },
                        {
                            id: 8.7,
                            label: "Instrument List 仪表清单"
                        }
                    ]
                },
                {
                    id: 9,
                    label: "Calculation and Report 计算书和报告",
                    children: [
                        {
                            id: 9.1,
                            label: "Fuel tank safety relief valve capacity calculations 燃料罐安全释放阀排量计算"
                        },
                        {
                            id: 9.2,
                            label: "Calculation of Pipe Wall Thickness 管路壁厚计算"
                        },
                        {
                            id: 9.3,
                            label: "COSCO (Guangdong) 84000 m3 LPG Carrier LFSS HAZID 危险源识别"
                        },
                        {
                            id: 9.4,
                            label: "COSCO (Guangdong) 84000 m3 LPG Carrier LFSS HAZOP 危险与可操作性分析"
                        },
                        {
                            id: 9.5,
                            label: "Filling Limits for Deck Fuel Tank 甲板燃料罐充装极限计算"
                        },
                        {
                            id: 9.6,
                            label: "Capacity Calculation - DW Ventilation System 双壁管通风容量计算"
                        }
                    ]
                },
                {
                    id: 10,
                    label: "STANDARD AND SPECIFICATION 标准及规格",
                    children: [
                        {
                            id: 10.1,
                            label: "Control philosophy, LPG Fuel Supply System 供气系统控制逻辑"
                        },
                        {
                            id: 10.2,
                            label: "Functional design specification 供气系统功能设计规格书"
                        }
                    ]
                },
                {
                    id: 11,
                    label: "SINGLE LINE and BLOCK DIAGRAM 单线及框图",
                    children: [
                        {
                            id: 11.1,
                            label: "Single line diagram, power 供电单线图"
                        },
                        {
                            id: 11.2,
                            label: "Block Diagram of LFSS Power System LFSS电力系统框图"
                        },
                        {
                            id: 11.3,
                            label: "Block Diagram of LFSS CAMS and ESD System LFSS控制报警及紧急切断系统框图"
                        },
                        {
                            id: 11.4,
                            label: "Block Diagram of N2 system 氮气系统框图"
                        },
                        {
                            id: 11.5,
                            label: "Block Diagram of LFSS Gas Detection System LFSS气体探测系统框图"
                        },
                        {
                            id: 11.6,
                            label: "LFSS Topology diagram 供液系统拓扑图"
                        },
                        {
                            id: 11.7,
                            label: "Cargo monitor alarm and safety guard 货物监测报警安全防护系统（改造）"
                        }
                    ]
                },
                {
                    id: 12,
                    label: "HOOK-UP DIAGRAMS 连接节点图",
                    children: []
                },
                {
                    id: 13,
                    label: "FUEL TANK 燃料罐",
                    children: [
                        {
                            id: 13.1,
                            label: "LPG Deck Tank General Arrangement LPG甲板罐总布置图"
                        },
                        {
                            id: 13.2,
                            label: "LPG Deck Tank Support Rings LPG甲板罐支撑环结构图"
                        },
                        {
                            id: 13.3,
                            label: "LPG Deck Tank Vacuum Rings & Swash Bulkhead LPG甲板罐真空环及止荡壁结构图"
                        },
                        {
                            id: 13.4,
                            label: "LPG Deck Tank Manhole and Pump Nozzle LPG甲板罐人孔及泵管结构图"
                        },
                        {
                            id: 13.5,
                            label: "LPG Deck Tank Presswood Arrangement LPG甲板罐承压木块布置图"
                        },
                        {
                            id: 13.6,
                            label: "LPG Deck Tank Lifting Lug Arrangement LPG甲板罐吊耳布置图"
                        },
                        {
                            id: 13.7,
                            label: "LPG Deck Tank Nozzle Arrangement LPG甲板罐管口布置图"
                        },
                        {
                            id: 13.8,
                            label: "LPG Deck Tank Pump Foundation LPG甲板罐泵基座结构图"
                        },
                        {
                            id: 13.9,
                            label: "LPG Deck Tank Permanent Saddle Structure LPG甲板罐永久鞍座结构图"
                        },
                        {
                            id: 13.10,
                            label: "LPG Deck Tank TCS Platform Structure LPG甲板罐TCS平台结构图"
                        },
                        {
                            id: 13.11,
                            label: "LPG Deck Tank General Data LPG甲板罐设计参数说明"
                        },
                        {
                            id: 13.12,
                            label: "LPG Deck Tank Thickness Calculation LPG甲板罐板厚计算书"
                        },
                        {
                            id: 13.13,
                            label: "LPG Deck Tank Buckling Analysis LPG甲板罐屈曲分析计算书"
                        },
                        {
                            id: 13.14,
                            label: "LPG Deck Tank Sloshing Analysis LPG甲板罐晃荡分析"
                        },
                        {
                            id: 13.15,
                            label: "LPG Deck Tank Opening Calculation LPG甲板罐开孔计算书"
                        },
                        {
                            id: 13.16,
                            label: "LPG Deck Tank FE Analysis of Structure Strength LPG甲板罐结构强度有限元分析"
                        },
                        {
                            id: 13.17,
                            label: "LPG Deck Tank Temperature FE Analysis of Saddle and Deck LPG甲板罐鞍座及底部甲板的温度场分析"
                        },
                        {
                            id: 13.18,
                            label: "LPG Deck Tank FEA of TCS Platform Structure TCS平台结构强度分析报告"
                        },
                        {
                            id: 13.19,
                            label: "LPG Deck Tank Lifting Lug Calculation LPG甲板罐吊耳强度校核报告"
                        }
                    ]
                },
                {
                    id: 14,
                    label: "ISOMETRICS 轴测图",
                    children: []
                },
                {
                    id: 15,
                    label: "MATERIAL TAKE OFF 材料清单",
                    children: []
                },
                {
                    id: 16,
                    label: "ARRANGEMENT DRAWING 布置图",
                    children: [
                        {
                            id: 16.1,
                            label: "TCS Piping & water spray Arrangement TCS管系及水喷淋布置"
                        }
                    ]
                },
                {
                    id: 17,
                    label: "PLOT PLANS 配置图",
                    children: [
                        {
                            id: 17.1,
                            label: "Electrical equipment in Hazardous Area 危险区域电气设备配置图"
                        }
                    ]
                },
                {
                    id: 18,
                    label: "PROCEDURE 程序",
                    children: [
                        {
                            id: 18.1,
                            label: "Commissioning programme 调试程序"
                        },
                        {
                            id: 18.2,
                            label: "Operation Manual 操作手册"
                        },
                        {
                            id: 18.3,
                            label: "LFSS gas trial programme LPG燃气系统气体试验大纲"
                        },
                        {
                            id: 18.4,
                            label: "LPG gas trial report LPG燃气系统气试报告"
                        },
                    ]
                },
            ],
            language: [
                {
                    value: '0',
                    label: '朱文广',
                },
                {
                    value: '1',
                    label: '王晓伟',
                },
            ],
            tableData: [
                {
                    id: 'PE01PID_001',
                    name: 'P&I Diagram Identification System系统图仪表图例符号',
                    date: '赵琦',
                    state: '范亚华',
                    stateA:0,
                    state1: '2021-10-10',
                    state2: '2021-10-18',
                    state3: 0,
                    state4: '2024-04-15',
                    state5: '/',
                    state7: '60'
                },
                {
                    id: 'PE01PID_001',
                    name: 'P&I Diagram Identification System系统图仪表图例符号',
                    date: '赵琦',
                    state: '范亚华',
                    stateA:1,
                    state1: '2022-09-11',
                    state2: '2023-04-23',
                    state3: 1,
                    state4: '2024-07-25',
                    state5: 'V2',
                    state7: '70'

                },
                {
                    id: 'PE01PID_001',
                    name: 'P&I Diagram Identification System系统图仪表图例符号',
                    date: '赵琦',
                    stateA:1,
                    state: '范亚华',
                    state1: '2023-05-12',
                    state2: '2021-07-18',
                    state3: 2,
                    state4: '2024-08-24',
                    state5: 'V3',
                    state7: '30'

                },
                {
                    id: 'PE01PID_001',
                    name: 'P&I Diagram Identification System系统图仪表图例符号',
                    date: '赵琦',
                    stateA:1,
                    state: '范亚华',
                    state1: '2023-05-12',
                    state2: '2021-07-18',
                    state3: 3,
                    state4: '2024-08-24',
                    state5: 'V4',
                    state7: '40'

                },
            ],
        }
    },
    mounted() {

    },
    methods: {
        open(name) {
            ElMessageBox.alert(`是否提交 ${name} 审批`, '提交', {
                // 如果你想禁用其自动聚焦
                // autofocus: false,
                confirmButtonText: 'OK',
                callback: (action) => {
                    ElMessage({
                        type: 'info',
                        message: `action: ${action}`,
                    })
                },
            })
        },
        triggerFileUpload() {
            this.fileInput.value.click();
        },
        rowContextmenu(row, column, event) {
            this.row = row
            this.$refs.table.setCurrentRow(row);
            this.$refs.contextmenu.openMenu(event)
        },
        openMenu(e) {
            this.row = null
            this.$refs.contextmenu.openMenu(e)
        },
        handleCommand(command) {
            this.$message('click on item ' + command)
            if (command == 'e') {
                this.row.state = 1
            }
        },
        visibleChange(visible) {
            if (!visible) {
                this.$refs.table.setCurrentRow();
            }
        }
    }
}
</script>

<style scoped>
.file-list {
    padding: 10px;
    width: 100%;
}

.file-card {
    width: 95%;
    display: flex;
    align-items: center;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
}

.file-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}

.file-info {
    display: flex;
    flex-direction: column;
}

.file-name {
    font-weight: bold;
}

.file-type {
    color: #909399;
}

.file-actions {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.file-actions a {
    padding: 0 10px;
}
</style>
