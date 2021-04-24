export default (_, inject) => {
  // Generate a random alphanumerical ID
  inject('generateId', () => Math.random().toString(36).substring(7) + '_' + Date.now().toString())
}
