/**
 * 커스텀 전역 플러그인 추가(main.js 선언)
 * 2019-09-05 텍스트, 태그 필터 추가
 * 존재하지 않는 key값은 빈값으로 표시됨
 */

import Vue from 'vue'
var filterPlugin = {}
filterPlugin.install = function(Vue) {
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 전역함수 방식
  /**
   * 텍스트 필터링
   * @param {String} key
   * @param {Array} options
   * 옵션은 배열 객체형태로 객체는 key, name, tag 속성을 가진다.
   * @return {String}
   */
  Vue.prototype.$applyTextFilter = (key, options) => {
    const textValue = options.reduce((acc, cur) => {
      acc[cur.key] = cur.name
      return acc
    }, {})
    return textValue[key]
  }

  /**
   * 태그 필터링
   * @param {String} key
   * @param {Array} options
   * 옵션은 배열 객체형태로 객체는 key, name, tag 속성을 가진다.
   * @return {String}
   */
  Vue.prototype.$applyTagFilter = (key, options) => {
    const tagValue = options.reduce((acc, cur) => {
      acc[cur.key] = cur.tag
      return acc
    }, {})
    return tagValue[key]
  }
}
Vue.use(filterPlugin)
export default filterPlugin
