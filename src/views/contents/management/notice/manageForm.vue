<template>
  <div>
    <div v-loading="listLoading" class="drawer-container">
      <el-form ref="ruleForm" :rules="rules" :model="notice" label-position="left" label-width="150px">

        <!-- 운영사 Key -->
        <el-form-item v-show="confirmType === 'edit'" :label="$t('notice.no')" prop="mchtCd">
          <span>{{ notice.no }}</span>
        </el-form-item>

        <!-- 운영사 Key -->
        <el-form-item :label="$t('notice.title')" prop="title">
          <el-input v-model="notice.title" maxlength="50"/>
        </el-form-item>

        <!-- 운영사 명 -->
        <el-form-item :label="$t('notice.content')" prop="content">
          <el-input type="textarea" v-model="notice.content" maxlength="1000" :rows="7"/>
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
import { insertNotice, fetchNoticeDetail, editNotice } from '@/api/notice'
import tinymce from '@/components/Tinymce/index.vue'

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
  components: { tinymce },
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
      notice: {
        no: '',
        title: '',
        content: '',
        regId: this.$store.getters.id,
        regDate: '',
        modId: this.$store.getters.id,
        modDate: ''
      },
      ruleForm: {
        orgCd: '',
        mchtNm: '',
        baseFncDiv: ''
      },
      rules: {
        title: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        content: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
      },
      statusOptions,
      baseFncDivGbn
    }
  },
  watch: {
    drawerOpenChecker(val) {
      // 2번째 호출 시 데이터 초기화
      if (val) {
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
    // this.listLoading = true
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
      this.notice.title = ''
      this.notice.content = ''
      this.notice.regId = this.$store.getters.id
      this.notice.modId = this.$store.getters.id
      this.notice.regDate = ''
      this.notice.modDate = ''
    },
    // edit 체크
    async editCheck() {
      // org 리스트 초기화
      const param = {
        st: this.confirmType === 'edit' ? '' : 'OK',
        pageIdx: 1,
        pageSize: 9999
      }
      // const orgData = await fetchSearchOrgList(param)

      // this.orgList = orgData.list

      if (this.confirmType === 'edit') {
        // 전달받은 아이디 값으로 조회
        // edit이면 데이터 상세 조회

        const response = await fetchNoticeDetail(this.mchtCd)

        this.preFncDiv = response.baseFncDiv

        this.notice = response
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
            insertNotice(this.notice).then(response => {
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
            editNotice(this.notice).then(response => {
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
