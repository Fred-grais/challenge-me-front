<template>
  <div class="users">
    <UsersList/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UsersList from '@/components/users/UsersList.vue'; // @ is an alias to /src

@Component({
  components: {
    UsersList,
  },
})
export default class Users extends Vue {}
</script>

<style lang="scss" scoped>
</style>
