<template>
  <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 네번째 폼 -->
  <el-form :model="createInfo" label-position="left" label-width="175px">
    <!-- 제휴처 별 정산률 -->
    <el-form-item>
      <div slot="label">
        <span>{{ $t('pointCard.calcDiffDiv') }}</span>
        <el-tooltip effect="light" placement="top-start">
          <template slot="content">
            <div v-html="$t('pointCard.guide.calcDiffDiv')"/>
          </template>
          <i class="el-icon-chat-dot-round tip_icon_align"/>
        </el-tooltip>
      </div>

      <el-radio-group v-model="createInfo.calcDiffDiv" @change="changeMchtDiff()">
        <el-radio-button v-for="item in calcDiffOptions" :key="item.name" :label="item.key">{{ item.name }}</el-radio-button>
      </el-radio-group>
    </el-form-item>

    <!-- 정산률 동일 입력 폼 -->
    <div v-if="createInfo.calcDiffDiv === 'N'">
      <el-divider/>

      <el-form-item v-if="createInfo.calcDiffDiv === 'N'" :label="$t('pointCard.mchtCalc')">
        <div class="number_placeholder_wrapper" style="justify-content: flex-start !important; margin: 0 !important;">
          <el-input-number
            v-model="temp.tempMchtCalc"
            style="width: 160px; margin-left: 5px;"
            :max="100"
            :min="0"
            :precision="2"
            :controls="false"/>
        </div>
      </el-form-item>

      <el-divider/>

      <el-form-item v-if="createInfo.calcDiffDiv === 'N'" :label="$t('pointCard.useCalc')">
        <div class="number_placeholder_wrapper" style="justify-content: flex-start !important; margin: 0 !important;">

          <el-input-number
            v-model="temp.tempUseCalc"
            style="width: 160px; margin-left: 5px;"
            :max="100"
            :min="0"
            :precision="2"
            :controls="false"/>
        </div>
      </el-form-item>
    </div>

    <!-- 제휴처 리스트 들 -->
    <div v-if="createInfo.calcDiffDiv === 'Y'">
      <el-divider/>

      <el-form-item :label="$t('pointCard.mchtCalc')">
        <div v-for="(item, i) in createInfo.accuMchtList" :key="i">
          <div class="number_placeholder_wrapper" style="justify-content: flex-start !important;">
            <el-input v-model="item.mchtNm" disabled style="width: 160px; margin-right: 5px;"/>

            <el-input-number
              v-model="item.mchtCalc"
              style="width: 160px; margin-left: 5px;"
              :max="100"
              :min="0"
              :precision="2"
              :disabled="createInfo.calcDiffDiv === 'N'"
              :controls="false"/>
          </div>
        </div>
      </el-form-item>

      <!-- 사용처 리스트들 -->
      <el-divider/>

      <el-form-item :label="$t('pointCard.useCalc')">
        <div v-for="(item, i) in createInfo.useMchtList" :key="i">
          <div class="number_placeholder_wrapper" style="justify-content: flex-start !important;">
            <el-input v-model="item.mchtNm" disabled style="width: 160px; margin-right: 5px;"/>

            <el-input-number
              v-model="item.useCalc"
              style="width: 160px; margin-left: 5px;"
              :max="100"
              :min="0"
              :precision="2"
              :disabled="createInfo.calcDiffDiv === 'N'"
              :controls="false"/>
          </div>
        </div>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'

const calcDiffOptions = [
  { key: 'Y', name: i18n.t('pointCard.calcDiffOptions.y') },
  { key: 'N', name: i18n.t('pointCard.calcDiffOptions.n') }
]

export default {
  name: 'CalcInfo',
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
      calcDiffOptions
    }
  },
  watch: { },
  created() {

  },
  mounted() { },
  methods: {
    changeMchtDiff() {
      console.log(this.createInfo)
      // 정산률 초기화
    },
    checkCalcData() {
      // 인풋 동일값 처리
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
