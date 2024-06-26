<script setup lang="ts">
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import actions from "~/actions";

useHead({
  title: "HowMuch - Nova entrada",
});

definePageMeta({
  layout: "custom",
  middleware: "auth",
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
  type: "",
});

const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage("Campo obrigatório", required),
    },
    value: {
      required: helpers.withMessage("Campo obrigatório", required),
    },
    type: {
      required: helpers.withMessage("Campo obrigatório", required),
    },
    date: {
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

  await actions.purchase.newPurchase({
    ...form,
    value: Number(form.value.replace(/\D/g, "")) / 100,
  });

  isLoading.value = false;
};

const handleInput = (event: any) => {
  const inputValue = event.target.value;
  const cleanedValue = inputValue.replace(/\D/g, "");
  form.value = maskPrice(cleanedValue);
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <Navigation url="/" title="Página inicial" />
    <form class="flex flex-col gap-6" @submit.prevent>
      <fieldset class="flex flex-col gap-1.5">
        <label for="email" class="uppercase text-sm lg:text-base text-black">
          Nome da compra
          <span class="text-sm text-red-500">*</span>
        </label>
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

      <fieldset class="flex flex-col gap-1.5">
        <label for="date" class="uppercase text-sm lg:text-base text-black">
          Data de pagamento
          <span class="text-sm text-red-500">*</span>
        </label>
        <VueDatePicker
          v-model="form.date"
          :format="formatInputDate"
          :enable-time-picker="false"
          placeholder="Data de pagamento"
          @change="v$.date.$touch()"
        ></VueDatePicker>
        <p v-if="v$.date.$error" class="text-red-500 text-sm">
          {{ v$.date.$errors[0].$message }}
        </p>
      </fieldset>

      <fieldset class="flex flex-col gap-1.5">
        <label for="value" class="uppercase text-sm lg:text-base text-black">
          Valor da compra
          <span class="text-sm text-red-500">*</span>
        </label>
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
            id="value"
            placeholder="Nome da compra"
            class="flex-1 flex outline-none placeholder:text-[#c0c4cc]"
            v-model="form.value"
            @change="v$.value.$touch"
            @input="handleInput"
          />
        </div>
        <p v-if="v$.value.$error" class="text-red-500 text-sm">
          {{ v$.value.$errors[0].$message }}
        </p>
      </fieldset>

      <div class="flex flex-col gap-1.5">
        <label for="type" class="uppercase text-sm lg:text-base text-black">
          Tipo da compra
          <span class="text-sm text-red-500">*</span>
        </label>
        <div class="grid grid-cols-2 gap-3 w-fit">
          <fieldset class="flex flex-col gap-1.5">
            <input
              type="radio"
              id="food"
              name="type"
              value="food"
              class="hidden"
              v-model="form.type"
              @change="v$.type.$touch"
            />
            <label
              for="food"
              class="w-full max-w-[175px] cursor-pointer justify-center flex items-center gap-2 p-3 rounded border border-[#ddd] hover:border-[#aaaeb7] text-center"
            >
              <Icon
                :name="selectIcon('food')"
                font-size="20"
                class="text-[#959595]"
              />
              <span class="text-[#959595]">Alimentação</span>
            </label>
          </fieldset>

          <fieldset class="flex flex-col gap-1.5">
            <input
              type="radio"
              id="laser"
              name="type"
              value="laser"
              class="hidden"
              v-model="form.type"
              @change="v$.type.$touch"
            />
            <label
              for="laser"
              class="w-full max-w-[175px] cursor-pointer justify-center flex items-center gap-2 p-3 rounded border border-[#ddd] hover:border-[#aaaeb7] text-center"
            >
              <Icon
                :name="selectIcon('laser')"
                font-size="20"
                class="text-[#959595]"
              />
              <span class="text-[#959595]">Laser</span>
            </label>
          </fieldset>

          <fieldset class="flex flex-col gap-1.5">
            <input
              type="radio"
              id="services"
              name="type"
              value="services"
              class="hidden"
              v-model="form.type"
              @change="v$.type.$touch"
            />
            <label
              for="services"
              class="w-full max-w-[175px] cursor-pointer justify-center flex items-center gap-2 p-3 rounded border border-[#ddd] hover:border-[#aaaeb7] text-center"
            >
              <Icon
                :name="selectIcon('services')"
                font-size="20"
                class="text-[#959595]"
              />
              <span class="text-[#959595]">Serviços</span>
            </label>
          </fieldset>

          <fieldset class="flex flex-col gap-1.5">
            <input
              type="radio"
              id="other"
              name="type"
              value="other"
              class="hidden"
              v-model="form.type"
              @change="v$.type.$touch"
            />
            <label
              for="other"
              class="w-full max-w-[175px] cursor-pointer justify-center flex items-center gap-2 p-3 rounded border border-[#ddd] hover:border-[#aaaeb7] text-center"
            >
              <Icon
                :name="selectIcon('other')"
                font-size="20"
                class="text-[#959595]"
              />
              <span class="text-[#959595]">Outros</span>
            </label>
          </fieldset>
          <p v-if="v$.type.$error" class="text-red-500 text-sm">
            {{ v$.type.$errors[0].$message }}
          </p>
        </div>
      </div>

      <fieldset class="flex flex-col gap-1.5">
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
          :disabled="isLoading"
          class="w-full md:w-[210px] p-3 bg-zinc-950 text-white rounded hover:opacity-85 transition-opacity disabled:bg-zinc-400 disabled:text-zinc-600 disabled:cursor-not-allowed"
        >
          Criar entrada
        </button>
      </div>
    </form>
  </div>
</template>
