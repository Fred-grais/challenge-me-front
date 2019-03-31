import { ErrorBag } from 'vee-validate';

declare module 'vue/types/vue' {
  interface Vue {
    veeErrors: ErrorBag;
  }
}
