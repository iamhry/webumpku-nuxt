<script setup lang="ts">
import { ref, reactive } from 'vue'

defineProps<{
  visible?: boolean
}>()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const submitted    = ref(false)

async function handleSubmit() {
  // Placeholder — no API yet
  isSubmitting.value = true
  await new Promise(r => setTimeout(r, 800))
  isSubmitting.value = false
  submitted.value    = true
  Object.keys(form).forEach(k => ((form as any)[k] = ''))
}
</script>

<template>
  <section v-if="visible !== false" class="contact-form-section">
    <div class="container">
      <div class="contact-section-header">
        <h2 class="contact-section-header__title">Kirim Pertanyaan</h2>
        <p class="contact-section-header__subtitle">
          Ada pertanyaan? Kami siap membantu Anda.
        </p>
      </div>

      <div class="contact-form-wrapper">
        <!-- Success state -->
        <div v-if="submitted" class="contact-form-success">
          <div class="contact-form-success__icon">✓</div>
          <h3>Pesan Terkirim!</h3>
          <p>Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.</p>
          <button class="contact-form-btn" @click="submitted = false">Kirim Lagi</button>
        </div>

        <!-- Form -->
        <form v-else class="contact-form" @submit.prevent="handleSubmit" novalidate>
          <div class="contact-form__row">
            <div class="contact-form__group">
              <label for="contact-name" class="contact-form__label">Nama Lengkap</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                class="contact-form__input"
                placeholder="Masukkan nama Anda"
                required
              />
            </div>
            <div class="contact-form__group">
              <label for="contact-email" class="contact-form__label">Email</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                class="contact-form__input"
                placeholder="nama@email.com"
                required
              />
            </div>
          </div>

          <div class="contact-form__group">
            <label for="contact-subject" class="contact-form__label">Subjek</label>
            <input
              id="contact-subject"
              v-model="form.subject"
              type="text"
              class="contact-form__input"
              placeholder="Subjek pertanyaan Anda"
              required
            />
          </div>

          <div class="contact-form__group">
            <label for="contact-message" class="contact-form__label">Pesan</label>
            <textarea
              id="contact-message"
              v-model="form.message"
              class="contact-form__textarea"
              placeholder="Tuliskan pertanyaan atau pesan Anda di sini..."
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="contact-form-btn contact-form-btn--submit"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Mengirim...</span>
            <span v-else>Kirim Pesan</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
