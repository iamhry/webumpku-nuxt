import { pagesService } from '~/services/pages'
import type { PageDetail } from '~/types/page'
import { useI18n } from 'vue-i18n'
import { useAsyncData } from '#app'

export const usePages = () => {
  const { locale } = useLocale()

  const fetchPageDetail = async (slug: string) => {
    return useAsyncData<PageDetail>(
      `page-${slug}-${locale.value}`,
      () => pagesService.getPageDetail(slug, locale.value)
    )
  }

  return {
    fetchPageDetail
  }
}
