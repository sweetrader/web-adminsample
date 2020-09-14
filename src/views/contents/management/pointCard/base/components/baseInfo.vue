<template>
  <!-- -------------------------------- 카드 기본 정보 폼 -->
  <el-form v-loading="listLoading" :model="createInfo" label-position="left" label-width="175px">

    <!-- 포인트 카드 키 -->
    <el-form-item v-if="editForm" :label="$t('pointCard.pitCardFixNo')">
      {{ createInfo.pitCardFixNo }}
    </el-form-item>

    <!-- 운영사 선택 -->
    <el-form-item :label="$t('pointCard.orgSel')">
      <el-select v-model="createInfo.orgCd" clearable :disabled="editForm || $store.getters.roles[0].authority === 'ORG'" style="min-width: 120px" class="filter-item" @change="changeOrgTrigger">
        <el-option v-for="item in orgList" :key="item.orgCd" :label="item.orgNm" :value="item.orgCd"/>
      </el-select>
    </el-form-item>

    <!-- 포인트 카드 명 -->
    <el-form-item>
      <div slot="label">
        <span>{{ $t('pointCard.pitCardNm') }}</span>
        <el-tooltip effect="light" placement="top-start">
          <template slot="content">
            <div v-html="$t('pointCard.guide.pitCardNm')"/>
          </template>
          <i class="el-icon-chat-dot-round tip_icon_align"/>
        </el-tooltip>
      </div>

      <el-input v-model="createInfo.pitCardNm" maxlength="50"/>
    </el-form-item>

    <!-- 운영 기간 -->
    <el-form-item>
      <div slot="label">
        <span>{{ $t('pointCard.prdSet') }}</span>
        <el-tooltip effect="light" placement="top-start">
          <template slot="content">
            <div v-html="$t('pointCard.guide.prdSet')"/>
          </template>
          <i class="el-icon-chat-dot-round tip_icon_align"/>
        </el-tooltip>
      </div>

      <el-select v-model="createInfo.prdSetYn" style="width: 123px" class="filter-item">
        <el-option v-for="item in prdSetOptions" :key="item.key" :label="item.name" :value="item.key"/>
      </el-select>

      <el-date-picker
        v-if="createInfo.prdSetYn === 'Y'"
        v-model="createInfo.prdSetDt"
        :start-placeholder="$t('pointCard.prdSetStDt')"
        :end-placeholder="$t('pointCard.prdSetEndDt')"
        class="filter-item"
        type="daterange"
        style="width: 265px; margin-left: 10px;"/>
    </el-form-item>

    <!-- 등급 구분 -->
    <el-form-item>
      <div slot="label">
        <span>{{ $t('pointCard.lvDivYn') }}</span>
        <el-tooltip effect="light" placement="top-start">
          <template slot="content">
            <div v-html="$t('pointCard.guide.lvDivYn')"/>
          </template>
          <i class="el-icon-chat-dot-round tip_icon_align"/>
        </el-tooltip>
      </div>

      <div>
        <el-radio-group v-model="temp.levelTemp.lvDivYn" :disabled="temp.levelTemp.applyYn || editForm">
          <el-radio-button v-for="item in ynOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
        </el-radio-group>

        <!-- 적용 버튼 -->
        <el-button v-if="!temp.levelTemp.applyYn" v-waves type="success" plain @click="handleApplyLevel">{{ $t('btn.apply') }}</el-button>
        <!-- 수정 버튼 -->
        <el-button v-if="temp.levelTemp.applyYn" v-waves type="info" plain @click="handleModifyLevel">{{ $t('btn.edit') }}</el-button>
      </div>

      <div v-if="temp.levelTemp.lvDivYn === 'Y'">
        <el-row v-for="(item, i) in temp.levelListTemp" :key="i" class="lv_div_input_wrap">
          <el-input v-model="item.lvDivCd" :disabled="temp.levelTemp.applyYn || item.unEditable" :placeholder="$t('placeholder.lvDivCd')" maxlength="20"/>
          <el-input v-model="item.lvDivNm" :disabled="temp.levelTemp.applyYn" :placeholder="$t('placeholder.lvDivNm')" maxlength="20"/>
          <!-- 초기포인트 통일에서 등급별 설정으로 변경 -->
          <el-input-number
            v-model="item.initPit"
            :disabled="item.unEditable && editForm"
            :placeholder="$t('placeholder.initPit')"
            :max="99999999"
            :min="0"
            :precision="0"
            :controls="false"/>
          <el-button v-if="i === 0" :disabled="temp.levelTemp.applyYn" icon="el-icon-plus" circle @click="handleLvDiv('plus', i)"/>
          <el-button v-else :disabled="temp.levelTemp.applyYn || item.unEditable" icon="el-icon-minus" circle @click="handleLvDiv('minus', i)"/>
        </el-row>
      </div>
    </el-form-item>

    <!-- 적립 방법 -->
    <el-form-item>
      <div slot="label">
        <span>{{ $t('pointCard.accuDiv') }}</span>
        <el-tooltip effect="light" placement="top-start">
          <template slot="content">
            <div v-html="$t('pointCard.guide.accuDiv')"/>
          </template>
          <i class="el-icon-chat-dot-round tip_icon_align"/>
        </el-tooltip>
      </div>

      <el-row type="flex" justify="start">
        <el-select v-model="createInfo.accuDiv" :disabled="temp.levelTemp.applyYn || editForm" style="width: 123px" class="filter-item">
          <el-option v-for="item in accuDivOptions" :key="item.key" :label="item.name" :value="item.key"/>
        </el-select>
      </el-row>
    </el-form-item>

    <!-- 포인트 적립 한도 -->
    <el-form-item>
      <div slot="label">
        <span>{{ $t('pointCard.maxLmtPit') }}</span>
        <el-tooltip effect="light" placement="top-start">
          <template slot="content">
            <div v-html="$t('pointCard.guide.maxLmtPit')"/>
          </template>
          <i class="el-icon-chat-dot-round tip_icon_align"/>
        </el-tooltip>
      </div>

      <el-row type="flex" justify="start">
        <el-radio-group v-model="createInfo.maxLmtPitYn" :disabled="editForm">
          <el-radio-button v-for="item in ynOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
        </el-radio-group>

        <el-input-number
          v-if="createInfo.maxLmtPitYn === 'Y'"
          v-model="createInfo.maxLmtPit"
          :placeholder="$t('placeholder.accuLmt')"
          style="width: 165px; margin-left: 10px;"
          :max="99999999"
          :min="0"
          :precision="0"
          :controls="false"/>
      </el-row>
    </el-form-item>

    <!-- 초기 포인트 -->
    <!--
    <el-form-item>
      <div slot="label">
        <span>{{ $t('pointCard.initPitYn') }}</span>
        <el-tooltip effect="light" placement="top-start">
          <template slot="content">
            <div v-html="$t('pointCard.guide.initPitYn')"/>
          </template>
          <i class="el-icon-chat-dot-round tip_icon_align"/>
        </el-tooltip>
      </div>

      <el-row type="flex" justify="start">
        <el-radio-group v-model="createInfo.initPitYn" :disabled="editForm">
          <el-radio-button v-for="item in ynOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
        </el-radio-group>

        <el-input-number
          v-if="createInfo.initPitYn === 'Y'"
          v-model="createInfo.initPit"
          :disabled="editForm"
          :placeholder="$t('placeholder.initPit')"
          :max="99999999"
          :min="0"
          :precision="0"
          :controls="false"
          style="width: 165px; margin-left: 10px;"/>
      </el-row>
    </el-form-item>
    -->

    <!-- 포인트 적립 제한 -->
    <el-form-item>
      <div slot="label">
        <span>{{ $t('pointCard.accuLmtYn') }}</span>
        <el-tooltip effect="light" placement="top-start">
          <template slot="content">
            <div v-html="$t('pointCard.guide.accuLmtYn')"/>
          </template>
          <i class="el-icon-chat-dot-round tip_icon_align"/>
        </el-tooltip>
      </div>

      <el-checkbox
        v-model="createInfo.accuPitLmtYn"
        true-label="Y"
        false-label="N"
        style="width: 123px;">
        {{ $t('pointCard.accuLmtDivOptions.pit') }}
      </el-checkbox>

      <el-input-number
        v-if="createInfo.accuPitLmtYn === 'Y'"
        v-model="createInfo.accuPitLmtVal"
        style="width: 165px; margin-left: 10px;"
        :placeholder="$t('placeholder.eachAccuLmt1')"
        :max="99999999"
        :min="0"
        :precision="0"
        :controls="false"/>

      <!--
      <el-radio-group v-model="createInfo.accuLmtYn">
        <el-radio-button v-for="item in ynOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
      </el-radio-group>

      <el-row v-if="createInfo.accuLmtYn === 'Y'" type="flex" justify="start" style="margin-top: 18px;">
        <el-select v-model="createInfo.accuLmtDiv" style="width: 123px" class="filter-item" @change="createInfo.accuDivVal = undefined">
          <el-option v-for="item in accuLmtDivOptions" :key="item.key" :label="item.name" :value="item.key"/>
        </el-select>

        <el-input-number
          v-if="createInfo.accuLmtDiv === 'PIT'"
          v-model="createInfo.accuDivVal"
          style="width: 165px; margin-left: 10px;"
          :placeholder="$t('placeholder.eachAccuLmt1')"
          :max="99999999"
          :min="0"
          :precision="0"
          :controls="false"/>

        <el-select
          v-if="createInfo.accuLmtDiv === 'CNT'"
          v-model="createInfo.accuCntLmtDiv"
          style="width: 165px; margin-left: 10px;"
          class="filter-item">
          <el-option v-for="item in accuCntLmtDivOptions" :key="item.key" :label="item.name" :value="item.key"/>
        </el-select>

        <el-input-number
          v-if="createInfo.accuLmtDiv === 'CNT'"
          v-model="createInfo.accuDivVal"
          style="width: 165px; margin-left: 10px;"
          :placeholder="$t('placeholder.eachAccuLmt2')"
          :max="99999999"
          :min="0"
          :precision="0"
          :controls="false"/>
      </el-row>
      -->
    </el-form-item>

    <el-form-item>
      <el-checkbox
        v-model="createInfo.accuCntLmtYn"
        true-label="Y"
        false-label="N"
        style="width: 123px;">
        {{ $t('pointCard.accuLmtDivOptions.cnt') }}
      </el-checkbox>

      <el-select
        v-if="createInfo.accuCntLmtYn === 'Y'"
        v-model="createInfo.accuCntLmtDiv"
        style="width: 165px; margin-left: 10px;"
        class="filter-item">
        <el-option v-for="item in accuCntLmtDivOptions" :key="item.key" :label="item.name" :value="item.key"/>
      </el-select>

      <el-input-number
        v-if="createInfo.accuCntLmtYn === 'Y'"
        v-model="createInfo.accuCntLmtVal"
        style="width: 165px; margin-left: 10px;"
        :placeholder="$t('placeholder.eachAccuLmt2')"
        :max="99999999"
        :min="0"
        :precision="0"
        :controls="false"/>
    </el-form-item>

    <!-- 사용 제한 -->
    <el-form-item>
      <div slot="label">
        <span>{{ $t('pointCard.useLmtYn') }}</span>
        <el-tooltip effect="light" placement="top-start">
          <template slot="content">
            <div v-html="$t('pointCard.guide.useLmtYn')"/>
          </template>
          <i class="el-icon-chat-dot-round tip_icon_align"/>
        </el-tooltip>
      </div>

      <el-row type="flex" justify="start">
        <el-radio-group v-model="createInfo.useLmtYn">
          <el-radio-button v-for="item in ynOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
        </el-radio-group>

        <el-input-number
          v-if="createInfo.useLmtYn === 'Y'"
          v-model="createInfo.minUsePsbltPit"
          :placeholder="$t('placeholder.minUsePsbltPit')"
          style="width: 165px; margin-left: 10px;"
          :max="createInfo.maxUsePsbltPit && createInfo.maxUsePsbltPit > 0 ? createInfo.maxUsePsbltPit : 99999999"
          :min="1"
          :precision="0"
          :controls="false"/>

        <el-input-number
          v-if="createInfo.useLmtYn === 'Y'"
          v-model="createInfo.maxUsePsbltPit"
          :placeholder="$t('placeholder.maxUsePsbltPit')"
          style="width: 165px; margin-left: 10px;"
          :max="99999999"
          :min="createInfo.minUsePsbltPit && createInfo.minUsePsbltPit > 0 ? createInfo.minUsePsbltPit : 1"
          :precision="0"
          :controls="false"/>
      </el-row>
    </el-form-item>
  </el-form>
  <!-- -------------------------------- 카드 기본 정보 폼 -->
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import { fetchSearchOrgList } from '@/api/org'

