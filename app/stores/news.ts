import { defineStore } from 'pinia'
import type { NewsArticle } from '~/types/news'

export const useNewsStore = defineStore('news', {
  state: () => ({
    articles: [] as NewsArticle[],
    currentArticle: null as NewsArticle | null,
    meta: { current_page: 1, last_page: 1, total: 0 },
    loading: false,
    error: null as string | null,
  }),
  actions: {
    setArticles(data: NewsArticle[], meta: any) {
      this.articles = data
      if (meta) this.meta = meta
    },
    setCurrentArticle(article: NewsArticle | null) {
      this.currentArticle = article
    },
    setLoading(status: boolean) {
      this.loading = status
    },
    setError(err: string | null) {
      this.error = err
    }
  }
})
