<template>
  <div>
    <AppHeaderOilGas />
    <main>
      <slot />
    </main>
    <AppFooter />
    <QuickAccessSidebar />
    <QuickAccessOverlay />
    <ClientOnly>
      <AccessibilityWidget />
    </ClientOnly>
  </div>
</template>
