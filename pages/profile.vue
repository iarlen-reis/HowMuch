<script setup lang="ts">
import actions from "~/actions";
import { useAuthStore } from "~/store/useAuthStore";

useHead({
  title: "HowMuch - Meu perfil",
});

definePageMeta({
  layout: "custom",
  middleware: "auth",
});

const auth = useAuthStore();
const file = ref<File>();
const imagePreview = ref<string>();

const handleFileUpload = (event: any) => {
  file.value = event.target.files[0];

  if (file.value) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file.value);
  }
};

const handleSubmit = async () => {
  if (!file.value) return;

  await actions.upload.photo(file.value);
};
</script>

<template>
  <div class="flex flex-col gap-4 w-full max-w-[600px] mx-auto mt-6">
    <Navigation url="/" title="Meu perfil" />
    <div class="mt-6">
      <img
        v-if="auth.user?.data.photo"
        :src="auth.user?.data.photo"
        :alt="`Imagem do perfil de ${auth.user?.data.name}`"
        class="w-[250px] h-[250px] rounded-full mx-auto"
      />
      <label
        for="file"
        v-if="!auth.user?.data.photo && !imagePreview"
        class="w-[250px] h-[250px] flex flex-col items-center justify-center gap-2 border border-black/40 rounded-full mx-auto text-center"
      >
        <Icon name="ic:baseline-image" font-size="50" />
        <span class="text-center"
          >Selecione <br />
          uma imagem</span
        >
      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        class="hidden"
        @change="handleFileUpload"
      />
    </div>
    <div v-if="imagePreview" class="flex flex-col gap-4">
      <img
        :src="imagePreview"
        alt="preview"
        class="w-[250px] h-[250px] rounded-full mx-auto"
      />

      <button
        @click="handleSubmit"
        class="w-[160px] p-2 border border-black/40 rounded mx-auto hover:bg-blue-500 hover:text-white hover:border-white/40 transition-colors"
      >
        Salvar imagem
      </button>
    </div>
    <div class="flex flex-col items-center justify-center">
      <h2 class="font-semibold text-lg md:text-xl lg:text-2xl">
        {{ auth.user?.data.name }}
      </h2>
      <p class="text-sm md:text-base">
        {{ auth.user?.data.email }}
      </p>
    </div>
    <div class="flex items-center justify-center gap-2">
      <button
        @click="actions.auth.logout"
        class="flex items-center gap-2 p-2 text-center border border-black/40 rounded hover:bg-red-500 hover:text-white hover:border-white/40 transition-colors"
      >
        <Icon name="ic:baseline-log-out" font-size="20" />
        Sair
      </button>
    </div>
  </div>
</template>
