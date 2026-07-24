import type { PageSection, PageSectionItem } from '~/types/page'

function settingsObj(section: PageSection): Record<string, any> {
  const s = section.settings
  return s && !Array.isArray(s) && typeof s === 'object' ? s : {}
}

function pickLocaleText(
  locale: string,
  idKey: string,
  enKey: string,
  row: Record<string, any>
): string {
  const idVal = row[idKey] || ''
  const enVal = row[enKey] || ''
  if (locale === 'en') return enVal || idVal || ''
  return idVal || enVal || ''
}

/**
 * Map CMS `settings.cards` (bilingual) into PageSectionItem[].
 */
export function cardsFromSettings(section: PageSection, locale = 'id'): PageSectionItem[] {
  const cards = settingsObj(section).cards
  if (!Array.isArray(cards) || !cards.length) return []

  return cards.map((row: any, index: number) => ({
    id: row.id ?? `settings-card-${section.id}-${index}`,
    title: pickLocaleText(locale, 'title_id', 'title_en', row) || row.title || '',
    subtitle: pickLocaleText(locale, 'subtitle_id', 'subtitle_en', row) || row.subtitle || '',
    description: pickLocaleText(locale, 'desc_id', 'desc_en', row) || row.description || row.desc || '',
    content: row.content || '',
    image: row.image || '',
    icon: row.icon || '',
    url: row.url || row.link || '',
    button_text: pickLocaleText(locale, 'button_text_id', 'button_text_en', row) || row.button_text || '',
    sort_order: row.sort_order ?? index + 1,
    settings: row.settings || {},
  }))
}

/**
 * Map CMS `settings.stats` (bilingual) into PageSectionItem[].
 * Normalized shape: title = number/value, description = label.
 */
export function statsFromSettings(section: PageSection, locale = 'id'): PageSectionItem[] {
  const stats = settingsObj(section).stats
  if (!Array.isArray(stats) || !stats.length) return []

  return stats.map((row: any, index: number) => ({
    id: row.id ?? `settings-stat-${section.id}-${index}`,
    title: String(row.number ?? row.value ?? row.title ?? ''),
    subtitle: '',
    description: pickLocaleText(locale, 'label_id', 'label_en', row) || row.label || row.description || '',
    content: '',
    image: row.image || '',
    icon: row.icon || '',
    url: row.url || '',
    button_text: '',
    sort_order: row.sort_order ?? index + 1,
    settings: row.settings || {},
  }))
}

/**
 * Resolve display items for a section:
 * 1) CMS `items[]` if present
 * 2) else `settings.cards` / `settings.stats` depending on type
 */
export function resolveSectionItems(section: PageSection, locale = 'id'): PageSectionItem[] {
  if (section.items && section.items.length > 0) {
    return [...section.items].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  }

  if (section.type === 'cards' || section.type === 'feature_cards') {
    return cardsFromSettings(section, locale)
  }

  if (section.type === 'statistics' || section.type === 'stats') {
    return statsFromSettings(section, locale)
  }

  return []
}

export function sectionHasResolvableItems(section: PageSection): boolean {
  if (section.items && section.items.length > 0) return true
  const s = settingsObj(section)
  if (Array.isArray(s.cards) && s.cards.length > 0) return true
  if (Array.isArray(s.stats) && s.stats.length > 0) return true
  if (Array.isArray(section.facilities) && section.facilities.length > 0) return true
  if (Array.isArray(section.researchs) && section.researchs.length > 0) return true
  if (Array.isArray(section.leaders) && section.leaders.length > 0) return true
  return false
}

/** Master content grids embed data on dedicated keys (not items). */
export function sectionHasMasterGridItems(section: PageSection): boolean {
  if (section.type === 'facility_grid') {
    return Array.isArray(section.facilities) && section.facilities.length > 0
  }
  if (section.type === 'research_grid') {
    return Array.isArray(section.researchs) && section.researchs.length > 0
  }
  if (section.type === 'leader_grid') {
    return Array.isArray(section.leaders) && section.leaders.length > 0
  }
  return false
}

/** True when HTML content has visible text (ignores empty <p></p>). */
export function hasMeaningfulHtml(html?: string | null): boolean {
  if (!html) return false
  return html.replace(/<[^>]*>/g, '').trim().length > 0
}
