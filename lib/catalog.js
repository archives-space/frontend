function generatePath (catalog) {
  const breadcrumbs = []
  let path = ''
  catalog.breadcrumbs.forEach(item => {
    if (item.slug === 'root') {
      breadcrumbs.push({
        text: 'Home',
        slug: 'root',
        disabled: false,
        href: '/'
      })
      return
    }
    path += catalog.slug === 'root' ? '/' : '/' + item.slug
    breadcrumbs.push({
      text: item.title,
      slug: item.slug,
      href: '/catalog/' + item.id + path,
      path
    })
  })
  //console.log(JSON.parse(JSON.stringify(breadcrumbs)))
  const last = breadcrumbs[breadcrumbs.length - 1]
  last.disabled = true
  breadcrumbs[breadcrumbs.length - 1] = last
  path = breadcrumbs[breadcrumbs.length - 1].path

  return { breadcrumbs, path }
}

export {
  generatePath
}
