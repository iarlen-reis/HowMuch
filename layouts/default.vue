<template>
  <Header />
  <main class="container px-2 mx-auto pb-12 mt-6 min-h-screen">
    <slot />
    <Toaster position="top-right" richColors />
  </main>
  <Footer />
</template>
