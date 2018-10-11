<template>
  <div class="profile">
    <myProfile/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import myProfile from '@/components/me/Profile.vue';

@Component({
  components: {
    myProfile,
  },
})
export default class Profile extends Vue {
}
</script>
<style lang="scss" scoped>
</style>
