<script setup lang="ts">
import { useQuickAccessStore } from '~/stores/quickAccess'

const store = useQuickAccessStore()

const portals = [
  { name: 'PMB Online', icon: 'las la-file-signature', desc: 'Penerimaan Mahasiswa Baru', url: '/pmb' },
  { name: 'myLMS', icon: 'las la-laptop-code', desc: 'Media Pembelajaran Kuliah Online', url: '#' },
  { name: 'Repository', icon: 'las la-archive', desc: 'Penyimpanan Karya Ilmiah Digital', url: '#' },
  { name: 'Perpustakaan', icon: 'las la-book-open', desc: 'Katalog Buku & Jurnal Perpustakaan', url: '#' },
  { name: 'Jurnal', icon: 'las la-journal-whills', desc: 'Publikasi Jurnal Ilmiah UMPKU', url: '#' }
]
</script>

<template>
  <Transition name="slide">
    <aside v-if="store.isOpen" class="quick-access-sidebar">
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <button class="close-btn" @click="store.close()" aria-label="Close menu">
          <i class="las la-times"></i>
        </button>
      </div>

      <!-- Sidebar Content -->
      <div class="sidebar-body">
        <h5 class="menu-title">Layanan & Portal</h5>
        
        <div class="portals-grid">
          <a 
            v-for="portal in portals" 
            :key="portal.name" 
            :href="portal.url"
            class="portal-card"
          >
            <div class="portal-icon-wrapper">
              <i :class="portal.icon"></i>
            </div>
            <div class="portal-info">
              <span class="portal-name">{{ portal.name }}</span>
              <span class="portal-desc">{{ portal.desc }}</span>
            </div>
            <i class="las la-angle-right arrow-icon"></i>
          </a>
        </div>
      </div>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer">
        <p>© {{ new Date().getFullYear() }} UMPKU Quick Access</p>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.quick-access-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background: #ffffff;
  box-shadow: -5px 0 30px rgba(11, 46, 89, 0.15);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Slide Transition Animations */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

/* Header */
.sidebar-header {
  padding: 24px 30px;
  border-bottom: 1px solid #f1f3f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-logo img {
  height: 48px;
  width: auto;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #ef4444;
  transform: rotate(90deg);
}

/* Body */
.sidebar-body {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

.menu-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0b2e59;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.portals-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.portal-card {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.portal-card:hover {
  background: #ffffff;
  border-color: #0b2e59;
  box-shadow: 0 10px 20px rgba(11, 46, 89, 0.06);
  transform: translateY(-2px);
}

.portal-icon-wrapper {
  width: 44px;
  height: 44px;
  background: rgba(11, 46, 89, 0.05);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  transition: all 0.3s ease;
}

.portal-card:hover .portal-icon-wrapper {
  background: #0b2e59;
}

.portal-icon-wrapper i {
  font-size: 22px;
  color: #0b2e59;
  transition: all 0.3s ease;
}

.portal-card:hover .portal-icon-wrapper i {
  color: #ffffff;
}

.portal-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.portal-name {
  font-size: 0.98rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 2px;
}

.portal-desc {
  font-size: 0.78rem;
  color: #64748b;
}

.arrow-icon {
  font-size: 16px;
  color: #94a3b8;
  transition: all 0.3s ease;
}

.portal-card:hover .arrow-icon {
  color: #0b2e59;
  transform: translateX(4px);
}

/* Footer */
.sidebar-footer {
  padding: 20px 30px;
  border-top: 1px solid #f1f3f7;
  text-align: center;
}

.sidebar-footer p {
  font-size: 0.8rem;
  color: #94a3b8;
  margin: 0;
}

/* Responsive Options */
@media (max-width: 576px) {
  .quick-access-sidebar {
    width: 100vw;
  }
  .sidebar-header {
    padding: 16px 20px;
  }
  .sidebar-body {
    padding: 20px;
  }
}
</style>
