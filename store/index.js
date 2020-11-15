export const state = () => ({
  title: '',
  alert: {
    type: '',
    title: '',
    description: '',
    enabled: false
  }
})

export const mutations = {
  SET_TITLE (state, payload) {
    state.title = payload
  },
  ADD_ALERT (state, payload) {
    state.alert = {
      type: payload.type,
      title: payload.title,
      description: payload.description,
      enabled: true
    }
  },
  REMOVE_ALERT (state) {
    state.alert = {
      type: '',
      title: '',
      description: '',
      enabled: false
    }
  }
}

// export const actions = {
//   nuxtServerInit({ commit }, { req }) {
//     if (
//       req.cookies !== undefined &&
//       req.cookies.user_token !== undefined &&
//       req.cookies.user_token !== null
//     ) {
//         commit('LOAD_USER', req.cookies.user_token)
//     }
//   }
// };
