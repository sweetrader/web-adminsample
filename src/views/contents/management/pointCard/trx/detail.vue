<template>
  <div>
    <!-- 헤더 -->
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.pointCardTrxDtl') }}</p>
        <div>
          <el-button v-waves type="info" plain @click="handleBack">{{ $t('btn.list') }}</el-button>
        </div>
      </el-row>
    </sticky>

    <!-- 기본 정보 -->
    <el-row type="flex" justify="center" class="app-container" style="width: 100%; margin-bottom: 30px;">
      <el-card v-loading="listLoading" shadow="hover" class="trx_dtl_card">
        <el-form :model="detailInfo" label-position="left" label-width="160px">
          <!-- 운영사 -->
          <el-form-item :label="$t('pointCard.org')">
            {{ detailInfo.orgNm }}
          </el-form-item>

          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="10">
              <!-- 포인트 카드 명 -->
              <el-form-item :label="$t('pointCard.pitCardNm')">
                {{ detailInfo.pitCardNm }}
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <!-- 포인트 카드 명 -->
              <el-form-item :label="$t('pointCard.userInfo')">
                {{ detailInfo.userInfo }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="10">
              <!-- 멤버십 카드 번호 -->
              <el-form-item :label="$t('pointCard.pitCardNo')">
                {{ detailInfo.pitCardNo }}
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <!-- 등급 -->
              <el-form-item :label="$t('pointCard.lvDiv')">
                {{ detailInfo.lvDivNm }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20" type="flex" justify="space-between">
            <el-col :span="10">
              <!-- 잔여포인트 -->
              <el-form-item :label="$t('pointCard.remainPit')">
                {{ detailInfo.remainingPoint | toThousandFilter }} P
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <!-- 당월 소멸 포인트 -->
              <el-form-item :label="$t('pointCard.monthExtinctPit')">
                {{ detailInfo.extinctionPoint | toThousandFilter }} P
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-card>
    </el-row>

    <!-- 포인트 내역 -->
    <div class="app-container">
      <div class="filter-container">
        <el-row type="flex" justify="start">
          <!--   기능 구분      -->
          <el-radio-group v-model="listQuery.fncDiv" style="margin-right: 10px;">
            <el-radio-button v-for="item in searchFncDivOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
          </el-radio-group>

          <!--   날짜      -->
          <el-date-picker
            v-model="listQuery.searchDt"
            :start-placeholder="$t('pointCard.trxStDt')"
            :end-placeholder="$t('pointCard.trxEndDt')"
            class="filter-item"
            type="daterange"
            style="margin-right: 10px;"/>

          <el-button
            v-waves
            class="filter-item"
            type="info"
            plain
            icon="el-icon-search"
            @click="getTrxList()">
            {{ $t('btn.search') }}
          </el-button>
        </el-row>
      </div>

      <el-row>
        <el-form label-position="left" label-width="100px" class="total_info">
          <!-- 합계 -->
          <el-row type="flex" justify="start">
            <div>
              <!-- 총 적립 -->
              <el-form-item :label="$t('pointCard.fncDivOptions.accu')">
                {{ totAccu | toThousandFilter }} P
              </el-form-item>
            </div>

            <div>
              <!-- 가용 -->
              <el-form-item :label="$t('pointCard.fncDivOptions.available')">
                {{ sumAvailable | toThousandFilter }} P
              </el-form-item>
            </div>

            <div>
              <!-- 총 사용 -->
              <el-form-item :label="$t('pointCard.fncDivOptions.use')">
                {{ totUse | toThousandFilter }} P
              </el-form-item>
            </div>
          </el-row>

        </el-form>
      </el-row>

      <el-table v-loading="dataLoading" :data="trxList" highlight-current-row border style="max-width: 1200px !important;">
        <el-table-column :label="$t('pointCard.no')" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ totCnt - (scope.$index + (listQuery.pageSize * (listQuery.pageIdx-1))) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.fncDiv')" align="center" width="120">
          <template slot-scope="scope">
            <el-tag :type="$applyTagFilter(scope.row.fncDiv, fncDivOptions)">
              {{ $applyTextFilter(scope.row.fncDiv, fncDivOptions) }}
            </el-tag>
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

        <el-table-column :label="$t('pointCard.trxDttm')" align="center" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.trxDttm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.note')" align="left" min-width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.cancelDivYn && scope.row.cancelDivYn === 'Y'">{{ $t('pointCard.cancelDttm') + ' : ' + scope.row.cancelTrxDttm.substr(0, 4) + '-' + scope.row.cancelTrxDttm.substr(4, 2) + '-' + scope.row.cancelTrxDttm.substr(6, 2) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="totCnt>0" :total="totCnt" :page.sync="listQuery.pageIdx" :limit.sync="listQuery.pageSize" @pagination="getTrxList"/>
    </div>
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import Sticky from '@/components/Sticky'
import { fetchSearchPointCardTrxList, fetchSearchPointCardTrxDetail } from '@/api/pointCardTrx'

const fncDivOptions = [
  { key: '', name: i18n.t('pointCard.fncDivOptions.all') },
  { key: 'ACCU', name: i18n.t('pointCard.fncDivOptions.accu'), tag: '' },
  { key: 'USE', name: i18n.t('pointCard.fncDivOptions.use'), tag: 'success' },
  { key: 'C_ACCU', name: i18n.t('pointCard.fncDivOptions.cAccu'), tag: 'info' },
  { key: 'C_USE', name: i18n.t('pointCard.fncDivOptions.cUse'), tag: 'warning' },
  { key: 'EXP', name: i18n.t('pointCard.fncDivOptions.exp'), tag: 'danger' }
]

const searchFncDivOptions = [
  { key: '', name: i18n.t('pointCard.fncDivOptions.all') },
  { key: 'ACCU', name: i18n.t('pointCard.fncDivOptions.accu'), tag: '' },
  { key: 'USE', name: i18n.t('pointCard.fncDivOptions.use'), tag: 'success' },
  { key: 'EXP', name: i18n.t('pointCard.fncDivOptions.exp'), tag: 'danger' }
]

export default {
  name: 'TrxDetail',
  directives: { waves },
  components: { Sticky, Pagination },
  data() {
    return {
      // 카드 정보
      listLoading: false,
      detailInfo: {

      },
      // 카드 내역 정보
      dataLoading: false,
      listQuery: {
        fncDiv: '',
        pitCardNo: this.$route.query.pitCardNo,
        orgCd: '',
        mchtNm: '',
        searchDt: null,
        trxStDttm: '',
        trxEndDttm: '',
        pageIdx: 1,
        pageSize: 20
      },
      totCnt: 0,
      totAccu: 0,
      totUse: 0,
      sumAvailable: 0,
      trxList: null,
      fncDivOptions,
      searchFncDivOptions
    }
  },
  watch: {

  },
  created() {
    this.getDetail()
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    async getDetail() {
      this.listLoading = true

      const response = await fetchSearchPointCardTrxDetail(this.$route.query.pitCardNo)

      this.detailInfo = response

      this.getTrxList()

      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    async getTrxList() {
      this.dataLoading = true

      if (this.listQuery.searchDt) {
        this.listQuery.trxStDttm = this.format_date_yyyymmdd(this.listQuery.searchDt[0])
        this.listQuery.trxEndDttm = this.format_date_yyyymmdd(this.listQuery.searchDt[1])
      } else {
        this.listQuery.trxStDttm = ''
        this.listQuery.trxEndDttm = ''
      }

      const response = await fetchSearchPointCardTrxList(this.listQuery)

      this.trxList = response.list
      this.totCnt = response.totCnt
      this.totAccu = response.sumAccu
      this.totUse = response.sumUse
      this.sumAvailable = response.sumAvailable

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
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
  .trx_dtl_card {
    width: 75%;
    min-width: 600px;
    max-width: 1000px;
  }
  .el-input, textarea {
    max-width: 400px;
  }
  .total_info {
    .el-form-item__content {
      width: 160px;
    }
  }
</style>
