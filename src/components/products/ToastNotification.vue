<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-8 opacity-0 sm:translate-y-0 sm:translate-x-8"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3.5 rounded-2xl border border-neutral-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95"
      role="alert"
    >
      <div v-if="thumbnail" class="h-11 w-11 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50 p-1 dark:border-neutral-800 dark:bg-neutral-800">
        <img :src="thumbnail" :alt="title" class="h-full w-full object-contain" />
      </div>
      <div v-else class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div class="flex-1 min-w-0">
        <p class="font-serif text-sm font-semibold text-neutral-900 dark:text-white truncate">
          {{ title }}
        </p>
        <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">
          {{ message }}
        </p>
      </div>

      <div class="flex items-center gap-2 flex-shrink-0">
        <RouterLink
          v-if="actionRoute"
          :to="actionRoute"
          class="rounded-full bg-neutral-900 px-3 py-1 text-xs font-bold text-white shadow-sm transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
        >
          {{ actionLabel || 'View' }}
        </RouterLink>
        <button
          class="rounded-full p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          type="button"
          @click="emit('close')"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  show: boolean;
  title: string;
  message: string;
  thumbnail?: string;
  actionLabel?: string;
  actionRoute?: string;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
}>();
</script>
