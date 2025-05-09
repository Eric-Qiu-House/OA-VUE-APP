<template>
    <div style="margin-bottom: 30px;">
      <!-- 改进后的文本部分 -->
      <el-text class="mx-1" type="danger" style="font-size: 16px; line-height: 1.5;">
        市场项目：特殊说明
      </el-text>
      <br> <!-- 增加行间距 -->
      <el-text class="mx-1" type="primary" style="font-size: 16px; line-height: 1.5;">
         如还没有项目号，可以选择“8888”项目号，备注内填写项目号。
      </el-text>
      <br> <!-- 增加行间距 -->
      <el-text class="mx-1" type="danger" style="font-size: 16px; line-height: 1.5;">
        非项目工作：
      </el-text>
      <br> <!-- 增加行间距 -->
      <el-text class="mx-1" type="primary" style="font-size: 16px; line-height: 1.5;">
        选择“OTHER”,编号。
      </el-text>
    </div>
  
    <el-table :data="tableData" style="width: 100%" :row-style="{ fontSize: '16px' }" :cell-class-name="setCellClassName">
      <el-table-column prop="label" label="工作类型" width="120" />
      <el-table-column prop="text" label="工作描述" width="300" />
    </el-table>
  </template>
  
  <script setup>
  import config from '@/utils/projectBasicstInfo'
  const tableData = config.jobType
  
  // 设置单元格类名，用于区分两列的颜色
  const setCellClassName = ({ columnIndex }) => {
    if (columnIndex === 0) return 'work-type-column'
    if (columnIndex === 1) return 'work-desc-column'
  }
  </script>
  
  <style scoped>
  /* 更改默认的 element plus 样式 */
  ::v-deep .work-type-column {
    color: #303133; /* 深灰色 */
    font-weight: bold;
  }
  
  ::v-deep .work-desc-column {
    color: #606266; /* 中灰色 */
  }
  
  /* 表格整体字体大小 */
  ::v-deep .el-table__cell {
    font-size: 16px;
  }
  </style>