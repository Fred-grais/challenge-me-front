<template>
  <div class="inbox">
    <inbox-layout></inbox-layout>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import InboxLayout from '@/components/me/inbox/Layout.vue';

@Component({
  components: {
    InboxLayout,
  },
})
export default class Inbox extends Vue {
}
</script>
<style lang="scss" scoped>
.inbox {
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
}
</style>
