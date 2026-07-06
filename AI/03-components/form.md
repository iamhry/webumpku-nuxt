# 📋 Form Component — Dokumentasi

## Tujuan Dokumen

Spesifikasi komponen form untuk halaman kontak, pendaftaran, dan pencarian.

---

## Form Elements

### Input Text

```vue
<template>
  <div class="form-group">
    <label :for="id" class="form-label">
      {{ label }}
      <span v-if="required" class="form-required" aria-label="wajib">*</span>
    </label>
    <input
      :id="id"
      v-model="modelValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :autocomplete="autocomplete"
      class="form-control"
      :class="{ 'is-error': error }"
      :aria-describedby="error ? `${id}-error` : undefined"
      :aria-invalid="error ? 'true' : 'false'"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p
      v-if="error"
      :id="`${id}-error`"
      class="form-error"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string
  label: string
  modelValue?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  autocomplete?: string
  error?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
```

### Textarea

```vue
<template>
  <div class="form-group">
    <label :for="id" class="form-label">{{ label }}</label>
    <textarea
      :id="id"
      v-model="modelValue"
      class="form-control"
      :rows="rows"
      :placeholder="placeholder"
      :class="{ 'is-error': error }"
    ></textarea>
    <p v-if="error" class="form-error" role="alert">{{ error }}</p>
  </div>
</template>
```

---

## CSS Form

```css
/* ─── Form Group ─────────────────────────── */
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* ─── Label ──────────────────────────────── */
.form-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.form-required {
  color: var(--color-error);
  font-size: 16px;
  line-height: 1;
}

/* ─── Input ──────────────────────────────── */
.form-control {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--color-text);
  background-color: var(--color-white);
  border: 1.5px solid var(--color-border);
  border-radius: 8px;
  outline: none;
  transition: border-color var(--duration-fast),
              box-shadow var(--duration-fast);
  appearance: none;
}

.form-control::placeholder {
  color: var(--color-text-light);
}

.form-control:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-light);
}

.form-control.is-error {
  border-color: var(--color-error);
}

.form-control.is-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.form-control:disabled {
  background-color: var(--color-surface);
  cursor: not-allowed;
  opacity: 0.6;
}

/* ─── Textarea ───────────────────────────── */
textarea.form-control {
  height: auto;
  padding: 12px 16px;
  resize: vertical;
  min-height: 120px;
}

/* ─── Error Message ──────────────────────── */
.form-error {
  font-size: 13px;
  color: var(--color-error);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

/* ─── Select ─────────────────────────────── */
select.form-control {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M6 8L0 0h12z' fill='%23666'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}
```

---

## Contoh Form Kontak

```vue
<template>
  <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
    <div class="contact-form__grid">
      <FormInput
        id="contact-name"
        v-model="form.name"
        label="Nama Lengkap"
        autocomplete="name"
        :required="true"
        :error="errors.name"
      />
      <FormInput
        id="contact-email"
        v-model="form.email"
        type="email"
        label="Email"
        autocomplete="email"
        :required="true"
        :error="errors.email"
      />
    </div>
    <FormInput
      id="contact-subject"
      v-model="form.subject"
      label="Subjek"
      :required="true"
      :error="errors.subject"
    />
    <FormTextarea
      id="contact-message"
      v-model="form.message"
      label="Pesan"
      :rows="6"
      :required="true"
      :error="errors.message"
    />
    <BaseButton type="submit" :loading="isSubmitting" size="lg">
      Kirim Pesan
    </BaseButton>
  </form>
</template>
```

---

## Anti-Pattern

```
❌ Input tanpa label yang terhubung (gunakan for + id)
❌ Placeholder sebagai pengganti label
❌ Form tanpa novalidate (browser validation mengganggu UX)
❌ Validasi hanya di frontend tanpa feedback yang jelas
❌ Error message yang terlalu teknis
❌ Submit button yang tidak disabled saat loading
❌ Form tanpa autocomplete attribute
❌ Input tanpa aria-invalid dan aria-describedby
```
