<template>
  <div class="app-container">
    <div v-loading="dataLoading">
      <!-- 필터 영역 -->
      <!-- 운영사 명 -->
      <el-select v-model="cardListQuery.pitCardFixNo" filterable :placeholder="$t('statistic.pitCardNmAndOrgNm')" clearable style="min-width: 240px" class="filter-item">
        <el-option v-for="(item, i) in cardList" :key="i" :label="item.pitCardNm + ' (' + item.orgNm + ')'" :value="item.pitCardFixNo"/>
      </el-select>

      <!-- 날짜 -->
      <el-date-picker
        v-model="searchDt"
        :placeholder="$t('placeholder.select')"
        class="filter-item"
        type="month"
        style="width: 120px;"/>

      <!-- 조회 -->
      <el-button
        v-waves
        class="filter-item"
        type="info"
        plain
        icon="el-icon-search"
        @click="getData()">
        {{ $t('btn.search') }}
      </el-button>
    </div>

    <div v-if="showStatistic" v-loading="dataLoading" class="use_stat_flex_wrapper">
      <div>
        <div class="use_statistic_wrapper">
          <!-- 이용 고객 수 -->
          <el-card class="statistic_card_inn_style">
            <div class="statistic_data_contents">
              <div class="data_wrapper">
                <div class="title_text">
                  {{ $t('statistic.monthUsePointCnt') }}
                </div>

                <div class="contents_bar">
                  {{ $t('statistic.currentMonth') }}
                  <div style="width: 300px;">
                    <el-progress :percentage="thisMonthPitCardCountPercent"/>
                  </div>
                  <count-to :start-val="0" :end-val="thisMonthPitCardCount" :duration="3000" class="card-panel-num"/>
                </div>

                <div class="contents_bar">
                  {{ $t('statistic.lastMonth') }}
                  <div style="width: 300px;">
                    <el-progress :percentage="lastMonthPitCardCountPercent"/>
                  </div>
                  <count-to :start-val="0" :end-val="lastMonthPitCardCount" :duration="3000" class="card-panel-num"/>
                </div>
              </div>
            </div>
          </el-card>
          <!-- 사용 고객 수 -->
          <el-card class="statistic_card_inn_style">
            <div class="statistic_data_contents">
              <div class="data_wrapper">
                <div class="title_text">
                  {{ $t('statistic.monthUsePointSum') }}
                </div>

                <div class="contents_bar">
                  {{ $t('statistic.currentMonth') }}
                  <div style="width: 300px;">
                    <el-progress :percentage="thisMonthPitCardSumPercent"/>
                  </div>
                  <count-to :start-val="0" :end-val="thisMonthPitCardSum" :duration="3000" class="card-panel-num"/>
                </div>

                <div class="contents_bar">
                  {{ $t('statistic.lastMonth') }}
                  <div style="width: 300px;">
                    <el-progress :percentage="lastMonthPitCardSumPercent"/>
                  </div>
                  <count-to :start-val="0" :end-val="lastMonthPitCardSum" :duration="3000" class="card-panel-num"/>
                </div>
              </div>
            </div>
          </el-card>
        </div>

        <!-- 분석 -->
        <div class="use_analysis_statistic_wrapper">
          <div class="analysis_wrapper">
            <div class="analysis_title">
              {{ $t('statistic.weekPointUseInfo') }}
            </div>

            <bar-chart
              :ctgr-data.sync="barChartCtgr"
              :chart-name.sync="chartName"
              :chart-data.sync="chartData"
              :line-name.sync="lineName"
              :line-data.sync="lineData"/>
            <!--
            <div class="analysis_title">
              <div/>

              <div class="analysis_cnt_title">
                <div>
                  {{ $t('statistic.useCnt') }}
                </div>

                <div>
                  {{ $t('statistic.useSum') }}
                </div>
              </div>
            </div>

            <el-collapse accordion>
              <el-collapse-item v-for="(week, i) in weekInfo" :key="i">
                <template slot="title">
                  -->
            <!-- 아코디언 타이틀 -->
            <!--
                  <div class="accordion_title">
                    <div>
                      {{ week.weekRow + $t('statistic.weekText') }}
                    </div>

                    <div class="accordion_sub_title">
                      <div>
                        {{ week.pitCnt | toThousandFilter }}
                      </div>

                      <div>
                        {{ week.pitSum | toThousandFilter }}
                      </div>
                    </div>
                  </div>
                </template>
            -->
            <!-- 아코디언 내용 -->
            <!--
                <el-table :data="week.detailList" border style="min-width: 100%">
                  <el-table-column :label="$t('statistic.dayText')" align="center">
                    <template slot-scope="scope">
                      {{ Number(scope.row.date) + $t('statistic.day') }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('statistic.poingUseCnt')" align="center">
                    <template slot-scope="scope">
                      {{ scope.row.pitCnt | toThousandFilter }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('statistic.usePointSum')" align="center">
                    <template slot-scope="scope">
                      {{ scope.row.pitSum | toThousandFilter }}
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
            -->
          </div>

          <div class="graph_wrapper">

            <el-table :data="sixMonthData" border style="min-width: 100%; margin-top: 15px;">
              <el-table-column :label="$t('statistic.monthText')" align="center">
                <template slot-scope="scope">
                  <!-- 01~09 월 일때 -->
                  <div v-if="scope.row.date.substr(0, 1) === '0'">
                    {{ scope.row.date.substr(1, 1) + $t('statistic.month') }}
                  </div>
                  <!-- 10~12 월 일 때 -->
                  <div v-else>
                    {{ scope.row.date + $t('statistic.month') }}
                  </div>
                </template>
              </el-table-column>

              <el-table-column :label="$t('statistic.poingUseCnt')" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.pitCnt > 0">+</span>
                  <span>{{ scope.row.pitCnt | toThousandFilter }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('statistic.fromMonth')" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.pitCntByCompareLastMonth > 0">+</span>
                  <span>{{ scope.row.pitCntByCompareLastMonth | toThousandFilter }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('statistic.usePointSum')" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.pitSum > 0">+</span>
                  <span>{{ scope.row.pitSum | toThousandFilter }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('statistic.fromMonth')" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.pitSumByCompareLastMonth > 0">+</span>
                  <span>{{ scope.row.pitSumByCompareLastMonth | toThousandFilter }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </div>
      </div>

      <!-- 2번째 통계 추가 -->
      <div class="use_chart_statistic">
        <!-- 메뉴 -->
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleMenuSelect">
          <el-menu-item :index="'1'">{{ $t('statistic.useCnt') }}</el-menu-item>
          <el-menu-item :index="'2'">{{ $t('statistic.usePoint') }}</el-menu-item>
        </el-menu>

        <div class="use_contents_wrapper">
          <div class="chart_wrapper">
            <el-row type="flex" align="right" justify="space-between">
              <div/>
              <el-button
                v-waves
                class="filter-item"
                type="info"
                plain
                style="margin-bottom: 20px;"
                @click="getData()">
                {{ $t('btn.whole') }}
              </el-button>
            </el-row>

            <div v-if="activeIndex === '1'">
              <!-- 총괄 / 운영 파이차트 -->
              <pie-chart
                v-if="$store.getters.roles.length > 0 && $store.getters.roles[0].authority !== 'MCHT'"
                :chart-name="$t('statistic.useCnt')"
                :chart-data.sync="pitCntByMchtCd"
                :init-function="initChart"
                :click-function="clickChart"/>

              <!-- 제휴사 바 차트 -->
              <single-bar-chart
                v-if="$store.getters.roles.length > 0 && $store.getters.roles[0].authority === 'MCHT'"
                :ctgr-data.sync="weekCtgrData"
                :chart-name.sync="weekCntName"
                :chart-data.sync="weekCntData"/>
            </div>

            <div v-if="activeIndex === '2'">
              <!-- 총괄 / 운영 파이차트 -->
              <pie-chart
                v-if="$store.getters.roles.length > 0 && $store.getters.roles[0].authority !== 'MCHT'"
                :chart-name="$t('statistic.usePoint')"
                :chart-data.sync="pitSumByMchtCd"
                :init-function="initChart"
                :click-function="clickChart"/>

              <!-- 제휴사 바 차트 -->
              <single-bar-chart
                v-if="$store.getters.roles.length > 0 && $store.getters.roles[0].authority === 'MCHT'"
                :ctgr-data.sync="weekCtgrData"
                :chart-name.sync="weekSumName"
                :chart-data.sync="weekSumData"/>
            </div>

          </div>

          <div v-loading="listLoading" class="data_wrapper">
            <el-collapse accordion>
              <!-- 아코디언 첫번째 부분 -->
              <el-collapse-item disabled class="last_accordion">
                <template slot="title">
                  <!-- 아코디언 타이틀 -->
                  <div class="accordion_title">
                    <div>
                      {{ $t('statistic.sum') }}
                    </div>

                    <div class="accordion_sub_title">
                      <div>
                        {{ $t('statistic.useCnt') }}
                      </div>

                      <div>
                        {{ $t('statistic.usePoint') }}
                      </div>
                    </div>
                  </div>
                </template>
              </el-collapse-item>

              <el-collapse-item v-for="(data, i) in weekInfo" :key="i">
                <template slot="title">
                  <!-- 아코디언 타이틀 -->
                  <div class="accordion_title">
                    <div>
                      {{ $t('statistic.weekText' + data.weekRow) }}
                    </div>

                    <div class="accordion_sub_title">
                      <div>
                        <span v-if="data.pitCnt > 0">+</span>
                        <span>{{ data.pitCnt | toThousandFilter }}</span>
                      </div>

                      <div>
                        <span v-if="data.pitSum > 0">+</span>
                        <span>{{ data.pitSum | toThousandFilter }}</span>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- 아코디언 내용 -->
                <el-table :data="data.detailList" border style="min-width: 100%">
                  <el-table-column :label="$t('statistic.dayText')" align="center">
                    <template slot-scope="scope">
                      {{ Number(scope.row.date) + $t('statistic.day') }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('statistic.poingUseCnt')" align="center">
                    <template slot-scope="scope">
                      <span v-if="scope.row.pitCnt > 0">+</span>
                      <span>{{ scope.row.pitCnt | toThousandFilter }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('statistic.usePointSum')" align="center">
                    <template slot-scope="scope">
                      <span v-if="scope.row.pitSum > 0">+</span>
                      <span>{{ scope.row.pitSum | toThousandFilter }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-collapse-item>

              <!-- 아코디언 마지막 총 합 부분 -->
              <el-collapse-item disabled class="last_accordion">
                <template slot="title">
                  <!-- 아코디언 타이틀 -->
                  <div class="accordion_title">
                    <div>
                      {{ $t('statistic.sum') }}
                    </div>

                    <div class="accordion_sub_title">
                      <div>
                        {{ weekCnt | toThousandFilter }}
                      </div>

                      <div>
                        {{ weekSum | toThousandFilter }}
                      </div>
                    </div>
                  </div>
                </template>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import CountTo from 'vue-count-to'
import BarChart from '@/components/BarChart/index'
import SingleBarChart from '@/components/SingleBarChart/index'
import PieChart from '@/components/PieChart/index'
import { fetchSearchPointCardList } from '@/api/pointCard'
import { fetchSearchStatisticData, fetchSearchStatisticWeekData, fetchSearchStatisticWeekDetailData } from '@/api/statistic'

export default {
  name: 'UseStatistic',
  directives: { waves },
  components: {
    CountTo,
    BarChart,
    SingleBarChart,
    PieChart
  },
  filters: {

  },
  data() {
    return {
      showStatistic: false,
      dataLoading: false,
      listLoading: false,
      cardListQuery: {
        pitCardFixNo: '',
        fncDiv: 'USE',
        date: '',
        mchtNm: '',
        mchtCd: ''
      },
      searchDt: '',
      cardList: null,
      // 당월 수 정보
      thisMonthPitCardCount: 0,
      lastMonthPitCardCount: 0,
      thisMonthPitCardCountPercent: 0,
      lastMonthPitCardCountPercent: 0,
      // 당월 합계 정보
      thisMonthPitCardSum: 0,
      lastMonthPitCardSum: 0,
      thisMonthPitCardSumPercent: 0,
      lastMonthPitCardSumPercent: 0,
      // 주간 별 포인트 적립 현황
      weekInfo: [],
      barChartCtgr: [],
      chartName: this.$t('statistic.useCnt'),
      chartData: [],
      lineName: this.$t('statistic.usePoint'),
      lineData: [],
      sixMonthData: [],
      /* 2번째 통계 추가 */
      reload: true,
      activeIndex: '1',
      weekSum: 0,
      weekCnt: 0,
      pitCntByMchtCd: [],
      pitSumByMchtCd: [],
      // 제휴사 바 차트
      weekCtgrData: [],
      weekCntName: this.$t('statistic.useCnt'),
      weekCntData: [],
      weekSumName: this.$t('statistic.usePoint'),
      weekSumData: []
    }
  },
  created() {
    this.getCardList()
  },
  methods: {
    async getCardList() {
      this.dataLoading = true

      const param = {
        pageIdx: 1,
        pageSize: 9999
      }

      const response = await fetchSearchPointCardList(param)

      this.cardList = response.list

      this.dataLoading = false
    },
    async getData() {
      // 필수값 체크
      if (!this.cardListQuery.pitCardFixNo) {
        this.$message.error(this.$t('message.statSearchValid1'))
        return
      }

      if (this.searchDt) {
        this.cardListQuery.date = this.format_date_yyyymm(this.searchDt)
      } else {
        this.cardListQuery.date = ''
        this.$message.error(this.$t('message.statSearchValid2'))
        return
      }

      this.showStatistic = false
      this.dataLoading = true

      this.cardListQuery.mchtNm = ''
      this.cardListQuery.mchtCd = ''

      const statisticData = await fetchSearchStatisticData(this.cardListQuery)

      // 수
      this.thisMonthPitCardCount = statisticData.thisMonthPitCardCount
      this.lastMonthPitCardCount = statisticData.lastMonthPitCardCount

      // 합계
      this.thisMonthPitCardSum = statisticData.thisMonthPitCardSum
      this.lastMonthPitCardSum = statisticData.lastMonthPitCardSum

      // 퍼센티지 계산
      this.calcPercentageInfo()

      // 주간 별 데이터
      this.weekInfo = statisticData.pitByWeekList

      // 주간 별 데이터 합계 및 상세
      this.weekSum = 0
      this.weekCnt = 0
      for (let i = 0; i < this.weekInfo.length; i++) {
        this.weekSum += this.weekInfo[i].pitSum
        this.weekCnt += this.weekInfo[i].pitCnt

        this.weekInfo[i].detailList = null

        const dedtailParam = {
          pitCardFixNo: this.cardListQuery.pitCardFixNo,
          fncDiv: this.cardListQuery.fncDiv,
          date: this.cardListQuery.date,
          mchtNm: this.cardListQuery.mchtNm,
          mchtCd: this.cardListQuery.mchtCd,
          week: this.weekInfo[i].weekRow
        }

        const weekDetail = await fetchSearchStatisticWeekDetailData(dedtailParam)
        this.weekInfo[i].detailList = weekDetail
      }

      // 차트 데이터 세팅
      this.chartSetting(statisticData)

      // 차트 테이블 정보
      this.sixMonthData = statisticData.last6monthsList

      setTimeout(() => {
        this.showStatistic = true
        this.dataLoading = false
      }, 300)
    },
    calcPercentageInfo() {
      // 수
      if (this.thisMonthPitCardCount >= this.lastMonthPitCardCount) {
        // 당월 100
        this.thisMonthPitCardCountPercent = 100

        // 전월 계산
        this.lastMonthPitCardCountPercent = Math.round(this.lastMonthPitCardCount / this.thisMonthPitCardCount * 100)

        if (!this.lastMonthPitCardCountPercent) {
          this.lastMonthPitCardCountPercent = 0
        }
      } else {
        // 전월 100
        this.lastMonthPitCardCountPercent = 100

        // 당월 계산
        this.thisMonthPitCardCountPercent = Math.round(this.thisMonthPitCardCount / this.lastMonthPitCardCount * 100)

        if (!this.thisMonthPitCardCountPercent) {
          this.thisMonthPitCardCountPercent = 0
        }
      }

      // 0일 경우 초기화
      if (this.lastMonthPitCardCount === 0 && this.thisMonthPitCardCount === 0) {
        this.thisMonthPitCardCountPercent = 0
        this.lastMonthPitCardCountPercent = 0
      }

      // 합계
      if (this.thisMonthPitCardSum >= this.lastMonthPitCardSum) {
        // 당월 100
        this.thisMonthPitCardSumPercent = 100

        // 전월 계산
        this.lastMonthPitCardSumPercent = Math.round(this.lastMonthPitCardSum / this.thisMonthPitCardSum * 100)

        if (!this.lastMonthPitCardSumPercent) {
          this.lastMonthPitCardSumPercent = 0
        }
      } else {
        // 전월 100
        this.lastMonthPitCardSumPercent = 100

        // 당월 계산
        this.thisMonthPitCardSumPercent = Math.round(this.thisMonthPitCardSum / this.lastMonthPitCardSum * 100)

        if (!this.thisMonthPitCardSumPercent) {
          this.thisMonthPitCardSumPercent = 0
        }
      }

      if (this.lastMonthPitCardSum === 0 && this.thisMonthPitCardSum === 0) {
        this.lastMonthPitCardSumPercent = 0
        this.thisMonthPitCardSumPercent = 0
      }
    },
    chartSetting(stat) {
      this.barChartCtgr = []
      this.chartData = []
      this.lineData = []
      if (stat.last6monthsList) {
        for (let i = 0; i < stat.last6monthsList.length; i++) {
          if (stat.last6monthsList[i].date.substr(0, 1) === '0') {
            this.barChartCtgr.push(stat.last6monthsList[i].date.substr(1, 1) + this.$t('statistic.monthText'))
          } else {
            this.barChartCtgr.push(stat.last6monthsList[i].date + this.$t('statistic.monthText'))
          }
          this.chartData.push(Number(stat.last6monthsList[i].pitCnt))
          this.lineData.push(Math.abs(Number(stat.last6monthsList[i].pitSum)))
        }
      }

      this.pitCntByMchtCd = stat.pitCntByMchtCd
      this.pitSumByMchtCd = stat.pitSumByMchtCd

      // 제휴사 주별 정보 세팅
      this.weekCtgrData = []
      this.weekCntData = []
      this.weekSumData = []
      for (let i = 0; i < this.weekInfo.length; i++) {
        this.weekCtgrData.push(this.weekInfo[i].weekRow + this.$t('statistic.weekText'))
        this.weekCntData.push(this.weekInfo[i].pitCnt)
        this.weekSumData.push(this.weekInfo[i].pitSum)
      }
    },
    format_date_yyyymm(inputDate) {
      const y = inputDate.getFullYear()
      const m = inputDate.getMonth() + 1
      const mm = m < 10 ? '0' + m : m
      return '' + y + mm
    },
    /* 2번째 통계 추가 */
    initChart() {

    },
    async clickChart(val, id) {
      this.listLoading = true

      this.cardListQuery.mchtNm = val.name
      this.cardListQuery.mchtCd = id

      const response = await fetchSearchStatisticWeekData(this.cardListQuery)

      this.weekInfo = response

      // 주간 별 데이터 합계
      this.weekSum = 0
      this.weekCnt = 0
      for (let i = 0; i < this.weekInfo.length; i++) {
        this.weekSum += this.weekInfo[i].pitSum
        this.weekCnt += this.weekInfo[i].pitCnt
      }

      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    handleMenuSelect(key, keyPath) {
      // 새로 로딩하기 위해서 없는 값으로 잠깐 세팅
      setTimeout(() => {
        this.activeIndex = '999'
        setTimeout(() => {
          this.activeIndex = key
        }, 10)
      }, 10)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.use_statistic_wrapper {
  width: 900px;
  margin: 20px 0 0 0;
  display: flex;
  justify-content: space-between;

  .statistic_card_inn_style {
    background-color: #f3f3f3;
    width: 435px;
    margin: 20px 0 32px 0;

    .statistic_data_contents {
      width: 100%;
      height: 80px;
      display: flex;
      justify-content: space-between;

      .data_wrapper {
        width: 100%;
        height: 80px;
        .title_text {
          width: 100%;
          margin-bottom: 10px;
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          text-align: left;
          vertical-align: top;
          color: rgba(0,0,0,0.45);
        }
        .contents_bar {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}

.use_analysis_statistic_wrapper {
  width: 900px;
  margin: 20px 0 32px 0;
  display: flex;
  justify-content: space-between;

  .analysis_wrapper {
    width: 435px;
    margin-right: 15px;
    padding-top: 20px;

    .analysis_title {
      width: 400px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;

      .analysis_cnt_title {
        width: 50%;
        display: flex;
        justify-content: space-between;
        font-size: 14px;

        div {
          width: 50%;
          text-align: center;
        }
      }
    }

    .accordion_title {
      width: 400px;
      display: flex;
      justify-content: space-between;

      .accordion_sub_title {
        width: 50%;
        display: flex;
        justify-content: space-between;

        div {
          width: 50%;
          text-align: center;
        }
      }
    }
  }

  .graph_wrapper {
    width: 435px;
    margin-left: 15px;
    padding-top: 20px;
  }
}

// 추가 스타일
.use_stat_flex_wrapper {
  display: flex;
  flex-wrap: wrap;
}

.use_chart_statistic {
  width: 900px;
  min-width: 900px;
  padding: 20px;
  .use_contents_wrapper {
    display: flex;
    justify-content: space-around;
    height: 500px;
    .chart_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 380px;
      padding: 10px;
    }
    .data_wrapper {
      width: 480px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .accordion_title {
        width: 400px;
        display: flex;
        justify-content: space-between;

        .accordion_sub_title {
          width: 50%;
          display: flex;
          justify-content: space-between;

          div {
            width: 50%;
            text-align: center;
          }
        }
      }
      .last_accordion {
        .accordion_title {
          color: #303131 !important;
          cursor: default !important;
        }

        .el-collapse-item__arrow {
          display: none;
        }
      }
    }
  }
}
</style>
