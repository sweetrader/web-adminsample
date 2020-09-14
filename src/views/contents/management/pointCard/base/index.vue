<template>
  <div v-loading="dataLoading" class="has-head-container">

    <sticky :class-name="'sub-navbar'">
      <el-row type="flex" align="middle" justify="space-between">
        <p>{{ $t('title.pointCardMng') }}</p>
      </el-row>
    </sticky>

    <div class="app-container">
      <div class="filter-container">
        <el-row class="filter-item">
          <!-- 운영사 명 -->
          <el-input
            v-if="$store.getters.roles.length > 0 && $store.getters.roles[0].authority !== 'ORG'"
            v-model="listQuery.orgNm"
            :placeholder="$t('placeholder.orgNm')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!-- 포인트 카드 명 -->
          <el-input
            v-model="listQuery.pitCardNm"
            :placeholder="$t('placeholder.pointCardNm')"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="getList"/>

          <!-- 적립 방법 -->
          <el-select v-model="listQuery.accuDiv" :placeholder="$t('pointCard.accuDiv')" clearable style="width: 80px" class="filter-item">
            <el-option v-for="item in accuDivOptions" :key="item.key" :label="item.name" :value="item.key"/>
          </el-select>

          <!-- 상태코드 -->
          <el-select v-model="listQuery.st" :placeholder="$t('pointCard.status')" clearable style="width: 100px" class="filter-item">
            <el-option v-for="item in statusOptions" :key="item.key" :label="item.name" :value="item.key"/>
          </el-select>

          <!-- 날짜 -->
          <el-date-picker
            v-model="listQuery.searchDt"
            :start-placeholder="$t('pointCard.sttDt')"
            :end-placeholder="$t('pointCard.endDt')"
            class="filter-item"
            type="daterange"/>

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

      <!-- 20.01.21 임시저장 리스트 추가 -->
      <div v-if="tempList && tempList.length > 0" class="temp_list_area">
        <el-collapse>
          <el-collapse-item :title="$t('pointCard.tempList')">
            <!-- tempList 테이블 -->
            <el-table :data="tempList" border style="min-width: 100%">
              <el-table-column :label="$t('pointCard.no')" align="center" width="80">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('pointCard.org')" align="center" min-width="100">
                <template slot-scope="scope">
                  <span>{{ orgTextFilter(scope.row.createInfo.orgCd) }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('pointCard.pitCardNm')" align="center" min-width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.createInfo.pitCardNm }}</span>
                </template>
              </el-table-column>

              <el-table-column :label="$t('pointCard.action')" align="center" width="160">
                <template slot-scope="scope">
                  <el-button
                    v-waves
                    class="filter-item"
                    type="success"
                    @click="writeTempListData(scope.$index)">
                    {{ $t('btn.write') }}
                  </el-button>

                  <el-button
                    v-waves
                    class="filter-item"
                    type="danger"
                    @click="deleteTempListData(scope.$index)">
                    {{ $t('btn.delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-collapse-item>
        </el-collapse>
      </div>

      <el-table :data="list" border style="max-width: 1500px !important;">
        <el-table-column :label="$t('pointCard.no')" align="center" width="80">
          <template slot-scope="scope">
            <span>{{ totCnt - (scope.$index + (listQuery.pageSize * (listQuery.pageIdx-1))) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.pitCardFixNo')" align="center" min-width="160">
          <template slot-scope="scope">
            <span class="edit_button" @click="handleEdit(scope.row)">
              {{ scope.row.pitCardFixNo }}
            </span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.pitCardNm')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.pitCardNm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.org')" align="center" min-width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.orgNm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.mchtCnt')" align="center" min-width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.mchtCnt }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.accuDiv')" align="center" min-width="100">
          <template slot-scope="scope">
            <el-tag :type="$applyTagFilter(scope.row.accuDiv, accuDivOptions)">
              {{ $applyTextFilter(scope.row.accuDiv, accuDivOptions) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.prdSet')" align="center" min-width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.sttDt && scope.row.endDt">{{ scope.row.sttDt + ' ~ ' + scope.row.endDt }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.status')" align="center" width="100">
          <template slot-scope="scope">
            <el-tag :type="$applyTagFilter(scope.row.st, statusOptions)">
              {{ $applyTextFilter(scope.row.st, statusOptions) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.regDttm')" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.regDttm }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('pointCard.regId')" align="center" min-width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.regId }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="totCnt>0" :total="totCnt" :page.sync="listQuery.pageIdx" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    </div>
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import Sticky from '@/components/Sticky'
import { fetchSearchPointCardList } from '@/api/pointCard'
import { fetchSearchOrgList } from '@/api/org'

const statusOptions = [
  { key: 'OK', name: i18n.t('pointCard.statusOptions.ok'), tag: 'success' },
  { key: 'CLOSE', name: i18n.t('pointCard.statusOptions.close'), tag: 'danger' }
]

const accuDivOptions = [
  { key: 'RT', name: i18n.t('pointCard.accuDivOptions.rt'), tag: '' },
  { key: 'FLAT', name: i18n.t('pointCard.accuDivOptions.flat'), tag: 'success' },
  { key: 'FIX', name: i18n.t('pointCard.accuDivOptions.fix'), tag: 'info' }
]

export default {
  name: 'PointCardManagement',
  directives: { waves },
  components: { Sticky, Pagination },
  data() {
    return {
      dataLoading: false,
      listQuery: {
        orgCd: '',
        orgNm: '',
        mchtCd: '',
        pitCardNm: '',
        accuDiv: '',
        st: '',
        searchSt: '',
        regStDttm: '',
        regEndDttm: '',
        pageIdx: 1,
        pageSize: 20
      },
      totCnt: 0,
      list: null,
      orgList: null,
      tempList: null,
      statusOptions,
      accuDivOptions
    }
  },
  computed: {
    orgTextFilter() {
      return (orgCd) => {
        const nameValue = this.orgList.reduce((acc, cur) => {
          acc[cur.orgCd] = cur.orgNm
          return acc
        }, {})
        return nameValue[orgCd]
      }
    }
  },
  created() {
    // 운영사 계정의 경우 운영사 고정
    if (this.$store.getters.roles[0].authority === 'ORG') {
      // 계정에 어느 운영사인지 세팅이 된다면 추가
      this.listQuery.orgCd = this.$store.getters.roleInfo
    } else if (this.$store.getters.roles[0].authority === 'MCHT') {
      this.listQuery.mchtCd = this.$store.getters.roleInfo
    }

    this.getList()
  },
  methods: {
    async getList() {
      this.dataLoading = true

      if (this.listQuery.searchDt) {
        this.listQuery.regStDttm = this.format_date_yyyymmdd(this.listQuery.searchDt[0])
        this.listQuery.regEndDttm = this.format_date_yyyymmdd(this.listQuery.searchDt[1])
      } else {
        this.listQuery.regStDttm = ''
        this.listQuery.regEndDttm = ''
      }

      const response = await fetchSearchPointCardList(this.listQuery)

      // 날짜 형식 변경
      for (let i = 0; i < response.list.length; i++) {
        if (response.list[i].sttDt) {
          response.list[i].sttDt = response.list[i].sttDt.substr(0, 4) + '-' + response.list[i].sttDt.substr(4, 2) + '-' + response.list[i].sttDt.substr(6, 2)
        }
        if (response.list[i].endDt) {
          response.list[i].endDt = response.list[i].endDt.substr(0, 4) + '-' + response.list[i].endDt.substr(4, 2) + '-' + response.list[i].endDt.substr(6, 2)
        }
      }

      this.list = response.list
      this.totCnt = response.totCnt

      // 운영사 필터용 리스트
      const param = {
        st: 'OK',
        pageIdx: 1,
        pageSize: 9999
      }
      const orgResponse = await fetchSearchOrgList(param)

      this.orgList = orgResponse.list

      this.getTempList()

      setTimeout(() => {
        this.dataLoading = false
      }, 300)
    },
    handleCreate() {
      this.$router.push({ path: '/pointCard/create' })
    },
    handleEdit(row) {
      this.$router.push({ path: '/pointCard/edit?pitCardFixNo=' + row.pitCardFixNo })
    },
    format_date_yyyymmdd(inputDate) {
      const y = inputDate.getFullYear()
      const m = inputDate.getMonth() + 1
      const d = inputDate.getDate()
      const mm = m < 10 ? '0' + m : m
      const dd = d < 10 ? '0' + d : d
      return '' + y + mm + dd
    },
    getTempList() {
      if (localStorage.getItem('tempList')) {
        this.tempList = JSON.parse(localStorage.getItem('tempList'))
      }
    },
    writeTempListData(index) {
      this.$router.push({ path: '/pointCard/create?n=' + index })
    },
    deleteTempListData(index) {
      this.$confirm(this.$t('message.deleteConfirm'), {
        confirmButtonText: this.$t('btn.confirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning'
      }).then(() => {
        this.tempList.splice(index, 1)
        localStorage.removeItem('tempList')
        localStorage.setItem('tempList', JSON.stringify(this.tempList))
      }).catch(() => {
        this.confirmLoading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.temp_list_area {
  width: 800px;
  margin-bottom: 30px;
  .el-collapse-item__header {
    padding-left: 20px;
  }
}
</style>
