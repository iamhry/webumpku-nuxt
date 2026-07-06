export const useMedia = () => {
  const config = useRuntimeConfig()
  
  const getImageUrl = (path?: string | null): string => {
    if (!path) return '/assets/img/logo.png' // Fallback image
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }
    const storageUrl = config.public.storageUrl || ''
    // ensure no double slashes, but keep standard root if storageUrl is empty
    const baseUrl = storageUrl.replace(/\/$/, '')
    const imagePath = path.replace(/^\//, '')
    return baseUrl ? `${baseUrl}/${imagePath}` : `/${imagePath}`
  }

  const getFileUrl = (path?: string | null): string => {
    if (!path) return ''
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }
    const storageUrl = config.public.storageUrl || ''
    const baseUrl = storageUrl.replace(/\/$/, '')
    const filePath = path.replace(/^\//, '')
    return baseUrl ? `${baseUrl}/${filePath}` : `/${filePath}`
  }

  const getStorageUrl = (path?: string | null): string => {
    return getFileUrl(path)
  }

  return {
    getImageUrl,
    getFileUrl,
    getStorageUrl
  }
}
