export const getCookie = (cookies: string, key: string) => {
  if (!cookies) return null
  const match = cookies.match(new RegExp(`(^| )${key}=([^;]+)`))
  return match ? match[2] : null
}
