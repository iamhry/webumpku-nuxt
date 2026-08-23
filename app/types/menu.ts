export type MenuType = 'link' | 'dropdown' | 'mega' | 'group'

export interface MenuPromo {
  id: number
  title: string
  description?: string | null
  image?: string | null
  url?: string | null
  button_text?: string | null
  sort_order?: number
}

export interface Menu {
  id: number | string
  title: string | Record<string, string>
  url: string | null
  target: string
  link_type?: string
  position?: string
  section?: string | null
  sort_order?: number
  menu_type?: MenuType | null
  columns?: number | null
  subtitle?: string | null
  icon?: string | null
  is_featured?: boolean
  children: Menu[]
  promos?: MenuPromo[]
}

export type MenuItem = Menu

export interface FooterMenuGroup {
  section: string
  title: string | Record<string, string> | any
  items: Menu[]
}
