<template>
  <div class="create-project">
    <MyProjectsList/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MyProjectsList from '@/components/me/MyProjectsList.vue';

@Component({
  components: {
    MyProjectsList,
  },
})
export default class CreateProject extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
