<template>
  <div v-loading="dataLoading" class="has-head-container">

    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.mcntManagement') }}</p>
      </el-row>
    </sticky>

    <div class="app-container">
      <div class="filter-container">
        <el-row class="filter-item">

          <!-- 운영사 명 -->
          <el-input
            v-if="$store.getters.roles.length > 0 && $store.getters.roles[0].authority !== 'ORG'"
            v-model="listQuery.orgNm"
            :placeholder="$t('placeholder.orgNm')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!-- 제휴사 명 -->
          <el-input
            v-model="listQuery.mchtNm"
            :placeholder="$t('placeholder.mchtNm')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!--   이용처 구분      -->
          <el-select v-model="listQuery.baseFncDiv" :placeholder="$t('mchtManagement.baseFncDiv')" clearable style="width: 120px" class="filter-item">
            <el-option v-for="item in baseFncDivGbn" :key="item.key" :label="item.name" :value="item.key"/>
          </el-select>

          <!--   상태코드      -->
          <el-select v-model="listQuery.st" :placeholder="$t('mchtManagement.status')" clearable style="width: 100px" class="filter-item">
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

          <el-button
            v-waves
            class="filter-item"
            type="success"
            plain
            icon="el-icon-edit"
            @click="handleExcel()">
            {{ $t('btn.excelUpload') }}
          </el-button>
        </el-row>
      </div>

      <el-table :data="list" border style="max-width: 1400px !important;">
        <el-table-column :label="$t('mchtManagement.no')" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ totCnt - (scope.$index + (listQuery.pageSize * (listQuery.pageIdx-1))) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('mchtManagement.mchtCd')" align="center" min-width="120">
          <template slot-scope="scope">
            <span class="edit_button" @click="handleEdit(scope.row.mchtCd)">{{ scope.row.mchtCd }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('mchtManagement.orgNm')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.orgNm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('mchtManagement.mchtNm')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.mchtNm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('mchtManagement.status')" align="center" width="100">
          <template slot-scope="scope">
            <el-tag :type="$applyTagFilter(scope.row.st, statusOptions)">
              {{ $applyTextFilter(scope.row.st, statusOptions) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('mchtManagement.baseFncDiv')" align="center" width="130">
          <template slot-scope="scope">
            <el-tag :type="$applyTagFilter(scope.row.baseFncDiv, baseFncDivGbn)">
              {{ $applyTextFilter(scope.row.baseFncDiv, baseFncDivGbn) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('mchtManagement.regId')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.regId }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('mchtManagement.regDttm')" align="center" min-width="200">
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
        :mcht-cd="drawerInfo.editMchtCd"
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
import { fetchSearchMchtList } from '@/api/mcht'

const statusOptions = [
  { key: 'OK', name: i18n.t('mchtManagement.statusOptions.ok'), tag: 'success' },
  { key: 'CLOSE', name: i18n.t('mchtManagement.statusOptions.close'), tag: 'danger' }
]

const baseFncDivGbn = [
  { key: 'ALL', name: i18n.t('mchtManagement.baseFncDivGbn.all'), tag: '' },
  { key: 'ACCU', name: i18n.t('mchtManagement.baseFncDivGbn.accu'), tag: 'success' },
  { key: 'USE', name: i18n.t('mchtManagement.baseFncDivGbn.use'), tag: 'info' }
]

export default {
  name: 'McntManagement',
  directives: { waves },
  components: { Sticky, Pagination, manageForm },
  data() {
    return {
      dataLoading: false,
      baseFncDivGbn,
      statusOptions,
      listQuery: {
        orgCd: '',
        orgNm: '',
        mchtNm: '',
        baseFncDiv: '',
        st: '',
        pageIdx: 1,
        pageSize: 20
      },
      totCnt: 0,
      list: null,
      drawerInfo: {
        title: '',
        rightDrawer: false,
        confirmType: 'add',
        editMchtCd: ''
      }
    }
  },
  watch: {

  },
  created() {
    // 운영사 계정의 경우 운영사 고정
    if (this.$store.getters.roles[0].authority === 'ORG') {
      // 계정에 어느 운영사인지 세팅이 된다면 추가
      this.listQuery.orgCd = this.$store.getters.roleInfo
    }

    this.getList()
  },
  methods: {
    async getList() {
      this.dataLoading = true

      const response = await fetchSearchMchtList(this.listQuery)

      this.list = response.list
      this.totCnt = response.totCnt

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    handleExcel() {
      this.$router.push({ path: '/mcht/excel' })
    },
    handleCreate() {
      this.drawerInfo.confirmType = 'add'
      this.drawerInfo.editMchtCd = ''
      this.drawerInfo.title = this.$t('title.mchtCreate')
      this.drawerInfo.rightDrawer = true
    },
    handleEdit(row) {
      this.drawerInfo.confirmType = 'edit'
      this.drawerInfo.editMchtCd = row
      this.drawerInfo.title = this.$t('title.mchtEdit')
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
