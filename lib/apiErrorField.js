export default function (apiErrors, path, _ = '') {
  const errors = apiErrors.filter(e => e.path === path)
  if (errors.length === 0) {
    return true
  }
  return errors[0].message
}
