const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  id: state => state.user.id,
  name: state => state.user.name,
  roles: state => state.user.roles,
  roleInfo: state => state.user.roleInfo,
  mchtFncDiv: state => state.user.mchtFncDiv,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
