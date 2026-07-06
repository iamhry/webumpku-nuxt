export default defineNuxtPlugin((nuxtApp) => {
    const initializeDustrian = () => {
        if (typeof window !== 'undefined' && window.initDustrian && window.jQuery) {
            // Execute the main.js logic that initializes Owl Carousel, Wow, CounterUp, etc.
            window.initDustrian(window.jQuery);
        }
    };

    // Run after initial client hydration is fully complete
    nuxtApp.hook('app:mounted', () => {
        setTimeout(initializeDustrian, 150);
    });

    // Run again when navigating to new pages (client-side routing)
    nuxtApp.hook('page:finish', () => {
        setTimeout(initializeDustrian, 150);
    });
});
