import { computed } from 'vue'
import { useNewsStore } from '~/stores/news'
import { newsService } from '~/services/news'
import type { NewsArticle } from '~/types/news'

const fallbackNewsList: NewsArticle[] = [
    { id: 1, title: 'Fallback News 1', slug: 'fallback-news-1', excerpt: 'This is a dynamically rendered fallback excerpt.', content: '<p>Fallback content</p>', featured_image: '/assets/img/blog/1.jpg', published_at: '2026-06-14' },
    { id: 2, title: 'Fallback News 2', slug: 'fallback-news-2', excerpt: 'This is a dynamically rendered fallback excerpt 2.', content: '<p>Fallback content 2</p>', featured_image: '/assets/img/blog/2.jpg', published_at: '2026-06-13' }
]

export const useNews = () => {
  const newsStore = useNewsStore()

  const fetchNewsList = async (page: number = 1) => {
    newsStore.setLoading(true)
    newsStore.setError(null)

    const { data, error } = await useAsyncData(`news-list-${page}`, () => newsService.getNews(page))

    if (data.value && data.value.data) {
      newsStore.setArticles(data.value.data, data.value.meta)
    } else {
      newsStore.setArticles(fallbackNewsList, { current_page: 1, last_page: 1, total: 2 })
    }

    newsStore.setLoading(false)
  }

  const fetchNewsDetail = async (slug: string) => {
    newsStore.setLoading(true)
    newsStore.setError(null)

    const { data, error } = await useAsyncData(`news-detail-${slug}`, () => newsService.getNewsBySlug(slug))

    if (data.value && data.value.news) {
      const article = data.value.news
      if (data.value.related_news) {
        article.related_news = data.value.related_news
      }
      newsStore.setCurrentArticle(article)
    } else if (error.value?.statusCode === 404) {
      newsStore.setCurrentArticle(null)
      newsStore.setError('News Not Found')
    } else {
      newsStore.setCurrentArticle({ ...fallbackNewsList[0], slug, title: `Fallback News: ${slug}` })
    }

    newsStore.setLoading(false)
  }

  return {
    articles: computed(() => newsStore.articles),
    currentArticle: computed(() => newsStore.currentArticle),
    meta: computed(() => newsStore.meta),
    loading: computed(() => newsStore.loading),
    error: computed(() => newsStore.error),
    fetchNewsList,
    fetchNewsDetail
  }
}
