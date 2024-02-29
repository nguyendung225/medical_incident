export const hasAuthority = (permission: string): boolean => {
  const authoritiesString = localStorage.getItem('authorities')
  const authorities = authoritiesString ? JSON.parse(authoritiesString) : {}
  return authorities[permission]
}
