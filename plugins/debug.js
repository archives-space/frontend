export default (app, _) => {
  window.getUser = () => {
    return JSON.stringify(app.store.state.user)
  }
  window.getUserToken = () => {
    return app.store.state.userToken
  }
}
