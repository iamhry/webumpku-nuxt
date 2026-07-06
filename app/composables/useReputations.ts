import { useReputationService } from '~/services/reputation'
import { useReputationStore } from '~/stores/reputation'
import type { Reputation } from '~/types/reputation'

export const useReputations = () => {
  const { getHomepageReputations } = useReputationService()
  const store = useReputationStore()
  const { locale } = useLocale()

  const fallbackData: Reputation[] = [
    {
      id: 991,
      slug: 'akreditasi-universitas',
      type: 'accreditation',
      title: 'Akreditasi Universitas',
      subtitle: 'BAN-PT',
      value: 'Unggul',
      description: 'Pengakuan mutu institusi pendidikan tinggi secara nasional.',
      icon: 'award',
      color: '#005BAC',
      image: '',
      url: '#',
      target: '_self'
    },
    {
      id: 992,
      slug: 'prestasi-nasional',
      type: 'achievement',
      title: 'Prestasi Nasional & Internasional',
      subtitle: 'Penghargaan',
      value: '500+',
      description: 'Prestasi yang diraih oleh mahasiswa dan dosen.',
      icon: 'trophy',
      color: '#F9A826',
      image: '',
      url: '#',
      target: '_self'
    },
    {
      id: 993,
      slug: 'kerja-sama',
      type: 'partnership',
      title: 'Kerja Sama Nasional & Internasional',
      subtitle: 'Kemitraan',
      value: '300+',
      description: 'Jejaring kerja sama dengan berbagai institusi terkemuka.',
      icon: 'handshake',
      color: '#27AE60',
      image: '',
      url: '#',
      target: '_self'
    }
  ]

  const fetchReputations = async () => {
    store.setLoading(true)
    store.setError(null)
    
    try {
      const response = await getHomepageReputations(locale.value)
      if (response && response.data && response.data.length > 0) {
        store.setReputations(response.data)
      } else {
        // Fallback jika data kosong
        store.setReputations(fallbackData)
      }
    } catch (error: any) {
      console.error('Failed to fetch reputations, using fallback data:', error)
      store.setError(error?.message || String(error))
      store.setReputations(fallbackData)
    } finally {
      store.setLoading(false)
    }
  }

  return {
    reputations: computed(() => store.reputations),
    isLoading: computed(() => store.isLoading),
    error: computed(() => store.error),
    fetchReputations
  }
}
