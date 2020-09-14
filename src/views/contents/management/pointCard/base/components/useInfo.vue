<template>
  <div>
    <!-- -------------------------------- 사용처 등록 관리 -->
    <el-form :model="createInfo" label-position="left" label-width="175px">
      <div>
        <!-- 적립처 동일 여부 -->
        <el-form-item>
          <div slot="label">
            <span>{{ $t('pointCard.accuEqualDivYn') }}</span>
            <el-tooltip effect="light" placement="top-start">
              <template slot="content">
                <div v-html="$t('pointCard.guide.accuEqualDivYn')"/>
              </template>
              <i class="el-icon-chat-dot-round tip_icon_align"/>
            </el-tooltip>
          </div>

          <el-radio-group v-model="createInfo.accuEqualDivYn" @change="accuEqualChange()">
            <el-radio-button v-for="item in accuEqualDivOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <!-- 사용처 사용금액 상이 여부 -->
        <el-form-item v-if="createInfo.useLmtYn === 'Y'">
          <div slot="label">
            <span>{{ $t('pointCard.mchtAccuDiffDivYn') }}</span>
            <el-tooltip effect="light" placement="top-start">
              <template slot="content">
                <div v-html="$t('pointCard.guide.mchtAccuDiffDivYn')"/>
              </template>
              <i class="el-icon-chat-dot-round tip_icon_align"/>
            </el-tooltip>
          </div>

          <el-radio-group v-model="createInfo.mchtAccuDiffDivYn" @change="changeGbn()">
            <el-radio-button v-for="item in mchtAccuDiffDivOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <!-- 등급 O 사용 금액 적용 -->
        <el-form-item v-if="createInfo.mchtAccuDiffDivYn === 'N' && createInfo.lvDivYn === 'Y' && createInfo.useLmtYn === 'Y'" :label="$t('pointCard.useablePoint')">
          <div v-for="(lv, i) in temp.levelList" :key="i">
            <el-select v-model="lv.lvDivCd" style="width: 120px; margin-right: 5px;" disabled class="filter-item">
              <el-option v-for="(item, j) in createInfo.levelList" :key="j" :label="item.lvDivCd" :value="item.lvDivCd"/>
            </el-select>

            <el-input-number
              v-model="lv.maxUsePit"
              :placeholder="$t('placeholder.maxUsePit')"
              style="width: 130px; margin-left: 5px;"
              type="number"
              :max="createInfo.maxUsePsbltPit ? createInfo.maxUsePsbltPit : 99999999"
              :min="createInfo.minUsePsbltPit ? createInfo.minUsePsbltPit : 0"
              :precision="0"
              :controls="false"
              @change="checkTempLevelListData"/>

            <el-input-number
              v-model="lv.minUsePit"
              :placeholder="$t('placeholder.minUsePit')"
              style="width: 130px; margin-left: 5px;"
              type="number"
              :max="createInfo.maxUsePsbltPit ? createInfo.maxUsePsbltPit : 99999999"
              :min="createInfo.minUsePsbltPit ? createInfo.minUsePsbltPit : 0"
              :precision="0"
              :controls="false"
              @change="checkTempLevelListData"/>
          </div>
        </el-form-item>

        <!-- 등급 X 사용 금액 적용 -->
        <el-form-item v-if="createInfo.mchtAccuDiffDivYn === 'N' && createInfo.lvDivYn === 'N' && createInfo.useLmtYn === 'Y'" :label="$t('pointCard.useablePoint')">
          <div>
            <el-input-number
              v-model="temp.noLvDivMax"
              :placeholder="$t('placeholder.maxUsePit')"
              style="width: 130px; margin-left: 5px;"
              type="number"
              :max="createInfo.maxUsePsbltPit ? createInfo.maxUsePsbltPit : 99999999"
              :min="createInfo.minUsePsbltPit ? createInfo.minUsePsbltPit : 0"
              :precision="0"
              :controls="false"
              @change="checkTempLevelListData"/>

            <el-input-number
              v-model="temp.noLvDivMin"
              :placeholder="$t('placeholder.minUsePit')"
              style="width: 130px; margin-left: 5px;"
              type="number"
              :max="createInfo.maxUsePsbltPit ? createInfo.maxUsePsbltPit : 99999999"
              :min="createInfo.minUsePsbltPit ? createInfo.minUsePsbltPit : 0"
              :precision="0"
              :controls="false"
              @change="checkTempLevelListData"/>
          </div>
        </el-form-item>

        <!-- 사용 금액 리스트 -->
        <!-- 사용처 정보 테이블 -->
        <div>
          <div align="right">
            <el-button v-waves type="primary" plain @click="handleAddUseMcht()">{{ $t('btn.plus') }}</el-button>
          </div>

          <br>
          <!-- 생성 폼 -->
          <el-table v-if="!editForm" :data="createInfo.useMchtList" border style="min-width: 100%">
            <el-table-column align="center" min-width="200">
              <template slot="header">
                <span>{{ $t('pointCard.useMchtNm') }}</span>
                <br>
                <span>{{ '(' + $t('pointCard.mchtMgmtCd') + ')' }}</span>
              </template>

              <template slot-scope="scope">
                {{ scope.row.mchtNm }}
                <br v-if="scope.row.mchtMgmtCd">
                <span v-if="scope.row.mchtMgmtCd">{{ '(' + scope.row.mchtMgmtCd + ')' }}</span>
              </template>
            </el-table-column>

            <el-table-column v-if="createInfo.useLmtYn === 'Y'" :label="$t('pointCard.useMchtInfo')" align="center" width="455">
              <template slot-scope="scope">
                <el-row v-for="(lv, i) in scope.row.lvList" :key="i" justify="space-between" style="margin: 5px 0 5px 0;">
                  <!-- 적립처 별 상이 여부 Y -->
                  <el-select v-if="createInfo.lvDivYn === 'Y'" v-model="lv.lvDivCd" style="width: 120px; margin-right: 5px;" disabled class="filter-item">
                    <el-option v-for="(item, j) in createInfo.levelList" :key="j" :label="item.lvDivCd" :value="item.lvDivCd"/>
                  </el-select>

                  <!-- 최대 금액 -->
                  <span v-if="createInfo.lvDivYn === 'N'">{{ $t('pointCard.maxText') }}</span>
                  <el-input-number
                    v-model="lv.maxUsePit"
                    :placeholder="$t('placeholder.maxUsePit')"
                    :disabled="createInfo.mchtAccuDiffDivYn === 'N'"
                    style="width: 130px; margin-left: 5px;"
                    :max="createInfo.maxUsePsbltPit ? createInfo.maxUsePsbltPit : 99999999"
                    :min="createInfo.minUsePsbltPit ? createInfo.minUsePsbltPit : 0"
                    :precision="0"
                    :controls="false"/>
                  &nbsp;
                  <!-- 최소 금액 -->
                  <span v-if="createInfo.lvDivYn === 'N'">{{ $t('pointCard.minText') }}</span>
                  <el-input-number
                    v-model="lv.minUsePit"
                    :placeholder="$t('placeholder.minUsePit')"
                    :disabled="createInfo.mchtAccuDiffDivYn === 'N'"
                    style="width: 130px; margin-left: 5px;"
                    :max="createInfo.maxUsePsbltPit ? createInfo.maxUsePsbltPit : 99999999"
                    :min="createInfo.minUsePsbltPit ? createInfo.minUsePsbltPit : 0"
                    :precision="0"
                    :controls="false"/>
                </el-row>
              </template>
            </el-table-column>

            <el-table-column :label="$t('btn.delete')" align="center" width="100">
              <template slot-scope="scope">
                <el-button v-waves type="warning" plain @click="handleRegAccuDelete(scope.$index)">{{ $t('btn.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 수정 폼 -->
          <el-table v-if="editForm" :data="createInfo.useMchtList" border style="min-width: 100%">
            <el-table-column align="center" min-width="200">
              <template slot="header">
                <span>{{ $t('pointCard.useMchtNm') }}</span>
                <br>
                <span>{{ '(' + $t('pointCard.mchtMgmtCd') + ')' }}</span>
              </template>

              <template slot-scope="scope">
                {{ scope.row.mchtNm }}
                <br v-if="scope.row.mchtMgmtCd">
                <span v-if="scope.row.mchtMgmtCd">{{ '(' + scope.row.mchtMgmtCd + ')' }}</span>
              </template>
            </el-table-column>

            <el-table-column v-if="createInfo.useLmtYn === 'Y'" :label="$t('pointCard.useMchtInfo')" align="center" width="435">
              <template slot-scope="scope">
                <el-row v-for="(lv, i) in scope.row.lvList" :key="i" justify="space-around" style="margin: 5px 0 5px 0;">
                  <!-- 적립처 별 상이 여부 Y -->
                  <el-select v-if="createInfo.lvDivYn === 'Y'" v-model="lv.lvDivCd" style="width: 120px; margin-right: 5px;" disabled class="filter-item">
                    <el-option v-for="(item, j) in createInfo.levelList" :key="j" :label="item.lvDivCd" :value="item.lvDivCd"/>
                  </el-select>

                  <!-- 최대 금액 -->
                  <span v-if="createInfo.lvDivYn === 'N'">{{ $t('pointCard.maxText') }}</span>
                  <el-input-number
                    v-model="lv.maxUsePit"
                    :placeholder="$t('placeholder.maxUsePit')"
                    style="width: 130px; margin-left: 5px;"
                    :max="createInfo.maxUsePsbltPit ? createInfo.maxUsePsbltPit : 99999999"
                    :min="createInfo.minUsePsbltPit ? createInfo.minUsePsbltPit : 0"
                    :precision="0"
                    :controls="false"/>
                  &nbsp;
                  <!-- 최소 금액 -->
                  <span v-if="createInfo.lvDivYn === 'N'">{{ $t('pointCard.minText') }}</span>
                  <el-input-number
                    v-model="lv.minUsePit"
                    :placeholder="$t('placeholder.minUsePsbltPit')"
                    style="width: 130px; margin-left: 5px;"
                    :max="createInfo.maxUsePsbltPit ? createInfo.maxUsePsbltPit : 99999999"
                    :min="createInfo.minUsePsbltPit ? createInfo.minUsePsbltPit : 0"
                    :precision="0"
                    :controls="false"/>
                </el-row>
              </template>
            </el-table-column>

            <el-table-column :label="$t('btn.delete')" align="center" width="100">
              <template slot-scope="scope">
                <el-button v-waves type="warning" plain @click="handleRegAccuDelete(scope.$index)">{{ $t('btn.delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

    </el-form>
    <!-- -------------------------------- 사용처 등록 관리 -->
    <!-- -------------------------------- 사용처 선택 팝업 -->
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
        <pagination v-show="dialogTotCnt>0" :total="dialogTotCnt" :page.sync="dialogQuery.pageIdx" :limit.sync="dialogQuery.pageSize" style="margin: 0; padding: 0;" @pagination="changePage"/>

        <div>
          <el-button v-waves type="info" @click="dialogVisible = false">{{ $t('btn.before') }}</el-button>
          <el-button v-waves type="success" @click="addSelectedUsePlace(false)">{{ $t('btn.plus') }}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- -------------------------------- 사용처 선택 팝업 -->
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { fetchSearchMchtList } from '@/api/mcht'

const accuEqualDivOptions = [
  { key: 'Y', name: i18n.t('pointCard.accuEqualDivOptions.y') },
  { key: 'N', name: i18n.t('pointCard.accuEqualDivOptions.n') }
]

const mchtAccuDiffDivOptions = [
  { key: 'Y', name: i18n.t('pointCard.mchtAccuDiffDivOptions.y') },
  { key: 'N', name: i18n.t('pointCard.mchtAccuDiffDivOptions.n') }
]

export default {
  name: 'UsePointInfo',
  directives: { waves },
  components: { Pagination },
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
      checkAll: false,
      dialogVisible: false,
      dialogLoading: false,
      dialogList: [],
      dialogTotCnt: 0,
      dialogQuery: {
        orgCd: this.createInfo.orgCd,
        mchtNm: '',
        st: 'OK',
        twoBaseFncDiv: 'ALLORUSE',
        pageIdx: 1,
        pageSize: 10
      },
      accuEqualDivOptions,
      mchtAccuDiffDivOptions
    }
  },
  watch: { },
  created() { },
  mounted() { },
  methods: {
    // 적용처 동일 여부 함수
    accuEqualChange() {
      if (this.createInfo.accuEqualDivYn === 'Y') {
        // 모든 사용처 추가
        this.createInfo.useMchtList = []
        for (let i = 0; i < this.createInfo.accuMchtList.length; i++) {
          if (this.createInfo.accuMchtList[i].baseFncDiv === 'ALL') {
            const data = {
              mchtNm: this.createInfo.accuMchtList[i].mchtNm,
              mchtCd: this.createInfo.accuMchtList[i].mchtCd,
              mchtMgmtCd: this.createInfo.accuMchtList[i].mchtMgmtCd,
              lvList: []
            }
            for (let j = 0; j < this.createInfo.accuMchtList[i].lvList.length; j++) {
              if (this.createInfo.lvDivYn === 'Y' && this.createInfo.mchtAccuDiffDivYn === 'Y') {
                data.lvList.push({
                  lvDivCd: this.createInfo.accuMchtList[i].lvList[j].lvDivCd,
                  lvDivNm: this.createInfo.accuMchtList[i].lvList[j].lvDivCd,
                  fncDiv: 'USE',
                  maxUsePit: undefined,
                  minUsePit: undefined
                })
              } else if (this.createInfo.lvDivYn === 'N' && this.createInfo.mchtAccuDiffDivYn === 'Y') {
                data.lvList.push({
                  lvDivCd: 'normal',
                  fncDiv: 'USE',
                  maxUsePit: undefined,
                  minUsePit: undefined
                })
              } else if (this.createInfo.lvDivYn === 'Y' && this.createInfo.mchtAccuDiffDivYn === 'N') {
                data.lvList.push({
                  lvDivCd: this.createInfo.accuMchtList[i].lvList[j].lvDivCd,
                  lvDivNm: this.createInfo.accuMchtList[i].lvList[j].lvDivCd,
                  fncDiv: 'USE',
                  maxUsePit: this.temp.levelList[j].maxUsePit,
                  minUsePit: this.temp.levelList[j].minUsePit
                })
              } else if (this.createInfo.lvDivYn === 'N' && this.createInfo.mchtAccuDiffDivYn === 'N') {
                data.lvList.push({
                  lvDivCd: 'normal',
                  fncDiv: 'USE',
                  maxUsePit: this.temp.noLvDivMax,
                  minUsePit: this.temp.noLvDivMin
                })
              }
            }
            this.createInfo.useMchtList.push(data)
          }
        }
      } else {
        // 사용처 삭제
        this.createInfo.useMchtList = []
      }
    },
    // 선택한 적립처 추가
    addSelectedUsePlace(close) {
      // 현재 선택되어 있는 사용처 리스트 저장
      const selectedList = []
      for (let i = 0; i < this.createInfo.useMchtList.length; i++) {
        selectedList.push(this.createInfo.useMchtList[i].mchtCd)
      }

      // 선택된 사용처와 선택한 사용처가 없으면 error 메세지 후 return
      let checkOne = false
      for (let i = 0; i < this.dialogList.length; i++) {
        if (this.dialogList[i].selected) {
          checkOne = true
        }
      }
      if (!checkOne && selectedList.length === 0 && !close) {
        this.$message.error(this.$t('message.pointCardValid.useMchtList'))
        return
      }

      // 새로 선택된 사용처 추가
      for (let i = 0; i < this.dialogList.length; i++) {
        if (this.dialogList[i].selected && selectedList.indexOf(this.dialogList[i].mchtCd) === -1) {
          const data = {
            mchtNm: this.dialogList[i].mchtNm,
            mchtCd: this.dialogList[i].mchtCd,
            mchtMgmtCd: this.dialogList[i].mchtMgmtCd,
            lvList: []
          }

          if (this.createInfo.lvDivYn === 'Y' && this.createInfo.mchtAccuDiffDivYn === 'Y') {
            for (let j = 0; j < this.createInfo.levelList.length; j++) {
              data.lvList.push({
                lvDivCd: this.createInfo.levelList[j].lvDivCd,
                lvDivNm: this.createInfo.levelList[j].lvDivNm,
                fncDiv: 'USE',
                maxUsePit: undefined,
                minUsePit: undefined
              })
            }
          } else if (this.createInfo.lvDivYn === 'N' && this.createInfo.mchtAccuDiffDivYn === 'Y') {
            data.lvList.push({
              lvDivCd: 'normal',
              fncDiv: 'USE',
              maxUsePit: undefined,
              minUsePit: undefined
            })
          } else if (this.createInfo.lvDivYn === 'Y' && this.createInfo.mchtAccuDiffDivYn === 'N') {
            for (let j = 0; j < this.createInfo.levelList.length; j++) {
              data.lvList.push({
                lvDivCd: this.createInfo.levelList[j].lvDivCd,
                lvDivNm: this.createInfo.levelList[j].lvDivNm,
                fncDiv: 'USE',
                maxUsePit: this.temp.levelList[j].maxUsePit,
                minUsePit: this.temp.levelList[j].minUsePit
              })
            }
          } else if (this.createInfo.lvDivYn === 'N' && this.createInfo.mchtAccuDiffDivYn === 'N') {
            data.lvList.push({
              lvDivCd: 'normal',
              fncDiv: 'USE',
              maxUsePit: this.temp.noLvDivMax,
              minUsePit: this.temp.noLvDivMin
            })
          }
          this.createInfo.useMchtList.push(data)
        }
        // 선택 해제된 사용처 삭제
        if (!this.dialogList[i].selected && selectedList.indexOf(this.dialogList[i].mchtCd) !== -1) {
          for (let j = 0; j < this.createInfo.useMchtList.length; j++) {
            if (this.dialogList[i].mchtCd === this.createInfo.useMchtList[j].mchtCd) {
              this.createInfo.useMchtList.splice(j, 1)
            }
          }
        }
      }

      this.dialogVisible = close
    },
    // 사용금액 상이 여부 함수 (초기화)
    changeGbn() {
      for (let i = 0; i < this.createInfo.useMchtList.length; i++) {
        for (let j = 0; j < this.createInfo.useMchtList[i].lvList.length; j++) {
          this.createInfo.useMchtList[i].lvList[j].maxUsePit = undefined
          this.createInfo.useMchtList[i].lvList[j].minUsePit = undefined
        }
      }
      for (let i = 0; i < this.temp.levelList.length; i++) {
        this.temp.levelList[i].maxUsePit = undefined
        this.temp.levelList[i].minUsePit = undefined
      }
      this.temp.noLvDivMax = undefined
      this.temp.noLvDivMin = undefined
    },
    // 팝업창 ON
    handleAddUseMcht() {
      this.checkAll = false
      this.dialogQuery = {
        orgCd: this.createInfo.orgCd,
        mchtNm: '',
        st: 'OK',
        twoBaseFncDiv: 'ALLORUSE',
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
      for (let j = 0; j < this.createInfo.useMchtList.length; j++) {
        selectedList.push(this.createInfo.useMchtList[j].mchtCd)
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
      this.addSelectedUsePlace(true)
      this.getDialogList()
    },
    handleRegAccuDelete(no) {
      this.$confirm(this.$t('message.mchtDeleteGuide'), '', {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        for (let i = 0; i < this.createInfo.accuMchtList.length; i++) {
          if (this.createInfo.useMchtList[no].mchtCd === this.createInfo.accuMchtList[i].mchtCd) {
            this.createInfo.accuMchtList[i].selected = false
          }
        }
        this.createInfo.useMchtList.splice(no, 1)
      }).catch(() => {
      })
    },
    checkTempLevelListData() {
      for (let i = 0; i < this.createInfo.useMchtList.length; i++) {
        for (let j = 0; j < this.createInfo.useMchtList[i].lvList.length; j++) {
          if (this.createInfo.lvDivYn === 'Y') {
            this.createInfo.useMchtList[i].lvList[j].maxUsePit = this.temp.levelList[j].maxUsePit
            this.createInfo.useMchtList[i].lvList[j].minUsePit = this.temp.levelList[j].minUsePit
          } else {
            this.createInfo.useMchtList[i].lvList[j].maxUsePit = this.temp.noLvDivMax
            this.createInfo.useMchtList[i].lvList[j].minUsePit = this.temp.noLvDivMin
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
  .use_select_flex {
    display: flex;
    justify-content: space-between;
  }
</style>
