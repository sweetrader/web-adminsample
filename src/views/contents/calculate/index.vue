<template>
  <div v-loading="dataLoading" class="has-head-container">

    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.calculate') }}</p>
      </el-row>
    </sticky>

    <div class="app-container">
      <div class="filter-container">
        <el-row class="filter-item">

          <!-- 운영사 -->
          <el-select v-if="this.$store.getters.roles.length > 0 && this.$store.getters.roles[0].authority !== 'ORG'" v-model="listQuery.orgCd" :placeholder="$t('placeholder.org')" clearable style="min-width: 120px" class="filter-item">
            <el-option v-for="item in orgList" :key="item.orgCd" :label="item.orgNm" :value="item.orgCd"/>
          </el-select>

          <!-- 포인트 카드 -->
          <el-input
            v-model="listQuery.pitCardNm"
            :placeholder="$t('placeholder.pitCard')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <el-date-picker
            v-model="listQuery.searchDt"
            :placeholder="$t('placeholder.calcMonth')"
            type="month"
            class="filter-item"/>

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
            @click="handleDownload()">
            {{ $t('btn.excelDownload') }}
          </el-button>
        </el-row>
      </div>

      <el-table :data="list" border style="min-width: 100%">
        <!-- 기본 정보 -->
        <el-table-column :label="$t('calculate.baseInfo')" align="center">
          <el-table-column :label="$t('calculate.no')" align="center" width="80">
            <template slot-scope="scope">
              <span>{{ totCnt - (scope.$index + (listQuery.pageSize * (listQuery.pageIdx-1))) }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('calculate.org')" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.mngId }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('calculate.pitCard')" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.mngId }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('calculate.mcht1')" align="center" min-width="150">
            <template slot-scope="scope">
              <span class="edit_button" @click="handleEdit(scope.row)">{{ $applyTextFilter(scope.row.ruleCd, ruleOptions) }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('calculate.fncDiv')" align="center" width="80">
            <template slot-scope="scope">
              <el-tag :type="$applyTagFilter(scope.row.fncDiv, fncDivOptions)">
                {{ $applyTextFilter(scope.row.fncDiv, fncDivOptions) }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :label="$t('calculate.point')" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.mngNm }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('calculate.calcDate')" align="center" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.regDttm }}</span>
            </template>
          </el-table-column>
        </el-table-column>

        <!-- 정산 -->
        <el-table-column :label="$t('calculate.calc')" align="center">
          <el-table-column :label="$t('calculate.org')" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.mngId }}</span>
            </template>
          </el-table-column>

          <el-table-column :label="$t('calculate.mcht2')" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.mngNm }}</span>
            </template>
          </el-table-column>
        </el-table-column>

      </el-table>
      <pagination v-show="totCnt>0" :total="totCnt" :page.sync="listQuery.pageIdx" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    </div>
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import Sticky from '@/components/Sticky'
import { fetchSearchOrgList } from '@/api/org'

const fncDivOptions = [
  { key: 'ACCU', name: i18n.t('calculate.fncDivOptions.accu'), tag: '' },
  { key: 'USE', name: i18n.t('calculate.fncDivOptions.use'), tag: 'success' },
  { key: 'C_ACCU', name: i18n.t('calculate.fncDivOptions.cAccu'), tag: 'info' },
  { key: 'C_USE', name: i18n.t('calculate.fncDivOptions.cUse'), tag: 'warning' },
  { key: 'EXP', name: i18n.t('calculate.fncDivOptions.exp'), tag: 'danger' }
]

export default {
  name: 'Calculate',
  directives: { waves },
  components: { Sticky, Pagination },
  data() {
    return {
      dataLoading: false,
      listQuery: {
        orgCd: '',
        pitCardNm: '',
        searchDt: '',
        calDate: ''
      },
      totCnt: 0,
      list: null,
      orgList: null,
      fncDivOptions
    }
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
      // org 리스트 초기화
      const param = {
        st: this.confirmType === 'edit' ? '' : 'OK',
        pageIdx: 1,
        pageSize: 9999
      }
      const orgData = await fetchSearchOrgList(param)

      this.orgList = orgData.list

      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    handleDownload() {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
