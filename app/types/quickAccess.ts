export interface QuickAccessItem {
  id: number
  slug: string
  title: string
  description: string
  icon: string
  color: string | null
  url: string
  target: string
  category: string
  site_key: string
  role_key: string
  is_external?: boolean
  sort_order?: number
}

export interface QuickAccessResponse {
  data: QuickAccessItem[]
}
