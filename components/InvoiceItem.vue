<script setup lang="ts">
interface ItemProps {
  id: string;
  title: string;
  value: number;
  type: string;
}

interface Purchase {
  date: string;
  items: ItemProps[];
}

const props = defineProps<Purchase>();
</script>

<template>
  <div class="flex flex-col gap-3">
    <h3 class="text-sm font-semibold lg:text-base">
      {{ formatDate(props.date) }}
    </h3>
    <ul class="flex flex-col gap-2 lg:gap-4">
      <li v-for="item in props.items" v-bind:key="item.id">
        <NuxtLink
          :to="`/purchase/${item.id}`"
          class="flex items-center justify-between hover:bg-neutral-600/10 rounded p-3 transition-colors"
        >
          <div class="flex items-center gap-3">
            <Icon :name="selectIcon(item.type)" class="text-2xl lg:text-3xl" />
            <div class="flex flex-col">
              <h4 class="text-sm line-clamp-1 lg:text-lg capitalize">
                {{ item.title }}
              </h4>
              <span class="text-sm text-zinc-400 lg:text-base">{{
                convertType(item.type)
              }}</span>
            </div>
          </div>
          <div
            class="flex flex-col items-end gap-2 text-xs md:text-sm lg:text-base"
          >
            <span>R$ {{ formatPrice(item.value) }}</span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
