<template>
  <div>
    <!-- 헤더 -->
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.pointCardEdit') }}</p>
        <div>
          <el-button v-waves type="info" plain @click="handleBack">{{ $t('btn.before') }}</el-button>
          <el-button v-waves :loading="confirmLoading" type="primary" plain @click="handleModify">{{ $t('btn.edit') }}</el-button>
        </div>
      </el-row>
    </sticky>

    <!-- 바디 -->
    <div class="app-container">
      <el-row type="flex" justify="start">
        <el-timeline class="time_line">
          <el-timeline-item
            v-for="(activity, index) in timeLineInfo"
            :key="index"
            :icon="activity.icon"
            :color="activity.color"
            :size="activity.size">
            <div class="line_item_style" @click="changeTimeLine(index)">{{ activity.content }}</div>
          </el-timeline-item>
        </el-timeline>

        <el-card v-loading="listLoading" shadow="hover" class="setting_card_style">

          <!-- 헤더 -->
          <div slot="header">
            <el-row type="flex" align="middle" justify="space-between">
              <strong v-if="activeLine === 0">{{ $t('pointCard.basicInfo') }}</strong>
              <strong v-if="activeLine === 1">{{ $t('pointCard.mcntInfo') }}</strong>
              <strong v-if="activeLine === 2">{{ $t('pointCard.useInfo') }}</strong>
              <strong v-if="activeLine === 3">{{ $t('pointCard.expiryDate') }}</strong>
              <strong v-if="activeLine === 4">{{ $t('pointCard.calcInfo') }}</strong>
            </el-row>
          </div>

          <!-- 바디 -->
          <!-- 첫번째 폼 -->
          <base-info
            v-show="activeLine === 0"
            :create-info.sync="editInfo"
            :temp.sync="temp"
            :edit-form="true"/>

          <!-- 두번째 폼 -->
          <mcht-info
            v-show="activeLine === 1"
            :create-info.sync="editInfo"
            :temp.sync="temp"
            :edit-form="true"/>

          <use-info
            v-show="activeLine === 2"
            :create-info.sync="editInfo"
            :temp.sync="temp"
            :edit-form="true"/>

          <!-- 세번째 폼 -->
          <ex-info
            v-show="activeLine === 3"
            :create-info.sync="editInfo"
            :edit-form="true"/>

          <!-- 네번째 폼 -->
          <calc-info
            v-show="activeLine === 4"
            :create-info.sync="editInfo"
            :temp.sync="temp"
            :edit-form="true"/>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import Sticky from '@/components/Sticky'
// 각각 항목들 컴포넌트 형식으로 분리
import BaseInfo from './components/baseInfo'
import MchtInfo from './components/mchtInfo'
import UseInfo from './components/useInfo'
import ExInfo from './components/exInfo'
import CalcInfo from './components/calcInfo'
// API
import { editPointCard, fetchSearchPointCardDetail } from '@/api/pointCard'

