<template>
  <div class="app-container">
    <div v-loading="dataLoading">
      <!-- 필터 영역 -->
      <!-- 운영사 명 -->
      <el-select v-model="custListQuery.pitCardFixNo" filterable :placeholder="$t('statistic.pitCardNmAndOrgNm')" clearable style="min-width: 240px" class="filter-item">
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

    <div v-if="showStatistic" v-loading="dataLoading">
      <!-- 적립 & 사용 (두개 표시)-->
      <div v-if="accuDivYN === 'Y' && useDivYN === 'Y'">
        <div class="multi_mcht_statistic_wrapper">
          <!-- 이용 고객 수 -->
          <el-card class="statistic_card_inn_style">
            <div class="statistic_data_contents">
              <div class="data_wrapper">
                <div class="title_text">
                  {{ $t('statistic.accuAnalysis') }}
                </div>
                <count-to :start-val="0" :end-val="accuCustCnt" :duration="3000" class="card-panel-num"/>
              </div>
            </div>
          </el-card>
          <!-- 사용 고객 수 -->
          <el-card class="statistic_card_inn_style">
            <div class="statistic_data_contents">
              <div class="data_wrapper">
                <div class="title_text">
                  {{ $t('statistic.useAnalysis') }}
                </div>
                <count-to :start-val="0" :end-val="useCustCnt" :duration="3000" class="card-panel-num"/>
              </div>
            </div>
          </el-card>
        </div>

        <div class="multi_mcht_statistic_wrapper">
          <div class="cust_chart_area1">
            <div style="margin-bottom: 15px;">{{ $t('statistic.monthAccuCntAnalysis2') }}</div>

            <pie-chart :chart-name="$t('statistic.monthAccuCntAnalysis2')" :chart-data.sync="accuCustCntByData"/>

            <el-table :data="['']" border style="min-width: 100%">
              <el-table-column :label="$t('statistic.cntGbn.fifth')" align="center">
                <template>
                  {{ accuCustCntByCount.range1 | toThousandFilter }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('statistic.cntGbn.fifteenth')" align="center">
                <template>
                  {{ accuCustCntByCount.range2 | toThousandFilter }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('statistic.cntGbn.thirtieth')" align="center">
                <template>
                  {{ accuCustCntByCount.range3 | toThousandFilter }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('statistic.cntGbn.etc')" align="center">
                <template>
                  {{ accuCustCntByCount.range4 | toThousandFilter }}
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="cust_chart_area2">
            <div style="margin-bottom: 15px;">{{ $t('statistic.monthUseCntAnalysis') }}</div>

            <pie-chart :chart-name="$t('statistic.monthUseCntAnalysis')" :chart-data.sync="useCustCntByData"/>

            <el-table :data="['']" border style="min-width: 100%">
              <el-table-column :label="$t('statistic.cntGbn.fifth')" align="center">
                <template>
                  {{ useCustCntByCount.range1 | toThousandFilter }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('statistic.cntGbn.fifteenth')" align="center">
                <template>
                  {{ useCustCntByCount.range2 | toThousandFilter }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('statistic.cntGbn.thirtieth')" align="center">
                <template>
                  {{ useCustCntByCount.range3 | toThousandFilter }}
                </template>
              </el-table-column>

              <el-table-column :label="$t('statistic.cntGbn.etc')" align="center">
                <template>
                  {{ useCustCntByCount.range4 | toThousandFilter }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <!-- 적립 or 사용 (한개 표시)--->
      <div v-else>
        <!-- 적립 -->
        <div v-if="accuDivYN === 'Y'">
          <!-- 적립 정보 -->
          <el-card class="mcht_cust_statistic_card_style_one">
            <div class="statistic_data_contents">
              <div class="data_wrapper">
                <div class="title_text">
                  {{ $t('statistic.accuAnalysis') }}
                </div>
                <count-to :start-val="0" :end-val="accuCustCnt" :duration="3000" class="card-panel-num"/>
              </div>
            </div>
          </el-card>

          <div class="mcht_cust_statistic_wrapper">
            <!-- 적립 분석 -->
            <div class="mcht_cust_chart_area_one">
              <div style="margin-bottom: 15px;">{{ $t('statistic.monthAccuCntAnalysis2') }}</div>

              <div align="center">
                <pie-chart :width="'550px'" :height="'400px'" :chart-name="$t('statistic.monthAccuCntAnalysis2')" :chart-data.sync="accuCustCntByData"/>
              </div>

              <el-table :data="['']" border style="min-width: 100%">
                <el-table-column :label="$t('statistic.cntGbn.fifth')" align="center">
                  <template>
                    {{ accuCustCntByCount.range1 | toThousandFilter }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('statistic.cntGbn.fifteenth')" align="center">
                  <template>
                    {{ accuCustCntByCount.range2 | toThousandFilter }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('statistic.cntGbn.thirtieth')" align="center">
                  <template>
                    {{ accuCustCntByCount.range3 | toThousandFilter }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('statistic.cntGbn.etc')" align="center">
                  <template>
                    {{ accuCustCntByCount.range4 | toThousandFilter }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

        </div>

        <!-- 사용 -->
        <div v-if="useDivYN === 'Y'">
          <!-- 사용 정보 -->
          <el-card class="statistic_card_style">
            <div class="statistic_data_contents">
              <div class="data_wrapper">
                <div class="title_text">
                  {{ $t('statistic.useAnalysis') }}
                </div>
                <count-to :start-val="0" :end-val="useCustCnt" :duration="3000" class="card-panel-num"/>
              </div>
            </div>
          </el-card>

          <div class="cust_statistic_wrapper">
            <!-- 사용 분석 -->
            <div class="mcht_cust_chart_area_one">
              <div style="margin-bottom: 15px;">{{ $t('statistic.monthUseCntAnalysis') }}</div>

              <div align="center">
                <pie-chart :width="'550px'" :height="'400px'" :chart-name="$t('statistic.monthUseCntAnalysis')" :chart-data.sync="useCustCntByData"/>
              </div>

              <el-table :data="['']" border style="min-width: 100%">
                <el-table-column :label="$t('statistic.cntGbn.fifth')" align="center">
                  <template>
                    {{ useCustCntByCount.range1 | toThousandFilter }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('statistic.cntGbn.fifteenth')" align="center">
                  <template>
                    {{ useCustCntByCount.range2 | toThousandFilter }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('statistic.cntGbn.thirtieth')" align="center">
                  <template>
                    {{ useCustCntByCount.range3 | toThousandFilter }}
                  </template>
                </el-table-column>

                <el-table-column :label="$t('statistic.cntGbn.etc')" align="center">
                  <template>
                    {{ useCustCntByCount.range4 | toThousandFilter }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import CountTo from 'vue-count-to'
import PieChart from '@/components/PieChart/index'
import { fetchSearchPointCardList } from '@/api/pointCard'
import { fetchSearchStatisticCustData } from '@/api/statistic'

export default {
  name: 'MchtCustStatistic',
  directives: { waves },
  components: {
    CountTo,
    PieChart
  },
  filters: {

  },
  data() {
    return {
      showStatistic: false,
      dataLoading: false,
      custListQuery: {
        pitCardFixNo: '',
        date: ''
      },
      searchDt: '',
      cardList: null,
      accuDivYN: 'N',
      accuCustCnt: 0,
      accuCustCntByCount: [],
      accuCustCntByData: [],
      useDivYN: 'N',
      useCustCnt: 0,
      useCustCntByCount: [],
      useCustCntByData: []
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

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    async getData() {
      // 필수값 체크
      if (!this.custListQuery.pitCardFixNo) {
        this.$message.error(this.$t('message.statSearchValid1'))
        return
      }

      if (this.searchDt) {
        this.custListQuery.date = this.format_date_yyyymm(this.searchDt)
      } else {
        this.custListQuery.date = ''
        this.$message.error(this.$t('message.statSearchValid2'))
        return
      }

      this.showStatistic = false
      this.dataLoading = true

      const statisticData = await fetchSearchStatisticCustData(this.custListQuery)

      this.accuDivYN = statisticData.accuDivYN
      this.useDivYN = statisticData.useDivYN

      // 적립 데이터 입력
      if (this.accuDivYN === 'Y' && statisticData.accuCustCntByCount) {
        this.accuCustCnt = statisticData.accuCustCnt
        this.accuCustCntByCount = statisticData.accuCustCntByCount

        this.accuCustCntByData = [
          { cntValue: this.accuCustCntByCount.range1, cntName: this.$t('statistic.cntGbn.fifth') },
          { cntValue: this.accuCustCntByCount.range2, cntName: this.$t('statistic.cntGbn.fifteenth') },
          { cntValue: this.accuCustCntByCount.range3, cntName: this.$t('statistic.cntGbn.thirtieth') },
          { cntValue: this.accuCustCntByCount.range4, cntName: this.$t('statistic.cntGbn.etc') }
        ]
      } else {
        this.accuDivYN = 'N'
      }

      // 사용 데이터 입력
      if (this.useDivYN === 'Y' && statisticData.useCustCntByCount) {
        this.useCustCnt = statisticData.useCustCnt
        this.useCustCntByCount = statisticData.useCustCntByCount

        this.useCustCntByData = [
          { cntValue: this.useCustCntByCount.range1, cntName: this.$t('statistic.cntGbn.fifth') },
          { cntValue: this.useCustCntByCount.range2, cntName: this.$t('statistic.cntGbn.fifteenth') },
          { cntValue: this.useCustCntByCount.range3, cntName: this.$t('statistic.cntGbn.thirtieth') },
          { cntValue: this.useCustCntByCount.range4, cntName: this.$t('statistic.cntGbn.etc') }
        ]
      } else {
        this.useDivYN = 'N'
      }

      // this.setCntChart(statisticData)

      setTimeout(() => {
        this.showStatistic = true
        this.dataLoading = false
      }, 300)
    },
    format_date_yyyymm(inputDate) {
      const y = inputDate.getFullYear()
      const m = inputDate.getMonth() + 1
      const mm = m < 10 ? '0' + m : m
      return '' + y + mm
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
// 두개일 때
.multi_mcht_statistic_wrapper {
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
        display: flex;
        justify-content: space-between;
        .title_text {
          width: 50%;
          margin-bottom: 10px;
          height: 30px;
          line-height: 30px;
          font-size: 20px;
          text-align: left;
          vertical-align: top;
          color: rgba(0,0,0,0.45);
        }
        .card-panel-num {
          width: 50%;
          height: 110px;
          line-height: 110px;
          font-size: 30px;
          text-align: right;
        }
      }
    }
  }
}

.multi_mcht_statistic_wrapper {
  width: 900px;
  margin: 20px 0 32px 0;
  display: flex;
    justify-content: space-between;
  .cust_chart_area1 {
    width: 435px;
    margin-right: 15px;
  }
  .cust_chart_area2 {
    width: 435px;
    margin-left: 15px;
  }
}

// 한개일 때
.mcht_cust_statistic_card_style_one {
  background-color: #f3f3f3;
  width: 900px;
  margin: 20px 0 32px 0;

  .statistic_data_contents {
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: space-between;

    .data_wrapper {
      width: 100%;
      height: 110px;
      display: flex;
      justify-content: space-between;
      .title_text {
        width: 100%;
        margin-bottom: 80px;
        height: 30px;
        line-height: 30px;
        font-size: 30px;
        text-align: left;
        vertical-align: top;
        color: rgba(0,0,0,0.45);
      }
      .contents_bar {
        display: flex;
        justify-content: space-between;
      }
      .card-panel-num {
        width: 100%;
        height: 110px;
        line-height: 110px;
        font-size: 30px;
        text-align: right;
      }
    }
  }
}

.mcht_cust_statistic_wrapper {
  width: 900px;
  margin: 20px 0 32px 0;

  .cnt_wrapper {
    width: 435px;
    margin-right: 15px;
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

  .chart_wrapper {
    width: 900px;
    margin-bottom: 50px;
  }
}
.cust_pie_wrapper {
  display: flex;
  justify-content: space-between;
  .cust_chart_area1 {
    width: 435px;
    margin-right: 15px;
  }
  .cust_chart_area2 {
    width: 435px;
    margin-left: 15px;
  }
}

.mcht_cust_chart_area_one{
  width: 900px;
}

</style>
