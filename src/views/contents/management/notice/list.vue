<template>
  <div v-loading="dataLoading" class="has-head-container">
    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.notice') }}</p>
      </el-row>
    </sticky>

    <div class="app-container">
      <div class="filter-container">
        <el-row class="filter-item">

          <!-- 제휴사 명 -->
          <el-input
            v-model="listQuery.searchKeyword"
            :placeholder="$t('placeholder.titleSearch')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <el-button
            v-waves
            class="filter-item"
            type="info"
            plain
            icon="el-icon-search"
            @click="getList()">
            {{ $t('btn.search') }}
          </el-button>

          <el-button
            v-waves
            class="filter-item"
            type="info"
            icon="el-icon-edit"
            @click="handleCreate()">
            {{ $t('btn.add') }}
          </el-button>
        </el-row>
      </div>

      <el-table :data="list" border style="max-width: 1400px !important;">
        <el-table-column :label="$t('notice.no')" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ totCnt - (scope.$index + (listQuery.size * (listQuery.page-1))) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('notice.title')" align="center" min-width="120">
          <template slot-scope="scope">
            <span class="edit_button" @click="handleEdit(scope.row.id)">{{ scope.row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('notice.regId')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.regId }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('notice.regDate')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.regDate }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('notice.modId')" align="center" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.modId }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('notice.modDate')" align="center" width="130">
          <template slot-scope="scope">
            <span>{{ scope.row.modDate }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('orgManagement.action')" align="center" width="120" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleDelete(scope.row.id)">{{ $t('btn.delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="totCnt>0" :total="totCnt" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList"/>
    </div>

    <!-- 우측 사이드 바 수정 폼 -->
    <el-drawer
      :title="drawerInfo.title"
      :visible.sync="drawerInfo.rightDrawer"
      direction="rtl"
      size="35%">
      <manage-form
        :confirm-type="drawerInfo.confirmType"
        :mcht-cd="drawerInfo.editMchtCd"
        :drawer-open-checker.sync="drawerInfo.rightDrawer"
        :close-drawer="handleDrawerClose"/>
    </el-drawer>
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import Sticky from '@/components/Sticky'
import manageForm from './manageForm'
import { fetchNoticeList, deleteNotice } from '@/api/notice'

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
  name: 'McntManagement',
  directives: { waves },
  components: { Sticky, Pagination, manageForm },

  data() {
    return {
      dataLoading: false,
      baseFncDivGbn,
      statusOptions,
      listQuery: {
        searchKeyword: '',
        page: 1,
        size: 10
      },
      totCnt: 0,
      list: null,
      drawerInfo: {
        title: '',
        rightDrawer: false,
        confirmType: 'add',
        editMchtCd: ''
      }
    }
  },
  watch: {

  },
  created() {
    // 운영사 계정의 경우 운영사 고정
    if (this.$store.getters.roles[0].authority === 'ORG') {
      // 계정에 어느 운영사인지 세팅이 된다면 추가
      this.listQuery.orgCd = this.$store.getters.roleInfo
    }

    this.getList()
  },
  methods: {
    async getList() {
      this.dataLoading = true

      const response = await fetchNoticeList(this.listQuery)

      this.list = response.list
      console.log('this.list  ' + JSON.stringify(this.list));
      this.totCnt = response.totCnt

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    handleExcel() {
      this.$router.push({ path: '/mcht/excel' })
    },
    handleCreate() {
      this.drawerInfo.confirmType = 'add'
      this.drawerInfo.editMchtCd = ''
      this.drawerInfo.title = this.$t('title.noticeInsert')
      this.drawerInfo.rightDrawer = true
    },
    handleEdit(row) {
      this.drawerInfo.confirmType = 'edit'
      this.drawerInfo.editMchtCd = row
      this.drawerInfo.title = this.$t('title.noticeEdit')
      this.drawerInfo.rightDrawer = true
    },
    handleDelete(id) {
      this.confirmLoading = true
      this.$confirm(this.$t('message.deleteConfirm'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        deleteNotice(id).then(response => {
          this.confirmLoading = false
          this.$message.success(this.$t('message.success'))
          this.getList()
        }).catch(() => {
          this.confirmLoading = false
        })
      }).catch(() => {
        this.confirmLoading = false
      })
    },
    handleDrawerClose() {
      this.drawerInfo.rightDrawer = false
      this.getList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
