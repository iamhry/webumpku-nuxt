import { galleryService } from '~/services/gallery'

export const useGallery = () => {
  const { locale } = useLocale()

  const fetchHomepageGallery = (limit: number = 12) => {
    return useAsyncData(`homepage-gallery-${locale.value}-${limit}`, () => {
      return galleryService.getHomepageGallery(limit)
    })
  }

  return {
    fetchHomepageGallery
  }
}