export default {
  name: 'PointCardEdit',
  directives: { waves },
  components: {
    // 기본 컴포넌트
    Sticky,
    // 항목들 컴포넌트로 분리
    BaseInfo,
    MchtInfo,
    UseInfo,
    ExInfo,
    CalcInfo
  },
  data() {
    return {
      listLoading: false,
      confirmLoading: false,
      activeLine: 0,
      timeLineInfo: [
        {
          content: this.$t('pointCard.basicInfo'),
          size: 'large',
          color: '#1890ff',
          icon: 'el-icon-more'
        },
        {
          content: this.$t('pointCard.mcntInfo'),
          size: 'large',
          color: '#FFBA00',
          icon: 'el-icon-warning'
        },
        {
          content: this.$t('pointCard.useInfo'),
          size: 'large',
          color: '#FFBA00',
          icon: 'el-icon-warning'
        },
        {
          content: this.$t('pointCard.expiryDate'),
          size: 'large',
          color: '#FFBA00',
          icon: 'el-icon-warning'
        },
        {
          content: this.$t('pointCard.calcInfo'),
          size: 'large',
          color: '#FFBA00',
          icon: 'el-icon-warning'
        }
      ],
      editInfo: {
        // 포인트 카드 기본 정보 BaseInfo
        orgCd: '',
        pitCardNm: '',
        lvDivYn: 'Y',
        levelList: [],
        accuDiv: 'RT',
        maxLmtPitYn: 'Y',
        maxLmtPit: undefined,
        initPitYn: 'Y',
        initPit: undefined,
        prdSetYn: 'Y',
        prdSetDt: '',
        sttDt: '',
        endDt: '',
        /* 적립 제한 방식 변경
        accuLmtYn: 'Y',
        accuLmtDiv: 'PIT',
        */
        accuPitLmtYn: 'N',
        accuPitLmtVal: undefined,
        accuCntLmtYn: 'N',
        accuCntLmtDiv: 'DAY',
        accuCntLmtVal: undefined,
        useLmtYn: 'Y',
        minUsePsbltPit: undefined,
        maxUsePsbltPit: undefined,
        // 제휴처 관리 MchtInfo
        accuDivYn: 'Y',
        accuMchtList: [],
        // 사용처 관리 UseInfo
        accuEqualDivYn: 'N',
        mchtAccuDiffDivYn: 'Y',
        useMchtList: [],
        // 포인트 유효기간 관리 ExInfo
        vldPrdDiv: '',
        vldPrdVal: undefined,
        pitExiDiv: 'NONE',
        pitExiDivData: '',
        // 정산
        calcDiffDiv: 'Y',
        mchtCalcList: []
      },
      // 임시 저장소
      temp: {
        // 실제 입력된 레벨 정보
        levelTemp: {
          applyYn: false,
          lvDivYn: 'Y'
        },
        levelListTemp: [
          {
            lvDivCd: '',
            lvDivNm: ''
          }
        ],
        // 적립처, 등급 구분 X, 상이 일 때 임시 데이터
        lvDivNumInfo: [],
        // 적립처, 등급 구분 X, 동일 일 때 임시 데이터
        noLvDivNum: undefined,
        // 적립처, 등급 구분 X, 동일 일 때 결제 금액 대비 임시 데이터
        trxAmt: undefined,
        // 사용처, 사용금액 동일 임시 데이터
        levelList: [],
        // 사용처, 등급 구분 X, 임시 최소, 최대 사용 금액
        noLvDivMin: undefined,
        noLvDivMax: undefined,
        // 적립처 정산률 동일 값
        tempMchtSel: '',
        tempMchtCalc: undefined,
        // 사용처 정산률 동일 값
        tempUseSel: '',
        tempUseCalc: undefined
      }
    }
  },
  watch: {
    // 데이터 체크
    activeLine() {
      /*
      // 데이터 입력 완료 체크
      this.timeLineInfo[this.activeLine].color = '#0bbd87'
      this.timeLineInfo[this.activeLine].icon = 'el-icon-check'

      // 데이터 입력 입력 중
      this.timeLineInfo[this.activeLine].color = '#1890ff'
      this.timeLineInfo[this.activeLine].icon = 'el-icon-more'

      // 데이터 부족 경고
      this.timeLineInfo[this.activeLine].color = '#FFBA00'
      this.timeLineInfo[this.activeLine].icon = 'el-icon-warning'
      */

      // 포인트 카드 기본 정보 검사
      this.validCheck()
    }
  },
  created() {
    this.getData()
  },
  mounted() {

  },
  methods: {
    async getData() {
      this.listLoading = true

      const response = await fetchSearchPointCardDetail(this.$route.query.pitCardFixNo)

      // 이용기간 세팅
      if (response.sttDt && response.endDt) {
        response.prdSetDt = []
        response.prdSetDt.push(new Date(response.sttDt.substr(0, 4) + '-' + response.sttDt.substr(4, 2) + '-' + response.sttDt.substr(6, 2)))
        response.prdSetDt.push(new Date(response.endDt.substr(0, 4) + '-' + response.endDt.substr(4, 2) + '-' + response.endDt.substr(6, 2)))
      }

      // 포인트 적립 계산을 적립처 정보에서 꺼낸다.
      if (response.accuMchtList && response.accuMchtList.length > 0) {
        if (response.accuMchtList[0].lvList && response.accuMchtList[0].lvList.length > 0) {
          response.accuDiv = response.accuMchtList[0].lvList[0].accuDiv
        }
      }

      // 사용처 정보가 없다면 세팅
      if (!response.useMchtList) {
        response.useMchtList = []
      }

      // 레벨 정보 세팅
      this.temp.levelTemp.lvDivYn = response.lvDivYn
      if (response.levelList) {
        this.temp.lvDivNumInfo = []
        this.temp.levelList = []
        for (let i = 0; i < response.levelList.length; i++) {
          response.levelList[i].unEditable = true

          this.temp.lvDivNumInfo.push({
            lvDivCd: response.levelList[i].lvDivCd,
            lvDivNm: response.levelList[i].lvDivNm,
            accuDivVal: undefined,
            trxAmt: undefined
          })

          this.temp.levelList.push({
            lvDivCd: response.levelList[i].lvDivCd,
            lvDivNm: response.levelList[i].lvDivNm,
            maxUsePit: undefined,
            minUsePit: undefined
          })
        }
        this.temp.levelListTemp = response.levelList
      }

      // 숫자값 세팅
      response.minUsePsbltPit ? response.minUsePsbltPit = Number(response.minUsePsbltPit) : response.minUsePsbltPit = undefined
      response.maxUsePsbltPit ? response.maxUsePsbltPit = Number(response.maxUsePsbltPit) : response.maxUsePsbltPit = undefined
      response.maxLmtPit ? response.maxLmtPit = Number(response.maxLmtPit) : response.maxLmtPit = undefined
      response.initPit ? response.initPit = Number(response.initPit) : response.initPit = undefined
      response.vldPrdVal ? response.vldPrdVal = Number(response.vldPrdVal) : response.vldPrdVal = undefined
      response.accuPitLmtVal ? response.accuPitLmtVal = Number(response.accuPitLmtVal) : response.accuPitLmtVal = undefined
      response.accuCntLmtVal ? response.accuCntLmtVal = Number(response.accuCntLmtVal) : response.accuCntLmtVal = undefined

      for (let i = 0; i < response.accuMchtList.length; i++) {
        for (let j = 0; j < response.accuMchtList[i].lvList.length; j++) {
          response.accuMchtList[i].lvList[j].trxAmt ? response.accuMchtList[i].lvList[j].trxAmt = Number(response.accuMchtList[i].lvList[j].trxAmt) : response.accuMchtList[i].lvList[j].trxAmt = undefined
          response.accuMchtList[i].lvList[j].accuDivVal ? response.accuMchtList[i].lvList[j].accuDivVal = Number(response.accuMchtList[i].lvList[j].accuDivVal) : response.accuMchtList[i].lvList[j].accuDivVal = undefined
        }
      }

      for (let i = 0; i < response.useMchtList.length; i++) {
        for (let j = 0; j < response.useMchtList[i].lvList.length; j++) {
          response.useMchtList[i].lvList[j].minUsePit ? response.useMchtList[i].lvList[j].minUsePit = Number(response.useMchtList[i].lvList[j].minUsePit) : response.useMchtList[i].lvList[j].minUsePit = undefined
          response.useMchtList[i].lvList[j].maxUsePit ? response.useMchtList[i].lvList[j].maxUsePit = Number(response.useMchtList[i].lvList[j].maxUsePit) : response.useMchtList[i].lvList[j].maxUsePit = undefined
        }
      }

      // 동일 상이와 같은 옵션값 추가
      response.accuDivYn = 'Y'
      response.accuEqualDivYn = 'Y'
      response.mchtAccuDiffDivYn = 'Y'

      this.editInfo = response

      this.validCheck()

      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    // -------------------------------- 통합
    handleBack() { // 이전
      this.$router.go(-1)
    },
    changeTimeLine(clickInfo) { // 좌측 메뉴 순서 기록
      // 메뉴 이동 시 등급 적용 여부 체크
      if (clickInfo === 1 || clickInfo === 2) {
        if (this.temp.levelTemp.applyYn) {
          this.activeLine = clickInfo
        } else {
          this.$message.error(this.$t('message.lvValidMessage'))
        }
      } else {
        this.activeLine = clickInfo
      }
    },
    handleModify() { // 등록
      // 데이터 체크
      if (this.checkData()) {
        // 확인 버튼
        this.confirmLoading = true
        this.$confirm(this.$t('message.editConfirm'), {
          confirmButtonText: this.$t('btn.confirm'),
          cancelButtonText: this.$t('btn.cancel'),
          type: 'warning'
        }).then(() => {
          // 운영 기간
          if (this.editInfo.prdSetYn === 'Y') {
            this.editInfo.sttDt = this.format_date_yyyymmdd(this.editInfo.prdSetDt[0])
            this.editInfo.endDt = this.format_date_yyyymmdd(this.editInfo.prdSetDt[1])
          } else {
            this.editInfo.sttDt = ''
            this.editInfo.endDt = ''
          }

          editPointCard(this.editInfo).then(response => {
            this.confirmLoading = false
            this.$message.success(this.$t('message.success'))
            this.$router.go(-1)
          }).catch(() => {
            this.confirmLoading = false
          })
        }).catch(() => {
          this.confirmLoading = false
        })
      }
    },
    format_date_yyyymmdd(inputDate) {
      const y = inputDate.getFullYear()
      const m = inputDate.getMonth() + 1
      const d = inputDate.getDate()
      const mm = m < 10 ? '0' + m : m
      const dd = d < 10 ? '0' + d : d
      return '' + y + mm + dd
    },
    checkData() {
      /* ----- 포인트 카드 기본 정보 검사 ----- */
      // 운영사 선택
      if (!this.editInfo.orgCd) {
        this.$message.error(this.$t('message.pointCardValid.orgCd'))
        return false
      }
      // 포인트 카드 명
      if (!this.editInfo.pitCardNm) {
        this.$message.error(this.$t('message.pointCardValid.pitCardNm'))
        return false
      }
      // 운영 기간
      if (this.editInfo.prdSetYn === 'Y' && !this.editInfo.prdSetDt) {
        this.$message.error(this.$t('message.pointCardValid.prdSetDt'))
        return false
      }

      // 등급 적용 여부 체크
      if (!this.temp.levelTemp.applyYn) {
        this.$message.error(this.$t('message.lvValidMessage'))
        return false
      }

      // 등급 구분
      if (this.editInfo.lvDivYn === 'Y') {
        this.editInfo.levelList.forEach(data => {
          if (!data.lvDivCd || !data.lvDivNm) {
            this.$message.error(this.$t('message.pointCardValid.levelList'))
            return false
          }
        })
      }
      // 적립 방법
      if (!this.editInfo.accuDiv) {
        this.$message.error(this.$t('message.pointCardValid.pitAccu'))
        return false
      }
      // 포인트 점수 제한
      if (this.editInfo.maxLmtPitYn === 'Y' && !this.editInfo.maxLmtPit) {
        this.$message.error(this.$t('message.pointCardValid.maxLmtPit'))
        return false
      }
      // 초기 포인트 점수
      if (this.editInfo.initPitYn === 'Y' && !this.editInfo.initPit) {
        this.$message.error(this.$t('message.pointCardValid.initPit'))
        return false
      }
      // 포인트 적립 제한 (포인트 제한)
      if (this.editInfo.accuPitLmtYn === 'Y' && !this.editInfo.accuPitLmtVal) {
        this.$message.error(this.$t('message.pointCardValid.accuLmtYn'))
        return false
      }
      // 포인트 적립 제한 (횟수 제한)
      if (this.editInfo.accuCntLmtYn === 'Y' && (!this.editInfo.accuCntLmtDiv || !this.editInfo.accuCntLmtVal)) {
        this.$message.error(this.$t('message.pointCardValid.accuLmtYn'))
        return false
      }
      // 사용 제한
      if (this.editInfo.useLmtYn === 'Y' && !this.editInfo.minUsePsbltPit && !this.editInfo.maxUsePsbltPit) {
        this.$message.error(this.$t('message.pointCardValid.useLmtYn'))
        return false
      }

      /* ----- 제휴처 정보 검사 ----- */
      // 제휴처 리스트, 제휴처 - 등급 리스트 체크
      if (this.editInfo.accuMchtList.length > 0) {
        for (let i = 0; i < this.editInfo.accuMchtList.length; i++) {
          if (this.editInfo.accuMchtList[i].lvList.length === 0) {
            this.$message.error(this.$t('message.pointCardValid.lvList'))
            return false
          }
        }
      } else {
        this.$message.error(this.$t('message.pointCardValid.accuMchtList'))
        return false
      }
      // 적립률 체크
      for (let i = 0; i < this.editInfo.accuMchtList.length; i++) {
        for (let j = 0; j < this.editInfo.accuMchtList[i].lvList.length; j++) {
          if (!this.editInfo.accuMchtList[i].lvList[j].accuDivVal || this.editInfo.accuMchtList[i].lvList[j].accuDivVal === '0') {
            this.$message.error(this.$t('message.pointCardValid.accuDivVal'))
            return false
          }
          if (this.editInfo.accuDiv === 'FLAT' && (!this.editInfo.accuMchtList[i].lvList[j].trxAmt || this.editInfo.accuMchtList[i].lvList[j].trxAmt === 0)) {
            this.$message.error(this.$t('message.pointCardValid.accuDivVal'))
            return false
          }
        }
      }

      /* ----- 사용처 정보 검사 ----- */
      // 사용처 금액 리스트 체크
      if (this.editInfo.useMchtList.length > 0) {
        for (let i = 0; i < this.editInfo.useMchtList.length; i++) {
          if (this.editInfo.useMchtList[i].lvList.length === 0) {
            this.$message.error(this.$t('message.pointCardValid.usePlaseDataEmpty'))
            return false
          }
        }
      } else {
        // 사용처는 존재하지 않을 수 있음.
      }
      // 사용처 금액 체크
      if (this.editInfo.useLmtYn === 'Y') {
        for (let i = 0; i < this.editInfo.useMchtList.length; i++) {
          for (let j = 0; j < this.editInfo.useMchtList[i].lvList.length; j++) {
            if (
              (!this.editInfo.useMchtList[i].lvList[j].maxUsePit &&
              !this.editInfo.useMchtList[i].lvList[j].minUsePit) ||
              (this.editInfo.useMchtList[i].lvList[j].maxUsePit === '0' &&
              this.editInfo.useMchtList[i].lvList[j].minUsePit === '0')) {
              this.$message.error(this.$t('message.pointCardValid.usePit'))
              return false
            }
            // 최소 사용가능한 포인트 체크
            if (
              this.editInfo.minUsePsbltPit && this.editInfo.minUsePsbltPit > 0 &&
                (
                  this.editInfo.minUsePsbltPit > this.editInfo.useMchtList[i].lvList[j].maxUsePit ||
                  this.editInfo.minUsePsbltPit > this.editInfo.useMchtList[i].lvList[j].minUsePit
                )
            ) {
              this.$message.error(this.$t('message.pointCardValid.usePitMaxMin'))
              return false
            }

            // 최대 사용가능한 포인트 체크
            if (
              this.editInfo.maxUsePsbltPit && this.editInfo.maxUsePsbltPit > 0 &&
                (
                  this.editInfo.maxUsePsbltPit < this.editInfo.useMchtList[i].lvList[j].maxUsePit ||
                  this.editInfo.maxUsePsbltPit < this.editInfo.useMchtList[i].lvList[j].minUsePit
                )
            ) {
              this.$message.error(this.$t('message.pointCardValid.usePitMaxMin'))
              return false
            }

            // 최대 최소 둘 다 존재할 때 최소 최대 크기 비교
            if (
              this.editInfo.useMchtList[i].lvList[j].maxUsePit && this.editInfo.useMchtList[i].lvList[j].minUsePit &&
                this.editInfo.useMchtList[i].lvList[j].maxUsePit < this.editInfo.useMchtList[i].lvList[j].minUsePit
            ) {
              this.$message.error(this.$t('message.pointCardValid.usePitMaxMin2'))
              return false
            }
          }
        }
      }

      /* ----- 포인트 유효기간 정보 검사 ----- */
      // 유효기간 선택
      if (!this.editInfo.vldPrdDiv && !this.editInfo.vldPrdVal) {
        this.$message.error(this.$t('message.pointCardValid.vldPrdVal'))
        return false
      }

      return true
    },
    validCheck() {
      if (
        this.temp.levelTemp.applyYn &&
        this.editInfo.orgCd &&
        this.editInfo.pitCardNm &&
        (
          this.editInfo.prdSetYn === 'N' ||
          (this.editInfo.prdSetYn === 'Y' && this.editInfo.prdSetDt)
        ) &&
        this.editInfo.accuDiv &&
        (
          this.editInfo.maxLmtPitYn === 'N' ||
          (this.editInfo.maxLmtPitYn === 'Y' && this.editInfo.maxLmtPit)
        ) &&
        (
          this.editInfo.initPitYn === 'N' ||
          (this.editInfo.initPitYn === 'Y' && this.editInfo.initPit)
        ) &&
        (
          this.editInfo.accuPitLmtYn === 'N' ||
          this.editInfo.accuPitLmtYn === 'Y' && this.editInfo.accuPitLmtVal
        ) &&
        (
          this.editInfo.accuCntLmtYn === 'N' ||
          this.editInfo.accuCntLmtYn === 'Y' && this.editInfo.accuCntLmtDiv && this.editInfo.accuCntLmtVal
        ) &&
        (
          this.editInfo.useLmtYn === 'N' ||
          (this.editInfo.useLmtYn === 'Y' && (this.editInfo.minUsePsbltPit || this.editInfo.maxUsePsbltPit))
        )
      ) {
        // lvDivYn가 Y 일때
        if (this.editInfo.lvDivYn === 'Y') {
          let checkLvData = true
          this.editInfo.levelList.forEach(data => {
            if (!data.lvDivCd || !data.lvDivNm) {
              checkLvData = false
            }
          })

          if (checkLvData) {
            this.timeLineInfo[0].color = '#0bbd87'
            this.timeLineInfo[0].icon = 'el-icon-check'
          } else {
            this.timeLineInfo[0].color = '#FFBA00'
            this.timeLineInfo[0].icon = 'el-icon-warning'
          }
        } else {
          this.timeLineInfo[0].color = '#0bbd87'
          this.timeLineInfo[0].icon = 'el-icon-check'
        }
      } else {
        this.timeLineInfo[0].color = '#FFBA00'
        this.timeLineInfo[0].icon = 'el-icon-warning'
      }

      // 제휴처 관리
      let checkMcht = true

      for (let i = 0; i < this.editInfo.accuMchtList.length; i++) {
        for (let j = 0; j < this.editInfo.accuMchtList[i].lvList.length; j++) {
          if (!this.editInfo.accuMchtList[i].lvList[j].accuDivVal || this.editInfo.accuMchtList[i].lvList[j].accuDivVal === '0') {
            checkMcht = false
          }
          if (this.editInfo.accuDiv === 'FLAT' && (!this.editInfo.accuMchtList[i].lvList[j].trxAmt || this.editInfo.accuMchtList[i].lvList[j].trxAmt === 0)) {
            checkMcht = false
          }
        }
      }

      if (this.editInfo.accuMchtList.length > 0) {
        for (let i = 0; i < this.editInfo.accuMchtList.length; i++) {
          if (this.editInfo.accuMchtList[i].lvList.length === 0) {
            checkMcht = false
          }
        }
      } else {
        checkMcht = false
      }

      if (checkMcht) {
        this.timeLineInfo[1].color = '#0bbd87'
        this.timeLineInfo[1].icon = 'el-icon-check'
      } else {
        this.timeLineInfo[1].color = '#FFBA00'
        this.timeLineInfo[1].icon = 'el-icon-warning'
      }

      // 사용처 관리
      let checkUsePlace = true

      if (this.editInfo.useLmtYn === 'Y') {
        for (let i = 0; i < this.editInfo.useMchtList.length; i++) {
          for (let j = 0; j < this.editInfo.useMchtList[i].lvList.length; j++) {
            if (
              (!this.editInfo.useMchtList[i].lvList[j].maxUsePit &&
              !this.editInfo.useMchtList[i].lvList[j].minUsePit) ||
              (this.editInfo.useMchtList[i].lvList[j].maxUsePit === '0' &&
              this.editInfo.useMchtList[i].lvList[j].minUsePit === '0')) {
              checkUsePlace = false
            }
            // 최소 사용가능한 포인트 체크
            if (
              this.editInfo.minUsePsbltPit && this.editInfo.minUsePsbltPit > 0 &&
              (
                this.editInfo.minUsePsbltPit > this.editInfo.useMchtList[i].lvList[j].maxUsePit ||
                this.editInfo.minUsePsbltPit > this.editInfo.useMchtList[i].lvList[j].minUsePit
              )
            ) {
              checkUsePlace = false
            }

            // 최대 사용가능한 포인트 체크
            if (
              this.editInfo.maxUsePsbltPit && this.editInfo.maxUsePsbltPit > 0 &&
              (
                this.editInfo.maxUsePsbltPit < this.editInfo.useMchtList[i].lvList[j].maxUsePit ||
                this.editInfo.maxUsePsbltPit < this.editInfo.useMchtList[i].lvList[j].minUsePit
              )
            ) {
              checkUsePlace = false
            }

            // 최대 최소 둘 다 존재할 때 최소 최대 크기 비교
            if (
              this.editInfo.useMchtList[i].lvList[j].maxUsePit && this.editInfo.useMchtList[i].lvList[j].minUsePit &&
              this.editInfo.useMchtList[i].lvList[j].maxUsePit < this.editInfo.useMchtList[i].lvList[j].minUsePit
            ) {
              checkUsePlace = false
            }
          }
        }
      }

      if (this.editInfo.useMchtList.length > 0) {
        for (let i = 0; i < this.editInfo.useMchtList.length; i++) {
          if (this.editInfo.useMchtList[i].lvList.length === 0) {
            checkUsePlace = false
          }
        }
      } else {
        checkUsePlace = false
      }

      if (checkUsePlace) {
        this.timeLineInfo[2].color = '#0bbd87'
        this.timeLineInfo[2].icon = 'el-icon-check'
      } else {
        this.timeLineInfo[2].color = '#FFBA00'
        this.timeLineInfo[2].icon = 'el-icon-warning'
      }

      // 포인트 유효기간 관리
      if (this.editInfo.vldPrdDiv && this.editInfo.vldPrdVal) {
        this.timeLineInfo[3].color = '#0bbd87'
        this.timeLineInfo[3].icon = 'el-icon-check'
      } else {
        this.timeLineInfo[3].color = '#FFBA00'
        this.timeLineInfo[3].icon = 'el-icon-warning'
      }

      this.timeLineInfo[this.activeLine].color = '#1890ff'
      this.timeLineInfo[this.activeLine].icon = 'el-icon-more'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .setting_card_style {
    min-width: 800px;
    max-width: 800px;
    width: 800px;
  }
  .el-input, textarea {
    max-width: 400px;
  }
  .time_line {
    padding-top: 30px;
    margin-right: 30px;
    .line_item_style {
      cursor: pointer;
      padding-bottom: 0;
      margin-bottom: 20px;
      // 드래그 방지
      -ms-user-select: none;
      -moz-user-select: -moz-none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      user-select:none;
      .el-timeline-item__tail {
        height: calc(100% + 20px);
        margin-left: 3px;
      }
      .el-timeline-item__node {
        width: 20px;
        height: 20px;
        .el-timeline-item__icon {
          font-size: 16px;
        }
      }
      .el-timeline-item__content {
        line-height: 20px;
        vertical-align: middle;
        padding-top: 3px;
      }
      .el-timeline-item__timestamp {
        height: 13px;
      }
    }
  }
</style>
