<template>
  <div>
    <div v-loading="listLoading" class="org-drawer-container">
      <el-form ref="ruleForm" :rules="rules" :model="orgInfo" label-position="left" label-width="150px">

        <!-- 운영사 Key -->
        <el-form-item v-show="confirmType === 'edit'" :label="$t('orgManagement.orgCd')">
          <span>{{ orgInfo.orgCd }}</span>
        </el-form-item>

        <!-- 운영사 명 -->
        <el-form-item :label="$t('orgManagement.orgNm')" prop="orgNm">
          <el-input v-model="orgInfo.orgNm" maxlength="5"/>
        </el-form-item>

        <!-- 운영 상태 -->
        <el-form-item :label="$t('orgManagement.status')" prop="st">
          <el-radio-group v-model="orgInfo.st">
            <el-radio-button v-for="item in statusOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <!-- Client Id -->
        <el-form-item v-show="confirmType === 'edit'" :label="$t('orgManagement.clntId')">
          <span>{{ orgInfo.clntId }}</span>
        </el-form-item>

        <!-- Client Scr -->
        <el-form-item v-show="confirmType === 'edit'" :label="$t('orgManagement.clntScr')">
          <span>{{ orgInfo.clntScr }}</span>
        </el-form-item>

        <!-- 전화번호 -->
        <el-form-item :label="$t('orgManagement.telNo')" prop="telNo">
          <el-input v-model="orgInfo.telNo" maxlength="15"/>
        </el-form-item>

        <!-- 주소 -->
        <el-form-item :label="$t('orgManagement.addr')" prop="addr">
          <el-input v-model="orgInfo.addr" maxlength="200"/>
        </el-form-item>

        <!-- IP -->
        <el-form-item :label="$t('orgManagement.ipInfo')" prop="ipList">
          <el-tag
            v-for="(ipTag, i) in orgInfo.ipList"
            :key="i"
            closable
            :disable-transitions="false"
            size="medium"
            @close="handleDeleteIp(i)">
            {{ ipTag }}
          </el-tag>
          <el-input
            v-if="ipInputVisible"
            ref="saveTagInput"
            v-model="ipInputValue"
            class="input-new-tag"
            size="mini"
            @keyup.enter.native="handleIPInputConfirm"
            @blur="handleIPInputConfirm"/>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">{{ $t('btn.plus') }}</el-button>
        </el-form-item>

        <!-- 등록 카드정보 -->
        <div v-if="confirmType === 'edit'" class="pit_card_list">
          <el-table :data="orgInfo.pitCardList" border style="min-width: 100%">

            <!-- NO -->
            <el-table-column
              :label="$t('orgManagement.no')"
              align="center"
              type="index"
              width="80">
              <template slot-scope="scope">
                <span>{{ totCnt - (scope.$index + (pitCdQuery.pageSize * (pitCdQuery.pageIdx-1))) }}</span>
              </template>
            </el-table-column>

            <!-- 포인트 카드 명 -->
            <el-table-column :label="$t('orgManagement.pitCardNm')" align="center">
              <template slot-scope="scope">
                <span class="edit_button" @click="handleCardPage(scope.row)">{{ scope.row.pitCardNm }}</span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="totCnt>0"
            :total="totCnt"
            :page.sync="pitCdQuery.pageIdx"
            :limit.sync="pitCdQuery.pageSize"
            :page-sizes="[5, 10, 15, 20, 50]"
            :layout="'total, prev, pager, next'"
            @pagination="getPitCardInfo"/>
        </div>
      </el-form>

      <div class="drawer-footer">
        <!--<el-button type="info" @click="handleCancel">{{ $t('btn.before') }}</el-button>-->
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
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { createOrg, editOrg, fetchSearchOrgDetail } from '@/api/org'
import { fetchSearchPointCardList } from '@/api/pointCard'

const statusOptions = [
  { key: 'OK', name: i18n.t('orgManagement.statusOptions.ok'), tag: 'success' },
  { key: 'CLOSE', name: i18n.t('orgManagement.statusOptions.close'), tag: 'danger' }
]

export default {
  name: 'OrgCreate',
  directives: { waves },
  components: { Pagination },
  props: {
    // 유형(등록: add, 수정: edit)
    confirmType: {
      type: String,
      default: 'add'
    },
    // edit Seq Info
    orgCd: {
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
      ipInputVisible: false,
      ipInputValue: '',
      // 포인트 카드 정보
      pitCdQuery: {
        orgCd: '',
        pageIdx: 1,
        pageSize: 5
      },
      totCnt: 0,
      // 운영사 정보
      orgInfo: {
        orgCd: '',
        orgNm: '',
        st: 'OK',
        telNo: '',
        addr: '',
        clntId: '',
        clntScr: '',
        regId: this.$store.getters.id,
        modId: this.$store.getters.id,
        regDttm: '',
        modDttm: '',
        ipList: [],
        pitCardList: []
      },
      ruleForm: {
        orgCd: '',
        orgNm: '',
        st: 'OK',
        telNo: '',
        addr: '',
        ipList: [],
        pitCardList: []
      },
      rules: {
        orgCd: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        orgNm: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        st: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        addr: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }],
        ipList: [{ required: true, message: this.$t('message.valid_required'), trigger: 'blur' }]
      },
      statusOptions
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
      this.orgInfo.orgCd = ''
      this.orgInfo.orgNm = ''
      this.orgInfo.st = 'OK'
      this.orgInfo.telNo = ''
      this.orgInfo.addr = ''
      this.orgInfo.clntId = ''
      this.orgInfo.clntScr = ''
      this.orgInfo.regId = this.$store.getters.id
      this.orgInfo.modId = this.$store.getters.id
      this.orgInfo.regDttm = ''
      this.orgInfo.modDttm = ''
      this.orgInfo.ipList = []
      this.orgInfo.pitCardList = []
    },
    // edit 체크
    async editCheck() {
      if (this.confirmType === 'edit') {
        // 전달받은 아이디 값으로 조회
        // edit이면 데이터 상세 조회
        const response = await fetchSearchOrgDetail(this.orgCd)

        this.orgInfo = response
        this.orgInfo.modId = this.$store.getters.id

        this.pitCdQuery.orgCd = this.orgCd

        this.getPitCardInfo()
      }

      if (this.confirmType === 'add') {
        setTimeout(() => {
          this.listLoading = false
        }, 300)
      }
    },
    async getPitCardInfo() {
      this.listLoading = true

      const pitCardInfo = await fetchSearchPointCardList(this.pitCdQuery)

      this.orgInfo.pitCardList = pitCardInfo.list
      this.totCnt = pitCardInfo.totCnt

      setTimeout(() => {
        this.listLoading = false
      }, 300)
    },
    handleDeleteIp(i) {
      this.orgInfo.ipList.splice(i, 1)
    },
    showInput() {
      this.ipInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleIPInputConfirm() {
      if (this.ipInputValue) {
        if (!this.orgInfo.ipList) {
          this.orgInfo.ipList = []
        }
        this.orgInfo.ipList.push(this.ipInputValue)
      }
      this.ipInputVisible = false
      this.ipInputValue = ''
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
            createOrg(this.orgInfo).then(response => {
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
            editOrg(this.orgInfo).then(response => {
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
    handleCardPage(row) {
      this.$router.push({ path: '/pointCard/edit?pitCardFixNo=' + row.pitCardFixNo })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .org-drawer-container {
    padding: 0 10px 0 10px;
    height: calc(100vh - 124px);
    overflow-y: auto;
    .drawer-footer {
      .button_style {
        margin: 20px 0 20px 0;
        width: 100%;
      }
    }
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
</style>
