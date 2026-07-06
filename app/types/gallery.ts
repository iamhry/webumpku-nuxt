export interface GalleryItem {
  id: number
  album_slug: string
  album_title: string
  title: string
  caption: string
  image: string
  thumbnail: string
  photographer: string
  taken_at: string
}

export interface GalleryResponse {
  data: GalleryItem[]
}
