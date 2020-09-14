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
          <!-- 카드 번호 -->
          <el-input
            v-model="listQuery.pitCardNo"
            :placeholder="$t('placeholder.pitCardNo')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!-- 카드명 -->
          <el-input
            v-model="listQuery.pitCardNm"
            :placeholder="$t('placeholder.pointCardNm')"
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

          <!-- 적립 일자 -->
          <el-date-picker
            v-model="listQuery.searchDt"
            :start-placeholder="$t('pointCard.isuStDttm')"
            :end-placeholder="$t('pointCard.isuEndDttm')"
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

      <el-table :data="list" border style="max-width: 1200px !important;">
        <el-table-column :label="$t('pointCard.no')" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ totCnt - (scope.$index + (listQuery.pageSize * (listQuery.pageIdx-1))) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.pitCardNo')" align="center" width="160">
          <template slot-scope="scope">
            <span v-if="$store.getters.roles.length > 0 && $store.getters.roles[0].authority !== 'MCHT'" class="edit_button" @click="handleDetail(scope.row.pitCardNo)">{{ scope.row.pitCardNo }}</span>
            <span v-else>{{ scope.row.pitCardNo }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.lvDiv')" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.lvDivCd }}</span>
            <br>
            <span>{{ '(' + scope.row.lvDivNm + ')' }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.org')" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.orgNm }}</span>
            <br>
            <span>{{ '(' + scope.row.orgCd + ')' }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.pitCardNm')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.pitCardNm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.userInfo')" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.userInfo }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.isuDttm')" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.isuDttm }}</span>
          </template>
        </el-table-column>

      </el-table>
      <pagination v-show="totCnt>0" :total="totCnt" :page.sync="listQuery.pageIdx" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    </div>
  </div>
</template>

<script>
// import i18n from '@/lang'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import Sticky from '@/components/Sticky'
import { fetchSearchOrgList } from '@/api/org'
import { fetchSearchPointCardIsuList } from '@/api/pointCardIsu'

export default {
  name: 'PointCardTrx',
  directives: { waves },
  components: { Sticky, Pagination },
  data() {
    return {
      dataLoading: false,
      listQuery: {
        orgCd: '',
        pitCardNm: '',
        pitCardNo: '',
        userInfo: '',
        searchDt: null,
        isuStDttm: '',
        isuEndDttm: '',
        pageIdx: 1,
        pageSize: 20
      },
      totCnt: 0,
      list: null,
      orgList: null
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

      // org 리스트 초기화
      const param = {
        pageIdx: 1,
        pageSize: 9999
      }
      const orgData = await fetchSearchOrgList(param)

      this.orgList = orgData.list

      if (this.listQuery.searchDt) {
        this.listQuery.isuStDttm = this.format_date_yyyymmdd(this.listQuery.searchDt[0])
        this.listQuery.isuEndDttm = this.format_date_yyyymmdd(this.listQuery.searchDt[1])
      } else {
        this.listQuery.isuStDttm = ''
        this.listQuery.isuEndDttm = ''
      }

      const response = await fetchSearchPointCardIsuList(this.listQuery)

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
