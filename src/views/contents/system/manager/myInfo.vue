<template>
  <div>
    <!-- 헤더 -->
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.myInfo') }}</p>
        <div>
          <el-button v-waves type="info" plain @click="handleBack">{{ $t('btn.before') }}</el-button>
          <el-button v-waves type="info" @click="handleModify">{{ $t('btn.edit') }}</el-button>
        </div>
      </el-row>
    </sticky>

    <!-- 바디 -->
    <div v-loading="loading" class="app-container">
      <el-card class="myinfo_card_style" shadow="hover">
        <!-- 카드 헤더 -->
        <div slot="header" class="clearfix">
          <strong>{{ $t('title.myInfo') }}</strong>
        </div>

        <el-form ref="ruleForm" :rules="rules" :model="mngInfo" label-position="left" label-width="180px">
          <!-- 권한 -->
          <el-form-item :label="$t('manager.rule')" prop="ruleCd">
            <el-select v-model="mngInfo.ruleCd" :placeholder="$t('manager.rule')" disabled style="width: 140px" class="filter-item">
              <el-option v-for="item in ruleOptions" :key="item.key" :label="item.name" :value="item.key"/>
            </el-select>
          </el-form-item>

          <el-form-item v-if="mngInfo.ruleCd && mngInfo.ruleCd !== 'ADMIN'" :label="$t('manager.ruleInfo')" prop="ruleCd">
            <el-select v-if="mngInfo.ruleCd === 'ORG'" v-model="mngInfo.ruleInfo" :placeholder="$t('manager.ruleInfo')" disabled style="width: 140px" class="filter-item">
              <el-option v-for="item in orgList" :key="item.orgCd" :label="item.orgNm" :value="item.orgCd"/>
            </el-select>

            <el-select v-if="mngInfo.ruleCd === 'MCHT'" v-model="mngInfo.ruleInfo" :placeholder="$t('manager.ruleInfo')" disabled style="width: 140px" class="filter-item">
              <el-option v-for="item in mchtList" :key="item.mchtCd" :label="item.mchtNm" :value="item.mchtCd"/>
            </el-select>
          </el-form-item>

          <!-- 관리자 아이디 -->
          <el-form-item :label="$t('manager.mngId')" prop="mngId">
            <span>{{ mngInfo.mngId }}</span>
          </el-form-item>

          <!-- 변경 비밀번호 -->
          <el-form-item :label="$t('manager.mngPwd')">
            <div class="pwd_flex">
              <el-input v-model="mngInfo.mngPwd" maxlength="30" :placeholder="$t('placeholder.pwd')" style="width: 200px;"/>
              <el-input v-model="mngInfo.mngPwdCheck" maxlength="30" :placeholder="$t('placeholder.pwdCheck')" style="width: 200px;"/>
            </div>
          </el-form-item>

          <!-- 관리자 명 -->
          <el-form-item :label="$t('manager.mngNm')" prop="mngNm">
            <span>{{ mngInfo.mngNm }}</span>
          </el-form-item>

          <!-- 전화번호 -->
          <el-form-item :label="$t('manager.telNo')" prop="telNo">
            <el-input v-model="mngInfo.telNo" maxlength="15" style="width: 200px;"/>
          </el-form-item>

          <!-- 이메일 -->
          <el-form-item :label="$t('manager.eml')" prop="eml">
            <el-input v-model="mngInfo.eml" maxlength="200" style="width: 200px;"/>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>

</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import Sticky from '@/components/Sticky'
import { fetchSearchMngDetail, editMng } from '@/api/system'
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
  name: 'MyInfo',
  directives: { waves },
  components: { Sticky },
  data() {
    return {
      loading: false,
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
  created() {
    this.getMngInfo()
  },
  methods: {
    // 관리자 정보 가져오기
    async getMngInfo() {
      this.loading = true

      const param = {
        pageIdx: 1,
        pageSize: 10000
      }
      // 운영사
      const orgRes = await fetchSearchOrgList(param)
      this.orgList = orgRes.list

      // 제휴처
      const mchtRes = await fetchSearchMchtList(param)
      this.mchtList = mchtRes.list

      const response = await fetchSearchMngDetail(this.$store.getters.id)

      this.mngInfo = response

      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    // 이전
    handleBack() {
      this.$router.go(-1)
    },
    // 수정
    handleModify() {
      this.$confirm(this.$t('message.editConfirm'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        editMng(this.mngInfo).then(response => {
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
.myinfo_card_style {
  width: 800px;
  margin: 0 0 32px 0;
}
</style>
