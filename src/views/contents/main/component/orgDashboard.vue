<template>
  <div>
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ orgTextFilter($store.getters.roleInfo) + $t('dashboard.orgDashboardInfo') }}</p>

        <strong v-if="$store.getters.roles.length > 0">{{ $applyTextFilter($store.getters.roles[0].authority, ruleOptions) }}</strong>
      </el-row>
    </sticky>

    <div v-loading="dataLoading" class="app-container">
      <!-- 메인 정보 -->
      <div class="dashboard_main_info">
        <div class="panel-group">
          <div class="card-panel-col">
            <div class="card-panel" @click="handleSelect('newVisitis')">
              <div class="card-panel-icon-wrapper icon-people">
                <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  {{ $t('dashboard.newSubByTo') }}
                </div>
                <count-to :start-val="0" :end-val="data.newSubByTo" :duration="3000" class="card-panel-num"/>
              </div>
            </div>
          </div>
          <div class="card-panel-col">
            <div class="card-panel" @click="handleSelect('messages')">
              <div class="card-panel-icon-wrapper icon-message">
                <svg-icon icon-class="list" class-name="card-panel-icon"/>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  {{ $t('dashboard.accuPitByTo') }}
                </div>
                <count-to :start-val="0" :end-val="data.accuPitByTo" :duration="3000" class="card-panel-num"/>
              </div>
            </div>
          </div>
          <div class="card-panel-col">
            <div class="card-panel" @click="handleSelect('purchases')">
              <div class="card-panel-icon-wrapper icon-money">
                <svg-icon icon-class="shopping" class-name="card-panel-icon"/>
              </div>
              <div class="card-panel-description">
                <div class="card-panel-text">
                  {{ $t('dashboard.usePitByTo') }}
                </div>
                <count-to :start-val="0" :end-val="data.usePitByTo" :duration="3000" class="card-panel-num"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 운영 정보 -->
      <el-card class="dashboard_card_style">
        <div class="dashboard_data_contents">
          <div class="data_wrapper">
            <div class="title_text" align="center">
              {{ $t('dashboard.allPitCard') }}
            </div>
            <count-to :start-val="0" :end-val="data.pitCardByOrgCd" :duration="3000" class="card-panel-num" align="center"/>
          </div>

          <div class="divide_line"/>

          <div class="data_wrapper">
            <div class="title_text" align="center">
              {{ $t('dashboard.allMcht') }}
            </div>
            <count-to :start-val="0" :end-val="data.mchtByOrgCd" :duration="3000" class="card-panel-num" align="center"/>
          </div>

          <div class="divide_line"/>

          <div class="data_wrapper">
            <div class="title_text" align="center">
              {{ $t('dashboard.useOrAccuMchtByOrgCd') }}
            </div>
            <count-to :start-val="0" :end-val="data.useOrAccuMchtByOrgCd" :duration="3000" class="card-panel-num" align="center"/>
          </div>
        </div>
      </el-card>

      <!-- 사용자 정보 -->
      <el-card class="dashboard_card_style">
        <div class="dashboard_data_contents">
          <div class="data_wrapper">
            <div class="title_text" align="center">
              {{ $t('dashboard.allUser') }}
            </div>
            <count-to :start-val="0" :end-val="data.allUser" :duration="3000" class="card-panel-num" align="center"/>
          </div>

          <div class="divide_line"/>

          <div class="data_wrapper">
            <div class="title_text" align="center">
              {{ $t('dashboard.thisMoNewSub') }}
            </div>
            <count-to :start-val="0" :end-val="data.thisMoNewSub" :duration="3000" class="card-panel-num" align="center"/>
          </div>

          <div class="divide_line"/>

          <div class="data_wrapper">
            <div class="title_text" align="center">
              {{ $t('dashboard.lastMoNewSub') }}
            </div>
            <count-to :start-val="0" :end-val="data.lastMoNewSub" :duration="3000" class="card-panel-num" align="center"/>
          </div>
        </div>
      </el-card>

      <!-- 적립 정보 -->
      <el-card class="dashboard_card_style">
        <div class="dashboard_data_contents">
          <div class="data_wrapper">
            <div class="title_text" align="center">
              {{ $t('dashboard.allAccuPit') }}
            </div>
            <count-to :start-val="0" :end-val="data.allAccuPit" :duration="3000" class="card-panel-num" align="center"/>
          </div>

          <div class="divide_line"/>

          <div class="data_wrapper">
            <div class="title_text" align="center">
              {{ $t('dashboard.thisMoAccuPit') }}
            </div>
            <count-to :start-val="0" :end-val="data.thisMoAccuPit" :duration="3000" class="card-panel-num" align="center"/>
          </div>

          <div class="divide_line"/>

          <div class="data_wrapper">
            <div class="title_text" align="center">
              {{ $t('dashboard.thisWeekAccuPit') }}
            </div>
            <count-to :start-val="0" :end-val="data.thisWeekAccuPit" :duration="3000" class="card-panel-num" align="center"/>
          </div>
        </div>
      </el-card>

      <!-- 포인트 정보 -->
      <el-card class="dashboard_card_style">
        <div class="dashboard_data_contents">
          <div class="data_wrapper">
            <div class="title_text" align="center">
              {{ $t('dashboard.allUsePit') }}
            </div>
            <count-to :start-val="0" :end-val="data.allUsePit" :duration="3000" class="card-panel-num" align="center"/>
          </div>

          <div class="divide_line"/>

          <div class="data_wrapper">
            <div class="title_text" align="center">
              {{ $t('dashboard.thisMoUsePit') }}
            </div>
            <count-to :start-val="0" :end-val="data.thisMoUsePit" :duration="3000" class="card-panel-num" align="center"/>
          </div>

          <div class="divide_line"/>

          <div class="data_wrapper">
            <div class="title_text" align="center">
              {{ $t('dashboard.thisWeekUsePit') }}
            </div>
            <count-to :start-val="0" :end-val="data.thisWeekUsePit" :duration="3000" class="card-panel-num" align="center"/>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import CountTo from 'vue-count-to'
