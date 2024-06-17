<script setup lang="ts">
import "primeicons/primeicons.css";
import { required, email, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import actions from "~/actions";

useHead({
  title: "HowMuch - Login",
});

interface FormProps {
  email: string;
  password: string;
}

const form = reactive<FormProps>({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Campo obrigatório", required),
      email: helpers.withMessage("Email inválido", email),
    },
    password: {
      required: helpers.withMessage("Campo obrigatório", required),
    },
  };
});

const v$ = useVuelidate(rules, form);
const isLoading = ref(false);

const handleSubmit = async () => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }
  isLoading.value = true;

  await actions.auth.login(form);

  isLoading.value = false;
};
</script>

<template>
  <div
    class="flex justify-center flex-col gap-12 w-full max-w-[800px] mx-auto lg:shadow p-2 lg:p-8"
  >
    <div class="mx-auto flex flex-col gap-6">
      <img src="/logo.png" class="w-[160px] mx-auto" />
      <p class="text-center text-xl font-sora tracking-wider">
        Uma conta
        <span class="block text-red-500">múltiplas possibilidades</span>
      </p>
    </div>
    <form class="flex flex-col gap-4" @submit.prevent>
      <fieldset class="flex flex-col gap-1">
        <label for="email" class="uppercase text-sm lg:text-base text-black"
          >Email</label
        >
        <div
          class="flex items-center gap-2 hover:border-zinc-600 p-3 rounded bg-transparent border border-black"
        >
          <span class="pi pi-envelope text-black/80"></span>
          <input
            type="text"
            id="email"
            placeholder="E-mail"
            class="flex-1 flex outline-none placeholder:text-black/80"
            v-model="form.email"
            @change="v$.email.$touch"
          />
        </div>
        <p v-if="v$.email.$error" class="text-red-500 text-sm">
          {{ v$.email.$errors[0].$message }}
        </p>
      </fieldset>

      <fieldset class="flex flex-col gap-1">
        <label for="password" class="uppercase text-sm lg:text-base text-black"
          >Senha</label
        >
        <div
          class="flex items-center gap-2 p-3 hover:border-zinc-600 rounded bg-transparent border border-black"
        >
          <span class="pi pi-lock text-black/80"></span>
          <input
            type="password"
            id="password"
            placeholder="Senha"
            class="flex-1 flex outline-none placeholder:text-black/80"
            v-model="form.password"
            @change="v$.password.$touch"
          />
        </div>
        <p v-if="v$.password.$error" class="text-red-500 text-sm">
          {{ v$.password.$errors[0].$message }}
        </p>
      </fieldset>
      <div class="flex items-center justify-end">
        <button
          @click="handleSubmit"
          :disabled="isLoading"
          class="lg:w-[240px] p-3 rounded bg-neutral-800 text-white text-center w-full hover:opacity-85 transition-opacity disabled:bg-zinc-400 disabled:text-zinc-600 disabled:cursor-not-allowed"
        >
          Entrar
        </button>
      </div>
      <div class="flex items-center justify-center flex-col mt-6">
        <p>Não possui uma conta?</p>
        <NuxtLink
          to="/register"
          class="text-red-600 font-semibold hover:opacity-85 transition-opacity"
          >Criar conta</NuxtLink
        >
      </div>
    </form>
  </div>
</template>
