<template>
  <div class="me">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State, Action, Getter, namespace } from 'vuex-class';

import { Me } from '@/store/me/types';

const MeGetter = namespace('meState', Getter);

@Component
export default class MeLayout extends Vue {
  @MeGetter('getMe') public me!: Me;

  @Watch('$route')
  public onRouteChanged(val: string, oldVal: string) {
    this.controlCurrentUserStatus(val, oldVal, null);
  }

  public beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.controlCurrentUserStatus(to, from, next);
    });
  }

  // When user is pending activation we redirect him to its profile page so he can update its missing infos
  public controlCurrentUserStatus(to: any, from: any, next: any) {
    const redirectToMe = this.me.status === 'pending_activation';
    if (redirectToMe) {
      if (next) {
        next('/me');
      } else {
        this.$router.push('/me');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.me {
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
}
</style>
