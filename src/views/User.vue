<template>
  <div class="user">
    <UserProfile/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserProfile from '@/components/user/UserProfile.vue';

@Component({
  components: {
    UserProfile,
  },
})
export default class User extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
