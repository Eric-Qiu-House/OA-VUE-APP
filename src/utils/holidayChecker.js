// holidayChecker.js

const holidays = {
    "2024-01-01": "元旦",
    "2024-02-10": "春节",
    "2024-02-11": "春节",
    "2024-02-12": "春节",
    "2024-02-13": "春节",
    "2024-02-14": "春节",
    "2024-02-15": "春节",
    "2024-02-16": "春节",
    "2024-02-17": "春节",
    "2024-04-04": "清明节",
    "2024-04-05": "清明节",
    "2024-04-06": "清明节",
    "2024-05-01": "劳动节",
    "2024-05-02": "劳动节",
    "2024-05-03": "劳动节",
    "2024-05-04": "劳动节",
    "2024-05-05": "劳动节",
    "2024-06-08": "端午节",
    "2024-06-09": "端午节",
    "2024-06-10": "端午节",
    "2024-09-15": "中秋节",
    "2024-09-16": "中秋节",
    "2024-09-17": "中秋节",
    "2024-10-01": "国庆节",
    "2024-10-02": "国庆节",
    "2024-10-03": "国庆节",
    "2024-10-04": "国庆节",
    "2024-10-05": "国庆节",
    "2024-10-06": "国庆节",
    "2024-10-07": "国庆节",

    "2025-01-01": "元旦",
    "2025-01-28": "春节",
    "2025-01-29": "春节",
    "2025-01-30": "春节",
    "2025-01-31": "春节",
    "2025-02-01": "春节",
    "2025-02-02": "春节",
    "2025-02-03": "春节",
    "2025-02-04": "春节",
    "2025-04-04": "清明节",
    "2025-04-05": "清明节",
    "2025-04-06": "清明节",
    "2025-05-01": "劳动节",
    "2025-05-02": "劳动节",
    "2025-05-03": "劳动节",
    "2025-05-31": "端午节",
    "2025-06-01": "端午节",
    "2025-06-02": "端午节",
    "2025-09-06": "中秋节",
    "2025-10-01": "国庆节",
    "2025-10-02": "国庆节",
    "2025-10-03": "国庆节",
    "2025-10-04": "国庆节",
    "2025-10-05": "国庆节",
    "2025-10-06": "国庆节",
    "2025-10-07": "国庆节",
    "2025-10-08": "国庆节",
};

const workdays = {
    "2024-02-04": "春节调休",
    "2024-02-18": "春节调休",
    "2024-04-07": "清明调休",
    "2024-05-11": "劳动节调休",
    "2024-04-28": "劳动节调休",
    "2024-09-14": "中秋调休",
    "2024-09-29": "国庆调休",
    "2024-10-12": "国庆调休",

    "2025-01-26": "春节调休",
    "2025-02-08": "春节调休",
    "2025-04-27": "劳动节调休",
    "2025-09-28": "国庆调休",
    "2025-10-11": "国庆调休"
};
  
  /**
   * 检查日期是否为节假日
   * @param {Date|string} date - 日期对象或日期字符串（如 "2024-01-01"）
   * @returns {string|null} - 返回节假日名称或 null（非节假日）
   */
  function isHoliday(date) {
    const formattedDate = formatDate(date);
    return holidays[formattedDate] || null;
  }
  
  /**
   * 检查日期是否为调休日
   * @param {Date|string} date - 日期对象或日期字符串（如 "2024-02-17"）
   * @returns {string|null} - 返回调休说明或 null（非调休）
   */
  function isWorkday(date) {
    const formattedDate = formatDate(date);
    return workdays[formattedDate] || null;
  }
  
  /**
   * 检查日期是否为周末
   * @param {Date|string} date - 日期对象或日期字符串
   * @returns {boolean} - 是否为周末
   */
  function isWeekend(date) {
    const day = new Date(formatDate(date)).getDay();
    return day === 0 || day === 6;
  }
  
  /**
   * 格式化日期为 YYYY-MM-DD
   * @param {Date|string} date - 日期对象或日期字符串
   * @returns {string} - 格式化后的日期字符串
   */
  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  /**
   * 检查日期的类型（节假日、调休日、周末或工作日）
   * @param {Date|string} date - 日期对象或日期字符串
   * @returns {string} - 日期类型：节假日、调休日、周末、工作日
   */
  function getDateType(date) {
    const formattedDate = formatDate(date);
    if (holidays[formattedDate]) return `节假日: ${holidays[formattedDate]}`;
    if (workdays[formattedDate]) return `调休日: ${workdays[formattedDate]}`;
    if (isWeekend(formattedDate)) return "周末";
    return "工作日";
  }
  
  /**
   * 检查日期是否为休息日
   * @param {Date|string} date - 日期对象或日期字符串
   * @returns {boolean} - 是否为休息日（节日或周末）
   */
  function isRestDay(date) {
    const formattedDate = formatDate(date);
    if (holidays[formattedDate]) return true; // 节假日
    if (isWeekend(date) && !workdays[formattedDate]) return true; // 周末且不是调休日
    return false;
  }

  /**
 * 获取日期的详细信息
 * @param {Date|string} date - 日期对象或日期字符串
 * @returns {string} - 日期详细信息（周六/周日、节假日、调休日或普通工作日）
 */
function getDetailedDateInfo(date) {
    const formattedDate = formatDate(date);
  
    // 检查是否是节假日
    if (holidays[formattedDate]) {
      return `节假日: ${holidays[formattedDate]}`;
    }
  
    // 检查是否是调休日
    if (workdays[formattedDate]) {
    //   return `调休日: ${workdays[formattedDate]}`;
      return `调休-班`;
    }
  
    // 检查是否是周末
    const day = new Date(formattedDate).getDay();
    if (day === 6) {
      return "周六";
    }
    if (day === 0) {
      return "周日";
    }
  
    // 默认是普通工作日
    return "工作日";
  }
  
  // 导出方法
  export { isHoliday, isWorkday, isWeekend, getDateType, isRestDay, getDetailedDateInfo };
  