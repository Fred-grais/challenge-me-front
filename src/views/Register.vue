<template>
  <v-container pa-5>
    <Form/>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Form from '@/components/register/Form.vue';

@Component({
  components: {
    Form,
  },
})
export default class Register extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
