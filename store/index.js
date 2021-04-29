import jwtDecode from 'jwt-decode'

const defaultUser = {
  id: '',
  username: '',
  email: '',
  roles: ''
}

export const state = () => ({
  title: '',
  isAuthenticated: false,
  user: defaultUser,
  userToken: ''
})

export const mutations = {
  SET_TITLE (state, payload) {
    state.title = payload
    if (typeof document !== 'undefined') {
      document.title = payload + ' - Wikiarchives.space'
    }
  },
  SET_AUTH (state, payload) {
    state.isAuthenticated = payload
  },
  LOGOUT (state) {
    state.isAuthenticated = false
    state.user = defaultUser
    state.userToken = ''
  },
  LOAD_USER (state, token) {
    const user = jwtDecode(token).user
    state.userToken = token
    state.isAuthenticated = true
    state.user = {
      ...state.user,
      ...user
    }
    console.log('User data:', user)
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { app }) {
    const token = app.$cookies.get('wikiArchiveUserToken')
    if (token !== undefined && token !== null) {
      commit('LOAD_USER', token)
    }
  }
}
