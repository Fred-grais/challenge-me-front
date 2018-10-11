import Vue from 'vue'
import {AxiosInstance} from "axios";

declare module 'vue/types/vue' {
  // Global properties can be declared
  // on the `VueConstructor` interface
  interface VueConstructor {
    axios: AxiosInstance;
    $http: AxiosInstance;
  }
}
