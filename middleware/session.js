export default function ({ app, store }) {
  if (store.state.isAuthenticated) {
    app.$http.setToken(store.state.userToken, 'Bearer')
  }
}
