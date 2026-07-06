export const useStatisticIcon = () => {
  const getIcon = (icon: string | undefined): string => {
    if (!icon) return 'flaticon-engineer'
    
    // Jika API sudah mengirimkan full class (contoh: flaticon-engineer, fa-user, la-user)
    if (icon.startsWith('flaticon-') || icon.startsWith('fa-') || icon.startsWith('la-')) {
      return icon
    }

    const mapping: Record<string, string> = {
      student: 'flaticon-engineer',
      teacher: 'flaticon-plumber',
      faculty: 'flaticon-factory',
      program: 'flaticon-tow-truck',
      alumni: 'flaticon-engineer',
      research: 'flaticon-factory',
      award: 'flaticon-plumber',
      users: 'flaticon-engineer',
      building: 'flaticon-factory',
      international: 'flaticon-tow-truck'
    }
    
    // Return dari mapping, atau kembalikan string aslinya jika tidak ada di mapping
    return mapping[icon.toLowerCase()] || icon
  }

  return { getIcon }
}
