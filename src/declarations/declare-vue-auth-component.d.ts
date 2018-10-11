import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $auth: any;
  }

  interface VueConstructor {
    auth: any;
  }
}
