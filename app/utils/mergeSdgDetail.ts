import type { SdgGoal, SdgDetailView, SdgTarget } from '~/types/sdgs'
import { getSdgLocalBySlug, getSdgLocalByNumber, type SdgLocalContent } from '~/data/sdgs-goals'

function pickNonEmpty(...values: Array<string | null | undefined>): string {
  for (const v of values) {
    if (typeof v === 'string' && v.trim()) return v.trim()
  }
  return ''
}

function resolveLocal(api: SdgGoal): SdgLocalContent | undefined {
  const slug = api.slug
  const num = api.goal_number || api.number || api.id
  return (slug && getSdgLocalBySlug(slug)) || getSdgLocalByNumber(num)
}

/**
 * Merge CMS SDG payload with local Bappenas-style content.
 * Prefer non-null API fields; fill gaps from local data.
 */
export function mergeSdgDetail(api: SdgGoal, locale: string = 'id'): SdgDetailView {
  const local = resolveLocal(api)
  const goalNumber = api.goal_number || api.number || local?.goal_number || api.id
  const isEn = locale === 'en'

  const nameId = local?.name_id || api.name || api.title || `SDG ${goalNumber}`
  const nameEn = local?.name_en || api.name || api.title || `SDG ${goalNumber}`
  const descriptionId = pickNonEmpty(api.description, local?.description_id)
  const descriptionEn = pickNonEmpty(api.description, local?.description_en)
  const taglineId = pickNonEmpty(local?.tagline_id, descriptionId)
  const taglineEn = pickNonEmpty(local?.tagline_en, descriptionEn)

  let targets: SdgTarget[] = []
  if (Array.isArray(api.targets) && api.targets.length) {
    targets = api.targets.map((t: any) => ({
      code: String(t.code || ''),
      title: isEn
        ? pickNonEmpty(t.title_en, t.title, t.title_id)
        : pickNonEmpty(t.title_id, t.title, t.title_en),
      title_id: t.title_id || t.title,
      title_en: t.title_en || t.title
    }))
  } else if (local?.targets?.length) {
    targets = local.targets.map(t => ({
      code: t.code,
      title: isEn ? t.title_en : t.title_id,
      title_id: t.title_id,
      title_en: t.title_en
    }))
  }

  return {
    id: api.id,
    goal_number: goalNumber,
    slug: api.slug || local?.slug || String(goalNumber),
    name: isEn ? nameEn : nameId,
    name_id: nameId,
    name_en: nameEn,
    short_name: pickNonEmpty(api.short_name, `SDG ${goalNumber}`),
    tagline: isEn ? taglineEn : taglineId,
    description: isEn ? descriptionEn : descriptionId,
    description_id: descriptionId,
    description_en: descriptionEn,
    color: pickNonEmpty(api.color, local?.color, '#0b2e59'),
    icon: pickNonEmpty(api.icon, api.icon_image),
    image: pickNonEmpty(api.image, api.banner_image),
    official_url: api.official_url ?? null,
    targets
  }
}

export function getAdjacentGoals(allSdgs: SdgGoal[], currentNumber: number) {
  const sorted = [...(allSdgs || [])].sort((a, b) => {
    const na = a.goal_number || a.number || a.id
    const nb = b.goal_number || b.number || b.id
    return na - nb
  })

  const idx = sorted.findIndex(s => (s.goal_number || s.number || s.id) === currentNumber)
  if (idx === -1) return { prev: null, next: null }

  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null
  }
}
