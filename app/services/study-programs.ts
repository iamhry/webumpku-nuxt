import type { StudyProgram } from '~/types/study-program'

export interface GetStudyProgramParams {
  locale?: string
}

export const studyProgramService = {
  async getStudyPrograms(params: GetStudyProgramParams = {}): Promise<StudyProgram[]> {
    const config = useRuntimeConfig()
    try {
      const response = await $fetch<{ data: StudyProgram[] }>('/api/v1/study-programs', {
        baseURL: config.public.apiBase || '',
        params
      })
      return response.data || []
    } catch (e) {
      console.error('Failed to fetch study programs:', e)
      return []
    }
  },

  async getStudyProgramBySlug(slug: string, params: GetStudyProgramParams = {}): Promise<StudyProgram | null> {
    const config = useRuntimeConfig()
    try {
      const response = await $fetch<{ data: StudyProgram }>(`/api/v1/study-programs/${slug}`, {
        baseURL: config.public.apiBase || '',
        params
      })
      return response.data || null
    } catch (e) {
      console.error(`Failed to fetch study program with slug ${slug}:`, e)
      return null
    }
  }
}
