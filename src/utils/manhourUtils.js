// src/utils/manhourUtils.js

import { isRestDay, getDetailedDateInfo } from '@/utils/holidayChecker';

/**
 * 合并工时数据 - 按照日期合并
 * @param {Array} manhourData - 工时数据
 * @returns {Array} 合并后的数据
 */
export function mergeManhourData(manhourData) {
    const mergedMap = new Map();

    manhourData.forEach(item => {
        const key = `${item.user_id_}-${item.record_date_}`;
        if (mergedMap.has(key)) {
            const existing = mergedMap.get(key);
            existing.hours_ += Number(item.hours_);
            existing.project_number_ = `${existing.project_number_}%${item.project_number_}`;
            existing.project_type_ = `${existing.project_type_}%${item.project_type_}`;
            existing.job_type_ = `${existing.job_type_}%${item.job_type_}`;
            existing.projectName = `${existing.projectName}%${item.projectName}`;
            existing.overtime = isRestDay(item.record_date_) ? existing.hours_ : Math.max(0, existing.hours_ - 8);
        } else {
            mergedMap.set(key, {
                ...item,
                hours_: Number(item.hours_),
                overtime: isRestDay(item.record_date_) ? Number(item.hours_) : Math.max(0, Number(item.hours_) - 8),
                lacktime: !isRestDay(item.record_date_) ? Math.max(0, 8 - Number(item.hours_)) : '0',
            });
        }
    });

    return Array.from(mergedMap.values());
}

/**
 * 合并工时数据 - 按照项目合并
 * @param {Array} manhourData - 工时数据
 * @returns {Array} 合并后的数据
 */
export function mergeManhourDataByProject(manhourData) {
    const mergedMap = new Map();

    manhourData.forEach(item => {
        const key = `${item.user_id_}-${item.project_number_}`;
        if (mergedMap.has(key)) {
            mergedMap.get(key).hours_ += Number(item.hours_);
            mergedMap.get(key).overtime += Number(item.overtime);
            mergedMap.get(key).project_type_ = `${mergedMap.get(key).project_type_}%${item.project_type_}`;
            mergedMap.get(key).job_type_ = `${mergedMap.get(key).job_type_}%${item.job_type_}`;
        } else {
            mergedMap.set(key, { ...item, hours_: Number(item.hours_) });
        }
    });

    return Array.from(mergedMap.values());
}

/**
 * 将数据转换为 CSV 格式
 * @param {Array} data - 数据数组
 * @param {String} selectedStat - 当前选择的统计方式
 * @returns {String} CSV 格式字符串
 */
export function convertToCSV(data, selectedStat) {
    let headersMap = {};

    // 根据 selectedStat 来决定 headersMap 的内容
    switch (selectedStat) {
        case 'manDay':
            headersMap = {
                '项目编号': 'project_number_',
                '项目名称' : 'projectName' ,
                '姓名': 'user_name_',
                '项目类型': 'project_type_label',
                '工作类型': 'job_type_label',
                '时间': 'record_date_',
                '单日工时': 'hours_',
                '加班工时': 'overtime',
                '缺失工时' : 'lacktime',
                '时间类型': 'detailedDateInfo'
            };
            break;

        case 'manProject':
            headersMap = {
                '项目编号': 'project_number_',
                '项目名称' : 'projectName' ,
                '姓名': 'user_name_',
                '项目类型': 'project_type_label',
                '工作类型': 'job_type_label',
                '总工时': 'hours_'
            };
            break;

        default:
            headersMap = {
                '项目编号': 'project_number_',
                '项目名称' : 'projectName' ,
                '姓名': 'user_name_',
                '项目类型': 'project_type_label',
                '工作类型': 'job_type_label',
                '时间': 'record_date_',
                '工时': 'hours_',
                '时间类型': 'detailedDateInfo'
            };
            break;
    }

    const headers = Object.keys(headersMap);

    // 根据字段映射生成行数据
    const rows = data.map(item =>
        headers.map(header => {
            const field = headersMap[header];
            // 如果字段是函数 (如时间类型 detailedDateInfo)，直接调用传入的函数
            return field === 'detailedDateInfo' ? getDetailedDateInfo(item.record_date_) : item[field];
        })
    );

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    return csvContent;
}
