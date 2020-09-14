<template>
  <div>
    <!-- 헤더 -->
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.pointCardCreate') }}</p>
        <div>
          <el-button v-waves type="info" plain @click="handleBack">{{ $t('btn.before') }}</el-button>
          <el-button v-waves type="warning" plain @click="handleTempSave">{{ $t('btn.saveTemp') }}</el-button>
          <el-button v-waves :loading="confirmLoading" type="primary" plain @click="handleModify">{{ $t('btn.add') }}</el-button>
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
            :create-info.sync="createInfo"
            :temp.sync="temp"/>

          <!-- 두번째 폼 -->
          <mcht-info
            v-show="activeLine === 1"
            :create-info.sync="createInfo"
            :temp.sync="temp"/>

          <use-info
            v-show="activeLine === 2"
            :create-info.sync="createInfo"
            :temp.sync="temp"/>

          <!-- 세번째 폼 -->
          <ex-info
            v-show="activeLine === 3"
            :create-info.sync="createInfo"/>

          <!-- 네번째 폼 -->
          <calc-info
            v-show="activeLine === 4"
            :create-info.sync="createInfo"
            :temp.sync="temp"/>
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
import { createPointCard } from '@/api/pointCard'

export default {
  name: 'PointCardCreate',
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
      createInfo: {
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

      this.validCheck()
    }
  },
  created() {
    // 임시 저장 복구 일 때
    if (localStorage.getItem('tempList') && this.$route.query.n) {
      const tempList = JSON.parse(localStorage.getItem('tempList'))

      this.createInfo = tempList[this.$route.query.n].createInfo
      this.temp = tempList[this.$route.query.n].temp

      if (this.createInfo.prdSetDt) {
        this.createInfo.prdSetDt[0] = new Date(this.createInfo.prdSetDt[0])
        this.createInfo.prdSetDt[1] = new Date(this.createInfo.prdSetDt[1])
      }
      this.validCheck()
    }
  },
  mounted() {

  },
  methods: {
    // -------------------------------- 통합
    handleTempSave() { // 임시 저장
      this.$confirm(this.$t('message.saveTempCheck'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        const data = {
          createInfo: this.createInfo,
          temp: this.temp
        }

        if (!localStorage.getItem('tempList')) {
          // 존재하지 않을 때
          const tempList = []
          tempList.push(data)
          localStorage.setItem('tempList', JSON.stringify(tempList))
        } else {
          // 임시 데이터가 존재할 때
          if (localStorage.getItem('tempList') && this.$route.query.n) {
            // 기존 임시저장 수정
            const tempList = JSON.parse(localStorage.getItem('tempList'))
            localStorage.removeItem('tempList')
            tempList[this.$route.query.n] = data
            localStorage.setItem('tempList', JSON.stringify(tempList))
          } else {
            // 기존 임시저장에 추가
            const tempList = JSON.parse(localStorage.getItem('tempList'))
            localStorage.removeItem('tempList')
            tempList.push(data)
            localStorage.setItem('tempList', JSON.stringify(tempList))
          }
        }
        this.$router.go(-1)
      }).catch(() => {
        this.confirmLoading = false
      })
    },
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
        this.$confirm(this.$t('message.addConfirm'), {
          confirmButtonText: this.$t('btn.confirm'),
          cancelButtonText: this.$t('btn.cancel'),
          type: 'warning'
        }).then(() => {
          // 운영 기간
          if (this.createInfo.prdSetYn === 'Y') {
            this.createInfo.sttDt = this.format_date_yyyymmdd(this.createInfo.prdSetDt[0])
            this.createInfo.endDt = this.format_date_yyyymmdd(this.createInfo.prdSetDt[1])
          } else {
            this.createInfo.sttDt = ''
            this.createInfo.endDt = ''
          }

          createPointCard(this.createInfo).then(response => {
            this.confirmLoading = false
            this.$message.success(this.$t('message.success'))
            // 임시저장 삭제 로직
            if (localStorage.getItem('tempList') && this.$route.query.n) {
              const tempList = JSON.parse(localStorage.getItem('tempList'))

              tempList.splice(this.$route.query.n, 1)
              localStorage.removeItem('tempList')
              localStorage.setItem('tempList', JSON.stringify(tempList))
            }

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
      if (!this.createInfo.orgCd) {
        this.$message.error(this.$t('message.pointCardValid.orgCd'))
        return false
      }
      // 포인트 카드 명
      if (!this.createInfo.pitCardNm) {
        this.$message.error(this.$t('message.pointCardValid.pitCardNm'))
        return false
      }
      // 운영 기간
      if (this.createInfo.prdSetYn === 'Y' && !this.createInfo.prdSetDt) {
        this.$message.error(this.$t('message.pointCardValid.prdSetDt'))
        return false
      }

      // 등급 적용 여부 체크
      if (!this.temp.levelTemp.applyYn) {
        this.$message.error(this.$t('message.lvValidMessage'))
        return false
      }

      // 등급 구분
      if (this.createInfo.lvDivYn === 'Y') {
        this.createInfo.levelList.forEach(data => {
          if (!data.lvDivCd || !data.lvDivNm) {
            this.$message.error(this.$t('message.pointCardValid.levelList'))
            return false
          }
        })
      }
      // 적립 방법
      if (!this.createInfo.accuDiv) {
        this.$message.error(this.$t('message.pointCardValid.pitAccu'))
        return false
      }
      // 포인트 적립 한도
      if (this.createInfo.maxLmtPitYn === 'Y' && !this.createInfo.maxLmtPit) {
        this.$message.error(this.$t('message.pointCardValid.maxLmtPit'))
        return false
      }
      // 초기 포인트
      if (this.createInfo.initPitYn === 'Y' && !this.createInfo.initPit) {
        this.$message.error(this.$t('message.pointCardValid.initPit'))
        return false
      }
      // 포인트 적립 제한 (포인트 제한)
      if (this.createInfo.accuPitLmtYn === 'Y' && !this.createInfo.accuPitLmtVal) {
        this.$message.error(this.$t('message.pointCardValid.accuLmtYn'))
        return false
      }
      // 포인트 적립 제한 (횟수 제한)
      if (this.createInfo.accuCntLmtYn === 'Y' && (!this.createInfo.accuCntLmtDiv || !this.createInfo.accuCntLmtVal)) {
        this.$message.error(this.$t('message.pointCardValid.accuLmtYn'))
        return false
      }
      // 포인트 사용 제한
      if (this.createInfo.useLmtYn === 'Y' && !this.createInfo.minUsePsbltPit && !this.createInfo.maxUsePsbltPit) {
        this.$message.error(this.$t('message.pointCardValid.useLmtYn'))
        return false
      }

      /* ----- 제휴처 정보 검사 ----- */
      // 제휴처 리스트, 제휴처 - 등급 리스트 체크
      if (this.createInfo.accuMchtList.length > 0) {
        for (let i = 0; i < this.createInfo.accuMchtList.length; i++) {
          if (this.createInfo.accuMchtList[i].lvList.length === 0) {
            this.$message.error(this.$t('message.pointCardValid.lvList'))
            return false
          }
        }
      } else {
        this.$message.error(this.$t('message.pointCardValid.accuMchtList'))
        return false
      }
      // 적립률 체크
      for (let i = 0; i < this.createInfo.accuMchtList.length; i++) {
        for (let j = 0; j < this.createInfo.accuMchtList[i].lvList.length; j++) {
          if (!this.createInfo.accuMchtList[i].lvList[j].accuDivVal || this.createInfo.accuMchtList[i].lvList[j].accuDivVal === 0) {
            this.$message.error(this.$t('message.pointCardValid.accuDivVal'))
            return false
          }
          if (this.createInfo.accuDiv === 'FLAT' && (!this.createInfo.accuMchtList[i].lvList[j].trxAmt || this.createInfo.accuMchtList[i].lvList[j].trxAmt === 0)) {
            this.$message.error(this.$t('message.pointCardValid.accuDivVal'))
            return false
          }
        }
      }

      /* ----- 사용처 정보 검사 ----- */
      // 사용처 금액 리스트 체크
      if (this.createInfo.useMchtList.length > 0) {
        for (let i = 0; i < this.createInfo.useMchtList.length; i++) {
          if (this.createInfo.useMchtList[i].lvList.length === 0) {
            this.$message.error(this.$t('message.pointCardValid.usePlaseDataEmpty'))
            return false
          }
        }
      } else {
        // 사용처는 존재하지 않을 수 있음.
      }
      // 사용처 금액 체크
      if (this.createInfo.useLmtYn === 'Y') {
        for (let i = 0; i < this.createInfo.useMchtList.length; i++) {
          for (let j = 0; j < this.createInfo.useMchtList[i].lvList.length; j++) {
            if (
              (!this.createInfo.useMchtList[i].lvList[j].maxUsePit &&
              !this.createInfo.useMchtList[i].lvList[j].minUsePit) ||
              (this.createInfo.useMchtList[i].lvList[j].maxUsePit === '0' &&
              this.createInfo.useMchtList[i].lvList[j].minUsePit === '0')) {
              this.$message.error(this.$t('message.pointCardValid.usePit'))
              return false
            }
            // 최소 사용가능한 포인트 체크
            if (
              this.createInfo.minUsePsbltPit && this.createInfo.minUsePsbltPit > 0 &&
              (
                this.createInfo.minUsePsbltPit > this.createInfo.useMchtList[i].lvList[j].maxUsePit ||
                this.createInfo.minUsePsbltPit > this.createInfo.useMchtList[i].lvList[j].minUsePit
              )
            ) {
              this.$message.error(this.$t('message.pointCardValid.usePitMaxMin'))
              return false
            }

            // 최대 사용가능한 포인트 체크
            if (
              this.createInfo.maxUsePsbltPit && this.createInfo.maxUsePsbltPit > 0 &&
              (
                this.createInfo.maxUsePsbltPit < this.createInfo.useMchtList[i].lvList[j].maxUsePit ||
                this.createInfo.maxUsePsbltPit < this.createInfo.useMchtList[i].lvList[j].minUsePit
              )
            ) {
              this.$message.error(this.$t('message.pointCardValid.usePitMaxMin'))
              return false
            }

            // 최대 최소 둘 다 존재할 때 최소 최대 크기 비교
            if (
              this.createInfo.useMchtList[i].lvList[j].maxUsePit && this.createInfo.useMchtList[i].lvList[j].minUsePit &&
              this.createInfo.useMchtList[i].lvList[j].maxUsePit < this.createInfo.useMchtList[i].lvList[j].minUsePit
            ) {
              this.$message.error(this.$t('message.pointCardValid.usePitMaxMin2'))
              return false
            }
          }
        }
      }

      /* ----- 포인트 유효기간 정보 검사 ----- */
      // 유효기간 선택
      if (!this.createInfo.vldPrdDiv && !this.createInfo.vldPrdVal) {
        this.$message.error(this.$t('message.pointCardValid.vldPrdVal'))
        return false
      }

      return true
    },
    validCheck() {
      // 포인트 카드 기본 정보 검사
      if (
        this.temp.levelTemp.applyYn &&
        this.createInfo.orgCd &&
        this.createInfo.pitCardNm &&
        (
          this.createInfo.prdSetYn === 'N' ||
          (this.createInfo.prdSetYn === 'Y' && this.createInfo.prdSetDt)
        ) &&
        this.createInfo.accuDiv &&
        (
          this.createInfo.maxLmtPitYn === 'N' ||
          (this.createInfo.maxLmtPitYn === 'Y' && this.createInfo.maxLmtPit)
        ) &&
        (
          this.createInfo.initPitYn === 'N' ||
          (this.createInfo.initPitYn === 'Y' && this.createInfo.initPit)
        ) &&
        (
          this.createInfo.accuPitLmtYn === 'N' ||
          this.createInfo.accuPitLmtYn === 'Y' && this.createInfo.accuPitLmtVal
        ) &&
        (
          this.createInfo.accuCntLmtYn === 'N' ||
          this.createInfo.accuCntLmtYn === 'Y' && this.createInfo.accuCntLmtDiv && this.createInfo.accuCntLmtVal
        ) &&
        (
          this.createInfo.useLmtYn === 'N' ||
          (this.createInfo.useLmtYn === 'Y' && (this.createInfo.minUsePsbltPit || this.createInfo.maxUsePsbltPit))
        )
      ) {
        // lvDivYn가 Y 일때
        if (this.createInfo.lvDivYn === 'Y') {
          let checkLvData = true
          this.createInfo.levelList.forEach(data => {
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

      for (let i = 0; i < this.createInfo.accuMchtList.length; i++) {
        for (let j = 0; j < this.createInfo.accuMchtList[i].lvList.length; j++) {
          if (!this.createInfo.accuMchtList[i].lvList[j].accuDivVal || this.createInfo.accuMchtList[i].lvList[j].accuDivVal === 0) {
            checkMcht = false
          }
          if (this.createInfo.accuDiv === 'FLAT' && (!this.createInfo.accuMchtList[i].lvList[j].trxAmt || this.createInfo.accuMchtList[i].lvList[j].trxAmt === 0)) {
            checkMcht = false
          }
        }
      }

      if (this.createInfo.accuMchtList.length > 0) {
        for (let i = 0; i < this.createInfo.accuMchtList.length; i++) {
          if (this.createInfo.accuMchtList[i].lvList.length === 0) {
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

      if (this.createInfo.useLmtYn === 'Y') {
        for (let i = 0; i < this.createInfo.useMchtList.length; i++) {
          for (let j = 0; j < this.createInfo.useMchtList[i].lvList.length; j++) {
            if (
              (!this.createInfo.useMchtList[i].lvList[j].maxUsePit &&
              !this.createInfo.useMchtList[i].lvList[j].minUsePit) ||
              (this.createInfo.useMchtList[i].lvList[j].maxUsePit === '0' &&
              this.createInfo.useMchtList[i].lvList[j].minUsePit === '0')) {
              checkUsePlace = false
            }
            // 최소 사용가능한 포인트 체크
            if (
              this.createInfo.minUsePsbltPit && this.createInfo.minUsePsbltPit > 0 &&
            (
              this.createInfo.minUsePsbltPit > this.createInfo.useMchtList[i].lvList[j].maxUsePit ||
              this.createInfo.minUsePsbltPit > this.createInfo.useMchtList[i].lvList[j].minUsePit
            )
            ) {
              checkUsePlace = false
            }

            // 최대 사용가능한 포인트 체크
            if (
              this.createInfo.maxUsePsbltPit && this.createInfo.maxUsePsbltPit > 0 &&
            (
              this.createInfo.maxUsePsbltPit < this.createInfo.useMchtList[i].lvList[j].maxUsePit ||
              this.createInfo.maxUsePsbltPit < this.createInfo.useMchtList[i].lvList[j].minUsePit
            )
            ) {
              checkUsePlace = false
            }

            // 최대 최소 둘 다 존재할 때 최소 최대 크기 비교
            if (
              this.createInfo.useMchtList[i].lvList[j].maxUsePit && this.createInfo.useMchtList[i].lvList[j].minUsePit &&
            this.createInfo.useMchtList[i].lvList[j].maxUsePit < this.createInfo.useMchtList[i].lvList[j].minUsePit
            ) {
              checkUsePlace = false
            }
          }
        }
      }

      if (this.createInfo.useMchtList.length > 0) {
        for (let i = 0; i < this.createInfo.useMchtList.length; i++) {
          if (this.createInfo.useMchtList[i].lvList.length === 0) {
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
      if (this.createInfo.vldPrdDiv && this.createInfo.vldPrdVal) {
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
