<template>
  <div>
    <div v-loading="listLoading" class="drawer-container">
      <el-form ref="ruleForm" :rules="rules" :model="mngInfo" label-position="left" label-width="150px">

        <!-- 권한 -->
        <el-form-item :label="$t('manager.rule')" prop="ruleCd">
          <el-select v-model="mngInfo.ruleCd" :placeholder="$t('manager.rule')" :disabled="confirmType === 'edit' || $store.getters.roles[0].authority === 'ORG'" style="width: 140px" class="filter-item" @change="mngInfo.ruleInfo = ''">
            <el-option v-for="item in ruleOptions" :key="item.key" :label="item.name" :value="item.key"/>
          </el-select>
        </el-form-item>

        <el-form-item v-if="mngInfo.ruleCd && mngInfo.ruleCd !== 'ADMIN'" :label="$t('manager.ruleInfo')" prop="ruleCd">
          <el-select v-if="mngInfo.ruleCd === 'ORG'" v-model="mngInfo.ruleInfo" :placeholder="$t('manager.ruleInfo')" :disabled="confirmType === 'edit'" style="width: 140px" class="filter-item">
            <el-option v-for="item in orgList" :key="item.orgCd" :label="item.orgNm" :value="item.orgCd"/>
          </el-select>

          <el-select v-if="mngInfo.ruleCd === 'MCHT'" v-model="mngInfo.ruleInfo" :placeholder="$t('manager.ruleInfo')" :disabled="confirmType === 'edit'" style="width: 140px" class="filter-item">
            <el-option v-for="item in mchtList" :key="item.mchtCd" :label="item.mchtNm" :value="item.mchtCd"/>
          </el-select>
        </el-form-item>

        <!-- 관리자 아이디 -->
        <el-form-item v-if="confirmType === 'add'" :label="$t('manager.mngId')" prop="mngId">
          <el-input v-model="mngInfo.mngId" maxlength="50" class="mng_id_input" @change="resetIdCheck">
            <div slot="suffix">
              <el-button
                v-waves
                plain
                :type="idCheck"
                @click="checkMngId">
                <div v-if="idCheck === 'info'">
                  {{ $t('btn.duplCheck') }}
                </div>
                <div v-if="idCheck === 'success'">
                  {{ $t('btn.checkOk') }}
                </div>
              </el-button>
            </div>
          </el-input>
        </el-form-item>

        <el-form-item v-if="confirmType === 'edit'" :label="$t('manager.mngId')">
          <span>{{ mngInfo.mngId }}</span>
        </el-form-item>

        <!-- 비밀번호 -->
        <el-form-item v-if="confirmType === 'add'" :label="$t('manager.mngPwd')" prop="mngPwd">
          <div class="pwd_flex">
            <el-input v-model="mngInfo.mngPwd" type="password" maxlength="30" :placeholder="$t('placeholder.pwd')" style="width: 45%;"/>
            <el-input v-model="mngInfo.mngPwdCheck" type="password" maxlength="30" :placeholder="$t('placeholder.pwdCheck')" style="width: 45%;"/>
          </div>
        </el-form-item>

        <el-form-item v-if="confirmType === 'edit'" :label="$t('manager.mngPwd')">
          <div class="pwd_flex">
            <el-input v-model="mngInfo.mngPwd" type="password" maxlength="30" :placeholder="$t('placeholder.pwd')" style="width: 45%;"/>
            <el-input v-model="mngInfo.mngPwdCheck" type="password" maxlength="30" :placeholder="$t('placeholder.pwdCheck')" style="width: 45%;"/>
          </div>
        </el-form-item>

        <el-form-item v-if="confirmType === 'edit'" :label="$t('manager.st')" prop="st">
          <el-radio-group v-model="mngInfo.st">
            <el-radio-button v-for="item in stOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <!-- 관리자 명 -->
        <el-form-item :label="$t('manager.mngNm')" prop="mngNm">
          <el-input v-model="mngInfo.mngNm" maxlength="50"/>
        </el-form-item>

        <!-- 전화번호 -->
        <el-form-item :label="$t('manager.telNo')" prop="telNo">
          <el-input v-model="mngInfo.telNo" maxlength="15"/>
        </el-form-item>

        <!-- 이메일 -->
        <el-form-item :label="$t('manager.eml')" prop="eml">
          <el-input v-model="mngInfo.eml" maxlength="200"/>
        </el-form-item>

      </el-form>
    </div>
    <div class="drawer-footer">
      <!--<el-button type="info" @click="handleCancel">{{ $t('btn.before') }}</el-button>-->
      <el-button
        v-if="confirmType === 'add'"
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="primary"
        class="button_style"
        @click="handleConfirm">
        {{ $t('btn.add') }}
      </el-button>
      <el-button
        v-else
        v-waves
        :loading="confirmLoading"
        size="medium"
        type="info"
        class="button_style"
        @click="handleConfirm">
        {{ $t('btn.edit') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import { fetchSearchMngDetail, fetchSearchDuplMngId, createMng, editMng } from '@/api/system'
import { fetchSearchOrgList } from '@/api/org'
import { fetchSearchMchtList } from '@/api/mcht'

const ruleOptions = [
  { key: 'ADMIN', name: i18n.t('manager.ruleOptions.admin') },
  { key: 'ORG', name: i18n.t('manager.ruleOptions.org') },
  { key: 'MCHT', name: i18n.t('manager.ruleOptions.mcht') }
]

const stOptions = [
  { key: 'OK', name: i18n.t('manager.stOptions.ok') },
  { key: 'CLOSE', name: i18n.t('manager.stOptions.close') }
]

export default {
  name: 'MngForm',
  directives: { waves },
  components: { },
  props: {
    // 유형(등록: add, 수정: edit)
    confirmType: {
      type: String,
      default: 'add'
    },
    // edit Seq Info
    mngId: {
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
      idCheck: 'info',
      listLoading: false,
      confirmLoading: false,
      mngInfo: {
        ruleCd: '',
        ruleInfo: '',
        mngId: '',
        mngPwd: '',
        mngPwdCheck: '',
        mngNm: '',
        telNo: '',
        eml: ''
      },
      ruleForm: {
        ruleCd: '',
        mngId: '',
        mngPwd: '',
        mngPwdCheck: '',
        mngNm: '',
        telNo: '',
        eml: ''
      },
      rules: {
        ruleCd: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        ruleInfo: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        mngId: [
          { required: true, message: this.$t('message.valid_required'), trigger: 'blur' },
          { pattern: /^([A-Za-z0-9]){4,30}$/, message: this.$t('placeholder.mngIdRequiredEn'), trigger: 'blur' }
        ],
        mngPwd: [
          // { validator: this.passwordValidator, trigger: 'blur' },
          { required: true, message: this.$t('message.valid_required'), trigger: 'blur' }
        ],
        mngPwdCheck: [
          // { validator: this.passwordValidator, trigger: 'blur' },
          { required: true, message: this.$t('message.valid_required'), trigger: 'blur' }
        ],
        mngNm: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        telNo: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        eml: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
      },
      orgList: null,
      mchtList: null,
      ruleOptions,
      stOptions
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
  methods: {
    handleCancel() {
      this.closeDrawer()
    },
    // 데이터 초기화
    resetData() {
      this.idCheck = 'info'
      this.mngInfo.mngId = ''
      this.mngInfo.mngNm = ''
      this.mngInfo.mngPwd = ''
      this.mngInfo.mngPwdCheck = ''
      this.mngInfo.ruleCd = ''
      this.mngInfo.ruleInfo = ''
      this.mngInfo.telNo = ''
      this.mngInfo.eml = ''
      this.mngInfo.regDttm = ''
      this.mngInfo.modDttm = ''
      this.mngInfo.regId = ''
      this.mngInfo.modId = ''
      this.orgList = []
      this.mchtList = []
    },
    // edit 체크
    async editCheck() {
      if (this.confirmType === 'edit') {
        // 전달받은 아이디 값으로 조회
        // edit이면 데이터 상세 조회
        const response = await fetchSearchMngDetail(this.mngId)

        this.mngInfo = response
      }

      const param = {
        pageIdx: 1,
        pageSize: 10000
      }

      if (this.confirmType === 'add' && this.$store.getters.roles[0].authority === 'ORG') {
        // 계정에 어느 운영사인지 세팅이 된다면 추가
        this.mngInfo.ruleCd = 'MCHT'
        param.orgCd = this.$store.getters.roleInfo
      }

      // 운영사
      const orgRes = await fetchSearchOrgList(param)
      this.orgList = orgRes.list

      // 제휴처
      const mchtRes = await fetchSearchMchtList(param)
      this.mchtList = mchtRes.list

      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    // 등록 / 수정 버튼
    handleConfirm() {
      // 비밀번호 확인
      if ((this.mngInfo.mngPwd || this.mngInfo.mngPwdCheck) && this.mngInfo.mngPwd !== this.mngInfo.mngPwdCheck) {
        this.$message.error(this.$t('message.checkPassword'))
        return
      }

      if (this.confirmType === 'add') {
        // 등록
        // 중복체크 요구
        if (this.idCheck === 'info') {
          this.$message.error(this.$t('message.needCheckDupl'))
          return
        }

        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.confirmLoading = true
            this.$confirm(this.$t('message.addConfirm'), {
              confirmButtonText: this.$t('btn.confirm'),
              cancelButtonText: this.$t('btn.cancel'),
              type: 'warning'
            }).then(() => {
              this.mngInfo.st = 'OK'
              createMng(this.mngInfo).then(response => {
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
      } else if (this.confirmType === 'edit') {
        // 수정
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.confirmLoading = true
            this.$confirm(this.$t('message.addConfirm'), {
              confirmButtonText: this.$t('btn.confirm'),
              cancelButtonText: this.$t('btn.cancel'),
              type: 'warning'
            }).then(() => {
              editMng(this.mngInfo).then(response => {
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
      }
    },
    async checkMngId() {
      // ID 유효성 검사
      const regExp = /^([A-Za-z0-9]){4,30}$/
      if (!regExp.exec(this.mngInfo.mngId)) {
        this.$message.error(this.$t('message.mngIdRequiredEn'))
        return
      }

      try {
        if (this.mngInfo.mngId) {
          const response = await fetchSearchDuplMngId(this.mngInfo.mngId)
          if (response === 'ok') {
            this.idCheck = 'success'
          }
        } else {
          this.idCheck = 'info'
        }
      } catch {
        this.idCheck = 'info'
        console.log('Already Use ID')
      }
    },
    resetIdCheck() {
      this.idCheck = 'info'
    }
    /*
    passwordValidator(rule, value, callback) {
      const regEx = [
        /^.*(?=^.{8,20}$).*$/,
        /^.*(?=^.{10,20}$).*$/,
        /^.*(?=.*[a-z]).*$/,
        /^.*(?=.*[A-Z]).*$/,
        /^.*(?=.*\d).*$/,
        /^.*(?=.*[!@#$%^&+=]).*$/
      ]

      const errorText = []

      if (!regEx[2].test(value)) {
        // 소문자
        errorText.push('소문자')
      }
      if (!regEx[3].test(value)) {
        // 대문자
        errorText.push('대문자')
      }
      if (!regEx[4].test(value)) {
        // 숫자
        errorText.push('숫자')
      }
      if (!regEx[5].test(value)) {
        // 특수문자
        errorText.push('특수문자')
      }

      // 8~20자리 유효성
      if (regEx[0].test(value)) {
        if (value.length >= 10) {
          // 10자리 유효성 검사
          if (errorText.length >= 3) {
            let result = '' // eslint-disable-line
            for (let i = 0; i < errorText.length; i++) {
              if (i !== 0) {
                result += ' / '
              }
              result += errorText[i]
            }
            return callback(new Error(this.$t('login.placeholderPassword')))
          }
        } else {
          // 8자리 유효성 검사
          if (errorText.length >= 2) {
            let result = '' // eslint-disable-line
            for (let j = 0; j < errorText.length; j++) {
              if (j !== 0) {
                result += ' / '
              }
              result += errorText[j]
            }
            return callback(new Error(this.$t('login.placeholderPassword')))
          }
        }
      } else {
        return callback(new Error(this.$t('login.placeholderPassword')))
      }
      callback()
    }
    */
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
  .mng_id_input {
    .el-input__suffix {
      right: 0 !important;
    }
  }
</style>
