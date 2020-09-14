module.exports = {
  title: 'Echoss Point Service',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   * 해당 옵션을 true 값을 주면 Sticky 컴포넌트의 위치가 고정되지 않음.
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'production',

  /**
   * @type { array } ['List', 'list']
   * @description Vue Template을 Keep Alive를 통해서 상태를 저장하는데
   * 저장할 url 패턴을 설정
   * ex) 'List', 'list' 를 포함하는 url은 템플릿을 캐싱한다.
   * -> TagsView를 통해 페이지의 상태를 복원하지 못함
   * 라우터에서 meta에 noCache: true값을 지정하여 따로 캐싱 설정이 가능하다.
   */
  saveTagKeywords: []
}
