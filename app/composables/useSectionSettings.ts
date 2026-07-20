export function normalizeSectionSettings(settings: any) {
  const defaults = {
    background: 'white',
    container: 'wide',
    padding_top: 'lg',
    padding_bottom: 'lg',
    variant: 'default',
    animation: 'fade-up',
    delay: 0,
    accent: 'primary',
    pattern: 'none',
    shape_top: 'none',
    shape_bottom: 'none',
    full_width: false,
    reverse: false,
    kicker: '',
  }

  if (!settings || Array.isArray(settings) || typeof settings !== 'object') {
    return { ...defaults }
  }

  // Drop null/undefined so CMS nulls don't wipe defaults
  const cleaned: Record<string, any> = {}
  for (const [key, value] of Object.entries(settings)) {
    if (value !== null && value !== undefined) {
      cleaned[key] = value
    }
  }

  return { ...defaults, ...cleaned }
}
