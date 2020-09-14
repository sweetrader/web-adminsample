<template>
  <div>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      {{ $t('message.dragExcelFile') }}
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
        {{ $t('btn.excelUpload') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      },
      // 띄어쓰기 제거하고 비교
      dictionary: [
        { ko: '제휴사명', en: 'mchtNm', key: 'mchtNm' },
        { ko: '운영상태', en: 'st', key: 'st' },
        { ko: '제휴사관리코드', en: 'mchtMgmtCd', key: 'mchtMgmtCd' },
        { ko: '전화번호', en: 'telNo', key: 'telNo' },
        { ko: '주소', en: 'addr', key: 'addr' },
        { ko: '이용처구분', en: 'baseFncDiv', key: 'baseFncDiv' }
      ]
    }
  },
  methods: {
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error(this.$t('message.onlySupportOne'))
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isExcel(rawFile)) {
        this.$message.error(this.$t('message.acceptableExcelFile'))
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]

          // 헤더 변경 로직 추가
          this.changeWord(worksheet)

          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },
    changeWord(worksheet) {
      if (worksheet['!ref'].indexOf('F') !== -1) {
        // 제휴사 명
        worksheet.A1.h = this.findWord(worksheet.A1.w)
        worksheet.A1.r = '<t>' + this.findWord(worksheet.A1.w) + '</t>'
        worksheet.A1.v = this.findWord(worksheet.A1.w)
        worksheet.A1.w = this.findWord(worksheet.A1.w)
        // 운영 상태
        worksheet.B1.h = this.findWord(worksheet.B1.w)
        worksheet.B1.r = '<t>' + this.findWord(worksheet.B1.w) + '</t>'
        worksheet.B1.v = this.findWord(worksheet.B1.w)
        worksheet.B1.w = this.findWord(worksheet.B1.w)
        // 제휴사 관리 코드
        worksheet.C1.h = this.findWord(worksheet.C1.w)
        worksheet.C1.r = '<t>' + this.findWord(worksheet.C1.w) + '</t>'
        worksheet.C1.v = this.findWord(worksheet.C1.w)
        worksheet.C1.w = this.findWord(worksheet.C1.w)
        // 전화번호
        worksheet.D1.h = this.findWord(worksheet.D1.w)
        worksheet.D1.r = '<t>' + this.findWord(worksheet.D1.w) + '</t>'
        worksheet.D1.v = this.findWord(worksheet.D1.w)
        worksheet.D1.w = this.findWord(worksheet.D1.w)
        // 주소
        worksheet.E1.h = this.findWord(worksheet.E1.w)
        worksheet.E1.r = '<t>' + this.findWord(worksheet.E1.w) + '</t>'
        worksheet.E1.v = this.findWord(worksheet.E1.w)
        worksheet.E1.w = this.findWord(worksheet.E1.w)
        // 이용처 구분
        worksheet.F1.h = this.findWord(worksheet.F1.w)
        worksheet.F1.r = '<t>' + this.findWord(worksheet.F1.w) + '</t>'
        worksheet.F1.v = this.findWord(worksheet.F1.w)
        worksheet.F1.w = this.findWord(worksheet.F1.w)
      }
    },
    findWord(hdr) {
      if (this.$store.getters.language === 'ko') {
        for (let i = 0; i < this.dictionary.length; i++) {
          if (this.dictionary[i].ko === hdr.replace(/ /gi, '')) {
            return this.dictionary[i].key
          }
        }
      } else if (this.$store.getters.language === 'en') {
        for (let i = 0; i < this.dictionary.length; i++) {
          if (this.dictionary[i].en === hdr.replace(/ /gi, '')) {
            return this.dictionary[i].key
          }
        }
      }

      return hdr
    }
  }
}
</script>

<style scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