const ynOptions = [
  { key: 'Y', name: i18n.t('pointCard.ynOptions.y') },
  { key: 'N', name: i18n.t('pointCard.ynOptions.n') }
]

const prdSetOptions = [
  { key: 'Y', name: i18n.t('pointCard.prdSetOptions.y') },
  { key: 'N', name: i18n.t('pointCard.prdSetOptions.n') }
]

const accuDivOptions = [
  { key: 'RT', name: i18n.t('pointCard.accuDivOptions.rt'), long: i18n.t('pointCard.accuDivOptionsLong.rt') },
  { key: 'FLAT', name: i18n.t('pointCard.accuDivOptions.flat'), long: i18n.t('pointCard.accuDivOptionsLong.flat') },
  { key: 'FIX', name: i18n.t('pointCard.accuDivOptions.fix'), long: i18n.t('pointCard.accuDivOptionsLong.fix') }
]

const accuLmtDivOptions = [
  { key: 'PIT', name: i18n.t('pointCard.accuLmtDivOptions.pit') },
  { key: 'CNT', name: i18n.t('pointCard.accuLmtDivOptions.cnt') }
]

const accuCntLmtDivOptions = [
  { key: 'DAY', name: i18n.t('pointCard.accuCntLmtDivOptions.day') },
  { key: 'WEEK', name: i18n.t('pointCard.accuCntLmtDivOptions.week') },
  { key: 'MONTH', name: i18n.t('pointCard.accuCntLmtDivOptions.month') }
]

