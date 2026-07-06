import { computed } from 'vue'
import { useSettingsStore } from '~/stores/settings'
import { settingsService } from '~/services/settings'

export const useSettings = () => {
  const settingsStore = useSettingsStore()

  const fetchSettings = async () => {
    // useAsyncData ensures this data is only fetched once per SSR request cycle
    // and hydrated perfectly to the client without redundant calls.
    const { data } = await useAsyncData('global-settings', () => settingsService.getSettings())
    
    if (data.value) {
      settingsStore.setSettings(data.value)
    }
  }

  return {
    settings: computed(() => settingsStore.settings),
    fetchSettings
  }
}
