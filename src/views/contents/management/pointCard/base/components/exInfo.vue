<template>
  <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 세번째 폼 -->
  <el-form :model="createInfo" label-position="left" label-width="175px">

    <!--
    <el-form-item :label="$t('pointCard.pitExiDiv')">
      <el-row type="flex" justify="start">
        <el-select v-model="createInfo.pitExiDiv" :disabled="editForm" style="width: 180px" class="filter-item" @change="pitExiDivChange">
          <el-option v-for="item in pitExiDivOptions" :key="item.key" :label="item.name" :value="item.key"/>
        </el-select>
    -->
    <!--
        <el-input
          v-if="createInfo.pitExiDiv !== 'PRMT'"
          v-model="createInfo.pitExiDivData"
          style="width: 200px; margin-left: 10px;"/>
        -->
    <!--
      </el-row>
    </el-form-item>
    -->
    <el-form-item>
      <div slot="label">
        <span>{{ $t('pointCard.vldPrdDiv') }}</span>
        <el-tooltip effect="light" placement="top-start">
          <template slot="content">
            <div v-html="$t('pointCard.guide.vldPrdDiv')"/>
          </template>
          <i class="el-icon-chat-dot-round tip_icon_align"/>
        </el-tooltip>
      </div>

      <el-row type="flex" justify="start">
        <el-select v-model="createInfo.vldPrdDiv" :disabled="editForm || createInfo.pitExiDiv === 'RESET'" style="width: 180px" class="filter-item">
          <el-option :label="vldPrdDivOptions[0].name" :value="vldPrdDivOptions[0].key"/>
          <el-option :label="vldPrdDivOptions[1].name" :value="vldPrdDivOptions[1].key"/>
          <el-option :label="vldPrdDivOptions[2].name" :value="vldPrdDivOptions[2].key"/>
          <!--<el-option :label="vldPrdDivOptions[3].name" :value="vldPrdDivOptions[3].key"/>-->
        </el-select>

        <el-input-number
          v-model="createInfo.vldPrdVal"
          :disabled="editForm"
          :max="99999999"
          :min="0"
          :precision="0"
          :controls="false"
          style="width: 200px; margin-left: 10px;"/>
      </el-row>
    </el-form-item>

  </el-form>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'

const pitExiDivOptions = [
  { key: 'PRMT', name: i18n.t('pointCard.pitExiDivOptions.prmt') },
  { key: 'RESET', name: i18n.t('pointCard.pitExiDivOptions.reset') },
  { key: 'NONE', name: i18n.t('pointCard.pitExiDivOptions.none') }
]

const vldPrdDivOptions = [
  // { key: 'NONE', name: i18n.t('pointCard.vldPrdDivOptions.none') },
  { key: 'DAY', name: i18n.t('pointCard.vldPrdDivOptions.day') },
  { key: 'MON', name: i18n.t('pointCard.vldPrdDivOptions.month') },
  { key: 'YEAR', name: i18n.t('pointCard.vldPrdDivOptions.year') }
]

export default {
  name: 'ExInfo',
  directives: { waves },
  components: { },
  filters: { },
  props: {
    createInfo: {
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
      vldPrdDivOptions,
      pitExiDivOptions
    }
  },
  watch: { },
  created() { },
  mounted() { },
  methods: {
    pitExiDivChange() {
      this.createInfo.vldPrdVal = undefined
      switch (this.createInfo.pitExiDiv) {
        case 'PRMT': // 선입 선출
          this.createInfo.vldPrdDiv = ''
          break
        case 'RESET': // 초기화
          this.createInfo.vldPrdDiv = 'YEAR'
          break
        case 'NONE': // 없음
          this.createInfo.vldPrdDiv = 'NONE'
          break
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
</style>
