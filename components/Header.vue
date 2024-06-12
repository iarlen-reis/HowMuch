<script setup lang="ts">
const mobileMenu = ref(false);

const toggleMobileMenu = () => {
  mobileMenu.value = !mobileMenu.value;
};
</script>

<template>
  <header
    class="container relative mx-auto flex items-center justify-between p-3 py-4"
  >
    <NuxtLink to="/">
      <img src="/logo.png" class="w-[90px]" />
    </NuxtLink>
    <nav>
      <ul
        class="hidden items-center gap-4 md:flex"
        :class="{ open: mobileMenu }"
      >
        <li @click="mobileMenu = false">
          <NuxtLink to="/">Página inicial</NuxtLink>
        </li>
        <li @click="mobileMenu = false">
          <NuxtLink to="/login">Entrar</NuxtLink>
        </li>
        <li @click="mobileMenu = false">
          <NuxtLink to="/register">Cadastro</NuxtLink>
        </li>
      </ul>
      <div>
        <button class="md:hidden" id="button-mobile" @click="toggleMobileMenu">
          <i v-if="!mobileMenu" class="pi pi-bars text-xl"> </i>
          <i v-if="mobileMenu" class="pi pi-times text-xl"> </i>
        </button>
      </div>
    </nav>
  </header>
</template>
