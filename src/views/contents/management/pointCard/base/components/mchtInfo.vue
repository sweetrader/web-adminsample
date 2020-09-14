<template>
  <div>
    <!-- -------------------------------- 적립처 관리 폼 -->
    <el-form :model="createInfo" label-position="left" label-width="175px">
      <el-form-item>
        <div slot="label">
          <span>{{ $t('pointCard.accuDivYn') }}</span>
          <el-tooltip effect="light" placement="top-start">
            <template slot="content">
              <div v-html="$t('pointCard.guide.accuDivYn')"/>
            </template>
            <i class="el-icon-chat-dot-round tip_icon_align"/>
          </el-tooltip>
        </div>

        <el-radio-group v-model="createInfo.accuDivYn" @change="changeMchtDiff()">
          <el-radio-button v-for="item in accuDivYnOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <!-- 등급 X, 적립률 동일 폼 인풋 -->
      <el-form-item v-if="createInfo.accuDivYn === 'N' && createInfo.lvDivYn === 'N'" :label="$t('pointCard.accuRate')">
        <div class="number_placeholder_wrapper" style="justify-content: flex-start !important;">
          <span v-if="createInfo.accuDiv !== 'FLAT'">{{ createInfo.accuDiv | accuDivLongFilter }}</span>
          <el-input-number
            v-else
            v-model="temp.trxAmt"
            style="width: 120px; margin-left: 5px;"
            :max="99999999"
            :min="0"
            :precision="0"
            :controls="false"
            :placeholder="createInfo.accuDiv | accuDivLongFilter"
            @change="checkMchtListData"/>

          <el-input-number
            v-model="temp.noLvDivNum"
            style="width: 120px; margin-left: 5px;"
            :max="createInfo.accuDiv === 'RT' ? 100 : 99999999"
            :min="0"
            :precision="createInfo.accuDiv === 'RT' ? 2 : 0"
            :controls="false"
            :placeholder="createInfo.accuDiv === 'FLAT' ? $t('pointCard.accuPoint') : ''"
            @change="checkMchtListData"/>
          <div class="number_placeholder">
            {{ createInfo.accuDiv === 'RT' ? '%' : createInfo.accuDiv === 'FIX' ? $t('pointCard.theNum') : '' }}
          </div>
        </div>
      </el-form-item>

      <!-- 등급 O, 적립률 동일 폼 인풋 -->
      <el-form-item v-if="createInfo.accuDivYn === 'N' && createInfo.lvDivYn === 'Y'" :label="$t('pointCard.accuRate')">
        <div v-for="(lv, i) in temp.lvDivNumInfo" :key="i">
          <div class="number_placeholder_wrapper" style="justify-content: flex-start !important;">
            <el-select v-model="lv.lvDivCd" style="width: 120px; margin-right: 5px;" disabled class="filter-item">
              <el-option v-for="(item, j) in createInfo.levelList" :key="j" :label="item.lvDivCd" :value="item.lvDivCd"/>
            </el-select>

            <span v-if="createInfo.accuDiv !== 'FLAT'">{{ createInfo.accuDiv | accuDivLongFilter }}</span>
            <el-input-number
              v-else
              v-model="lv.trxAmt"
              style="width: 120px; margin-left: 5px;"
              :max="99999999"
              :min="0"
              :precision="0"
              :controls="false"
              :placeholder="createInfo.accuDiv | accuDivLongFilter"
              @change="checkMchtListData2"/>

            <el-input-number
              v-model="lv.accuDivVal"
              style="width: 120px; margin-left: 5px;"
              :max="createInfo.accuDiv === 'RT' ? 100 : 99999999"
              :min="0"
              :precision="createInfo.accuDiv === 'RT' ? 2 : 0"
              :controls="false"
              :placeholder="createInfo.accuDiv === 'FLAT' ? $t('pointCard.accuPoint') : ''"
              @change="checkMchtListData2"/>

            <div class="number_placeholder">
              {{ createInfo.accuDiv === 'RT' ? '%' : createInfo.accuDiv === 'FIX' ? $t('pointCard.theNum') : '' }}
            </div>
          </div>
        </div>
      </el-form-item>

      <div>
        <!-- 적립처 추가 버튼 -->
        <div align="right">
          <el-button v-waves type="primary" plain @click="handleAddRegAccu()">{{ $t('btn.plus') }}</el-button>
        </div>
        <br>

        <!-- 적립처 정보 테이블 -->
        <el-table :data="createInfo.accuMchtList" border style="min-width: 100%">
          <!-- 적립처 명 -->
          <el-table-column align="center" min-width="200">
            <template slot="header">
              <span>{{ $t('pointCard.accuSpotNm') }}</span>
              <br>
              <span>{{ '(' + $t('pointCard.mchtMgmtCd') + ')' }}</span>
            </template>

            <template slot-scope="scope">
              {{ scope.row.mchtNm }}
              <br v-if="scope.row.mchtMgmtCd">
              <span v-if="scope.row.mchtMgmtCd">{{ '(' + scope.row.mchtMgmtCd + ')' }}</span>
            </template>
          </el-table-column>

          <!-- 적립 방법 -->
          <el-table-column :label="$t('pointCard.mchtWay')" align="center" width="455">
            <template slot-scope="scope">
              <!-- 등급 O, 적립률 상이 테이블 인풋 -->
              <div v-if="createInfo.accuDivYn === 'Y'">
                <div v-for="(lv, i) in scope.row.lvList" :key="i" class="number_placeholder_wrapper">
                  <el-select v-if="createInfo.lvDivYn === 'Y'" v-model="lv.lvDivCd" style="width: 120px; margin-right: 5px;" disabled class="filter-item">
                    <el-option v-for="(item, j) in createInfo.levelList" :key="j" :label="item.lvDivCd" :value="item.lvDivCd"/>
                  </el-select>

                  <span v-if="createInfo.accuDiv !== 'FLAT'">{{ lv.accuDiv | accuDivLongFilter }}</span>
                  <el-input-number
                    v-else
                    v-model="lv.trxAmt"
                    style="width: 120px; margin-left: 5px;"
                    :max="99999999"
                    :min="0"
                    :precision="0"
                    :controls="false"
                    :placeholder="createInfo.accuDiv | accuDivLongFilter"/>

                  <el-input-number
                    v-model="lv.accuDivVal"
                    style="width: 120px; margin-left: 5px;"
                    :max="lv.accuDiv === 'RT' ? 100 : 99999999"
                    :min="0"
                    :precision="lv.accuDiv === 'RT' ? 2 : 0"
                    :controls="false"
                    :placeholder="createInfo.accuDiv === 'FLAT' ? $t('pointCard.accuPoint') : ''"/>
                  <div class="number_placeholder">
                    {{ createInfo.accuDiv === 'RT' ? '%' : createInfo.accuDiv === 'FIX' ? $t('pointCard.theNum') : '' }}
                  </div>
                </div>
              </div>

              <!-- 등급 X, 적립률 동일 테이블 인풋 -->
              <div v-if="createInfo.accuDivYn === 'N' && createInfo.lvDivYn === 'N'">
                <div v-for="(lv, i) in scope.row.lvList" :key="i" class="number_placeholder_wrapper">
                  <span v-if="createInfo.accuDiv !== 'FLAT'">{{ lv.accuDiv | accuDivLongFilter }}</span>
                  <el-input-number
                    v-else
                    v-model="lv.trxAmt"
                    disabled
                    style="width: 120px; margin-left: 5px;"
                    :max="99999999"
                    :min="0"
                    :precision="0"
                    :controls="false"
                    :placeholder="createInfo.accuDiv | accuDivLongFilter"/>

                  <el-input-number
                    v-model="lv.accuDivVal"
                    disabled
                    style="width: 120px; margin-left: 5px;"
                    :max="lv.accuDiv === 'RT' ? 100 : 99999999"
                    :min="0"
                    :precision="lv.accuDiv === 'RT' ? 2 : 0"
                    :controls="false"
                    :placeholder="createInfo.accuDiv === 'FLAT' ? $t('pointCard.accuPoint') : ''"/>
                  <div class="number_placeholder">
                    {{ createInfo.accuDiv === 'RT' ? '%' : createInfo.accuDiv === 'FIX' ? $t('pointCard.theNum') : '' }}
                  </div>
                </div>
              </div>

              <!-- 등급 O, 적립률 동일 테이블 인풋 -->
              <div v-if="createInfo.accuDivYn === 'N' && createInfo.lvDivYn === 'Y'">
                <div v-for="(lv, i) in scope.row.lvList" :key="i" class="number_placeholder_wrapper">
                  <el-select v-model="lv.lvDivCd" disabled style="width: 120px; margin-right: 5px;" class="filter-item">
                    <el-option v-for="(item, j) in createInfo.levelList" :key="j" :label="item.lvDivCd" :value="item.lvDivCd"/>
                  </el-select>

                  <span v-if="createInfo.accuDiv !== 'FLAT'">{{ lv.accuDiv | accuDivLongFilter }}</span>
                  <el-input-number
                    v-else
                    v-model="lv.trxAmt"
                    disabled
                    style="width: 120px; margin-left: 5px;"
                    :max="99999999"
                    :min="0"
                    :precision="0"
                    :controls="false"
                    :placeholder="createInfo.accuDiv | accuDivLongFilter"/>

                  <el-input-number
                    v-model="lv.accuDivVal"
                    disabled
                    style="width: 120px; margin-left: 5px;"
                    :max="lv.accuDiv === 'RT' ? 100 : 99999999"
                    :min="0"
                    :precision="lv.accuDiv === 'RT' ? 2 : 0"
                    :controls="false"
                    :placeholder="createInfo.accuDiv === 'FLAT' ? $t('pointCard.accuPoint') : ''"/>
                  <div class="number_placeholder">
                    {{ createInfo.accuDiv === 'RT' ? '%' : createInfo.accuDiv === 'FIX' ? $t('pointCard.theNum') : '' }}
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>

          <!-- 삭제 -->
          <el-table-column :label="$t('btn.delete')" align="center" width="100">
            <template slot-scope="scope">
              <el-button v-waves type="warning" plain @click="handleRegAccuDelete(scope.$index)">{{ $t('btn.delete') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
    <!-- -------------------------------- 적립처 관리 폼 -->
    <!-- -------------------------------- 적립처 선택 팝업 -->
    <el-dialog
      :title="$t('pointCard.showMcht')"
      :visible.sync="dialogVisible">

      <div class="mcht_select_flex">
        <div>
          <!-- 제휴사 명 -->
          <el-input
            v-model="dialogQuery.mchtNm"
            :placeholder="$t('placeholder.mchtNm')"
            style="width: 300px;"
            class="filter-item"/>

          <el-button
            v-waves
            class="filter-item"
            type="info"
            plain
            icon="el-icon-search"
            @click="getDialogList()">
            {{ $t('btn.search') }}
          </el-button>
        </div>

        <div>
          <el-checkbox v-model="checkAll" @change="checkAllOrg">
            {{ $t('pointCard.checkAll') }}
          </el-checkbox>
        </div>
      </div>

      <el-divider/>

      <el-table v-loading="dialogLoading" :data="dialogList" border style="min-width: 100%">
        <el-table-column :label="$t('pointCard.org')" align="center" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.orgNm }}
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.mchtCd')" align="center" min-width="200">
          <template slot-scope="scope">
            {{ scope.row.mchtCd }}
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.mchtNm') + ' (' + $t('pointCard.mchtMgmtCd') + ')'" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.mchtNm }}</span>
            <br v-if="scope.row.mchtMgmtCd">
            <span v-if="scope.row.mchtMgmtCd">{{ '(' + scope.row.mchtMgmtCd + ')' }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.mchtSel')" align="center" width="80">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.selected"/>
          </template>
        </el-table-column>
      </el-table>

      <div style="display: flex; justify-content: space-between; padding: 32px 16px;">
        <pagination v-show="dialogTotCnt>0" :total="dialogTotCnt" :page.sync="dialogQuery.pageIdx" :limit.sync="dialogQuery.pageSize" style="margin: 0; padding: 0;" @pagination="changePage()"/>

        <div>
          <el-button v-waves type="info" @click="dialogVisible = false">{{ $t('btn.before') }}</el-button>
          <el-button v-waves type="success" @click="addSelectedMcht(false)">{{ $t('btn.plus') }}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- -------------------------------- 적립처 선택 팝업 -->
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { fetchSearchMchtList } from '@/api/mcht'

const accuDivOptions = [
  { key: 'RT', name: i18n.t('pointCard.accuDivOptions.rt'), long: i18n.t('pointCard.accuDivOptionsLong.rt') },
  { key: 'FLAT', name: i18n.t('pointCard.accuDivOptions.flat'), long: i18n.t('pointCard.accuDivOptionsLong.flat') },
  { key: 'FIX', name: i18n.t('pointCard.accuDivOptions.fix'), long: i18n.t('pointCard.accuDivOptionsLong.fix') }
]

const accuDivYnOptions = [
  { key: 'Y', name: i18n.t('pointCard.accuDivYnOptions.y') },
  { key: 'N', name: i18n.t('pointCard.accuDivYnOptions.n') }
]

export default {
  name: 'MchtInfo',
  directives: { waves },
  components: { Pagination },
  filters: {
    accuDivLongFilter(key) {
      const nameValue = accuDivOptions.reduce((acc, cur) => {
        acc[cur.key] = cur.long
        return acc
      }, {})
      return nameValue[key]
    }
  },
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
      checkAll: false,
      dialogVisible: false,
      dialogLoading: false,
      dialogList: [],
      dialogTotCnt: 0,
      dialogQuery: {
        orgCd: this.createInfo.orgCd,
        mchtNm: '',
        st: 'OK',
        twoBaseFncDiv: 'ALLORACCU',
        pageIdx: 1,
        pageSize: 10
      },
      orgList: [],
      accuDivOptions,
      accuDivYnOptions
    }
  },
  watch: { },
  created() { },
  mounted() { },
  methods: {
    // -------------------------------- 적립처 관리
    changeMchtDiff() {
      this.$nextTick(() => {
        // 적립 데이터 비우기
        for (let i = 0; i < this.createInfo.accuMchtList.length; i++) {
          for (let j = 0; j < this.createInfo.accuMchtList[i].lvList.length; j++) {
            this.createInfo.accuMchtList[i].lvList[j].accuDivVal = undefined
            this.createInfo.accuMchtList[i].lvList[j].trxAmt = undefined
          }
        }

        // 등급 O, 적립률 동일 데이터
        for (let i = 0; i < this.temp.lvDivNumInfo.length; i++) {
          this.temp.lvDivNumInfo[i].accuDivVal = undefined
          this.temp.lvDivNumInfo[i].trxAmt = undefined
        }

        // 등급 X, 적립률 동일 데이터
        this.temp.noLvDivNum = undefined
        this.temp.trxAmt = undefined
      })

      // this.createInfo.accuMchtList = []
    },
    handleAddRegAccu() { // 적립처 추가 팝업
      this.checkAll = false
      this.dialogQuery = {
        orgCd: this.createInfo.orgCd,
        mchtNm: '',
        st: 'OK',
        twoBaseFncDiv: 'ALLORACCU',
        pageIdx: 1,
        pageSize: 10
      }

      if (this.createInfo.orgCd) {
        this.dialogVisible = true
        this.getDialogList()
      } else {
        this.$message.error(this.$t('message.pointCardValid.orgCd'))
        return
      }
    },
    async getDialogList() { // 적립처 검색 API
      this.dialogLoading = true

      const response = await fetchSearchMchtList(this.dialogQuery)

      // 현재 선택된 적립처 리스트 저장
      const selectedList = []
      for (let j = 0; j < this.createInfo.accuMchtList.length; j++) {
        selectedList.push(this.createInfo.accuMchtList[j].mchtCd)
      }

      // 리스트에 현재 선택된 적립처 체크
      for (let i = 0; i < response.list.length; i++) {
        if (selectedList.indexOf(response.list[i].mchtCd) !== -1) {
          response.list[i].selected = true
        } else {
          response.list[i].selected = false
        }
      }

      this.dialogList = response.list

      this.dialogTotCnt = response.totCnt

      setTimeout(() => {
        this.dialogLoading = false
      }, 300)
    },
    changePage() {
      this.addSelectedMcht(true)
      this.getDialogList()
    },
    addSelectedMcht(close) { // 선택 적립처 추가
      // 현재 선택된 적립처 리스트 저장
      const selectedList = []
      for (let j = 0; j < this.createInfo.accuMchtList.length; j++) {
        selectedList.push(this.createInfo.accuMchtList[j].mchtCd)
      }

      // 선택된 적립처와 선택한 적립처가 없으면 error 메세지 후 return
      let checkOne = false
      for (let i = 0; i < this.dialogList.length; i++) {
        if (this.dialogList[i].selected) {
          checkOne = true
        }
      }
      if (!checkOne && selectedList.length === 0 && !close) {
        this.$message.error(this.$t('message.pointCardValid.accuMchtList'))
        return
      }

      for (let i = 0; i < this.dialogList.length; i++) {
        if (this.dialogList[i].selected && selectedList.indexOf(this.dialogList[i].mchtCd) === -1) {
          if (this.createInfo.lvDivYn === 'Y' && this.createInfo.accuDivYn === 'Y') { // 등급 O 적립처 별 상이
            const lvData = []

            for (let i = 0; i < this.createInfo.levelList.length; i++) {
              lvData.push({
                lvDivCd: this.createInfo.levelList[i].lvDivCd,
                lvDivNm: this.createInfo.levelList[i].lvDivNm,
                fncDiv: 'ACCU',
                accuDiv: this.createInfo.accuDiv,
                accuDivVal: undefined
              })
            }

            this.createInfo.accuMchtList.push({
              mchtNm: this.dialogList[i].mchtNm,
              mchtCd: this.dialogList[i].mchtCd,
              mchtMgmtCd: this.dialogList[i].mchtMgmtCd,
              lvList: lvData,
              // 사용처 선택용 불값
              selected: false,
              baseFncDiv: this.dialogList[i].baseFncDiv
            })
          } else if (this.createInfo.lvDivYn === 'Y' && this.createInfo.accuDivYn === 'N') { // 등급 O 적립처 별 동일
            const lvData = []

            for (let i = 0; i < this.temp.lvDivNumInfo.length; i++) {
              lvData.push({
                lvDivCd: this.temp.lvDivNumInfo[i].lvDivCd,
                lvDivNm: this.temp.lvDivNumInfo[i].lvDivNm,
                fncDiv: 'ACCU',
                accuDiv: this.createInfo.accuDiv,
                accuDivVal: this.temp.lvDivNumInfo[i].accuDivVal,
                trxAmt: this.temp.lvDivNumInfo[i].trxAmt
              })
            }

            this.createInfo.accuMchtList.push({
              mchtNm: this.dialogList[i].mchtNm,
              mchtCd: this.dialogList[i].mchtCd,
              mchtMgmtCd: this.dialogList[i].mchtMgmtCd,
              lvList: lvData,
              // 사용처 선택용 불값
              selected: false,
              baseFncDiv: this.dialogList[i].baseFncDiv
            })
          } else if (this.createInfo.lvDivYn === 'Y' && this.editForm) { // 수정일 때 제휴처 선택
            const lvData = []

            for (let i = 0; i < this.createInfo.levelList.length; i++) {
              lvData.push({
                lvDivCd: this.createInfo.levelList[i].lvDivCd,
                lvDivNm: this.createInfo.levelList[i].lvDivNm,
                fncDiv: 'ACCU',
                accuDiv: this.createInfo.accuDiv,
                accuDivVal: undefined
              })
            }

            this.createInfo.accuMchtList.push({
              mchtNm: this.dialogList[i].mchtNm,
              mchtCd: this.dialogList[i].mchtCd,
              mchtMgmtCd: this.dialogList[i].mchtMgmtCd,
              lvList: lvData,
              // 사용처 선택용 불값
              selected: false,
              baseFncDiv: this.dialogList[i].baseFncDiv
            })
          } else if (this.createInfo.lvDivYn === 'N' && this.editForm) { // 수정일 때 제휴처 선택
            this.createInfo.accuMchtList.push({
              mchtNm: this.dialogList[i].mchtNm,
              mchtCd: this.dialogList[i].mchtCd,
              mchtMgmtCd: this.dialogList[i].mchtMgmtCd,
              lvList: [
                {
                  lvDivCd: 'normal',
                  fncDiv: 'ACCU',
                  accuDiv: this.createInfo.accuDiv,
                  accuDivVal: this.temp.noLvDivNum,
                  trxAmt: this.temp.trxAmt
                }
              ],
              // 사용처 선택용 불값
              selected: false,
              baseFncDiv: this.dialogList[i].baseFncDiv
            })
          } else { // 등급 X 적립처 별 동일
            this.createInfo.accuMchtList.push({
              mchtNm: this.dialogList[i].mchtNm,
              mchtCd: this.dialogList[i].mchtCd,
              mchtMgmtCd: this.dialogList[i].mchtMgmtCd,
              lvList: [
                {
                  lvDivCd: 'normal',
                  fncDiv: 'ACCU',
                  accuDiv: this.createInfo.accuDiv,
                  accuDivVal: this.temp.noLvDivNum,
                  trxAmt: this.temp.trxAmt
                }
              ],
              // 사용처 선택용 불값
              selected: false,
              baseFncDiv: this.dialogList[i].baseFncDiv
            })
          }
        }
        // 선택 취소한 항목 삭제
        if (!this.dialogList[i].selected && selectedList.indexOf(this.dialogList[i].mchtCd) !== -1) {
          for (let j = 0; j < this.createInfo.accuMchtList.length; j++) {
            if (this.createInfo.accuMchtList[j].mchtCd === this.dialogList[i].mchtCd) {
              this.createInfo.accuMchtList.splice(j, 1)
            }
          }
        }
      }
      this.dialogVisible = close
    },
    handleRegAccuDelete(no) { // 적립처 리스트 항목 삭제
      this.$confirm(this.$t('message.mchtDeleteGuide'), '', {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.createInfo.accuMchtList.splice(no, 1)
      }).catch(() => {
      })
    },
    checkMchtListData() { // 적립처 리스트 숫자 변경 체크
      for (let i = 0; i < this.createInfo.accuMchtList.length; i++) {
        for (let j = 0; j < this.createInfo.accuMchtList[i].lvList.length; j++) {
          this.createInfo.accuMchtList[i].lvList[j].accuDivVal = this.temp.noLvDivNum
          if (this.createInfo.accuDiv === 'FLAT') {
            this.createInfo.accuMchtList[i].lvList[j].trxAmt = this.temp.trxAmt
          }
        }
      }
    },
    checkMchtListData2() {
      for (let i = 0; i < this.createInfo.accuMchtList.length; i++) {
        for (let j = 0; j < this.createInfo.accuMchtList[i].lvList.length; j++) {
          this.createInfo.accuMchtList[i].lvList[j].accuDivVal = this.temp.lvDivNumInfo[j].accuDivVal
          if (this.createInfo.accuDiv === 'FLAT') {
            this.createInfo.accuMchtList[i].lvList[j].trxAmt = this.temp.lvDivNumInfo[j].trxAmt
          }
        }
      }
    },
    // 적립처 전체
    checkAllOrg() {
      if (this.checkAll) {
        for (let i = 0; i < this.dialogList.length; i++) {
          this.dialogList[i].selected = true
        }
      } else {
        for (let i = 0; i < this.dialogList.length; i++) {
          this.dialogList[i].selected = false
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .mcht_select_flex {
    display: flex;
    justify-content: space-between;
  }
  .gbn_placeholder {
    position: relative;
    left: -58px;
  }
</style>
