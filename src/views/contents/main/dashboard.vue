<template>
  <div>
    <div v-if="$store.getters.token">
      <admin v-if="$store.getters.roles[0].authority === 'ADMIN'"/>

      <mcht v-if="$store.getters.roles[0].authority === 'MCHT'"/>

      <org v-if="$store.getters.roles[0].authority === 'ORG'"/>
    </div>
  </div>
</template>

<script>
// import i18n from '@/lang'
import waves from '@/directive/waves'
import admin from './component/adminDashboard'
import mcht from './component/mchtDashboard'
import org from './component/orgDashboard'

export default {
  name: 'Dashboard',
  directives: { waves },
  components: {
    admin,
    mcht,
    org
  },
  filters: {

  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

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
