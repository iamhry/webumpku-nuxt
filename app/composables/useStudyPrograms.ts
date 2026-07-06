import { useAsyncData } from '#imports'
import { studyProgramService } from '~/services/study-programs'
import { useI18n } from 'vue-i18n'
import type { StudyProgram } from '~/types/study-program'

export const useStudyPrograms = () => {
  const { locale } = useLocale()
  
  const getStudyProgram = async (slug: string) => {
    return useAsyncData<StudyProgram | null>(
      `study-program-detail-${slug}-${locale.value}`,
      () => studyProgramService.getStudyProgramBySlug(slug, { locale: locale.value }),
      {
        lazy: true,
        watch: [locale]
      }
    )
  }

  return {
    getStudyProgram
  }
}
