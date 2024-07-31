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
            <el-col :lg="12">
                <el-card shadow="never">
                    <scEcharts height="300px" :option="option"></scEcharts>
                </el-card>
            </el-col>
            <el-col :lg="12">
                <el-card shadow="never">
                    <scEcharts height="300px" :option="option2"></scEcharts>
                </el-card>
            </el-col>
            <el-col :lg="12">
                <el-card shadow="never">
                    <scEcharts height="300px" :option="option3"></scEcharts>
                </el-card>
            </el-col>
            <el-col :lg="12">
                <el-card shadow="never">
                    <scEcharts height="300px" :option="option33"></scEcharts>
                </el-card>
            </el-col>
            <el-col :lg="12">
                <el-card shadow="hover" header="初版-进度">
                    <div class="progress">
                        <el-progress type="dashboard" :percentage="85.5" :width="160">
                            <template #default="{ percentage }">
                                <div class="percentage-value">{{ percentage }}%</div>
                                <div class="percentage-label">当前进度</div>
                            </template>
                        </el-progress>
                    </div>
                </el-card>
            </el-col>
            <el-col :lg="12">
                <el-card shadow="hover" header="认可版-进度">
                    <div class="progress">
                        <el-progress type="dashboard" :percentage="85.5" :width="160">
                            <template #default="{ percentage }">
                                <div class="percentage-value">{{ percentage }}%</div>
                                <div class="percentage-label">当前进度</div>
                            </template>
                        </el-progress>
                    </div>
                </el-card>
            </el-col>

            <!-- 


			<el-col :lg="8">
				<el-card shadow="never">
					<scEcharts height="300px" :option="option4"></scEcharts>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<scEcharts height="300px" :option="option5"></scEcharts>
				</el-card>
			</el-col>
			<el-col :lg="8">
				<el-card shadow="never">
					<scEcharts height="300px" :option="option6"></scEcharts>
				</el-card>
			</el-col> -->
        </el-row>
    </el-main>
</template>

<script>
import scEcharts from '@/components/scEcharts';

/**
 * 引入组件 @/components/scEcharts
 * 组件内部会自动加载主题 @/components/scEcharts/echarts-theme-T.js
 * 支持props包括 height，width，option
 * 组件export百度Echarts所有方法，使用方式: new scEcharts[fun]
 */

export default {
    name: 'chart',
    components: {
        scEcharts
    },
    data() {
        return {
            option: {
                title: {
                    text: '图纸完成数量（总体）',
                    subtext: '初版 & 认可版',
                },
                grid: {
                    top: '80px'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: ['系统图', '流程图', '清单文件', '计算文件', '电气图', '连接图', '管系轴测图']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [10, 12, 16, 13, 14, 7, 6],
                    type: 'bar',
                    barWidth: '15px',
                },
                {
                    data: [5, 8, 6, 5, 4, 9, 5],
                    type: 'bar',
                    barWidth: '15px',
                }]
            },
            option2: {
                title: {
                    text: '完成数量（当月）',
                    subtext: '初版 & 任课表',
                },
                grid: {
                    top: '80px'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    data: ['系统图', '流程图', '清单文件', '计算文件', '电气图', '连接图', '管系轴测图']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [2, 3, 5, 2, 3, 7, 4],
                    type: 'line',
                },
                {
                    data: [4, 1, 5, 6, 7, 3, 1],
                    type: 'line',
                }]
            },
            option3: {
                title: {
                    text: '图纸状态分布',
                    subtext: '初版图',
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%', '60%'],
                        label: false,
                        data: [
                            { value: 50, name: '已完成' },
                            { value: 20, name: '将到期' },
                            { value: 15, name: '已超期' },
                            { value: 26, name: '未开始' }
                        ]
                    }
                ]
            },
            option33: {
                title: {
                    text: '图纸状态分布',
                    subtext: '认可版图',
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%', '60%'],
                        label: false,
                        data: [
                            { value: 20, name: '已完成' },
                            { value: 10, name: '将到期' },
                            { value: 5, name: '已超期' },
                            { value: 6, name: '未开始' },
                        ]
                    }
                ]
            },
            option4: {
                title: {
                    text: 'Radar Demo',
                    subtext: '基础雷达(属性)图',
                },
                tooltip: {
                    trigger: 'item'
                },
                radar: {
                    radius: 100,
                    center: ['50%', '55%'],
                    indicator: [
                        { name: '销售', max: 100 },
                        { name: '管理', max: 100 },
                        { name: '信息技术', max: 100 },
                        { name: '客服', max: 100 },
                        { name: '研发', max: 100 },
                        { name: '市场', max: 100 }
                    ]
                },
                series: [{
                    name: "SCUI",
                    type: 'radar',
                    areaStyle: {},
                    data: [
                        {
                            value: [74, 90, 95, 65, 80, 31],
                        }
                    ]
                }]
            },
            option5: {
                title: {
                    text: 'Kline Demo',
                    subtext: '基础K线图',
                },
                grid: {
                    top: '80px'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                xAxis: {
                    data: ['2017-10-23', '2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27', '2017-10-28', '2017-10-29', '2017-10-30'],
                },
                yAxis: {
                    scale: true,
                },
                series: [{
                    type: 'k',
                    data: [
                        [2213.19, 2199.31, 2191.85, 2224.63],
                        [2203.89, 2177.91, 2173.86, 2210.58],
                        [2170.78, 2174.12, 2161.14, 2179.65],
                        [2179.05, 2205.5, 2179.05, 2222.81],
                        [2212.5, 2231.17, 2212.5, 2236.07],
                        [2227.86, 2235.57, 2219.44, 2240.26],
                        [2242.39, 2246.3, 2235.42, 2255.21],
                        [2246.96, 2232.97, 2221.38, 2247.86]
                    ]
                }]
            },
            option6: {
                title: {
                    text: 'Gauge Demo',
                    subtext: '基础仪表盘',
                },
                series: [{
                    center: ['50%', '60%'],
                    type: 'gauge',
                    anchor: {
                        show: true,
                        showAbove: true,
                        size: 20,
                        itemStyle: {
                            borderWidth: 5
                        }
                    },
                    progress: {
                        show: true
                    },
                    data: [{
                        value: 70
                    }]
                }]
            }
        }
    }
}
</script>

<style scoped>
.progress {
    text-align: center;
}

.progress .percentage-value {
    font-size: 28px;
}

.progress .percentage-label {
    font-size: 12px;
    margin-top: 10px;
}
</style>
