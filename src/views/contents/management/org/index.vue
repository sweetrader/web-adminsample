<template>
  <div v-loading="dataLoading" class="has-head-container">

    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.orgManagement') }}</p>
      </el-row>
    </sticky>

    <div class="app-container">
      <div class="filter-container">
        <el-row class="filter-item">
          <!-- 운영사 코드 -->
          <el-input
            v-model="listQuery.orgCd"
            :placeholder="$t('placeholder.orgCd')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!-- 운영사 명 -->
          <el-input
            v-model="listQuery.orgNm"
            :placeholder="$t('placeholder.orgNm')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!--   상태코드      -->
          <el-select v-model="listQuery.st" :placeholder="$t('orgManagement.status')" clearable style="width: 100px" class="filter-item">
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key"/>
          </el-select>

          <el-button
            v-waves
            class="filter-item"
            type="info"
            plain
            icon="el-icon-search"
            @click="getList()">
            {{ $t('btn.search') }}
          </el-button>
          <el-button
            v-waves
            class="filter-item"
            type="info"
            icon="el-icon-edit"
            @click="handleCreate()">
            {{ $t('btn.add') }}
          </el-button>
        </el-row>
      </div>

      <el-table :data="list" border style="max-width: 1200px !important;">
        <el-table-column :label="$t('orgManagement.no')" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ totCnt - (scope.$index + (listQuery.pageSize * (listQuery.pageIdx-1))) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('orgManagement.orgCd')" align="center" min-width="180">
          <template slot-scope="scope">
            <span class="edit_button" @click="handleEdit(scope.row)">{{ scope.row.orgCd }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('orgManagement.orgNm')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.orgNm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('orgManagement.pointCardCnt')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.pointCardCnt }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('orgManagement.status')" align="center" width="100">
          <template slot-scope="scope">
            <el-tag :type="$applyTagFilter(scope.row.st, statusOptions)">
              {{ $applyTextFilter(scope.row.st, statusOptions) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('orgManagement.regId')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.regId }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('orgManagement.regDttm')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.regDttm }}</span>
          </template>
        </el-table-column>

        <!--
        <el-table-column :label="$t('orgManagement.action')" align="center" width="120" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleEdit(scope.row)">{{ $t('btn.edit') }}</el-button>
          </template>
        </el-table-column>
        -->
      </el-table>
      <pagination v-show="totCnt>0" :total="totCnt" :page.sync="listQuery.pageIdx" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    </div>

    <!-- 우측 사이드 바 수정 폼 -->
    <el-drawer
      :title="drawerInfo.title"
      :visible.sync="drawerInfo.rightDrawer"
      direction="rtl"
      size="35%">
      <manage-form
        :confirm-type="drawerInfo.confirmType"
        :org-cd="drawerInfo.editOrgCd"
        :drawer-open-checker.sync="drawerInfo.rightDrawer"
        :close-drawer="handleDrawerClose"/>
    </el-drawer>
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import Sticky from '@/components/Sticky'
import manageForm from './manageForm'
import { fetchSearchOrgList } from '@/api/org'

const statusOptions = [
  { key: 'OK', name: i18n.t('orgManagement.statusOptions.ok'), tag: 'success' },
  { key: 'CLOSE', name: i18n.t('orgManagement.statusOptions.close'), tag: 'danger' }
]

const searchOption = [
  { key: 'orgCd', name: i18n.t('orgManagement.orgCd') },
  { key: 'orgNm', name: i18n.t('orgManagement.orgNm') }
]

export default {
  name: 'OrgManagement',
  directives: { waves },
  components: { Sticky, Pagination, manageForm },
  data() {
    return {
      dataLoading: false,
      searchOption,
      statusOptions,
      listQuery: {
        orgCd: '',
        orgNm: '',
        st: '',
        pageIdx: 1,
        pageSize: 20
      },
      totCnt: 0,
      list: [],
      drawerInfo: {
        title: '',
        rightDrawer: false,
        confirmType: 'add',
        editOrgCd: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.dataLoading = true

      const response = await fetchSearchOrgList(this.listQuery)

      this.list = response.list
      this.totCnt = response.totCnt

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    handleCreate() {
      this.drawerInfo.confirmType = 'add'
      this.drawerInfo.editOrgCd = ''
      this.drawerInfo.title = this.$t('title.orgCreate')
      this.drawerInfo.rightDrawer = true
    },
    handleEdit(row) {
      this.drawerInfo.confirmType = 'edit'
      this.drawerInfo.editOrgCd = row.orgCd
      this.drawerInfo.title = this.$t('title.orgEdit')
      this.drawerInfo.rightDrawer = true
    },
    handleDrawerClose() {
      this.drawerInfo.rightDrawer = false
      this.getList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