import Sticky from '@/components/Sticky'
import { fetchSearchOrgList } from '@/api/org'
import { fetchSearchStatisticData } from '@/api/dashboard'

const ruleOptions = [
  { key: 'ADMIN', name: i18n.t('manager.ruleOptions.admin') },
  { key: 'ORG', name: i18n.t('manager.ruleOptions.org') },
  { key: 'MCHT', name: i18n.t('manager.ruleOptions.mcht') }
]

export default {
  name: 'OrgDashboard',
  directives: { waves },
  components: {
    CountTo,
    Sticky
  },
  filters: {

  },
  data() {
    return {
      orgList: [],
      dataLoading: false,
      data: {},
      ruleOptions
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
    }
  },
  created() {
    this.getOrg()
  },
  methods: {
    async getOrg() {
      this.dataLoading = true

      // 제휴처
      const param = {
        pageIdx: 1,
        pageSize: 10000
      }

      const orgRes = await fetchSearchOrgList(param)
      this.orgList = orgRes.list

      const response = await fetchSearchStatisticData()
      this.data = response

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    handleSelect(type) {
      console.log(type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard_card_style {
  background-color: #f3f3f3;
  width: 1100px;
  margin: 20px 0 32px 0;

  .dashboard_data_contents {
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: space-between;

    .data_wrapper {
      width: 386px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title_text {
        width: 100%;
        line-height: 18px;
        color: rgba(0,0,0,0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        width: 100%;
        font-size: 30px;
        line-height: 40px;
        vertical-align: middle;
        height: 40px;
      }
    }
    .divide_line {
      margin: 20px 0 20px 0;
      height: 70px;
      border-left: 1px solid #303133;
    }
  }
}

// 메인 카드
.dashboard_main_info {
  width: 1100px;
  .panel-group {
    margin-top: 18px;
    display: flex;
    justify-content: space-between;
    .card-panel-col {
      margin-bottom: 32px;
      width: 330px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #f3f3f3;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shopping {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shopping {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }
    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;
      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
}
</style>
