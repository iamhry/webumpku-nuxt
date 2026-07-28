<script setup lang="ts">
import { computed } from 'vue'
import { useAsyncData, useLocalePath } from '#imports'
import { studyProgramService } from '~/services/study-programs'
import type { HomepageSection } from '~/types/homepage'

const props = defineProps<{
  section?: HomepageSection
}>()

const { locale } = useLocale()
const localePath = useLocalePath()

const { data: programs, pending } = await useAsyncData(
  'homepage-study-programs',
  () => studyProgramService.getStudyPrograms({ locale: locale.value }),
  { watch: [locale] }
)

const displayPrograms = computed(() => programs.value || [])

const programsTitle = computed(() => {
  if (props.section?.title) return props.section.title
  return locale.value === 'en' ? 'Faculty & Program Study' : 'Fakultas & Program Studi'
})

const programsSubtitle = computed(() => {
  const raw = props.section?.subtitle || props.section?.content || ''
  const plain = raw.replace(/<[^>]*>/g, '').trim()
  if (plain) return plain
  return locale.value === 'en'
    ? 'Our programs are designed to shape future leaders. Explore our programs below.'
    : 'Program kami dirancang untuk membentuk pemimpin masa depan. Jelajahi program studi di bawah ini.'
})

const rolesTitle = computed(() =>
  locale.value === 'en' ? 'Choose Your Role' : 'Pilih Peran Anda'
)

const rolesSubtitle = computed(() =>
  locale.value === 'en'
    ? 'Let us know more about you, choose which role fits you'
    : 'Beri tahu kami lebih lanjut tentang Anda, pilih peran yang sesuai'
)

const roles = computed(() => {
  if (locale.value === 'en') {
    return [
      { label: 'Student', href: 'https://myakademik.umpku.ac.id', external: true },
      { label: 'Prospective Student', href: 'https://pmb.umpku.ac.id', external: true },
      { label: 'Alumni', href: 'https://cdc.umpku.ac.id', external: true }
    ]
  }
  return [
    { label: 'Mahasiswa', href: 'https://myakademik.umpku.ac.id', external: true },
    { label: 'Calon Mahasiswa', href: 'https://pmb.umpku.ac.id', external: true },
    { label: 'Alumni', href: 'https://cdc.umpku.ac.id', external: true }
  ]
})

const viewAllLabel = computed(() =>
  locale.value === 'en' ? 'View All Program' : 'Lihat Semua Program'
)
</script>

<template>
  <section class="home-study-programs-section">
    <div class="container content-wide">
      <div class="hsp-grid" v-reveal data-reveal="fade-up">
        <!-- Left card: Faculty & Program Study -->
        <div class="hsp-card hsp-card--programs">
          <div class="hsp-card-icon" aria-hidden="true">
            <i class="las la-graduation-cap"></i>
          </div>

          <h2 class="hsp-card-title">{{ programsTitle }}</h2>
          <p class="hsp-card-subtitle">{{ programsSubtitle }}</p>

          <div v-if="pending && !displayPrograms.length" class="hsp-chips">
            <span v-for="i in 6" :key="i" class="hsp-chip hsp-chip--skeleton"></span>
          </div>

          <div v-else class="hsp-chips">
            <NuxtLink
              v-for="program in displayPrograms"
              :key="program.id"
              :to="localePath(`/program-studi/${program.slug}`)"
              class="hsp-chip"
            >
              {{ program.name }}
            </NuxtLink>
          </div>

          <a
            v-if="displayPrograms.length"
            href="https://pmb.umpku.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            class="hsp-card-link"
          >
            {{ viewAllLabel }}
            <i class="las la-angle-right" aria-hidden="true"></i>
          </a>
        </div>

        <!-- Right card: Choose Your Role -->
        <div class="hsp-card hsp-card--roles">
          <div class="hsp-card-icon hsp-card-icon--role" aria-hidden="true">
            <i class="las la-user-graduate"></i>
          </div>

          <h2 class="hsp-card-title">{{ rolesTitle }}</h2>
          <p class="hsp-card-subtitle">{{ rolesSubtitle }}</p>

          <div class="hsp-roles">
            <a
              v-for="role in roles"
              :key="role.label"
              :href="role.href"
              class="hsp-role-btn"
              :target="role.external ? '_blank' : undefined"
              :rel="role.external ? 'noopener noreferrer' : undefined"
            >
              <span>{{ role.label }}</span>
              <i class="las la-angle-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-study-programs-section {
  padding: 40px 0 80px;
  background: #ffffff;
}

