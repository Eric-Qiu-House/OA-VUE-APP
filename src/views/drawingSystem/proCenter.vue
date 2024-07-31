<template>
  <el-container>
    <el-header class="header-tabs">
      <el-tabs type="card" v-model="groupId" @tab-change="tabChange">
        <el-tab-pane label="所有" name="0"></el-tab-pane>
        <el-tab-pane label="未完成" name="1"></el-tab-pane>
        <el-tab-pane label="已完成" name="4"></el-tab-pane>
        <el-tab-pane label="已关闭" name="3"></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-header>
      <div class="left-panel">
        <el-button type="primary" icon="el-icon-plus"></el-button>
        <el-button type="danger" plain icon="el-icon-delete"></el-button>
      </div>
      <div class="right-panel">
        <div class="right-panel-search">
          <el-input v-model="search.keyword" placeholder="关键词" clearable></el-input>
          <el-button type="primary" icon="el-icon-search" @click="upsearch"></el-button>
        </div>
      </div>
    </el-header>
    <el-header style="height: auto;">
      <scTable ref="list" :data="list" row-key="id" stripe>
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="项目号" prop="name" width="100"></el-table-column>
        <el-table-column label="项目名称" prop="sex" width="150"></el-table-column>
        <el-table-column label="项目经理" prop="xmjl" width="150">
          <template #default>
            <el-select v-model="list.xmjl" placeholder="Select" style="width: 120px">
              <el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="船东" prop="cd" width="150"></el-table-column>
        <el-table-column label="船厂" prop="cc" width="150"></el-table-column>
        <el-table-column label="项目开始" prop="email" width="120"></el-table-column>
        <el-table-column label="项目结束" prop="num" width="120"></el-table-column>
        <el-table-column label="项目状态" prop="datetime" width="120" sortable>
          <template #default="props">
            <router-link :to="{
              name: 'dataAnalysis',
            }">
              <el-button text type="primary" size="small">{{ props.row.datetime }}</el-button>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="datetime1" width="200" sortable></el-table-column>
        <el-table-column label="操作" fixed="right" align="right" width="200">
          <template #default>
            <el-button-group>
              <router-link :to="{
                name: 'drawingInfo',
              }">
                <el-button text type="primary" size="small">查看</el-button>
              </router-link>
              <a>
                <el-button text type="primary" size="small">编辑</el-button>

              </a>
              <a>
                <el-button text type="primary" size="small">删除</el-button>

              </a>
            </el-button-group>
          </template>
        </el-table-column>
      </scTable>
      <!-- <sc-select-filter :data="filterData" :label-width="80" @on-change="filterChange"></sc-select-filter> -->
    </el-header>

  </el-container>
</template>

<script>
import scSelectFilter from '@/components/scSelectFilter'

export default {
  name: 'listTab',
  components: {
    scSelectFilter
  },
  data() {
    return {
      groupId: "1",
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
      list: [
        {
          name: '22041',
          sex: '大连中远9000m³LEG',
          xmjl: '1',
          cd: '中远海运大连投资',
          cc: '大连中远海运重工',
          email: '2024-5-10',
          num: '2025-9-10',
          datetime: '进行中',
          datetime1: 'Hull No. N1214, Contract No. N1214-NY-02'
        },
        {
          name: '23010',
          sex: '大连中远6300m³LPG',
          xmjl: '0',
          cd: '中远海运大连投资',
          cc: '大连中远海运重工',
          email: '2024-8-10',
          num: '2025-4-10',
          datetime: '已结束',
          datetime1: '6300m³ : Hull No. N1213, Contract No. N1213-NY-01'
        },
        {
          name: '22041S',
          sex: '15000m3挖泥船FGSS',
          xmjl: '0',
          cd: '中远海运大连投资',
          cc: '大连中远海运重工',
          email: '2023-8-10',
          num: '2025-7-10',
          datetime: '未开始',
          datetime1: '15000m³ : Hull No. N1213, Contract No. N1213-NY-01'
        },
      ],

      // apiObj: this.$API.demo.list
      search: {
        keyword: ""
      }
    }
  },
  methods: {
    //搜索
    upsearch() {
      this.$refs.table.upData(this.search)
    },
    //标签切换
    // tabChange(name){
    // 	var params = {
    // 		groupId: name
    // 	}
    // 	this.$refs.table.reload(params)
    // },
    // filterChange(data){
    // 	this.$refs.table.upData(data)
    // }
  }
}
</script>

<style></style>
