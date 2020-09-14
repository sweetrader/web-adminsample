import { login, getInfo, getMcht } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  id: '',
  name: '',
  roles: [],
  roleInfo: '',
  mchtFncDiv: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROLE_INFO: (state, roleInfo) => {
    state.roleInfo = roleInfo
  },
  SET_MCHT_FNC_DIV: (state, mchtFncDiv) => {
    state.mchtFncDiv = mchtFncDiv
  }
}

const actions = {
  // 로그인
  login({ commit }, userInfo) {
    const { username, password, isSaveId } = userInfo
    const id = username.trim()
    if (isSaveId) {
      Cookies.set('savePortalId', id)
    }
    return new Promise((resolve, reject) => {
      login(id, password).then(response => {
        commit('SET_TOKEN', response.accessToken)
        setToken(response.accessToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 유저 정보 체크 및 세팅
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        commit('SET_ID', response.username) // 아이디
        commit('SET_NAME', response.mngNm) // 이름
        commit('SET_ROLES', response.authorities) // 권한 목록
        commit('SET_ROLE_INFO', response.ruleInfo) // 권한 정보
        response.roles = []
        response.authorities.forEach(role => {
          response.roles.push(role.authority)
        })

        // MCHT 권한의 경우 FNC_DIV 값이 필요
        if (response.roles[0] === 'MCHT') {
          getMcht(response.ruleInfo).then(mcht => {
            commit('SET_MCHT_FNC_DIV', mcht.baseFncDiv)
            resolve(response)
          }).catch(error => {
            console.log(error)
            commit('SET_MCHT_FNC_DIV', '')
          })
        } else {
          commit('SET_MCHT_FNC_DIV', '')
          resolve(response)
        }
      }).catch(error => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_ROLE_INFO', '')
        commit('SET_MCHT_FNC_DIV', '')
        removeToken()
        resetRouter()
        reject(error)
      })
    })
  },

  // 로그아웃
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_ROLE_INFO', '')
      commit('SET_MCHT_FNC_DIV', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // 토큰 삭제
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_ROLE_INFO', '')
      commit('SET_MCHT_FNC_DIV', '')
      removeToken()
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
