<template>
  <div>
    <div v-loading="listLoading" class="drawer-container">
      <el-form ref="ruleForm" :rules="rules" :model="mchtInfo" label-position="left" label-width="150px">

        <!-- 운영사 Key -->
        <el-form-item v-show="confirmType === 'edit'" :label="$t('mchtManagement.mchtCd')" prop="mchtCd">
          <span>{{ mchtInfo.mchtCd }}</span>
        </el-form-item>

        <!-- 운영사 명 -->
        <el-form-item :label="$t('mchtManagement.orgSel')" prop="orgCd">
          <el-select v-model="mchtInfo.orgCd" :disabled="confirmType === 'edit' || $store.getters.roles[0].authority === 'ORG'" clearable style="min-width: 120px" class="filter-item">
            <el-option v-for="item in orgList" :key="item.orgCd" :label="item.orgNm + ' (' + item.orgCd + ')'" :value="item.orgCd"/>
          </el-select>
        </el-form-item>

        <!-- 제휴사 명 -->
        <el-form-item :label="$t('mchtManagement.mchtNm')" prop="mchtNm">
          <el-input v-model="mchtInfo.mchtNm" maxlength="50"/>
        </el-form-item>

        <!-- 관리 코드 -->
        <el-tooltip effect="light" placement="left">
          <!-- 포인트 카드에 있던 안내 옮김 -->
          <template slot="content">
            <div v-html="$t('pointCard.guide.mchtMgmtCd')"/>
          </template>

          <el-form-item :label="$t('mchtManagement.mchtMgmtCd')">
            <el-input v-model="mchtInfo.mchtMgmtCd" maxlength="50"/>
          </el-form-item>
        </el-tooltip>

        <!-- 운영 상태 -->
        <el-form-item :label="$t('mchtManagement.status')" prop="st">
          <el-radio-group v-model="mchtInfo.st">
            <el-radio-button v-for="item in statusOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <!-- 이용처 구분 -->
        <el-form-item :label="$t('mchtManagement.baseFncDiv')" prop="baseFncDiv">
          <!-- 등록 일 때 -->
          <div v-if="confirmType === 'add'">
            <el-radio-group v-model="mchtInfo.baseFncDiv">
              <el-radio v-for="item in baseFncDivGbn" :key="item.name" :label="item.key">{{ item.name }}</el-radio>
            </el-radio-group>
          </div>

          <!-- 수정 일 때 -->
          <!-- 적립 & 사용 -->
          <div v-if="confirmType === 'edit' && preFncDiv === 'ALL'">
            <el-radio-group v-model="mchtInfo.baseFncDiv">
              <el-radio
                :disabled="mchtInfo.reviseDivYn === 'N'"
                :label="baseFncDivGbn[0].key">
                {{ baseFncDivGbn[0].name }}
              </el-radio>
              <el-radio
                :disabled="mchtInfo.reviseDivYn === 'N'"
                :label="baseFncDivGbn[1].key">
                {{ baseFncDivGbn[1].name }}
              </el-radio>
              <el-radio
                :disabled="mchtInfo.reviseDivYn === 'N'"
                :label="baseFncDivGbn[2].key">
                {{ baseFncDivGbn[2].name }}
              </el-radio>
            </el-radio-group>
          </div>
          <!-- 적립 -->
          <div v-if="confirmType === 'edit' && preFncDiv === 'ACCU'">
            <el-radio-group v-model="mchtInfo.baseFncDiv">
              <el-radio
                :label="baseFncDivGbn[0].key">
                {{ baseFncDivGbn[0].name }}
              </el-radio>
              <el-radio
                :label="baseFncDivGbn[1].key">
                {{ baseFncDivGbn[1].name }}
              </el-radio>
              <el-radio
                :disabled="mchtInfo.reviseDivYn === 'N'"
                :label="baseFncDivGbn[2].key">
                {{ baseFncDivGbn[2].name }}
              </el-radio>
            </el-radio-group>
          </div>
          <!-- 사용 -->
          <div v-if="confirmType === 'edit' && preFncDiv === 'USE'">
            <el-radio-group v-model="mchtInfo.baseFncDiv">
              <el-radio
                :label="baseFncDivGbn[0].key">
                {{ baseFncDivGbn[0].name }}
              </el-radio>
              <el-radio
                :disabled="mchtInfo.reviseDivYn === 'N'"
                :label="baseFncDivGbn[1].key">
                {{ baseFncDivGbn[1].name }}
              </el-radio>
              <el-radio
                :label="baseFncDivGbn[2].key">
                {{ baseFncDivGbn[2].name }}
              </el-radio>
            </el-radio-group>
          </div>
        </el-form-item>

        <!-- Client Id -->
        <el-form-item v-show="confirmType === 'edit'" :label="$t('mchtManagement.clntId')">
          <span>{{ mchtInfo.clntId }}</span>
        </el-form-item>

        <!-- Client Scr -->
        <el-form-item v-show="confirmType === 'edit'" :label="$t('mchtManagement.clntScr')">
          <span>{{ mchtInfo.clntScr }}</span>
        </el-form-item>

        <!-- 전화번호 -->
        <el-form-item :label="$t('mchtManagement.telNo')" prop="telNo">
          <el-input v-model="mchtInfo.telNo" maxlength="15"/>
        </el-form-item>

        <!-- 주소 -->
        <el-form-item :label="$t('mchtManagement.addr')" prop="addr">
          <el-input v-model="mchtInfo.addr" maxlength="200"/>
        </el-form-item>

      </el-form>
    </div>

    <!-- 버튼 영역 -->
    <div class="drawer-footer">
      <el-button
        v-if="confirmType === 'add'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="primary"
        class="button_style"
        @click="handleAdd">
        {{ $t('btn.add') }}
      </el-button>
      <el-button
        v-else
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="info"
        class="button_style"
        @click="handleEdit">
        {{ $t('btn.edit') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import { fetchSearchOrgList } from '@/api/org'
import { fetchSearchMchtDetail, createMcht, editMcht } from '@/api/mcht'

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
  name: 'MchtMng',
  directives: { waves },
  components: { },
  props: {
    // 유형(등록: add, 수정: edit)
    confirmType: {
      type: String,
      default: 'add'
    },
    // edit Seq Info
    mchtCd: {
      type: String,
      default: ''
    },
    // Drawer 열렸을 때 체크하는 값
    drawerOpenChecker: {
      type: Boolean,
      default: false
    },
    // Drawer 닫기 함수
    closeDrawer: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      listLoading: false,
      confirmLoading: false,
      preFncDiv: '',
      orgList: null,
      mchtInfo: {
        mchtCd: '',
        mchtNm: '',
        orgCd: '',
        orgNm: '',
        st: 'OK',
        baseFncDiv: '',
        clntId: '',
        clntScr: '',
        mchtMgmtCd: '',
        addr: '',
        telNo: '',
        regId: this.$store.getters.id,
        modId: this.$store.getters.id,
        regDttm: '',
        modDttm: ''
        // 추후 추가할 수 있는 파라미터
        /*
        baseAccuDiv: '',
        baseAccuDivVal: '',
        baseUseDiv: '',
        baseUseDivVal: ''
        */
      },
      ruleForm: {
        orgCd: '',
        mchtNm: '',
        baseFncDiv: ''
      },
      rules: {
        orgCd: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        mchtNm: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        baseFncDiv: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
      },
      statusOptions,
      baseFncDivGbn
    }
  },
  watch: {
    drawerOpenChecker(val) {
      // 2번째 호출 시 데이터 초기화
      if (val) {
        this.listLoading = true

        this.$nextTick(() => {
          this.resetData()
          this.editCheck()
          this.$refs['ruleForm'].resetFields()
        })
      }
    }
  },
  created() {
    // 처음 호출 시 수정 데이터 체크
    this.listLoading = true
    this.editCheck()
  },
  mounted() {

  },
  methods: {
    handleCancel() {
      this.closeDrawer()
    },
    // 데이터 초기화
    resetData() {
      this.preFncDiv = ''
      this.mchtInfo.mchtCd = ''
      this.mchtInfo.mchtNm = ''
      this.mchtInfo.orgCd = ''
      this.mchtInfo.orgNm = ''
      this.mchtInfo.st = 'OK'
      this.mchtInfo.baseFncDiv = ''
      this.mchtInfo.clntId = ''
      this.mchtInfo.clntScr = ''
      this.mchtInfo.mchtMgmtCd = ''
      this.mchtInfo.addr = ''
      this.mchtInfo.telNo = ''
      this.mchtInfo.regId = this.$store.getters.id
      this.mchtInfo.modId = this.$store.getters.id
      this.mchtInfo.regDttm = ''
      this.mchtInfo.modDttm = ''
      // 추후 추가할 수 있는 파라미터
      /*
      this.mchtInfo.baseAccuDiv = ''
      this.mchtInfo.baseAccuDivVal = ''
      this.mchtInfo.baseUseDiv = ''
      this.mchtInfo.baseUseDivVal = ''
      */
      delete this.mchtInfo.baseAccuDiv
      delete this.mchtInfo.baseAccuDivVal
      delete this.mchtInfo.baseUseDiv
      delete this.mchtInfo.baseUseDivVal
    },
    // edit 체크
    async editCheck() {
      // org 리스트 초기화
      const param = {
        st: this.confirmType === 'edit' ? '' : 'OK',
        pageIdx: 1,
        pageSize: 9999
      }
      const orgData = await fetchSearchOrgList(param)

      this.orgList = orgData.list

      if (this.confirmType === 'edit') {
        // 전달받은 아이디 값으로 조회
        // edit이면 데이터 상세 조회

        const response = await fetchSearchMchtDetail(this.mchtCd)

        this.preFncDiv = response.baseFncDiv

        this.mchtInfo = response
        this.mchtInfo.modId = this.$store.getters.id
      }

      if (this.confirmType === 'add') {
        // 운영사 계정의 경우 운영사 고정
        if (this.$store.getters.roles[0].authority === 'ORG') {
        // 계정에 어느 운영사인지 세팅이 된다면 추가
          this.mchtInfo.orgCd = this.$store.getters.roleInfo
        }
      }

      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    // 등록 / 수정 버튼
    handleAdd() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          this.$confirm(this.$t('message.addConfirm'), {
            confirmButtonText: this.$t('btn.confirm'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
          }).then(() => {
            createMcht(this.mchtInfo).then(response => {
              this.confirmLoading = false
              this.$message.success(this.$t('message.success'))
              this.closeDrawer()
            }).catch(() => {
              this.confirmLoading = false
            })
          }).catch(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    handleEdit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.confirmLoading = true
          this.$confirm(this.$t('message.editConfirm'), {
            confirmButtonText: this.$t('btn.confirm'),
            cancelButtonText: this.$t('btn.cancel'),
            type: 'warning'
          }).then(() => {
            editMcht(this.mchtInfo).then(response => {
              this.confirmLoading = false
              this.$message.success(this.$t('message.success'))
              this.closeDrawer()
            }).catch(() => {
              this.confirmLoading = false
            })
          }).catch(() => {
            this.confirmLoading = false
          })
        }
      })
    },
    // 숫자만 입력 함수
    handleNumber(event) {
      if (event.keyCode === 190) {
        event.preventDefault()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .drawer-container {
    padding: 0 10px 0 10px;
  }
  .drawer-footer {
    .button_style {
      margin-top: 30px;
      width: 100%;
    }
  }
  .pit_card_list {
    margin-top: 60px;
    margin-bottom: 30px;
  }
  .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
    margin-right: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 120px;
    margin-right: 10px;
    vertical-align: bottom;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
</style>
