<template>
  <div v-loading="dataLoading" class="has-head-container">

    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.pointCardTrx') }}</p>
      </el-row>
    </sticky>

    <div class="app-container">
      <div class="filter-container">
        <el-row class="filter-item">
          <!-- 구분 -->
          <el-select v-model="listQuery.fncDiv" :placeholder="$t('placeholder.fncDiv')" clearable style="width: 120px" class="filter-item">
            <el-option v-for="item in fncDivOptions" :key="item.key" :label="item.name" :value="item.key"/>
          </el-select>

          <!-- 카드 번호 -->
          <el-input
            v-model="listQuery.pitCardNo"
            :placeholder="$t('placeholder.pitCardNo')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!-- 사용자 정보 -->
          <el-input
            v-model="listQuery.userInfo"
            :placeholder="$t('placeholder.userInfo')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!-- 운영사 코드 -->
          <el-select v-if="$store.getters.roles.length > 0 && $store.getters.roles[0].authority !== 'ORG'" v-model="listQuery.orgCd" :placeholder="$t('pointCard.org')" clearable style="min-width: 120px" class="filter-item">
            <el-option v-for="item in orgList" :key="item.orgCd" :label="item.orgNm" :value="item.orgCd"/>
          </el-select>

          <!-- 제휴처 -->
          <el-input
            v-if="$store.getters.roles.length > 0 && $store.getters.roles[0].authority !== 'MCHT'"
            v-model="listQuery.mchtNm"
            :placeholder="$t('pointCard.mchtNm')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!-- 적립 일자 -->
          <el-date-picker
            v-model="listQuery.searchDt"
            :start-placeholder="$t('pointCard.accuStDt')"
            :end-placeholder="$t('pointCard.accuEndDt')"
            class="filter-item"
            type="daterange"/>

          <el-button
            v-waves
            class="filter-item"
            type="info"
            plain
            icon="el-icon-search"
            @click="getList()">
            {{ $t('btn.search') }}
          </el-button>
        </el-row>
      </div>

      <el-table :data="list" border style="max-width: 1600px !important;">
        <el-table-column :label="$t('pointCard.no')" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ totCnt - (scope.$index + (listQuery.pageSize * (listQuery.pageIdx-1))) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.fncDiv')" align="center" width="100">
          <template slot-scope="scope">
            <el-tag :type="$applyTagFilter(scope.row.fncDiv, fncDivOptions)">
              {{ $applyTextFilter(scope.row.fncDiv, fncDivOptions) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.pitCardNo')" align="center" min-width="160">
          <template slot-scope="scope">
            <span v-if="$store.getters.roles.length > 0 && $store.getters.roles[0].authority !== 'MCHT'" class="edit_button" @click="handleDetail(scope.row.pitCardNo)">{{ scope.row.pitCardNo }}</span>
            <span v-else>{{ scope.row.pitCardNo }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.userInfo')" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.userInfo }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.pitCardNm')" align="center" min-width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.pitCardNm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.org')" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.orgNm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.mchtNm')" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.mchtNm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.trxAmt')" align="right" width="100">
          <template slot-scope="scope">
            <el-tag :type="Number(scope.row.trxAmt) >= 0 ? 'info' : 'warning'">
              {{ scope.row.trxAmt | toThousandFilter }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.pit')" align="right" width="100">
          <template slot-scope="scope">
            <el-tag :type="Number(scope.row.pit) >= 0 ? 'info' : 'warning'">
              {{ scope.row.pit | toThousandFilter }} P
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.pitSum')" align="right" width="100">
          <template slot-scope="scope">
            <el-tag :type="Number(scope.row.pitSum) >= 0 ? 'info' : 'warning'">
              {{ scope.row.pitSum | toThousandFilter }} P
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.trxDttm')" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.trxDttm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.note')" align="left" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.cancelTrxDttm">
              {{ $t('pointCard.cancelDttm') + ' : ' + scope.row.cancelTrxDttm.substr(0, 4) + '-' + scope.row.cancelTrxDttm.substr(4, 2) + '-' + scope.row.cancelTrxDttm.substr(6, 2) }}
            </span>
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
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import Sticky from '@/components/Sticky'
import { fetchSearchOrgList } from '@/api/org'
import { fetchSearchPointCardTrxList } from '@/api/pointCardTrx'

const fncDivOptions = [
  { key: 'ACCU', name: i18n.t('pointCard.fncDivOptions.accu'), tag: '' },
  { key: 'USE', name: i18n.t('pointCard.fncDivOptions.use'), tag: 'success' },
  { key: 'C_ACCU', name: i18n.t('pointCard.fncDivOptions.cAccu'), tag: 'info' },
  { key: 'C_USE', name: i18n.t('pointCard.fncDivOptions.cUse'), tag: 'warning' },
  { key: 'EXP', name: i18n.t('pointCard.fncDivOptions.exp'), tag: 'danger' }
]

export default {
  name: 'PointCardTrx',
  directives: { waves },
  components: { Sticky, Pagination },
  data() {
    return {
      dataLoading: false,
      listQuery: {
        fncDiv: '',
        pitCardNo: '',
        userInfo: '',
        orgCd: '',
        mchtNm: '',
        searchDt: null,
        trxStDttm: '',
        trxEndDttm: '',
        pageIdx: 1,
        pageSize: 20
      },
      totCnt: 0,
      list: null,
      orgList: null,
      fncDivOptions
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

    if (this.$store.getters.roles[0].authority === 'MCHT') {
      this.listQuery.mchtCd = this.$store.getters.roleInfo
    }

    this.getList()
  },
  methods: {
    async getList() {
      this.dataLoading = true

      // org 리스트 초기화
      const param = {
        pageIdx: 1,
        pageSize: 9999
      }
      const orgData = await fetchSearchOrgList(param)

      this.orgList = orgData.list

      if (this.listQuery.searchDt) {
        this.listQuery.trxStDttm = this.format_date_yyyymmdd(this.listQuery.searchDt[0])
        this.listQuery.trxEndDttm = this.format_date_yyyymmdd(this.listQuery.searchDt[1])
      } else {
        this.listQuery.trxStDttm = ''
        this.listQuery.trxEndDttm = ''
      }

      const response = await fetchSearchPointCardTrxList(this.listQuery)

      this.list = response.list
      this.totCnt = response.totCnt

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    handleDetail(pitCardNo) {
      this.$router.push({ path: '/pointCard/trx/detail?pitCardNo=' + pitCardNo })
    },
    format_date_yyyymmdd(inputDate) {
      const y = inputDate.getFullYear()
      const m = inputDate.getMonth() + 1
      const d = inputDate.getDate()
      const mm = m < 10 ? '0' + m : m
      const dd = d < 10 ? '0' + d : d
      return '' + y + mm + dd
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
