<template>
  <div class="has-head-container">
    <div class="app-container">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item v-for="item in customerTab " :key="item.key" :index="item.key">
          <svg-icon :icon-class="item.icon" class-name="card-panel-icon"/>
          {{ item.name }}
        </el-menu-item>
      </el-menu>

      <component :is="navComponents"/>
    </div>
  </div>
</template>

<script>
import i18n from '@/lang'
import waves from '@/directive/waves'
import accuStatistic from '@/views/contents/statistic/tabComponents/accuStatistic'
import useStatistic from '@/views/contents/statistic/tabComponents/useStatistic'
import custStatistic from '@/views/contents/statistic/tabComponents/custStatistic'
import mchtCustStatistic from '@/views/contents/statistic/tabComponents/mchtCustStatistic'

export default {
  name: 'Statistic',
  directives: { waves },
  components: {
    accuStatistic,
    useStatistic,
    custStatistic,
    mchtCustStatistic
  },
  data() {
    return {
      activeName: 'first',
      customerTabGbn: '',
      activeIndex: '',
      navComponents: null,
      accuComponent: accuStatistic,
      useComponent: useStatistic,
      custComponent: custStatistic,
      mchtCustComponent: mchtCustStatistic,
      customerTab: []
    }
  },
  created() {
    this.checkPermission()
  },
  methods: {
    handleSelect(key) {
      this.navComponents = key
    },
    checkPermission() {
      if (this.$store.getters.roles.length > 0) {
        switch (this.$store.getters.roles[0].authority) {
          case 'ADMIN':
            console.log('총괄 통계')
            this.customerTab = [
              { key: 'accuStatistic', name: i18n.t('statistic.tab.accuStatistic'), icon: 'list' },
              { key: 'useStatistic', name: i18n.t('statistic.tab.useStatistic'), icon: 'shopping' },
              { key: 'custStatistic', name: i18n.t('statistic.tab.custStatistic'), icon: 'peoples' }
            ]
            this.customerTabGbn = 'accuStatistic'
            this.activeIndex = 'accuStatistic'
            this.navComponents = this.accuComponent
            break
          case 'ORG':
            console.log('운영사 통계')
            this.customerTab = [
              { key: 'accuStatistic', name: i18n.t('statistic.tab.accuStatistic'), icon: 'list' },
              { key: 'useStatistic', name: i18n.t('statistic.tab.useStatistic'), icon: 'shopping' },
              { key: 'custStatistic', name: i18n.t('statistic.tab.custStatistic'), icon: 'peoples' }
            ]
            this.customerTabGbn = 'accuStatistic'
            this.activeIndex = 'accuStatistic'
            this.navComponents = this.accuComponent
            break
          case 'MCHT':
            console.log('제휴사 통계')

            if (this.$store.getters.mchtFncDiv === 'ALL') {
              this.customerTab = [
                { key: 'accuStatistic', name: i18n.t('statistic.tab.accuStatistic'), icon: 'list' },
                { key: 'useStatistic', name: i18n.t('statistic.tab.useStatistic'), icon: 'shopping' },
                { key: 'mchtCustStatistic', name: i18n.t('statistic.tab.custStatistic'), icon: 'peoples' }
              ]
              this.customerTabGbn = 'accuStatistic'
              this.activeIndex = 'accuStatistic'
              this.navComponents = this.accuComponent
            } else if (this.$store.getters.mchtFncDiv === 'ACCU') {
              this.customerTab = [
                { key: 'accuStatistic', name: i18n.t('statistic.tab.accuStatistic'), icon: 'list' },
                { key: 'mchtCustStatistic', name: i18n.t('statistic.tab.custStatistic'), icon: 'peoples' }
              ]
              this.customerTabGbn = 'accuStatistic'
              this.activeIndex = 'accuStatistic'
              this.navComponents = this.accuComponent
            } else if (this.$store.getters.mchtFncDiv === 'USE') {
              this.customerTab = [
                { key: 'useStatistic', name: i18n.t('statistic.tab.useStatistic'), icon: 'shopping' },
                { key: 'mchtCustStatistic', name: i18n.t('statistic.tab.custStatistic'), icon: 'peoples' }
              ]
              this.customerTabGbn = 'useStatistic'
              this.activeIndex = 'useStatistic'
              this.navComponents = this.useComponent
            }
            break
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
