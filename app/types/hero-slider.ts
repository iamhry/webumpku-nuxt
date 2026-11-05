export type TextAlign = 'left' | 'center' | 'right'

export interface HeroSlider {
  id: number
  title: string | null
  title_color?: string | null
  title_font_size?: string | null
  subtitle: string | null
  subtitle_color?: string | null
  subtitle_font_size?: string | null
  description: string | null
  description_color?: string | null
  description_font_size?: string | null
  image: string
  mobile_image: string | null
  button_text: string | null
  button_url: string | null
  locale: 'id' | 'en' | string
  text_align: TextAlign
  show_desktop: boolean | number | string
  show_mobile: boolean | number | string
  show_title_desktop: boolean | number | string
  show_title_mobile: boolean | number | string
}

export interface HeroSliderResponse {
  data: HeroSlider[]
}