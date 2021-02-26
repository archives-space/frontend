export default function (context, token) {
  console.log('New login with token: ', token)
  context.$cookie.set('wikiArchiveUserToken', token)
  context.$store.commit('LOAD_USER', token)
  context.$router.push('/account')
}
