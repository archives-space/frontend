export default {
  roleColor (role) {
    switch (role) {
      case 'ROLE_CONFIRMED':
        return 'green'
      case 'ROLE_MODERATOR':
        return 'purple'
      case 'ROLE_ADMIN':
        return ''
      case 'ROLE_DEVELOPER':
        return 'primary'
      default:
        return ''
    }
  }
}
