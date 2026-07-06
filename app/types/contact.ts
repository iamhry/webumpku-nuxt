export interface CampusLocation {
  id: number
  slug: string
  name: string
  label: string | null
  address: string | null
  office_hours: string | null
  city: string | null
  province: string | null
  postal_code: string | null
  phone: string | null
  whatsapp: string | null
  email: string | null
  website: string | null
  latitude: number | null
  longitude: number | null
  map_embed_url: string | null
  is_main: boolean
  sort_order: number
}

export interface SocialMedia {
  facebook: string | null
  instagram: string | null
  youtube: string | null
  linkedin: string | null
  tiktok: string | null
  twitter: string | null
}

export interface ContactResponse {
  main_location: CampusLocation | null
  locations: CampusLocation[]
  social_media: SocialMedia
}
