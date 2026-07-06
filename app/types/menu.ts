export interface Menu {
  id: number | string
  title: string | any
  url: string
  target: string
  link_type?: string
  position?: string
  section?: string
  children: Menu[]
}

export type MenuItem = Menu

export interface FooterMenuGroup {
  section: string
  title: string | any
  items: Menu[]
}
