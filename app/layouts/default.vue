<template>
  <div>
    <AppHeaderOilGas />
    <main>
      <slot />
    </main>
    <AppFooter />
    <QuickAccessSidebar />
    <QuickAccessOverlay />
    <FloatingBtnContainer />
    <ClientOnly>
      <AccessibilityWidget />
    </ClientOnly>
  </div>
</template>