export default {
  name: 'BaseInfo',
  directives: { waves },
  components: { },
  filters: { },
  props: {
    createInfo: {
      type: Object,
      default: function() {
        return {}
      }
    },
    temp: {
      type: Object,
      default: function() {
        return {}
      }
    },
    editForm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listLoading: false,
      orgList: [],
      ynOptions,
      prdSetOptions,
      accuDivOptions,
      accuLmtDivOptions,
      accuCntLmtDivOptions
    }
  },
  watch: {

  },
  created() {
    this.getOrgData()

    // 수정 시 등급 구분 수정 방지 및 데이터 세팅
    if (this.editForm) {
      this.temp.levelTemp.applyYn = true
    }
  },
  mounted() { },
  methods: {
    async getOrgData() {
      this.listLoading = true

      const param = {
        st: 'OK',
        pageIdx: 1,
        pageSize: 9999
      }
      const response = await fetchSearchOrgList(param)

      this.orgList = response.list

      // 운영사 계정의 경우 운영사 고정
      if (this.$store.getters.roles[0].authority === 'ORG' && !this.editForm) {
      // 계정에 어느 운영사인지 세팅이 된다면 추가
        this.createInfo.orgCd = this.$store.getters.roleInfo
      }

      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    handleApplyLevel() { // 등급 적용
      // 등급을 사용 할 때 등급 데이터 체크
      if (this.temp.levelTemp.lvDivYn === 'Y') {
        for (let i = 0; i < this.temp.levelListTemp.length; i++) {
          for (let j = 0; j < this.temp.levelListTemp.length; j++) {
            // 등급 key 중복 확인
            if (i !== j && this.temp.levelListTemp[i].lvDivCd === this.temp.levelListTemp[j].lvDivCd) {
              this.$message.error(this.$t('message.lvDivCdDuplicate'))
              return
            }
          }
          if (!this.temp.levelListTemp[i].lvDivCd || !this.temp.levelListTemp[i].lvDivNm) {
            this.$message.error(this.$t('message.lvDivValid'))
            return
          }
        }
      }

      // 적립 방법 데이터 체크(RT, FIX, FLAT)
      if (!this.createInfo.accuDiv) {
        this.$message.error(this.$t('message.pointCardValid.pitAccu'))
        return false
      }

      // 포인트 적립 계산 방식 추가
      for (let i = 0; i < this.temp.levelListTemp.length; i++) {
        this.temp.levelListTemp[i].accuDiv = this.createInfo.accuDiv
      }

      this.createInfo.lvDivYn = this.temp.levelTemp.lvDivYn
      this.createInfo.levelList = this.temp.levelListTemp

      // 임시 공간에 레벨 리스트 정보 전달
      this.temp.levelList = []
      this.temp.lvDivNumInfo = []

      for (let i = 0; i < this.temp.levelListTemp.length; i++) {
        // 사용처 최대 최소
        this.temp.levelList.push({
          lvDivCd: this.temp.levelListTemp[i].lvDivCd,
          lvDivNm: this.temp.levelListTemp[i].lvDivNm,
          fncDiv: 'USE',
          maxUsePit: undefined,
          minUsePit: undefined
        })
        // 적립처 적립 방법
        this.temp.lvDivNumInfo.push({
          lvDivCd: this.temp.levelListTemp[i].lvDivCd,
          lvDivNm: this.temp.levelListTemp[i].lvDivNm,
          fncDiv: 'ACCU',
          accuDiv: this.temp.levelListTemp[i].accuDiv,
          accuDivVal: undefined,
          trxAmt: undefined
        })
      }

      if (this.createInfo.lvDivYn === 'Y') {
        // 적립처 관리 추가용 데이터 세팅 (등급 O)
        for (let i = 0; i < this.createInfo.accuMchtList.length; i++) {
          const temp = this.createInfo.accuMchtList[i].lvList
          this.createInfo.accuMchtList[i].lvList = []

          for (let j = 0; j < this.createInfo.levelList.length; j++) {
            if (this.temp.levelListTemp[j].unEditable) {
              this.createInfo.accuMchtList[i].lvList.push(temp[j])
              this.createInfo.accuMchtList[i].lvList[j].lvDivNm = this.createInfo.levelList[j].lvDivNm
            } else {
              this.createInfo.accuMchtList[i].lvList.push({
                lvDivCd: this.createInfo.levelList[j].lvDivCd,
                lvDivNm: this.createInfo.levelList[j].lvDivNm,
                fncDiv: 'ACCU',
                accuDiv: this.createInfo.accuDiv,
                accuDivVal: undefined,
                trxAmt: undefined
              })
            }
          }
        }

        // 사용처 관리 추가용 데이터 세팅 (등급 O)
        for (let i = 0; i < this.createInfo.useMchtList.length; i++) {
          const temp = this.createInfo.useMchtList[i].lvList
          this.createInfo.useMchtList[i].lvList = []

          for (let j = 0; j < this.createInfo.levelList.length; j++) {
            if (this.temp.levelListTemp[j].unEditable) {
              this.createInfo.useMchtList[i].lvList.push(temp[j])
              this.createInfo.useMchtList[i].lvList[j].lvDivNm = this.createInfo.levelList[j].lvDivNm
            } else {
              this.createInfo.useMchtList[i].lvList.push({
                lvDivCd: this.createInfo.levelList[j].lvDivCd,
                lvDivNm: this.createInfo.levelList[j].lvDivNm,
                fncDiv: 'USE',
                maxUsePit: undefined,
                minUsePit: undefined
              })
            }
          }
        }
      } else if (this.createInfo.lvDivYn === 'N') {
        // 적립처 관리 추가용 데이터 세팅 (등급 X)
        for (let i = 0; i < this.createInfo.accuMchtList.length; i++) {
          this.createInfo.accuMchtList[i].lvList = []

          this.createInfo.accuMchtList[i].lvList.push({
            lvDivCd: 'normal',
            fncDiv: 'ACCU',
            accuDiv: this.createInfo.accuDiv,
            accuDivVal: undefined,
            trxAmt: undefined
          })
        }

        // 사용처 관리 추가용 데이터 세팅 (등급 X)
        for (let i = 0; i < this.createInfo.useMchtList.length; i++) {
          this.createInfo.useMchtList[i].lvList = []

          this.createInfo.useMchtList[i].lvList.push({
            lvDivCd: 'normal',
            fncDiv: 'USE',
            maxUsePit: undefined,
            minUsePit: undefined
          })
        }
      }

      this.temp.levelTemp.applyYn = true
    },
    handleModifyLevel() { // 등급 수정
      this.$confirm(this.$t('message.modifyLevelWarning'), '', {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.temp.levelTemp.applyYn = false
      }).catch(() => {
      })
    },
    handleLvDiv(type, i) { // 등급 추가 삭제
      let newDiv
      switch (type) {
        case 'plus':
          newDiv = {
            lvDivCd: '',
            lvDivNm: '',
            initPit: undefined
          }
          this.temp.levelListTemp.push(newDiv)
          break
        case 'minus':
          this.temp.levelListTemp.splice(i, 1)
          break
      }
    },
    changeOrgTrigger() {
      // 운영사 변경 시 적립처, 사용처 초기화
      this.createInfo.accuMchtList = []
      this.createInfo.useMchtList = []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .lv_div_input_wrap {
    margin-top: 18px;
    .el-input {
      width: 160px;
    }
    .el-input-number {
      width: 160px;
    }
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
</style>
