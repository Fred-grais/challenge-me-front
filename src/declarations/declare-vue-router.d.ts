import Vue from 'vue';
import Router from 'vue-router';

declare module 'vue/types/vue' {
  // Global properties can be declared
  // on the `VueConstructor` interface
  interface VueConstructor {
    router: Router;
  }
}