.hsp-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 24px;
  align-items: stretch;
}

.hsp-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 36px 40px;
  border-radius: 28px;
  color: #ffffff;
background: #253238;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #414345, #232526);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  box-shadow: 0 18px 40px rgba(11, 46, 89, 0.18);
  overflow: hidden;
  min-height: 480px;
}

.hsp-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.14), transparent 40%),
    radial-gradient(circle at 80% 90%, rgba(255, 255, 255, 0.08), transparent 45%);
  pointer-events: none;
}

.hsp-card > * {
  position: relative;
  z-index: 1;
}

.hsp-card-icon {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
  background: linear-gradient(160deg, #ffffff 0%, #d9ecff 100%);
  color: var(--brand-navy-light);
  font-size: 42px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
}

.hsp-card-icon--role {
  background: linear-gradient(160deg, #ffe08a 0%, var(--brand-accent) 100%);
  color: var(--brand-navy);
}

.hsp-card-title {
  margin: 0 0 12px;
  font-size: 28px;
  line-height: 1.25;
  font-weight: 700;
  color: #ffffff;
}

.hsp-card-subtitle {
  margin: 0 0 28px;
  max-width: 420px;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
}

.hsp-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  gap: 10px 12px;
  width: 100%;
  flex: 1;
  margin-bottom: 28px;
}

.hsp-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border-radius: 999px;
  background: #ffffff;
  color: var(--brand-navy-light);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.hsp-chip:hover {
  transform: translateY(-2px);
  background: #f4f9ff;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
  color: var(--brand-navy);
}

.hsp-chip--skeleton {
  width: 140px;
  height: 38px;
  background: rgba(255, 255, 255, 0.55);
  animation: hsp-pulse 1.2s ease-in-out infinite;
}

.hsp-card-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.hsp-card-link:hover {
  opacity: 0.9;
  transform: translateX(2px);
}

.hsp-card-link i {
  font-size: 14px;
}

.hsp-roles {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: 360px;
  margin-top: 4px;
  flex: 1;
}

.hsp-role-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 22px;
  border-radius: 999px;
  background: #ffffff;
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.hsp-role-btn i {
  color: #8a8a8a;
  font-size: 16px;
  transition: transform 0.2s ease, color 0.2s ease;
}

.hsp-role-btn:hover {
  transform: translateY(-2px);
  background: #f7fbff;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.14);
}

.hsp-role-btn:hover i {
  color: var(--brand-navy-light);
  transform: translateX(3px);
}

@keyframes hsp-pulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.9; }
}

@media (max-width: 991px) {
  .hsp-grid {
    grid-template-columns: 1fr;
  }

  .hsp-card {
    min-height: 0;
    padding: 40px 28px 36px;
  }

  .hsp-card-title {
    font-size: 24px;
  }
}

@media (max-width: 575px) {
  .home-study-programs-section {
    padding: 24px 0 56px;
  }

  .hsp-card {
    border-radius: 22px;
    padding: 32px 20px 28px;
  }

  .hsp-chip {
    font-size: 12px;
    padding: 9px 14px;
  }

  .hsp-role-btn {
    font-size: 15px;
    padding: 14px 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hsp-chip,
  .hsp-role-btn,
  .hsp-card-link {
    transition: none;
  }

  .hsp-chip--skeleton {
    animation: none;
  }
}
</style>
