<template>
    <el-main>
        <el-card>
            <div class="container">
    <!-- 假勤管理分组 -->
    <div class="group">
      <div class="group-title">假勤管理</div>
      <div class="button-container">
        <button v-for="(button, index) in leaveManagementButtons" :key="index" class="button">
          <div class="icon">{{ button.icon }}</div>
          <span>{{ button.label }}</span>
        </button>
      </div>
    </div>

    <!-- 人事管理分组 -->
    <div class="group">
      <div class="group-title">人事管理</div>
      <div class="button-container">
        <button v-for="(button, index) in hrManagementButtons" :key="index" class="button">
          <div class="icon">{{ button.icon }}</div>
          <span>{{ button.label }}</span>
        </button>
      </div>
    </div>

    <!-- 智能财务分组 -->
    <div class="group">
      <div class="group-title">智能财务</div>
      <div class="button-container">
        <button v-for="(button, index) in financeButtons" :key="index" class="button">
          <div class="icon">{{ button.icon }}</div>
          <span>{{ button.label }}</span>
        </button>
      </div>
    </div>
  </div>
        </el-card>
    </el-main>
</template>
<script>
export default {
  name: 'ApprovalPage',
  data() {
    return {
      leaveManagementButtons: [
        { label: '补卡申请', icon: '✓' },
        { label: '请假', icon: '✗' },
        { label: '出差', icon: '✎' },
        { label: '外出', icon: '+' },
        { label: '加班', icon: '–' }
      ],
      hrManagementButtons: [
        { label: '日常报销', icon: '👤' },
        { label: '差旅报销', icon: '👥' },
        { label: '付款单', icon: '🆔' },
        { label: '备用金', icon: '📅' },
        { label: '开票申请', icon: '📄' }
      ],
      financeButtons: [
        { label: '通用审批', icon: '💵' },
        { label: '物品申领', icon: '💳' },
        { label: '物品采购', icon: '🐷' },
        { label: '特殊用车', icon: '📈' },
        { label: '通知审批', icon: '⚙️' }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}
.group {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.group-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.button-container {
  display: flex;
  flex-wrap: wrap;
}
.button {
  flex: 1 1 18%; /* Adjusted to show 5 buttons per row */
  box-sizing: border-box;
  padding: 10px;
  margin: 5px;
  background-color: transparent;
  color: #007bff;
  text-align: center;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px; /* Adjust font size for icons */
}
.button:hover {
  background-color: #f0f0f0;
  color: #0056b3;
}
.icon {
  font-size: 24px; /* Adjust icon size */
  margin-right: 8px;
}
</style>