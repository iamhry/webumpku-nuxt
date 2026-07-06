export interface HeroSlider {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  button_text: string
  button_url: string
  locale: string
}

export interface HeroSliderResponse {
  data: HeroSlider[]
}
