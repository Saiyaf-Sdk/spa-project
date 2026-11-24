import { ref } from 'vue';
export const notice = ref('');
let timer: ReturnType<typeof setTimeout>;
export function announce(message: string) {
  clearTimeout(timer);
  notice.value = message;
  timer = setTimeout(() => {
    notice.value = '';
  }, 3400);
}
