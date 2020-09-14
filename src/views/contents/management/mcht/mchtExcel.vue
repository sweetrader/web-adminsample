<template>
  <div>
    <!-- 헤더 -->
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.mchtExcel') }}</p>
        <div>
          <el-button v-waves type="info" plain @click="handleBack">{{ $t('btn.before') }}</el-button>
          <el-button v-waves type="info" @click="handleModify">{{ $t('btn.add') }}</el-button>
        </div>
      </el-row>
    </sticky>

    <!-- 바디 -->
    <div v-loading="loading" class="app-container">
      <el-form ref="ruleForm" :rules="rules" :model="createInfo" label-position="left" label-width="160px">
        <el-form-item :label="$t('mchtManagement.orgSel')" prop="orgCd">
          <el-select v-model="createInfo.orgCd" :disabled="$store.getters.roles.length > 0 && $store.getters.roles[0].authority === 'ORG'" clearable style="min-width: 120px" class="filter-item">
            <el-option v-for="item in orgList" :key="item.orgCd" :label="item.orgNm" :value="item.orgCd"/>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('mchtManagement.uploadGbn')">
          <el-row type="flex" align="middle" justify="start">
            <div class="gbn_text_right">{{ $t('mchtManagement.mchtCreate') }}</div>

            <!-- 샘플 파일 버튼 -->
            <el-button v-waves type="info" @click="downloadSample()">{{ $t('btn.excelSample') }}</el-button>
          </el-row>
        </el-form-item>

        <div class="excel_empty_area"/>

        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>

        <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
          <el-table-column :label="this.$t('mchtManagement.mchtNm')" align="center">
            <template slot-scope="scope">
              {{ scope.row.mchtNm }}
            </template>
          </el-table-column>

          <el-table-column :label="this.$t('mchtManagement.status')" align="center">
            <template slot-scope="scope">
              <el-tag :type="$applyTagFilter(scope.row.st, statusOptions)">
                {{ $applyTextFilter(scope.row.st, statusOptions) }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column :label="this.$t('mchtManagement.mchtMgmtCd')" align="center">
            <template slot-scope="scope">
              {{ scope.row.mchtMgmtCd }}
            </template>
          </el-table-column>

          <el-table-column :label="this.$t('mchtManagement.telNo')" align="center">
            <template slot-scope="scope">
              {{ scope.row.telNo }}
            </template>
          </el-table-column>

          <el-table-column :label="this.$t('mchtManagement.addr')" align="center">
            <template slot-scope="scope">
              {{ scope.row.addr }}
            </template>
          </el-table-column>

          <el-table-column :label="this.$t('mchtManagement.baseFncDiv')" align="center">
            <template slot-scope="scope">
              <el-tag :type="$applyTagFilter(scope.row.baseFncDiv, baseFncDivGbn)">
                {{ $applyTextFilter(scope.row.baseFncDiv, baseFncDivGbn) }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

    </div>
  </div>

</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import Sticky from '@/components/Sticky'
import UploadExcelComponent from './UploadExcel/index.vue'
import { fetchSearchOrgList } from '@/api/org'
import { regExcelMcht } from '@/api/mcht'

const statusOptions = [
  { key: 'OK', name: i18n.t('mchtManagement.statusOptions.ok'), tag: 'success' },
  { key: 'CLOSE', name: i18n.t('mchtManagement.statusOptions.close'), tag: 'danger' }
]

const baseFncDivGbn = [
  { key: 'ALL', name: i18n.t('mchtManagement.baseFncDivGbn.all'), tag: '' },
  { key: 'ACCU', name: i18n.t('mchtManagement.baseFncDivGbn.accu'), tag: 'success' },
  { key: 'USE', name: i18n.t('mchtManagement.baseFncDivGbn.use'), tag: 'info' }
]

export default {
  name: 'MchtExcel',
  directives: { waves },
  components: { Sticky, UploadExcelComponent },
  data() {
    return {
      loading: false,
      orgList: null,
      tableData: [],
      createInfo: {
        orgCd: ''
      },
      ruleForm: {
        orgCd: ''
      },
      rules: {
        orgCd: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
      },
      statusOptions,
      baseFncDivGbn
    }
  },
  created() {
    // 운영사 계정의 경우 운영사 고정
    if (this.$store.getters.roles[0].authority === 'ORG') {
    // 계정에 어느 운영사인지 세팅이 된다면 추가
      this.createInfo.orgCd = this.$store.getters.roleInfo
    }

    this.getOrg()
  },
  methods: {
    // org 로드
    async getOrg() {
      this.loading = true
      // 운영사 목록
      const param = {
        pageIdx: 1,
        pageSize: 9999
      }
      const response = await fetchSearchOrgList(param)

      this.orgList = response.list

      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    // 업로드 전 작업
    beforeUpload(file) {
      return true
    },
    // 업로드 성공
    handleSuccess({ results, header }) {
      this.loading = true

      // 데이터 체크
      for (let i = 0; i < results.length; i++) {
        // 제휴사 명 체크
        if (!results[i].mchtNm) {
          return this.excelError(i, this.$t('mchtManagement.mchtNm'))
        }

        // 상태 체크
        if (!results[i].st) {
          return this.excelError(i, this.$t('mchtManagement.status'))
        } else {
          switch (results[i].st) {
            // 영어 설정 꼭 확인 필요
            case this.$t('mchtManagement.statusOptions.ok'):
              results[i].st = 'OK'
              break
            case this.$t('mchtManagement.statusOptions.close'):
              results[i].st = 'CLOSE'
              break
            default:
              return this.excelError(i, this.$t('mchtManagement.status'))
          }
        }

        // 기능구분(이용처 구분) 체크
        if (!results[i].baseFncDiv) {
          return this.excelError(i, this.$t('mchtManagement.baseFncDiv'))
        } else {
          switch (results[i].baseFncDiv.replace(/ /gi, '')) {
            case this.$t('mchtManagement.baseFncDivGbn.trimAll'):
              results[i].baseFncDiv = 'ALL'
              break
            case this.$t('mchtManagement.baseFncDivGbn.accu'):
              results[i].baseFncDiv = 'ACCU'
              break
            case this.$t('mchtManagement.baseFncDivGbn.use'):
              results[i].baseFncDiv = 'USE'
              break
            default:
              return this.excelError(i, this.$t('mchtManagement.baseFncDiv'))
          }
        }
      }

      this.tableData = results
      this.loading = false
    },
    // 엑셀 데이터 에러 메세지
    excelError(i, string) {
      this.$message.error((i + 1) + this.$t('message.excelErroMsg1') + string + this.$t('message.excelErroMsg2'))
      this.loading = false
    },
    // 이전
    handleBack() {
      this.$router.go(-1)
    },
    // 등록
    handleModify() {
      // 업로드 체크
      if (!this.tableData || this.tableData.length === 0) {
        this.$message.error(this.$t('message.uploadExcel'))
        return
      }

      // 운영사 선택 체크
      if (this.createInfo.orgCd) {
        this.loading = true

        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].orgCd = this.createInfo.orgCd
        }

        this.$confirm(this.$t('message.addConfirm'), {
          confirmButtonText: this.$t('btn.confirm'),
          cancelButtonText: this.$t('btn.cancel'),
          type: 'warning'
        }).then(() => {
          regExcelMcht(this.tableData).then(response => {
            setTimeout(() => {
              this.$message.success(this.$t('message.success'))
              this.loading = false
              this.$router.go(-1)
            }, 300)
          }).catch(() => {
            this.loading = false
          })
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$message.error(this.$t('message.selectOrgCd'))
      }
    },
    // 샘플 다운로드
    downloadSample() {
      if (this.$store.getters.language === 'ko') {
        // 한글 샘플 파일
      } else if (this.$store.getters.language === 'en') {
        // 영어 샘플 파일
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.excel_empty_area {
  height: 100px;
}
.gbn_text_right {
  margin-right: 10px;
}
</style>
