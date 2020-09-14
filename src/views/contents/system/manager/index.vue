<template>
  <div v-loading="dataLoading" class="has-head-container">

    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.manager') }}</p>
      </el-row>
    </sticky>

    <div class="app-container">
      <div class="filter-container">
        <el-row class="filter-item">
          <!-- 권한 -->
          <el-select v-model="listQuery.ruleCd" :placeholder="$t('manager.rule')" clearable style="width: 130px" class="filter-item">
            <el-option v-for="item in ruleOptions" :key="item.key" :label="item.name" :value="item.key"/>
          </el-select>

          <!-- 아이디 -->
          <el-input
            v-model="listQuery.mngId"
            :placeholder="$t('placeholder.mngId')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!-- 관리자 명 -->
          <el-input
            v-model="listQuery.mngNm"
            :placeholder="$t('placeholder.mngNm')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!-- 권한 -->
          <el-select v-model="listQuery.st" :placeholder="$t('manager.st')" clearable style="width: 80px" class="filter-item">
            <el-option v-for="item in stOptions" :key="item.key" :label="item.name" :value="item.key"/>
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
        <el-table-column :label="$t('manager.no')" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ totCnt - (scope.$index + (listQuery.pageSize * (listQuery.pageIdx-1))) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('manager.mngId')" align="center" min-width="200">
          <template slot-scope="scope">
            <span class="edit_button" @click="handleEdit(scope.row)">{{ scope.row.mngId }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('manager.mngNm')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.mngNm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('manager.rule')" align="center" min-width="180">
          <template slot-scope="scope">
            <span>{{ $applyTextFilter(scope.row.ruleCd, ruleOptions) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('manager.mngInfo')" align="center" min-width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.ruleCd === 'ADMIN'">{{ '총괄' }}</span>
            <span v-if="scope.row.ruleCd === 'ORG'">{{ orgTextFilter(scope.row.ruleInfo) }}</span>
            <span v-if="scope.row.ruleCd === 'MCHT'">{{ mchtTextFilter(scope.row.ruleInfo) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('manager.st')" align="center" width="100">
          <template slot-scope="scope">
            <el-tag :type="$applyTagFilter(scope.row.st, stOptions)">
              {{ $applyTextFilter(scope.row.st, stOptions) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('manager.regDttm')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.regDttm }}</span>
          </template>
        </el-table-column>

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
        :mng-id="drawerInfo.editMngId"
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
import { fetchSearchMngList } from '@/api/system'
import { fetchSearchOrgList } from '@/api/org'
import { fetchSearchMchtList } from '@/api/mcht'

const ruleOptions = [
  { key: 'ADMIN', name: i18n.t('manager.ruleOptions.admin') },
  { key: 'ORG', name: i18n.t('manager.ruleOptions.org') },
  { key: 'MCHT', name: i18n.t('manager.ruleOptions.mcht') }
]

const stOptions = [
  { key: 'OK', name: i18n.t('manager.stOptions.ok'), tag: '' },
  { key: 'CLOSE', name: i18n.t('manager.stOptions.close'), tag: 'danger' }
]

export default {
  name: 'ManagerList',
  directives: { waves },
  components: { Sticky, Pagination, manageForm },
  data() {
    return {
      dataLoading: false,
      listQuery: {
        mngId: '',
        ruleCd: '',
        st: '',
        mngNm: '',
        pageIdx: 1,
        pageSize: 20
      },
      totCnt: 0,
      list: null,
      orgList: null,
      mchtList: null,
      drawerInfo: {
        title: '',
        rightDrawer: false,
        confirmType: 'add',
        editMngId: ''
      },
      ruleOptions,
      stOptions
    }
  },
  computed: {
    orgTextFilter() {
      return (orgCd) => {
        const nameValue = this.orgList.reduce((acc, cur) => {
          acc[cur.orgCd] = cur.orgNm
          return acc
        }, {})
        return nameValue[orgCd]
      }
    },
    mchtTextFilter() {
      return (mchtCd) => {
        const nameValue = this.mchtList.reduce((acc, cur) => {
          acc[cur.mchtCd] = cur.mchtNm
          return acc
        }, {})
        return nameValue[mchtCd]
      }
    }
  },
  created() {
    // 운영사 계정의 경우 운영사 고정
    if (this.$store.getters.roles[0].authority === 'ORG') {
      if (this.ruleOptions[0].key === 'ADMIN') {
        this.ruleOptions.splice(0, 1)
      }
    }

    this.getList()
  },
  methods: {
    async getList() {
      this.dataLoading = true

      const param = {
        pageIdx: 1,
        pageSize: 10000
      }
      // 운영사
      const orgRes = await fetchSearchOrgList(param)
      this.orgList = orgRes.list

      // 제휴처
      const mchtRes = await fetchSearchMchtList(param)
      this.mchtList = mchtRes.list

      const response = await fetchSearchMngList(this.listQuery)

      this.list = response.list
      this.totCnt = response.totCnt

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    handleCreate() {
      this.drawerInfo.confirmType = 'add'
      this.drawerInfo.editMngId = ''
      this.drawerInfo.title = this.$t('title.mngCreate')
      this.drawerInfo.rightDrawer = true
    },
    handleEdit(row) {
      this.drawerInfo.confirmType = 'edit'
      this.drawerInfo.editMngId = row.mngId
      this.drawerInfo.title = this.$t('title.mngEdit')
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
