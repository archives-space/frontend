export default (app, inject) => {
  inject('copyTextDialog', (func, text) => {
    console.log(func)
    const container = document.querySelector('.v-dialog')
    func(text, container).then(function (e) {
      console.log('copied text! ', e)
    }, function (e) {
      console.log('error while coping text! ', e)
    })
  })
}
