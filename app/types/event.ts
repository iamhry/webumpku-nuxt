import type { SdgGoal } from './sdgs'

export interface EventItem {
  id: number
  title: string
  slug: string
  excerpt: string
  description?: string
  featured_image?: string
  event_start: string // ISO string e.g., "2026-06-20T07:30:00"
  event_end?: string // ISO string e.g., "2026-06-20T11:30:00"
  category: string // e.g. workshop, seminar, webinar, conference, community_service, international
  organizer?: string
  location?: string
  location_type: 'online' | 'offline' | 'hybrid'
  registration_url?: string
  tags?: string[]
  sdgs?: SdgGoal[]
}

export interface EventsResponse {
  data: EventItem[]
  meta: {
    current_page: number
    last_page: number
    total: number
    per_page?: number
  }
}

export interface GetEventsParams {
  locale?: string
  upcoming?: boolean
  past?: boolean
  category?: string
  featured?: boolean
  month?: number
  year?: number
  page?: number
  per_page?: number
}
