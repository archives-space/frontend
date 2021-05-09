export default (_, inject) => {
  let snackbarsInterface = null
  inject('testGlobal', (a, b) => {
    return a + b
  })
  inject('setSnackbars', val => {
    snackbarsInterface = val
  })
  inject('snackbars', () => {
    return snackbarsInterface
  })
  inject('pushSnackbar', (color, text) => {
    snackbarsInterface.add({ color, text })
  })
}
