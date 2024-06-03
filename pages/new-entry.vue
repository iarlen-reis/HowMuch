<script setup lang="ts">
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

definePageMeta({
  layout: "custom",
});

interface FormProps {
  title: string;
  value: string;
  date: string;
  type: string;
  description: string;
}

const form = reactive<FormProps>({
  title: "",
  value: "",
  date: "",
  description: "",
});

const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage("Campo obrigatório", required),
    },
    value: {
      required: helpers.withMessage("Campo obrigatório", required),
    },
    date: {
      required: helpers.withMessage("Campo obrigatório", required),
    },
  };
});

const v$ = useVuelidate(rules, form);

const handleSubmit = (date: FormProps) => {
  v$.value.$validate();
  if (v$.value.$error) {
    return;
  }

  console.log({
    ...form,
    date: new Date(form.date).toISOString(),
  });
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <Navigation url="/" title="Página inicial" />
    <form class="flex flex-col gap-4" @submit.prevent>
      <fieldset class="flex flex-col gap-1">
        <label for="email" class="uppercase text-sm lg:text-base text-black"
          >Nome da compra</label
        >
        <div
          class="flex items-center gap-2 hover:border-[#aaaeb7] p-3 rounded bg-transparent border border-[#ddd]"
        >
          <Icon
            name="ic:outline-shopping-cart"
            font-size="20"
            class="text-[#959595]"
          />
          <input
            type="text"
            id="name"
            placeholder="Nome da compra"
            class="flex-1 flex outline-none placeholder:text-[#c0c4cc]"
            v-model="form.title"
            @change="v$.title.$touch"
          />
        </div>
        <p v-if="v$.title.$error" class="text-red-500 text-sm">
          {{ v$.title.$errors[0].$message }}
        </p>
      </fieldset>

      <fieldset class="flex flex-col gap-1">
        <label for="date" class="uppercase text-sm lg:text-base text-black"
          >Data da compra</label
        >
        <VueDatePicker
          v-model="form.date"
          :format="formatInputDate"
          :enable-time-picker="false"
          placeholder="Data da compra"
          @change="v$.date.$touch()"
        ></VueDatePicker>
        <p v-if="v$.date.$error" class="text-red-500 text-sm">
          {{ v$.date.$errors[0].$message }}
        </p>
      </fieldset>

      <fieldset class="flex flex-col gap-1">
        <label for="value" class="uppercase text-sm lg:text-base text-black"
          >Valor da compra</label
        >
        <div
          class="flex items-center gap-2 hover:border-[#aaaeb7] p-3 rounded bg-transparent border border-[#ddd]"
        >
          <Icon
            name="ic:outline-shopping-cart"
            font-size="20"
            class="text-[#959595]"
          />
          <input
            type="number"
            id="value"
            placeholder="Nome da compra"
            class="flex-1 flex outline-none placeholder:text-[#c0c4cc]"
            v-model="form.value"
            @change="v$.value.$touch"
            min="0"
          />
        </div>
        <p v-if="v$.value.$error" class="text-red-500 text-sm">
          {{ v$.value.$errors[0].$message }}
        </p>
      </fieldset>

      <fieldset class="flex flex-col gap-1">
        <label
          for="description"
          class="uppercase text-sm lg:text-base text-black"
          >Descrição da compra</label
        >
        <div
          class="flex items-center gap-2 hover:border-[#aaaeb7] p-3 rounded bg-transparent border border-[#ddd]"
        >
          <textarea
            type="text"
            id="description"
            placeholder="Descrição da compra"
            class="flex-1 flex outline-none placeholder:text-[#c0c4cc]"
            v-model="form.description"
            rows="6"
          ></textarea>
        </div>
      </fieldset>

      <div class="flex md:justify-end">
        <button
          type="submit"
          @click="handleSubmit"
          class="w-full md:w-[210px] p-3 bg-zinc-950 text-white rounded hover:opacity-85 transition-opacity"
        >
          Criar entrada
        </button>
      </div>
    </form>
  </div>
</template>
